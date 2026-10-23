import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES, readingMinutes } from "@/content/articles";
import { formatDateBR } from "@/lib/tmdb";

export const metadata: Metadata = {
  title: "Artigos, guias e listas sobre filmes e séries",
  description:
    "Guias práticos, listas comentadas e explicações sobre cinema e séries: filmes brasileiros essenciais, clássicos, classificação indicativa, notas de avaliação e mais.",
  alternates: { canonical: "/artigos" },
};

export default function ArticlesPage() {
  const list = [...ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <div className="max-w-4xl mx-auto pt-6">
      <h1 className="text-3xl md:text-4xl font-black">Artigos e guias</h1>
      <p className="mt-3 text-gray-300">
        Textos de Samuel Muleu, criador do Popcorn, para ajudar você a escolher melhor o que assistir, entender o
        cinema e aproveitar mais as séries.
      </p>

      <ul className="mt-8 space-y-4">
        {list.map((a) => (
          <li key={a.slug}>
            <article className="rounded-xl border border-white/10 bg-gray-900/60 p-5 hover:border-green-500/50">
              <h2 className="text-xl font-semibold leading-snug">
                <Link href={`/artigos/${a.slug}`} className="hover:text-green-300">{a.title}</Link>
              </h2>
              <p className="mt-2 text-gray-300">{a.description}</p>
              <p className="mt-3 text-xs text-gray-400">
                {a.category} · {readingMinutes(a.body)} min de leitura · <time dateTime={a.publishedAt}>{formatDateBR(a.publishedAt)}</time> · {a.author}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
