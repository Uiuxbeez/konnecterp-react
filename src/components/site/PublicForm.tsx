import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, CheckCircle2, ChevronDown, FileUp, X } from "lucide-react";
import { apiUrl } from "@/lib/api-base";
import { DEFAULT_DEMO_FORM, type FormDefinitionContent, type FormFieldDef } from "@shared/forms";

type PublicFormData = FormDefinitionContent & {
  id?: number;
  slug: string;
  name: string;
};

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;
const FILE_ACCEPT = ".png,.jpg,.jpeg,.webp,.gif,.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png,image/jpeg,image/webp,image/gif";

function makeCaptcha() {
  return { a: Math.floor(Math.random() * 7) + 2, b: Math.floor(Math.random() * 6) + 3 };
}

export function PublicForm({
  slug,
  source = "website",
  layout = "modal",
  onSuccess,
  successRedirectHref,
  successRedirectDelayMs = 2500,
  showIntro = true,
}: {
  slug: string;
  source?: string;
  layout?: "modal" | "page";
  onSuccess?: (values: Record<string, string>) => void;
  successRedirectHref?: string;
  successRedirectDelayMs?: number;
  showIntro?: boolean;
}) {
  const [definition, setDefinition] = useState<PublicFormData>({
    slug,
    name: "Demo Request",
    ...DEFAULT_DEMO_FORM,
  });
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadingFields, setUploadingFields] = useState<Record<string, boolean>>({});
  const [captcha, setCaptcha] = useState(makeCaptcha);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(apiUrl(`/api/public/forms/${slug}`))
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setDefinition(data.form))
      .catch(() => {});
  }, [slug]);

  const initialValues = useMemo(() => {
    const next: Record<string, string> = {};
    definition.fields.forEach((field) => { next[field.id] = ""; });
    return next;
  }, [definition.fields]);

  useEffect(() => {
    setValues(initialValues);
    setErrors({});
    setCaptcha(makeCaptcha());
    setCaptchaAnswer("");
    setSubmitted(false);
  }, [initialValues]);

  useEffect(() => {
    if (!submitted || !successRedirectHref) return;
    const timeout = window.setTimeout(() => {
      window.location.assign(successRedirectHref);
    }, successRedirectDelayMs);

    return () => window.clearTimeout(timeout);
  }, [submitted, successRedirectHref, successRedirectDelayMs]);

  const setField = (id: string, value: string) => setValues((prev) => ({ ...prev, [id]: value }));
  const setUploadError = (id: string, error?: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (error) next[id] = error;
      else delete next[id];
      return next;
    });
  };

  const uploadFile = async (field: FormFieldDef, file: File) => {
    if (file.size > MAX_UPLOAD_SIZE) {
      setUploadError(field.id, "File must be 10 MB or smaller");
      return;
    }

    setUploadingFields((prev) => ({ ...prev, [field.id]: true }));
    setUploadError(field.id);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(apiUrl("/api/public/form-upload"), { method: "POST", body: form });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setUploadError(field.id, body.error ?? "Upload failed");
        return;
      }
      setField(field.id, body.url);
    } catch {
      setUploadError(field.id, "Upload failed. Please try again.");
    } finally {
      setUploadingFields((prev) => ({ ...prev, [field.id]: false }));
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch(apiUrl(`/api/public/forms/${slug}/submit`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values,
          website,
          captchaA: captcha.a,
          captchaB: captcha.b,
          captchaAnswer,
          source,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(body.errors ?? { form: body.error ?? "Submission failed" });
        setCaptcha(makeCaptcha());
        setCaptchaAnswer("");
        return;
      }
      setSubmitted(true);
      onSuccess?.(values);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="px-8 py-10 flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">{definition.settings.successTitle}</h3>
        <p className="mb-6 text-sm leading-6 text-gray-500">{definition.settings.successMessage}</p>
        {successRedirectHref && <p className="text-xs font-semibold text-gray-400">Redirecting to home page...</p>}
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={submit}
      className={`${layout === "modal" ? "max-h-[64vh] overflow-y-auto" : ""} space-y-4 px-8 py-6`}
      noValidate
    >
      {showIntro && (
        <div>
          <h3 className="text-xl font-bold text-gray-900">{definition.settings.title}</h3>
          {definition.settings.shortDescription && <p className="mt-1 text-sm leading-6 text-gray-500">{definition.settings.shortDescription}</p>}
        </div>
      )}

      <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />

      {definition.fields.map((field) => (
        <FormField
          key={field.id}
          field={field}
          value={values[field.id] ?? ""}
          error={errors[field.id]}
          uploading={uploadingFields[field.id] === true}
          onChange={(value) => setField(field.id, value)}
          onFileSelect={(file) => uploadFile(field, file)}
        />
      ))}

      {definition.settings.antiSpamEnabled && (
        <div className="rounded-xl border border-orange-200 bg-orange-50/70 p-4">
          <div className="mb-3 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#F97316] shadow-sm">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900">
                Anti-spam verification <span className="text-red-500">*</span>
              </label>
              <p className="mt-1 text-xs leading-5 text-gray-600">
                Solve this simple calculation. The form will submit only when the correct answer is entered.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="flex h-12 items-center justify-center rounded-lg border border-orange-200 bg-white px-5 text-lg font-black text-[#0B1F4A] shadow-sm">
              {captcha.a} + {captcha.b} = ?
            </div>
            <input
              type="number"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              placeholder="Enter the answer"
              aria-label={`Answer for ${captcha.a} plus ${captcha.b}`}
              className="h-12 w-full rounded-lg border border-orange-200 bg-white px-3 text-sm outline-none transition-colors focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30"
            />
          </div>
          {errors.form && <p className="mt-1 text-xs text-red-500">{errors.form}</p>}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || Object.values(uploadingFields).some(Boolean)}
        className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-70"
        style={{ background: "linear-gradient(135deg, #F97316 0%, #0B1F4A 100%)" }}
      >
        {loading ? "Submitting..." : definition.settings.submitButtonText} {!loading && <ArrowRight className="h-4 w-4" />}
      </button>
    </motion.form>
  );
}

function FormField({
  field,
  value,
  error,
  uploading,
  onChange,
  onFileSelect,
}: {
  field: FormFieldDef;
  value: string;
  error?: string;
  uploading?: boolean;
  onChange: (value: string) => void;
  onFileSelect: (file: File) => void;
}) {
  const label = (
    <label className="mb-1 block text-sm font-medium text-gray-700">
      {field.label} {field.required && <span className="text-red-500">*</span>}
    </label>
  );
  const className = `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30 ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`;

  return (
    <div>
      {label}
      {field.type === "textarea" ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} rows={3} className={className} />
      ) : field.type === "select" ? (
        <div className="relative">
          <select value={value} onChange={(e) => onChange(e.target.value)} className={`${className} appearance-none pr-8`}>
            <option value="">{field.placeholder || `Select ${field.label}`}</option>
            {(field.options ?? []).map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        </div>
      ) : field.type === "file" ? (
        <div className={`rounded-lg border p-3 transition-colors ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 bg-white px-3 py-4 text-sm font-semibold text-gray-700 transition hover:border-[#F97316] hover:text-[#F97316]">
            <FileUp className="h-4 w-4" />
            {uploading ? "Uploading..." : value ? "Replace file" : field.placeholder || "Upload file"}
            <input
              type="file"
              accept={FILE_ACCEPT}
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (file) onFileSelect(file);
              }}
              className="hidden"
            />
          </label>
          <p className="mt-2 text-xs leading-5 text-gray-500">PNG, JPG, WEBP, GIF, PDF, DOC, or DOCX. Max 10 MB.</p>
          {value && (
            <div className="mt-2 flex items-center justify-between gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700">
              <a href={value} target="_blank" rel="noreferrer" className="truncate font-semibold underline underline-offset-2">
                Uploaded file
              </a>
              <button type="button" onClick={() => onChange("")} className="shrink-0 rounded-full p-1 hover:bg-green-100" aria-label={`Remove ${field.label}`}>
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <input type={field.type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} className={className} />
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
