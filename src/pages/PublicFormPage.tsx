import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { apiUrl } from "@/lib/api-base";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { PublicForm } from "@/components/site/PublicForm";

export default function PublicFormPage() {
  const { slug } = useParams<{ slug: string }>();
  const formSlug = slug ?? "demo-request";
  const [meta, setMeta] = useState({
    title: "Submit Form | KonnectERP",
    description: "Submit your details to the KonnectERP team.",
  });

  useEffect(() => {
    let cancelled = false;
    fetch(apiUrl(`/api/public/forms/${formSlug}`))
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (cancelled) return;
        const form = data?.form;
        setMeta({
          title: form?.settings?.title ? `${form.settings.title} | KonnectERP` : "Submit Form | KonnectERP",
          description: form?.settings?.shortDescription || "Submit your details to the KonnectERP team.",
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [formSlug]);

  useDocumentMeta(meta.title, meta.description);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 font-sans">
      <section className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <PublicForm slug={formSlug} source={`${formSlug}-share-link`} layout="page" successRedirectHref="/" />
      </section>
    </main>
  );
}
