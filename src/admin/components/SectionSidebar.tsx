import React, { useState } from "react";
import { GripVertical, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminSection } from "../lib/admin-api";

export function SectionSidebar({
  sections,
  selectedId,
  onSelect,
  onReorder,
  onToggleEnabled,
}: {
  sections: AdminSection[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onReorder: (orderedIds: number[]) => void;
  onToggleEnabled: (id: number, enabled: boolean) => void;
}) {
  const [dragId, setDragId] = useState<number | null>(null);
  const [overId, setOverId] = useState<number | null>(null);

  const handleDrop = () => {
    if (dragId === null || overId === null || dragId === overId) {
      setDragId(null);
      setOverId(null);
      return;
    }
    const ids = sections.map((s) => s.id);
    const from = ids.indexOf(dragId);
    const to = ids.indexOf(overId);
    ids.splice(from, 1);
    ids.splice(to, 0, dragId);
    onReorder(ids);
    setDragId(null);
    setOverId(null);
  };

  return (
    <div className="flex w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-4 py-4">
        <h2 className="text-sm font-bold text-slate-900">Page Sections</h2>
        <p className="mt-0.5 text-xs text-slate-400">Drag to reorder sections</p>
      </div>

      <ol className="flex-1 space-y-1 overflow-y-auto p-2">
        {sections.map((s, i) => (
          <li
            key={s.id}
            draggable
            onDragStart={() => setDragId(s.id)}
            onDragOver={(e) => {
              e.preventDefault();
              setOverId(s.id);
            }}
            onDrop={handleDrop}
            onDragEnd={() => {
              setDragId(null);
              setOverId(null);
            }}
            onClick={() => onSelect(s.id)}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-2.5 text-sm transition-colors",
              selectedId === s.id ? "border-primary bg-primary/5" : "border-transparent hover:bg-slate-50",
              overId === s.id && dragId !== s.id ? "border-dashed border-primary" : "",
              !s.enabled && "opacity-50"
            )}
          >
            <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-slate-300" />
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
              {i + 1}
            </span>
            <span className="flex-1 truncate font-medium text-slate-700">{s.name}</span>
            <button
              type="button"
              title={s.enabled ? "Visible on site" : "Hidden from site"}
              onClick={(e) => {
                e.stopPropagation();
                onToggleEnabled(s.id, !s.enabled);
              }}
              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              {s.enabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            </button>
          </li>
        ))}
      </ol>

      <div className="border-t border-slate-100 p-4">
        <div className="rounded-lg border border-dashed border-slate-200 p-3 text-center">
          <p className="text-xs font-medium text-slate-500">Changes are autosaved</p>
        </div>
      </div>
    </div>
  );
}
