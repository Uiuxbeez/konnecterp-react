import { useState } from "react";
import { DemoModal } from "@/components/site/DemoModal";
import { caseStudyDownloadForm } from "@shared/case-study-download";

export interface BrochureDownloadSettings {
  restrictDownload?: boolean;
  downloadFormSlug?: string;
}

function downloadPdf(url: string) {
  const target = new URL(url, window.location.origin);
  if (!["http:", "https:"].includes(target.protocol)) return;
  const link = document.createElement("a");
  link.href = target.href;
  link.download = "";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function useBrochureDownload(settings: BrochureDownloadSettings) {
  const [pending, setPending] = useState<{ url: string; slug: string } | null>(null);
  const startDownload = (url: string) => {
    if (!url?.trim()) return;
    const slug = caseStudyDownloadForm(settings);
    if (slug) setPending({ url, slug });
    else downloadPdf(url);
  };
  const modal = pending ? <DemoModal
    open
    slug={pending.slug}
    source="brochure-download"
    onClose={() => setPending(null)}
    onSuccess={() => {
      downloadPdf(pending.url);
      setPending(null);
    }}
  /> : null;
  return { startDownload, modal };
}
