import React from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import type { FieldDef } from "@shared/sections";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageField } from "./ImageField";
import { IconPicker, AdminIcon } from "./IconPicker";

type JsonValue = any;

function setAt(obj: Record<string, JsonValue>, key: string, value: JsonValue) {
  return { ...obj, [key]: value };
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: JsonValue;
  onChange: (v: JsonValue) => void;
}) {
  switch (field.type) {
    case "text":
      return <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
    case "textarea":
      return <Textarea rows={4} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
    case "number":
      return (
        <Input
          type="number"
          value={value ?? 0}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        />
      );
    case "image":
      return <ImageField value={value ?? ""} onChange={onChange} />;
    case "icon":
      return <IconPicker value={value ?? ""} onChange={onChange} />;
    case "list": {
      const items: string[] = Array.isArray(value) ? value : [];
      return (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                value={item}
                placeholder={field.itemLabel ?? "Item"}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = e.target.value;
                  onChange(next);
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              >
                <Trash2 className="h-3.5 w-3.5 text-slate-400" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => onChange([...items, ""])}>
            <Plus className="h-3.5 w-3.5" /> Add {field.itemLabel ?? "Item"}
          </Button>
        </div>
      );
    }
    case "repeater": {
      const items: Record<string, JsonValue>[] = Array.isArray(value) ? value : [];
      return (
        <div className="space-y-3">
          {items.map((item, i) => (
            <details key={i} className="group rounded-lg border border-slate-200" open={items.length <= 2}>
              <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-700">
                <GripVertical className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                <span className="flex-1 truncate">
                  {field.itemLabel} {i + 1}
                  {typeof item?.title === "string" && item.title ? ` — ${item.title}` : ""}
                  {typeof item?.company === "string" && item.company ? ` — ${item.company}` : ""}
                  {typeof item?.label === "string" && item.label ? ` — ${item.label}` : ""}
                </span>
                {field.addRemove && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      onChange(items.filter((_, idx) => idx !== i));
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-slate-400" />
                  </Button>
                )}
              </summary>
              <div className="space-y-3 border-t border-slate-100 p-3">
                {field.fields.map((sub) => (
                  <div key={sub.key} className="space-y-1.5">
                    <Label className="text-xs text-slate-500">{sub.label}</Label>
                    <FieldRenderer
                      field={sub}
                      value={item[sub.key]}
                      onChange={(v) => {
                        const next = [...items];
                        next[i] = setAt(item, sub.key, v);
                        onChange(next);
                      }}
                    />
                  </div>
                ))}
              </div>
            </details>
          ))}
          {field.addRemove && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                onChange([...items, Object.fromEntries(field.fields.map((f) => [f.key, f.type === "list" ? [] : ""]))])
              }
            >
              <Plus className="h-3.5 w-3.5" /> Add {field.itemLabel}
            </Button>
          )}
        </div>
      );
    }
    default:
      return null;
  }
}

export function SectionForm({
  fields,
  content,
  onChange,
}: {
  fields: FieldDef[];
  content: Record<string, JsonValue>;
  onChange: (content: Record<string, JsonValue>) => void;
}) {
  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <div key={field.key} className="space-y-1.5">
          <Label className="text-sm font-medium text-slate-700">{field.label}</Label>
          <FieldRenderer
            field={field}
            value={content[field.key]}
            onChange={(v) => onChange(setAt(content, field.key, v))}
          />
        </div>
      ))}
    </div>
  );
}

export { AdminIcon };
