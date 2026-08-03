import * as Icons from "lucide-react";
import { ICON_OPTIONS } from "@shared/sections";
import { cn } from "@/lib/utils";

export function AdminIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.HelpCircle;
  return <Icon className={className} />;
}

export function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-8 gap-1.5">
      {ICON_OPTIONS.map((name) => (
        <button
          key={name}
          type="button"
          title={name}
          onClick={() => onChange(name)}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-md border transition-colors",
            value === name ? "border-primary bg-primary/10 text-primary" : "border-slate-200 text-slate-500 hover:border-slate-300"
          )}
        >
          <AdminIcon name={name} className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
