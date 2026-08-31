import { MessageCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useSiteSettings } from "@/lib/useSiteSettings";

function cleanPhone(value: string) {
  return value.replace(/[^\d]/g, "");
}

export function StickyWhatsapp() {
  const [location] = useLocation();
  const settings = useSiteSettings();
  const whatsapp = settings.whatsapp;
  const phone = cleanPhone(whatsapp.phone);

  if (location.startsWith("/admin") || !whatsapp.enabled || !phone) return null;

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(whatsapp.message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Connect on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_rgba(37,211,102,0.35)] transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
