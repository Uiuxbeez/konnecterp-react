import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Link2,
  ListTree,
  Menu as MenuIcon,
  PanelTop,
  Plus,
  Rows3,
  Save,
  SplitSquareHorizontal,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { getMenuColumnClass, getMenuColumns, MEGA_MENU_THRESHOLD, MENU_GROUPS, type MenuGroup, type MenuItem } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { AdminShell } from "../components/AdminShell";
import { adminApi, type AdminPage } from "../lib/admin-api";
import { withStaticPages } from "../lib/static-pages";

type SaveStatus = "idle" | "saving" | "saved" | "error";

function getLinkType(href: string) {
  if (href === "/") return "home";
  if (href.startsWith("/products/")) return "product";
  if (href.startsWith("/industries/")) return "industry";
  if (href.startsWith("/resources/")) return "resource";
  if (href.startsWith("/blog")) return "blog";
  if (href.startsWith("#")) return "section";
  return "page";
}

function mainMenuId(group: MenuGroup, index: number) {
  return `${index}-${group.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function cleanNavigation(groups: MenuGroup[]) {
  return groups
    .map((group) => ({
      ...group,
      label: group.label.trim(),
      href: group.href.trim() || "#",
      footerLabel: group.footerLabel?.trim() || undefined,
      description: group.description?.trim() || undefined,
      items: group.items
        .map((item) => ({ label: item.label.trim(), href: item.href.trim() || "#" }))
        .filter((item) => item.label),
    }))
    .filter((group) => group.label);
}

export default function MenuBuilder() {
  const [menuGroups, setMenuGroups] = useState<MenuGroup[]>(MENU_GROUPS);
  const [pages, setPages] = useState<AdminPage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [draftItem, setDraftItem] = useState<MenuItem>({ label: "", href: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([adminApi.getNavigation(), adminApi.listPages()])
      .then(([navigationRes, pagesRes]) => {
        setMenuGroups(navigationRes.navigation.length ? navigationRes.navigation : MENU_GROUPS);
        setPages(withStaticPages(pagesRes.pages));
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load menu data");
      })
      .finally(() => setLoading(false));
  }, []);

  const selected = menuGroups[selectedIndex] ?? menuGroups[0];
  const selectedColumns = useMemo(() => getMenuColumns(selected?.items ?? []), [selected]);
  const isMegaMenu = (selected?.items.length ?? 0) > MEGA_MENU_THRESHOLD;
  const columnClass = getMenuColumnClass(selectedColumns.length);

  const updateGroup = (index: number, patch: Partial<MenuGroup>) => {
    setMenuGroups((prev) => prev.map((group, i) => (i === index ? { ...group, ...patch } : group)));
    setSaveStatus("idle");
  };

  const updateItem = (itemIndex: number, patch: Partial<MenuItem>) => {
    if (!selected) return;
    updateGroup(selectedIndex, {
      items: selected.items.map((item, i) => (i === itemIndex ? { ...item, ...patch } : item)),
    });
  };

  const moveItem = (itemIndex: number, direction: -1 | 1) => {
    if (!selected) return;
    const nextIndex = itemIndex + direction;
    if (nextIndex < 0 || nextIndex >= selected.items.length) return;
    const items = [...selected.items];
    const [item] = items.splice(itemIndex, 1);
    items.splice(nextIndex, 0, item);
    updateGroup(selectedIndex, { items });
  };

  const addMainMenu = () => {
    setMenuGroups((prev) => [...prev, { label: "New Menu", href: "#", description: "", items: [] }]);
    setSelectedIndex(menuGroups.length);
    setSaveStatus("idle");
  };

  const deleteMainMenu = () => {
    if (!selected || !confirm(`Delete ${selected.label}?`)) return;
    setMenuGroups((prev) => prev.filter((_, i) => i !== selectedIndex));
    setSelectedIndex((index) => Math.max(0, index - 1));
    setSaveStatus("idle");
  };

  const addSubmenu = () => {
    if (!selected || !draftItem.label.trim()) return;
    updateGroup(selectedIndex, { items: [...selected.items, { label: draftItem.label.trim(), href: draftItem.href.trim() || "#" }] });
    setDraftItem({ label: "", href: "" });
  };

  const deleteSubmenu = (itemIndex: number) => {
    if (!selected) return;
    updateGroup(selectedIndex, { items: selected.items.filter((_, i) => i !== itemIndex) });
  };

  const fillDraftFromPage = (path: string) => {
    const page = pages.find((p) => p.path === path);
    if (!page) return;
    setDraftItem({ label: page.title, href: page.path });
  };

  const fillItemFromPage = (itemIndex: number, path: string) => {
    const page = pages.find((p) => p.path === path);
    if (!page) return;
    updateItem(itemIndex, { label: page.title, href: page.path });
  };

  const saveNavigation = async () => {
    setSaveStatus("saving");
    try {
      const navigation = cleanNavigation(menuGroups);
      const res = await adminApi.updateNavigation(navigation);
      setMenuGroups(res.navigation);
      setSelectedIndex((index) => Math.min(index, Math.max(res.navigation.length - 1, 0)));
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  };

  return (
    <AdminShell>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div>
          <h1 className="text-sm font-bold text-slate-900">Menu Builder</h1>
          <p className="text-xs text-slate-400">Edit header menu and assign pages</p>
        </div>
        <div className="flex items-center gap-3">
          <SaveIndicator status={saveStatus} />
          <Button size="sm" onClick={saveNavigation} disabled={loading || saveStatus === "saving"}>
            <Save className="h-3.5 w-3.5" /> Save Menu
          </Button>
        </div>
      </header>

      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1">
          <aside className="flex w-80 shrink-0 flex-col border-r border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Menu</h2>
                  <p className="mt-0.5 text-xs text-slate-400">Main menu and dropdown levels</p>
                </div>
                <Button type="button" size="icon" variant="outline" title="Add main menu" onClick={addMainMenu}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {error && <p className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{error}</p>}
              {menuGroups.map((group, index) => {
                const active = index === selectedIndex;
                const mega = group.items.length > MEGA_MENU_THRESHOLD;

                return (
                  <button
                    key={mainMenuId(group, index)}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={cn(
                      "mb-1 w-full rounded-lg border px-3 py-3 text-left transition-colors",
                      active ? "border-primary bg-primary/5" : "border-transparent hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-slate-800">{group.label || "Untitled"}</span>
                        <span className="mt-1 flex flex-wrap items-center gap-1.5">
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-slate-500">main</span>
                          {group.items.length > 0 && (
                            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-blue-600">
                              {mega ? "mega menu" : "dropdown"}
                            </span>
                          )}
                          {group.items.length > 0 && (
                            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-slate-500">
                              {group.items.length} sub
                            </span>
                          )}
                        </span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {selected && (
            <main className="min-w-0 flex-1 overflow-y-auto bg-slate-50 p-6">
              <div className="mx-auto max-w-6xl space-y-5">
                <section className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <MenuIcon className="h-4 w-4" />
                      </span>
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">{selected.label || "Untitled Menu"}</h2>
                        <a href={selected.href || "#"} target="_blank" rel="noreferrer" className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-primary">
                          {selected.href || "#"} <Link2 className="h-3 w-3" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
                        <PanelTop className="h-3.5 w-3.5" />
                        {menuGroups.length} main menus
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={deleteMainMenu} disabled={menuGroups.length <= 1}>
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <Field label="Main Menu Label" htmlFor="menu-label">
                      <Input id="menu-label" value={selected.label} onChange={(e) => updateGroup(selectedIndex, { label: e.target.value })} />
                    </Field>
                    <Field label="Main Menu Link" htmlFor="menu-href">
                      <Input id="menu-href" value={selected.href} onChange={(e) => updateGroup(selectedIndex, { href: e.target.value })} />
                    </Field>
                    <Field label="Footer Label" htmlFor="menu-footer-label">
                      <Input id="menu-footer-label" value={selected.footerLabel ?? ""} onChange={(e) => updateGroup(selectedIndex, { footerLabel: e.target.value })} placeholder={selected.label} />
                    </Field>
                    <Field label="Description" htmlFor="menu-description">
                      <Input id="menu-description" value={selected.description ?? ""} onChange={(e) => updateGroup(selectedIndex, { description: e.target.value })} />
                    </Field>
                  </div>
                </section>

                <section className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Assign Page To Menu</h3>
                      <p className="mt-0.5 text-xs text-slate-400">Choose a created page or type a custom label and link.</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      {pages.length} pages
                    </span>
                  </div>

                  <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr_1fr_auto]">
                    <select
                      value=""
                      onChange={(e) => fillDraftFromPage(e.target.value)}
                      className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm"
                    >
                      <option value="">Select created page</option>
                      {pages.map((page) => (
                        <option key={page.id} value={page.path}>
                          {page.title} ({page.path})
                        </option>
                      ))}
                    </select>
                    <Input value={draftItem.label} onChange={(e) => setDraftItem((item) => ({ ...item, label: e.target.value }))} placeholder="Menu label" />
                    <Input value={draftItem.href} onChange={(e) => setDraftItem((item) => ({ ...item, href: e.target.value }))} placeholder="/page-url" />
                    <Button type="button" onClick={addSubmenu} disabled={!draftItem.label.trim()}>
                      <Plus className="h-3.5 w-3.5" /> Add
                    </Button>
                  </div>
                </section>

                <section className="rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div className="flex items-center gap-2">
                      {isMegaMenu ? <SplitSquareHorizontal className="h-4 w-4 text-primary" /> : <Rows3 className="h-4 w-4 text-primary" />}
                      <h3 className="text-sm font-bold text-slate-900">{isMegaMenu ? "Mega Menu Columns" : "Dropdown Menu"}</h3>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      6 menus per column
                    </span>
                  </div>

                  {selected.items.length === 0 ? (
                    <div className="flex items-center gap-3 px-5 py-8 text-sm text-slate-400">
                      <ListTree className="h-4 w-4" />
                      No dropdown items for this main menu.
                    </div>
                  ) : (
                    <div className={`grid gap-4 p-5 ${isMegaMenu ? columnClass : "grid-cols-1"}`}>
                      {selectedColumns.map((column, columnIndex) => (
                        <div key={`${selected.label}-column-${columnIndex}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                          <div className="mb-2 flex items-center justify-between">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Column {columnIndex + 1}</p>
                            <span className="text-[10px] font-semibold text-slate-400">{column.length}/6</span>
                          </div>
                          <div className="space-y-2">
                            {column.map((item, itemIndex) => {
                              const absoluteIndex = columnIndex * 6 + itemIndex;
                              return (
                                <div key={`${item.label}-${absoluteIndex}`} className="rounded-md bg-white p-2.5 shadow-sm shadow-slate-200/50">
                                  <div className="mb-2 flex items-center gap-2">
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-slate-100 text-[10px] font-bold text-slate-500">
                                      {absoluteIndex + 1}
                                    </span>
                                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-slate-500">
                                      {getLinkType(item.href)}
                                    </span>
                                    <div className="ml-auto flex items-center gap-1">
                                      <IconButton title="Move up" disabled={absoluteIndex === 0} onClick={() => moveItem(absoluteIndex, -1)}>
                                        <ArrowUp className="h-3.5 w-3.5" />
                                      </IconButton>
                                      <IconButton title="Move down" disabled={absoluteIndex === selected.items.length - 1} onClick={() => moveItem(absoluteIndex, 1)}>
                                        <ArrowDown className="h-3.5 w-3.5" />
                                      </IconButton>
                                      <IconButton title="Remove" onClick={() => deleteSubmenu(absoluteIndex)}>
                                        <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                      </IconButton>
                                    </div>
                                  </div>
                                  <div className="grid gap-2 lg:grid-cols-[1fr_1fr_1.1fr]">
                                    <Input value={item.label} onChange={(e) => updateItem(absoluteIndex, { label: e.target.value })} />
                                    <Input value={item.href} onChange={(e) => updateItem(absoluteIndex, { href: e.target.value })} />
                                    <select
                                      value=""
                                      onChange={(e) => fillItemFromPage(absoluteIndex, e.target.value)}
                                      className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm"
                                    >
                                      <option value="">Assign page</option>
                                      {pages.map((page) => (
                                        <option key={page.id} value={page.path}>
                                          {page.title}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </main>
          )}
        </div>
      )}
    </AdminShell>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function IconButton({
  title,
  disabled,
  onClick,
  children,
}: {
  title: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function SaveIndicator({ status }: { status: SaveStatus }) {
  if (status === "idle") return null;
  const label = { saving: "Saving...", saved: "Menu saved", error: "Failed to save" }[status];
  const color = status === "error" ? "text-red-500" : "text-slate-400";
  return <span className={`text-xs font-medium ${color}`}>{label}</span>;
}
