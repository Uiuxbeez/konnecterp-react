import React, { useRef, useState } from "react";
import { FileText, ImageIcon, Upload, X } from "lucide-react";
import { adminApi } from "../lib/admin-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ImageField({
  value,
  alt = "",
  onAltChange,
  onChange,
  accept = "image/png,image/jpeg,image/webp,image/svg+xml,image/avif,image/gif",
  buttonText = "Upload Image",
  emptyText = "No image selected",
  preview = "image",
}: {
  value: string;
  alt?: string;
  onAltChange?: (value: string) => void;
  onChange: (v: string) => void;
  accept?: string;
  buttonText?: string;
  emptyText?: string;
  preview?: "image" | "file";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const { url } = await adminApi.upload(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 p-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-slate-100">
          {value && preview === "image" ? (
            <img src={value} alt={alt} className="h-full w-full object-cover" />
          ) : value ? (
            <FileText className="h-5 w-5 text-slate-500" />
          ) : (
            <ImageIcon className="h-5 w-5 text-slate-400" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-slate-500">{value || emptyText}</p>
          <div className="mt-1.5 flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="h-3.5 w-3.5" />
              {uploading ? "Uploading..." : buttonText}
            </Button>
            {value && (
              <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
                <X className="h-3.5 w-3.5" />
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {preview === "image" && onAltChange && <label className="mt-3 block space-y-1 text-sm text-slate-600">
        <span>Alt Text</span>
        <Input value={alt} onChange={(event) => onAltChange(event.target.value)} placeholder="Describe the image; leave empty if decorative" />
      </label>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
