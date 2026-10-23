import Link from "next/link";
import { Fragment, type ReactNode } from "react";

// Renderizador mínimo para o texto dos artigos (sem HTML cru, sem dependências).
// Suporta: ## / ### títulos, parágrafos, listas "- " e "1. ", **negrito** e [texto](url).

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(<strong key={k++}>{m[1]}</strong>);
    } else {
      const href = m[3];
      out.push(
        href.startsWith("/") ? (
          <Link key={k++} href={href}>{m[2]}</Link>
        ) : (
          <a key={k++} href={href} target="_blank" rel="noopener noreferrer">{m[2]}</a>
        )
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export const slugify = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\s*\n/);
  return (
    <div className="prose-popcorn">
      {blocks.map((block, i) => {
        const b = block.trim();
        if (b.startsWith("### ")) return <h3 key={i}>{inline(b.slice(4))}</h3>;
        if (b.startsWith("## ")) {
          const t = b.slice(3);
          return <h2 key={i} id={slugify(t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"))}>{inline(t)}</h2>;
        }
        const lines = b.split("\n").map((l) => l.trim());
        if (lines.every((l) => l.startsWith("- ")))
          return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}</ul>;
        if (lines.every((l) => /^\d+\.\s/.test(l)))
          return <ol key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\d+\.\s/, ""))}</li>)}</ol>;
        return <p key={i}>{lines.map((l, j) => <Fragment key={j}>{j > 0 && " "}{inline(l)}</Fragment>)}</p>;
      })}
    </div>
  );
}
