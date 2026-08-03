export interface AdminSection {
  id: number;
  pageId: number;
  type: string;
  name: string;
  position: number;
  enabled: boolean;
  content: Record<string, unknown>;
  publishedContent: Record<string, unknown> | null;
  updatedAt: string;
}

export interface AdminPage {
  id: number;
  slug: string;
  title: string;
  updatedAt: string;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: "include",
    headers: init?.body ? { "Content-Type": "application/json" } : undefined,
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.error ?? `Request failed (${res.status})`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const adminApi = {
  login: (username: string, password: string) =>
    request<{ username: string }>("/api/auth/login", { method: "POST", body: JSON.stringify({ username, password }) }),
  logout: () => request<void>("/api/auth/logout", { method: "POST" }),
  me: () => request<{ username: string }>("/api/auth/me"),

  getSections: (slug: string) => request<{ page: AdminPage; sections: AdminSection[] }>(`/api/admin/pages/${slug}/sections`),
  updateSection: (id: number, patch: Partial<Pick<AdminSection, "content" | "name" | "enabled">>) =>
    request<AdminSection>(`/api/admin/sections/${id}`, { method: "PATCH", body: JSON.stringify(patch) }),
  reorder: (slug: string, order: { id: number; position: number }[]) =>
    request<{ sections: AdminSection[] }>(`/api/admin/pages/${slug}/reorder`, { method: "POST", body: JSON.stringify({ order }) }),
  publish: (slug: string) => request<{ published: boolean; publishedAt: string }>(`/api/admin/pages/${slug}/publish`, { method: "POST" }),

  upload: async (file: File): Promise<{ url: string }> => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", credentials: "include", body: form });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new ApiError(res.status, body.error ?? "Upload failed");
    }
    return res.json();
  },
};

export { ApiError };
