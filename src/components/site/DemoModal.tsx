import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { PublicForm } from "./PublicForm";
import { apiUrl } from "@/lib/api-base";
import { DEFAULT_DEMO_FORM } from "@shared/forms";

export function DemoModal({ open, onClose, slug = "demo-request" }: { open: boolean; onClose: () => void; slug?: string }) {
  const [headerText, setHeaderText] = useState(DEFAULT_DEMO_FORM.settings.shortDescription);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    fetch(apiUrl(`/api/public/forms/${slug}`))
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        const next = data?.form?.settings?.shortDescription;
        if (typeof next === "string" && next.trim()) setHeaderText(next);
      })
      .catch(() => setHeaderText(DEFAULT_DEMO_FORM.settings.shortDescription));
  }, [open, slug]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-8 pb-6 pt-8" style={{ background: "linear-gradient(135deg, #F97316 0%, #0B1F4A 100%)" }}>
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="mt-1 pr-10 text-sm text-blue-100">{headerText}</p>
            </div>

            <PublicForm slug={slug} source={`${slug}-modal`} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
