import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SECTION_DEFS_BY_TYPE, type SectionType } from "@shared/sections";
import { SectionForm } from "./SectionForm";
import type { AdminSection } from "../lib/admin-api";

export function EditSectionPanel({
  section,
  onContentChange,
  onEnabledChange,
}: {
  section: AdminSection;
  onContentChange: (content: Record<string, unknown>) => void;
  onEnabledChange: (enabled: boolean) => void;
}) {
  const def = SECTION_DEFS_BY_TYPE[section.type as SectionType];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Edit Section</h3>
          <p className="text-xs text-slate-400">{section.name}</p>
        </div>
      </div>

      <Tabs defaultValue="content" className="flex min-h-0 flex-1 flex-col">
        <div className="px-6 pt-4">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="content" className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          {def ? (
            <SectionForm fields={def.fields} content={{ ...def.defaultContent, ...section.content }} onChange={onContentChange} />
          ) : (
            <p className="text-sm text-slate-500">Unknown section type.</p>
          )}
        </TabsContent>

        <TabsContent value="settings" className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">Visible on site</Label>
              <p className="text-xs text-slate-400">Hidden sections are skipped when the page is published.</p>
            </div>
            <Switch checked={section.enabled} onCheckedChange={onEnabledChange} />
          </div>
          <div className="mt-4 space-y-1 rounded-lg border border-slate-200 p-4 text-xs text-slate-500">
            <p>
              <span className="font-medium text-slate-600">Type:</span> {section.type}
            </p>
            <p>
              <span className="font-medium text-slate-600">Last updated:</span>{" "}
              {new Date(section.updatedAt).toLocaleString()}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
