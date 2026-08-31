import React, { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import type { FieldDef } from "@shared/sections";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageField } from "./ImageField";
import { IconPicker, AdminIcon } from "./IconPicker";
import { adminApi, type AdminForm } from "../lib/admin-api";

type JsonValue = any;

function setAt(obj: Record<string, JsonValue>, key: string, value: JsonValue) {
  return { ...obj, [key]: value };
}

function isFormTargetField(field: FieldDef, parentContent?: Record<string, JsonValue>) {
  if (field.type !== "text" || !field.key.endsWith("Href") || !parentContent) return false;
  const actionKey = field.key.replace(/Href$/, "Action");
  return parentContent[actionKey] === "custom_form_modal";
}

function hasHrefField(fields: FieldDef[]): boolean {
  return fields.some((field) => {
    if (field.key.endsWith("Href") || field.type === "form_select") return true;
    return field.type === "repeater" ? hasHrefField(field.fields) : false;
  });
}

function emptyValueForField(field: FieldDef) {
  if (field.type === "list") return [];
  if (field.type === "boolean") return false;
  return "";
}

function FieldRenderer({
  field,
  value,
  onChange,
  parentContent,
  formOptions,
}: {
  field: FieldDef;
  value: JsonValue;
  onChange: (v: JsonValue) => void;
  parentContent?: Record<string, JsonValue>;
  formOptions: AdminForm[];
}) {
  switch (field.type) {
    case "text":
      if (isFormTargetField(field, parentContent)) {
        return (
          <Select value={String(value ?? "")} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder={formOptions.length ? "Select form" : "No forms available"} />
            </SelectTrigger>
            <SelectContent>
              {formOptions.map((form) => (
                <SelectItem key={form.id} value={form.slug}>
                  {form.name} (/{form.slug})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }
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
    case "boolean":
      return (
        <div className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2">
          <span className="text-sm text-slate-600">{field.helpText ?? "Enable this option"}</span>
          <Switch checked={value !== false} onCheckedChange={onChange} />
        </div>
      );
    case "select":
      return (
        <Select value={String(value ?? "")} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "image":
      return <ImageField value={value ?? ""} onChange={onChange} />;
    case "file":
      return (
        <ImageField
          value={value ?? ""}
          onChange={onChange}
          accept={field.accept ?? "application/pdf"}
          buttonText={field.buttonText ?? "Upload File"}
          emptyText="No file selected"
          preview="file"
        />
      );
    case "form_select":
      return (
        <Select value={String(value ?? "")} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={formOptions.length ? "Select form" : "No forms available"} />
          </SelectTrigger>
          <SelectContent>
            {formOptions.map((form) => (
              <SelectItem key={form.id} value={form.slug}>
                {form.name} (/{form.slug})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
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
                      parentContent={item}
                      formOptions={formOptions}
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
                onChange([...items, Object.fromEntries(field.fields.map((f) => [f.key, emptyValueForField(f)]))])
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
  const [formOptions, setFormOptions] = useState<AdminForm[]>([]);
  const needsFormOptions = useMemo(() => hasHrefField(fields), [fields]);

  useEffect(() => {
    if (!needsFormOptions) return;
    adminApi.listForms()
      .then((res) => setFormOptions(res.forms))
      .catch(() => setFormOptions([]));
  }, [needsFormOptions]);

  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <div key={field.key} className="space-y-1.5">
          <Label className="text-sm font-medium text-slate-700">{field.label}</Label>
          <FieldRenderer
            field={field}
            value={content[field.key]}
            parentContent={content}
            formOptions={formOptions}
            onChange={(v) => onChange(setAt(content, field.key, v))}
          />
        </div>
      ))}
    </div>
  );
}

export { AdminIcon };
