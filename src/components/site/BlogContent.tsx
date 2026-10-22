import DOMPurify from "dompurify";

export function BlogContent({ content }: { content: string }) {
  if (!/<[a-z][\s\S]*>/i.test(content)) {
    return <>{content.split(/\n\s*\n/).filter(p => p.trim()).map((p, i) => <p key={i}>{p.trim()}</p>)}</>;
  }
  const html = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ["p", "br", "hr", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "b", "em", "i", "u", "s", "del", "blockquote", "ul", "ol", "li", "a", "img", "figure", "figcaption", "pre", "code", "table", "thead", "tbody", "tr", "th", "td", "div", "span", "sup", "sub"],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "width", "height", "colspan", "rowspan"],
    ALLOW_DATA_ATTR: false,
  });
  return <div className="[&_img]:max-w-full [&_img]:h-auto [&_table]:block [&_table]:overflow-x-auto [&_a]:underline" dangerouslySetInnerHTML={{ __html: html }} />;
}
