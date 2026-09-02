import { useEffect, useState } from "react";
import { Mail, Paperclip, Phone, User } from "lucide-react";
import { AdminShell } from "../components/AdminShell";
import { adminApi, type AdminLead } from "../lib/admin-api";
import { Spinner } from "@/components/ui/spinner";

function getLeadFiles(data: Record<string, unknown>) {
  return Object.entries(data).flatMap(([key, value]) => {
    if (typeof value !== "string" || !value.includes("/uploads/forms/")) return [];
    return [{ key, url: value }];
  });
}

export default function LeadsList() {
  const [leads, setLeads] = useState<AdminLead[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi.listLeads()
      .then((res) => setLeads(res.leads))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load leads"));
  }, []);

  return (
    <AdminShell>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div>
          <h1 className="text-sm font-bold text-slate-900">Leads</h1>
          <p className="text-xs text-slate-400">Website form submissions</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl">
          {error && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
          {!leads && !error && <div className="flex justify-center py-16"><Spinner /></div>}
          {leads && leads.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
              No leads yet.
            </div>
          )}
          {leads && leads.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Lead</th>
                    <th className="px-5 py-3">Form</th>
                    <th className="px-5 py-3">Details</th>
                    <th className="px-5 py-3">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => {
                    const files = getLeadFiles(lead.data);
                    return (
                      <tr key={lead.id} className="border-b border-slate-50 align-top last:border-0">
                        <td className="px-5 py-4">
                          <p className="flex items-center gap-2 font-bold text-slate-900"><User className="h-4 w-4 text-orange-500" /> {lead.name || "Unnamed Lead"}</p>
                          {lead.company && <p className="mt-1 text-xs text-slate-500">{lead.company}</p>}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-medium text-slate-800">{lead.formName}</p>
                          <p className="mt-1 text-xs text-slate-400">{lead.source}</p>
                        </td>
                        <td className="px-5 py-4">
                          {lead.email && <p className="flex items-center gap-2 text-slate-600"><Mail className="h-3.5 w-3.5 text-slate-400" /> {lead.email}</p>}
                          {lead.phone && <p className="mt-1 flex items-center gap-2 text-slate-600"><Phone className="h-3.5 w-3.5 text-slate-400" /> {lead.phone}</p>}
                          {files.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {files.map((file) => (
                                <a
                                  key={`${lead.id}-${file.key}`}
                                  href={file.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center gap-1.5 text-xs font-semibold text-primary underline underline-offset-2"
                                >
                                  <Paperclip className="h-3.5 w-3.5" />
                                  Download {file.key}
                                </a>
                              ))}
                            </div>
                          )}
                          <details className="mt-2">
                            <summary className="cursor-pointer text-xs font-semibold text-primary">View all fields</summary>
                            <pre className="mt-2 max-w-md overflow-auto rounded-lg bg-slate-50 p-3 text-xs text-slate-600">{JSON.stringify(lead.data, null, 2)}</pre>
                          </details>
                        </td>
                        <td className="px-5 py-4 text-slate-500">{new Date(lead.createdAt).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </AdminShell>
  );
}
