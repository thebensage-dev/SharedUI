import { Fragment, type ReactNode } from "react";

// Draws rich text saved by the CMS (Payload's Lexical JSON): paragraphs, subheadings (h3, h4),
// bullet and numbered lists, quotes, bold, italic, inline code and links, which is all the CMS
// offers. Anything else falls back to its plain text.

type LexicalNode = {
  type: string;
  text?: string;
  format?: number | string;
  listType?: string;
  tag?: string;
  fields?: { url?: string; newTab?: boolean };
  children?: LexicalNode[];
};

/** Lexical's JSON, as Payload stores a rich text field. */
export type RichTextData = { root: { children?: unknown[] } };

const BOLD = 1;
const ITALIC = 2;
const CODE = 16;

function renderText(node: LexicalNode, key: number) {
  const format = typeof node.format === "number" ? node.format : 0;
  let out: ReactNode = node.text ?? "";
  if (format & CODE) out = <code className="code-badge">{out}</code>;
  if (format & ITALIC) out = <em>{out}</em>;
  if (format & BOLD) out = <strong className="font-semibold text-foreground">{out}</strong>;
  return <Fragment key={key}>{out}</Fragment>;
}

const renderChildren = (nodes: LexicalNode[] | undefined) => (nodes ?? []).map(renderNode);

function renderNode(node: LexicalNode, key: number): ReactNode {
  switch (node.type) {
    case "text":
      return renderText(node, key);
    case "linebreak":
      return <br key={key} />;
    case "link":
    case "autolink": {
      const url = node.fields?.url ?? "";
      // Only real web addresses, site paths and mail links: never javascript: or the like.
      if (!/^(https?:|mailto:|\/)/.test(url)) {
        return <Fragment key={key}>{renderChildren(node.children)}</Fragment>;
      }
      return (
        <a
          key={key}
          href={url}
          className="link"
          {...(node.fields?.newTab && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {renderChildren(node.children)}
        </a>
      );
    }
    case "list":
      return node.listType === "number" ? (
        <ol key={key} className="list-decimal space-y-2 pl-5">
          {renderChildren(node.children)}
        </ol>
      ) : (
        <ul key={key} className="list-disc space-y-2 pl-5">
          {renderChildren(node.children)}
        </ul>
      );
    case "listitem":
      return <li key={key}>{renderChildren(node.children)}</li>;
    case "heading":
      return node.tag === "h4" ? (
        <h4 key={key} className="font-semibold text-foreground">
          {renderChildren(node.children)}
        </h4>
      ) : (
        <h3 key={key} className="title-card text-foreground">
          {renderChildren(node.children)}
        </h3>
      );
    case "quote":
      return (
        <blockquote key={key} className="border-l-4 border-border pl-4 italic">
          {renderChildren(node.children)}
        </blockquote>
      );
    case "paragraph":
      return <p key={key}>{renderChildren(node.children)}</p>;
    default:
      return <Fragment key={key}>{renderChildren(node.children)}</Fragment>;
  }
}

/** Rich text from the CMS, in a `div` with `className`. Nothing when there's no text. */
export function RichText({
  data,
  className,
}: {
  data: RichTextData | null | undefined;
  className?: string;
}) {
  if (!data) return null;
  return <div className={className}>{renderChildren(data.root.children as LexicalNode[])}</div>;
}
