import { ExternalLink } from "lucide-react";
import { RichText } from "@/components/site/RichText";
import type { SectionCtx } from "./shared";

export interface ClientLogoItem {
  logo: string;
  name: string;
  industry?: string;
  website?: string;
}

export interface ClientLogoGridContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  clients: ClientLogoItem[];
}

function isExternalUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://");
}

export function ClientLogoGrid({ content, ctx }: { content: ClientLogoGridContent; ctx: SectionCtx }) {
  const { isDarkMode } = ctx;
  const clients = Array.isArray(content.clients) ? content.clients : [];

  return (
    <section className={`py-20 md:py-24 ${isDarkMode ? "bg-[#080E1D]" : "bg-slate-50"}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#F97316]">{content.eyebrow}</p>
          <h2 className={`text-3xl font-bold tracking-tight md:text-5xl ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>
            {content.title} <span className="text-[#F97316]">{content.highlight}</span>
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl text-base leading-7 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            <RichText text={content.description} />
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clients.map((client, index) => {
            const website = client.website?.trim() ?? "";
            const card = (
              <div
                className={`flex h-full min-h-[180px] flex-col rounded-lg border p-5 transition-all ${
                  isDarkMode
                    ? "border-white/10 bg-white/[0.04] hover:border-orange-400/40 hover:bg-white/[0.07]"
                    : "border-slate-200 bg-white shadow-sm hover:border-orange-200 hover:shadow-md"
                }`}
              >
                <div className={`flex h-24 items-center justify-center rounded-md border p-4 ${isDarkMode ? "border-white/10 bg-white" : "border-slate-100 bg-slate-50"}`}>
                  {client.logo?.trim() ? (
                    <img src={client.logo} alt={client.name || `Client ${index + 1}`} className="max-h-16 max-w-full object-contain" loading="lazy" />
                  ) : (
                    <span className="text-sm font-bold text-slate-400">Logo</span>
                  )}
                </div>

                <div className="mt-4 flex flex-1 flex-col">
                  <h3 className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-[#0B1F4A]"}`}>{client.name || `Client ${index + 1}`}</h3>
                  {client.industry && <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#F97316]">{client.industry}</p>}
                  {website && (
                    <span className={`mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-500"}`}>
                      Visit website <ExternalLink className="h-3 w-3" />
                    </span>
                  )}
                </div>
              </div>
            );

            if (!website) return <article key={`${client.name}-${index}`}>{card}</article>;

            return (
              <a
                key={`${client.name}-${index}`}
                href={website}
                target={isExternalUrl(website) ? "_blank" : undefined}
                rel={isExternalUrl(website) ? "noreferrer" : undefined}
                className="block h-full"
              >
                {card}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
