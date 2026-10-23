import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import Markdown from "@/components/Markdown";
import { AD_SLOTS } from "@/lib/adsense";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { formatDateBR } from "@/lib/tmdb";
import { ARTICLES, getArticle, readingMinutes } from "@/content/articles";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/artigos/${a.slug}` },
    authors: [{ name: a.author }],
    openGraph: {
      type: "article",
      title: a.title,
      description: a.description,
      url: `/artigos/${a.slug}`,
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt || a.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  // Anúncio no meio do texto: divide o corpo antes da seção que fica mais perto da metade
  const sections = a.body.trim().split(/\n(?=## )/);
  const middle = Math.max(1, Math.floor(sections.length / 2));
  const firstHalf = sections.slice(0, middle).join("\n");
  const secondHalf = sections.slice(middle).join("\n");
  const others = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 4);

  return (
    <article className="max-w-3xl mx-auto pt-6 text-gray-200">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.description,
          datePublished: a.publishedAt,
          dateModified: a.updatedAt || a.publishedAt,
          inLanguage: "pt-BR",
          author: { "@type": "Organization", name: a.author },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          mainEntityOfPage: `${SITE_URL}/artigos/${a.slug}`,
        }}
      />
      <nav aria-label="Você está em" className="text-xs text-gray-400">
        <Link href="/" className="hover:text-white">Início</Link> ›{" "}
        <Link href="/artigos" className="hover:text-white">Artigos</Link> › <span className="text-gray-300">{a.category}</span>
      </nav>

      <header className="mt-3 mb-8">
        <p className="text-xs uppercase tracking-wide text-green-400">{a.category}</p>
        <h1 className="mt-1 text-3xl md:text-4xl font-black leading-tight text-white">{a.title}</h1>
        <p className="mt-3 text-lg text-gray-300">{a.description}</p>
        <p className="mt-3 text-sm text-gray-400">
          Por {a.author} · <time dateTime={a.publishedAt}>{formatDateBR(a.publishedAt)}</time>
          {a.updatedAt && a.updatedAt !== a.publishedAt && (
            <> · atualizado em <time dateTime={a.updatedAt}>{formatDateBR(a.updatedAt)}</time></>
          )}{" "}
          · {readingMinutes(a.body)} min de leitura
        </p>
      </header>

      <Markdown source={firstHalf} />
      {secondHalf && (
        <>
          <AdSlot slot={AD_SLOTS.article} />
          <Markdown source={secondHalf} />
        </>
      )}

      <aside className="mt-12 border-t border-white/10 pt-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">Continue lendo</h2>
        <ul className="space-y-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/artigos/${o.slug}`} className="text-green-400 hover:underline">{o.title}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </article>
  );
}
