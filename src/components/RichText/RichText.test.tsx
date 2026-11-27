import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RichText } from "./RichText.tsx";

const text = (t: string, format = 0) => ({ type: "text", text: t, format });
const doc = (...children: unknown[]) => ({ root: { children } });

describe("RichText", () => {
  it("draws paragraphs, lists, bold, code and safe links", () => {
    render(
      <RichText
        data={doc(
          {
            type: "paragraph",
            children: [text("Hello "), text("bold", 1), text(" and "), text("code", 16)],
          },
          {
            type: "list",
            listType: "bullet",
            children: [{ type: "listitem", children: [text("One")] }],
          },
          {
            type: "paragraph",
            children: [
              {
                type: "link",
                fields: { url: "https://example.com", newTab: true },
                children: [text("Site")],
              },
            ],
          },
          {
            type: "paragraph",
            children: [
              { type: "link", fields: { url: "javascript:alert(1)" }, children: [text("Bad")] },
            ],
          },
        )}
      />,
    );
    expect(screen.getByText("bold").tagName).toBe("STRONG");
    expect(screen.getByText("code").tagName).toBe("CODE");
    expect(screen.getByRole("listitem")).toHaveTextContent("One");
    expect(screen.getByRole("link", { name: "Site" })).toHaveAttribute("target", "_blank");
    expect(screen.queryByRole("link", { name: "Bad" })).toBeNull();
    expect(screen.getByText("Bad")).toBeInTheDocument();
  });

  it("draws subheadings, italics and quotes", () => {
    render(
      <RichText
        data={doc(
          { type: "heading", tag: "h3", children: [text("Sub")] },
          { type: "heading", tag: "h4", children: [text("Smaller")] },
          { type: "quote", children: [text("Quoted")] },
          { type: "paragraph", children: [text("slanted", 2)] },
        )}
      />,
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Sub");
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("Smaller");
    expect(screen.getByText("Quoted").tagName).toBe("BLOCKQUOTE");
    expect(screen.getByText("slanted").tagName).toBe("EM");
  });

  it("draws nothing without text", () => {
    const { container } = render(<RichText data={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
