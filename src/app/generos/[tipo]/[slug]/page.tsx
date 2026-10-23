import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { PosterGrid } from "@/components/PosterCard";
import { AD_SLOTS } from "@/lib/adsense";
import { MOVIE_GENRES, TV_GENRES, findGenre, genreHref, genresFor } from "@/lib/genres";
import { toPosters } from "@/lib/poster";
import { SITE_URL } from "@/lib/site";
import { type MediaType, discoverByGenre } from "@/lib/tmdb";
import { ARTICLES } from "@/content/articles";

export const revalidate = 86400;

type Params = Promise<{ tipo: string; slug: string }>;

const typeFromParam = (tipo: string): MediaType | null => (tipo === "filmes" ? "movie" : tipo === "series" ? "tv" : null);

export function generateStaticParams() {
  return [
    ...MOVIE_GENRES.map((g) => ({ tipo: "filmes", slug: g.slug })),
    ...TV_GENRES.map((g) => ({ tipo: "series", slug: g.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { tipo, slug } = await params;
  const type = typeFromParam(tipo);
  const g = type && findGenre(type, slug);
  if (!type || !g) return { title: "Gênero não encontrado", robots: { index: false } };
  const label = type === "movie" ? "Filmes" : "Séries";
  return {
    title: `${label} de ${g.name.toLowerCase()}: os mais populares e onde assistir`,
    description: g.intro.slice(0, 155),
    alternates: { canonical: genreHref(type, g.slug) },
  };
}

export default async function GenrePage({ params }: { params: Params }) {
  const { tipo, slug } = await params;
  const type = typeFromParam(tipo);
  const g = type && findGenre(type, slug);
  if (!type || !g) notFound();

  const [p1, p2] = await Promise.all([discoverByGenre(type, g.id, 1), discoverByGenre(type, g.id, 2)]);
  const items = toPosters([...p1, ...p2], type, 36);
  const label = type === "movie" ? "Filmes" : "Séries";
  const others = genresFor(type).filter((x) => x.slug !== g.slug);
  const related = ARTICLES.filter((a) => a.body.includes(genreHref(type, g.slug))).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto pt-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${label} de ${g.name}`,
          url: `${SITE_URL}${genreHref(type, g.slug)}`,
          description: g.intro,
          inLanguage: "pt-BR",
        }}
      />
      <nav aria-label="Você está em" className="text-xs text-gray-400">
        <Link href="/" className="hover:text-white">Início</Link> ›{" "}
        <Link href="/generos" className="hover:text-white">Gêneros</Link> › <span className="text-gray-300">{g.name}</span>
      </nav>

      <header className="mt-3 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black">
          {label} de {g.name.toLowerCase()}
        </h1>
        <p className="mt-3 text-gray-300 text-lg">{g.intro}</p>
        <p className="mt-3 rounded-lg border-l-4 border-green-500 bg-green-900/20 p-3 text-sm text-gray-200">
          <strong className="text-green-300">Dica do Popcorn:</strong> {g.tip}
        </p>
      </header>

      <section className="mt-8" aria-labelledby="populares">
        <h2 id="populares" className="text-2xl font-bold mb-4">
          {label} de {g.name.toLowerCase()} mais populares
        </h2>
        {items.length ? (
          <PosterGrid items={items} />
        ) : (
          <p className="text-gray-400">Não conseguimos carregar a lista agora. Tente novamente em alguns minutos.</p>
        )}
      </section>

      <AdSlot slot={AD_SLOTS.genre} />

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-3">Leia também</h2>
          <ul className="space-y-2">
            {related.map((a) => (
              <li key={a.slug}>
                <Link href={`/artigos/${a.slug}`} className="text-green-400 hover:underline">{a.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 mb-6">
        <h2 className="text-xl font-bold mb-3">Outros gêneros de {label.toLowerCase()}</h2>
        <ul className="flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={genreHref(type, o.slug)}
                className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm hover:border-green-400 hover:text-green-300"
              >
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
