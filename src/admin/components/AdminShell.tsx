import React from "react";
import { Link } from "wouter";
import {
  LayoutDashboard,
  LayoutGrid,
  Image as ImageIcon,
  FileStack,
  Menu as MenuIcon,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: false },
  { label: "Page Builder", icon: LayoutGrid, active: true },
  { label: "Media Library", icon: ImageIcon, active: false },
  { label: "Forms", icon: FileStack, active: false },
  { label: "Menus", icon: MenuIcon, active: false },
  { label: "Users", icon: Users, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">
      <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="flex items-center gap-2 px-5 py-5">
          <img src="/images/konnect-logo.png" alt="KonnectERP" className="h-7 w-auto" />
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const content = (
              <span
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  item.active
                    ? "bg-primary/10 text-primary"
                    : "text-slate-400 cursor-not-allowed opacity-60"
                )}
                title={item.active ? undefined : "Coming soon"}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </span>
            );
            return item.active ? (
              <Link key={item.label} href="/admin/page-builder">
                {content}
              </Link>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-3">
          <button
            onClick={() => logout()}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
