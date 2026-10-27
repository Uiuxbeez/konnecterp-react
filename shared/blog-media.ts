import files from './blog-media-manifest.json';

const available = new Set(files);
export function blogMediaUrl(value: string): string {
  try {
    const url = new URL(value);
    if (!['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) return value;
    const marker = '/wp-content/uploads/';
    const index = url.pathname.indexOf(marker);
    if (index < 0) return value;
    const relative = decodeURIComponent(url.pathname.slice(index + marker.length));
    if (!available.has(relative)) return value;
    return '/blog-media/' + relative.split('/').map(encodeURIComponent).join('/') + url.search + url.hash;
  } catch { return value; }
}

export function normalizeBlogMedia<T extends { featuredImage: string; content?: string }>(post: T): T {
  return {
    ...post,
    featuredImage: blogMediaUrl(post.featuredImage),
    ...(typeof post.content === 'string' ? {
      content: post.content.replace(/https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?\/[^\s"'<>]+/gi, blogMediaUrl),
    } : {}),
  };
}
