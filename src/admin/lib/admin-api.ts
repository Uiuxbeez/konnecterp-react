import { apiUrl } from "@/lib/api-base";
import type { MenuGroup } from "@/lib/nav";
import type { SiteSettings } from "@shared/site-settings";

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
  template: string;
  path: string;
  updatedAt: string;
}

export interface PageTemplateInfo {
  key: string;
  name: string;
  description: string;
}

export interface AdminBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  tags: string[];
  author: string;
  status: "draft" | "published";
  publishedAt: string;
  updatedAt: string;
}

export type BlogPostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  tags: string[];
  author: string;
  status: "draft" | "published";
  publishedAt: string;
};

export interface AdminFormField {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface AdminForm {
  id: number;
  slug: string;
  name: string;
  fields: AdminFormField[];
  settings: {
    title: string;
    shortDescription: string;
    submitButtonText: string;
    successTitle: string;
    successMessage: string;
    antiSpamEnabled: boolean;
  };
}

export interface AdminLead {
  id: number;
  formId: number | null;
  formSlug: string;
  formName: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  data: Record<string, unknown>;
  source: string;
  createdAt: string;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(apiUrl(path), {
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

  listPages: () => request<{ pages: AdminPage[]; templates: PageTemplateInfo[] }>("/api/admin/pages"),
  createPage: (data: { title: string; slug: string; template: string }) =>
    request<AdminPage>("/api/admin/pages", { method: "POST", body: JSON.stringify(data) }),
  deletePage: (slug: string) => request<void>(`/api/admin/pages/${slug}`, { method: "DELETE" }),

  getNavigation: () => request<{ navigation: MenuGroup[] }>("/api/admin/navigation"),
  updateNavigation: (navigation: MenuGroup[]) =>
    request<{ navigation: MenuGroup[] }>("/api/admin/navigation", { method: "PATCH", body: JSON.stringify({ navigation }) }),

  getSettings: () => request<{ settings: SiteSettings }>("/api/admin/settings"),
  updateSettings: (settings: SiteSettings) =>
    request<{ settings: SiteSettings }>("/api/admin/settings", { method: "PATCH", body: JSON.stringify({ settings }) }),

  listBlogPosts: () => request<{ posts: AdminBlogPost[] }>("/api/admin/blog-posts"),
  getBlogPost: (id: number) => request<AdminBlogPost>(`/api/admin/blog-posts/${id}`),
  createBlogPost: (data: BlogPostInput) =>
    request<AdminBlogPost>("/api/admin/blog-posts", { method: "POST", body: JSON.stringify(data) }),
  updateBlogPost: (id: number, data: Partial<BlogPostInput>) =>
    request<AdminBlogPost>(`/api/admin/blog-posts/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteBlogPost: (id: number) => request<void>(`/api/admin/blog-posts/${id}`, { method: "DELETE" }),

  listForms: () => request<{ forms: AdminForm[] }>("/api/admin/forms"),
  createForm: (data: {
    slug: string;
    name: string;
    title: string;
    shortDescription: string;
    submitButtonText: string;
    successTitle: string;
    successMessage: string;
    antiSpamEnabled: boolean;
    fields: AdminFormField[];
  }) => request<AdminForm>("/api/admin/forms", { method: "POST", body: JSON.stringify(data) }),
  updateForm: (id: number, data: Partial<{
    slug: string;
    name: string;
    title: string;
    shortDescription: string;
    submitButtonText: string;
    successTitle: string;
    successMessage: string;
    antiSpamEnabled: boolean;
    fields: AdminFormField[];
  }>) => request<AdminForm>(`/api/admin/forms/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteForm: (id: number) => request<void>(`/api/admin/forms/${id}`, { method: "DELETE" }),
  listLeads: () => request<{ leads: AdminLead[] }>("/api/admin/leads"),

  upload: async (file: File): Promise<{ url: string }> => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(apiUrl("/api/admin/upload"), { method: "POST", credentials: "include", body: form });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new ApiError(res.status, body.error ?? "Upload failed");
    }
    return res.json();
  },
};

export { ApiError };
