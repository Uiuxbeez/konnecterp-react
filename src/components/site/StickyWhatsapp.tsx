import { X } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "wouter";
import { useSiteSettings } from "@/lib/useSiteSettings";

function cleanPhone(value: string) {
  return value.replace(/[^\d]/g, "");
}

export function StickyWhatsapp() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const settings = useSiteSettings();
  const whatsapp = settings.whatsapp;
  const phone = cleanPhone(whatsapp.phone);

  if (location.startsWith("/admin") || location.startsWith("/forms/") || !whatsapp.enabled || !phone) return null;

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(whatsapp.message)}`;

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end gap-4 sm:right-6">
      {open && (
        <aside className="w-[min(330px,calc(100vw-2.5rem))] overflow-hidden rounded-md bg-white shadow-[0_18px_42px_rgba(15,23,42,0.2)]">
          <div className="relative bg-[#075E54] px-6 pb-8 pt-4 text-white">
            <p className="pr-7 text-base font-semibold leading-6">
              Hi! Click one of our member below to chat on Konnect ERP
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp chat"
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            className="min-h-[142px] border-b border-slate-100 px-6 pt-3"
            style={{
              backgroundColor: "#f5f0ea",
              backgroundImage:
                "radial-gradient(circle at 18px 18px, rgba(148,163,184,0.2) 1px, transparent 1.5px), radial-gradient(circle at 48px 42px, rgba(148,163,184,0.18) 1.25px, transparent 1.75px)",
              backgroundSize: "42px 42px, 58px 58px",
            }}
          >
            <div className="inline-block rounded-md bg-[#DCF8C6] px-4 py-2 text-xs text-slate-600 shadow-sm">
              The team Typically replies within minutes.
            </div>
          </div>

          <div className="px-6 pb-1 pt-3 text-center">
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mx-auto flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] text-base font-bold text-white shadow-sm transition-colors hover:bg-[#20bd5a] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
            >
              <FaWhatsapp className="h-5 w-5" /> WhatsApp Us
            </a>
            <p className="mt-2 text-xs text-slate-500">Online | Privacy policy</p>
          </div>
        </aside>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Hide WhatsApp chat" : "Open WhatsApp chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_rgba(37,211,102,0.35)] transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        <FaWhatsapp className="h-8 w-8" />
      </button>
    </div>
  );
}
