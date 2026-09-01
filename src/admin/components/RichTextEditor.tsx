import { useEffect, useRef } from "react";
import { Bold, Eraser, Italic, Link, List, ListOrdered, Unlink } from "lucide-react";
import { Button } from "@/components/ui/button";

function hasHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

function hasEscapedHtml(value: string) {
  return /&lt;\/?[a-z][\s\S]*?&gt;/i.test(value);
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&amp;/gi, "&");
}

function textToHtml(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line || "<br>")
    .join("<br>");
}

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const lastValueRef = useRef("");

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || value === lastValueRef.current) return;
    const html = hasEscapedHtml(value) ? decodeHtmlEntities(value) : hasHtml(value) ? value : textToHtml(value);
    editor.innerHTML = html;
    lastValueRef.current = value;
  }, [value]);

  const sync = () => {
    const html = editorRef.current?.innerHTML ?? "";
    lastValueRef.current = html;
    onChange(html);
  };

  const command = (name: string, commandValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(name, false, commandValue);
    sync();
  };

  const setBlock = (block: string) => {
    command("formatBlock", block);
  };

  const addLink = () => {
    const href = window.prompt("Enter link URL");
    if (!href?.trim()) return;
    command("createLink", href.trim());
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const plainText = event.clipboardData.getData("text/plain");
    if (!hasHtml(plainText) && !hasEscapedHtml(plainText)) return;

    event.preventDefault();
    const html = hasEscapedHtml(plainText) ? decodeHtmlEntities(plainText) : plainText;
    document.execCommand("insertHTML", false, html);
    sync();
  };

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2">
        <select
          aria-label="Text style"
          defaultValue="p"
          onChange={(e) => setBlock(e.target.value)}
          className="h-8 rounded-md border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-700 outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
        >
          <option value="p">Paragraph</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>
        <ToolbarButton label="Bold" onClick={() => command("bold")}>
          <Bold className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton label="Italic" onClick={() => command("italic")}>
          <Italic className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton label="Add Link" onClick={addLink}>
          <Link className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton label="Remove Link" onClick={() => command("unlink")}>
          <Unlink className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton label="Bullet List" onClick={() => command("insertUnorderedList")}>
          <List className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton label="Numbered List" onClick={() => command("insertOrderedList")}>
          <ListOrdered className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton label="Clear Formatting" onClick={() => command("removeFormat")}>
          <Eraser className="h-3.5 w-3.5" />
        </ToolbarButton>
      </div>
      <div
        ref={editorRef}
        contentEditable
        role="textbox"
        aria-multiline="true"
        onInput={sync}
        onBlur={sync}
        onPaste={handlePaste}
        className="min-h-32 px-3 py-2.5 text-sm leading-6 text-slate-800 outline-none empty:before:text-slate-400 empty:before:content-['Start_typing...'] [&_a]:font-semibold [&_a]:text-[#F97316] [&_a]:underline [&_a]:underline-offset-4 [&_h1]:mb-4 [&_h1]:mt-5 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-bold [&_h4]:mb-2 [&_h4]:mt-4 [&_h4]:text-base [&_h4]:font-bold [&_h5]:mb-2 [&_h5]:mt-3 [&_h5]:text-sm [&_h5]:font-bold [&_h6]:mb-2 [&_h6]:mt-3 [&_h6]:text-xs [&_h6]:font-bold [&_h6]:uppercase [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_section]:my-3 [&_ul]:list-disc [&_ul]:pl-5"
        suppressContentEditableWarning
      />
    </div>
  );
}

function ToolbarButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button type="button" variant="ghost" size="icon" title={label} aria-label={label} onClick={onClick} className="h-8 w-8">
      {children}
    </Button>
  );
}
