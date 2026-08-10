import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearch } from "wouter";
import { Eye, Save, UploadCloud, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AdminShell } from "../components/AdminShell";
import { SectionSidebar } from "../components/SectionSidebar";
import { EditSectionPanel } from "../components/EditSectionPanel";
import { adminApi, type AdminSection, type AdminPage } from "../lib/admin-api";

const SAVE_DEBOUNCE_MS = 800;

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function PageBuilder() {
  const search = useSearch();
  const pageSlug = new URLSearchParams(search).get("slug") ?? "home";

  const [page, setPage] = useState<AdminPage | null>(null);
  const [sections, setSections] = useState<AdminSection[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [publishing, setPublishing] = useState(false);
  const [publishedAt, setPublishedAt] = useState<string | null>(null);

  const saveTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
  const [previewNonce, setPreviewNonce] = useState(0);
  const refreshPreview = () => setPreviewNonce((n) => n + 1);

  useEffect(() => {
    setLoading(true);
    setPublishedAt(null);
    adminApi.getSections(pageSlug).then(({ page: pageData, sections: rows }) => {
      const sorted = [...rows].sort((a, b) => a.position - b.position);
      setPage(pageData);
      setSections(sorted);
      setSelectedId(sorted[0]?.id ?? null);
      setLoading(false);
    });
  }, [pageSlug]);

  const selected = useMemo(() => sections.find((s) => s.id === selectedId) ?? null, [sections, selectedId]);
  const previewPath = page?.path ?? "/";

  const scheduleSave = (id: number, patch: Partial<Pick<AdminSection, "content" | "name" | "enabled">>) => {
    setSaveStatus("saving");
    clearTimeout(saveTimers.current[id]);
    saveTimers.current[id] = setTimeout(async () => {
      try {
        await adminApi.updateSection(id, patch);
        setSaveStatus("saved");
        refreshPreview();
      } catch {
        setSaveStatus("error");
      }
    }, SAVE_DEBOUNCE_MS);
  };

  const handleContentChange = (id: number, content: Record<string, unknown>) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, content } : s)));
    scheduleSave(id, { content });
  };

  const handleEnabledChange = (id: number, enabled: boolean) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, enabled } : s)));
    scheduleSave(id, { enabled });
  };

  const handleReorder = (orderedIds: number[]) => {
    const byId = new Map(sections.map((s) => [s.id, s]));
    const next = orderedIds.map((id, i) => ({ ...byId.get(id)!, position: i }));
    setSections(next);
    setSaveStatus("saving");
    adminApi
      .reorder(
        pageSlug,
        orderedIds.map((id, i) => ({ id, position: i }))
      )
      .then(() => {
        setSaveStatus("saved");
        refreshPreview();
      })
      .catch(() => setSaveStatus("error"));
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const res = await adminApi.publish(pageSlug);
      setPublishedAt(res.publishedAt);
    } finally {
      setPublishing(false);
    }
  };

  const handlePreview = () => {
    window.open(`${previewPath}?preview=1`, "_blank", "noopener");
  };

  const handleSaveDraftNow = async () => {
    if (!selected) return;
    Object.values(saveTimers.current).forEach(clearTimeout);
    setSaveStatus("saving");
    try {
      await adminApi.updateSection(selected.id, { content: selected.content, enabled: selected.enabled });
      setSaveStatus("saved");
      refreshPreview();
    } catch {
      setSaveStatus("error");
    }
  };

  if (loading) {
    return (
      <AdminShell>
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div>
          <h1 className="text-sm font-bold text-slate-900">Page Builder</h1>
          <p className="text-xs text-slate-400">{page?.title ?? pageSlug}</p>
        </div>
        <div className="flex items-center gap-3">
          <SaveIndicator status={saveStatus} />
          <Button variant="outline" size="sm" onClick={handlePreview}>
            <Eye className="h-3.5 w-3.5" /> Preview
          </Button>
          <Button variant="secondary" size="sm" onClick={handleSaveDraftNow} disabled={!selected}>
            <Save className="h-3.5 w-3.5" /> Save Draft
          </Button>
          <Button size="sm" onClick={handlePublish} disabled={publishing}>
            <UploadCloud className="h-3.5 w-3.5" /> {publishing ? "Publishing…" : "Publish"}
          </Button>
        </div>
      </header>
      {publishedAt && (
        <div className="flex items-center gap-2 border-b border-emerald-100 bg-emerald-50 px-6 py-2 text-xs font-medium text-emerald-700">
          <Check className="h-3.5 w-3.5" /> Published successfully at {new Date(publishedAt).toLocaleTimeString()}
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        <SectionSidebar
          sections={sections}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onReorder={handleReorder}
          onToggleEnabled={handleEnabledChange}
        />

        <main className="flex flex-1 flex-col overflow-hidden bg-slate-100 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">Draft preview — reflects your saved changes</p>
            <Button variant="ghost" size="sm" onClick={refreshPreview}>
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </Button>
          </div>
          <div className="flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <iframe key={previewNonce} src={`${previewPath}?preview=1`} title="Draft preview" className="h-full w-full" />
          </div>
        </main>

        {selected && (
          <div className="w-[26rem] shrink-0 border-l border-slate-200 bg-white">
            <EditSectionPanel
              section={selected}
              onContentChange={(content) => handleContentChange(selected.id, content)}
              onEnabledChange={(enabled) => handleEnabledChange(selected.id, enabled)}
            />
          </div>
        )}
      </div>
    </AdminShell>
  );
}

function SaveIndicator({ status }: { status: SaveStatus }) {
  if (status === "idle") return null;
  const label = { saving: "Saving…", saved: "All changes saved", error: "Failed to save" }[status];
  const color = status === "error" ? "text-red-500" : "text-slate-400";
  return <span className={`text-xs font-medium ${color}`}>{label}</span>;
}
