import { apiUrl } from "./api-base";

export interface BlogListItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  tags: string[];
  author: string;
  publishedAt: string;
}

export interface BlogPost extends BlogListItem {
  content: string;
  status: string;
  updatedAt: string;
}

export interface BlogListResponse {
  posts: BlogListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogMeta {
  tags: { name: string; count: number }[];
  archives: { year: number; month: number; label: string; count: number }[];
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(apiUrl(path));
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export const blogApi = {
  list: (page: number, tag?: string) =>
    get<BlogListResponse>(`/api/public/blog-posts?page=${page}${tag ? `&tag=${encodeURIComponent(tag)}` : ""}`),
  getBySlug: (slug: string) => get<{ post: BlogPost; related: BlogListItem[] }>(`/api/public/blog-posts/${slug}`),
  meta: () => get<BlogMeta>("/api/public/blog-posts/meta"),
};
