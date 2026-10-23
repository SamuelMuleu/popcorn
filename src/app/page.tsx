import type { Metadata } from "next";
import Link from "next/link";
import LoginCta from "@/components/LoginCta";
import AdSlot from "@/components/AdSlot";
import { PosterRow } from "@/components/PosterCard";
import { AD_SLOTS } from "@/lib/adsense";
import { MOVIE_GENRES, genreHref } from "@/lib/genres";
import { ARTICLES } from "@/content/articles";
import { toPosters } from "@/lib/poster";
import { getNowPlaying, getPopularMovies, getTopRatedSeries, getTrending } from "@/lib/tmdb";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [trending, nowPlaying, popular, topSeries] = await Promise.all([
    getTrending(),
    getNowPlaying(),
    getPopularMovies(),
    getTopRatedSeries(),
  ]);
  const latestArticles = [...ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto text-white">
      {/* Apresentação */}
      <section className="py-10 md:py-16 text-center md:text-left md:max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-black leading-tight">
          Descubra filmes e séries e saiba <span className="text-green-400">onde assistir</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          O Popcorn é um guia em português para quem gosta de cinema e séries: sinopses, elenco, trailers, notas e os
          serviços de streaming em que cada título está disponível no Brasil. Leia nossos guias, explore por gênero e
          organize o que você já assistiu.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
          <Link href="/search" className="inline-flex rounded-xl bg-green-600 px-6 py-3 font-bold hover:bg-green-500">
            Buscar um título
          </Link>
          <LoginCta />
        </div>
      </section>

      <PosterRow title="Em alta esta semana" items={toPosters(trending, "movie")} withActions />
      <PosterRow title="Em cartaz nos cinemas" href="/movies" items={toPosters(nowPlaying, "movie")} withActions />

      <AdSlot slot={AD_SLOTS.home} />

      <PosterRow title="Filmes populares" href="/movies" items={toPosters(popular, "movie")} withActions />
      <PosterRow title="Séries mais bem avaliadas" href="/movies#series" items={toPosters(topSeries, "tv")} withActions />

      {/* Gêneros */}
      <section className="mt-12">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-xl md:text-2xl font-bold">Explore por gênero</h2>
          <Link href="/generos" className="text-sm text-green-400 hover:text-green-300">Todos os gêneros →</Link>
        </div>
        <ul className="flex flex-wrap gap-2">
          {MOVIE_GENRES.map((g) => (
            <li key={g.slug}>
              <Link
                href={genreHref("movie", g.slug)}
                className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm hover:border-green-400 hover:text-green-300"
              >
                {g.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Artigos */}
      <section className="mt-12">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-xl md:text-2xl font-bold">Guias e listas</h2>
          <Link href="/artigos" className="text-sm text-green-400 hover:text-green-300">Todos os artigos →</Link>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {latestArticles.map((a) => (
            <li key={a.slug} className="rounded-xl border border-white/10 bg-gray-900/60 p-5 hover:border-green-500/50">
              <h3 className="text-lg font-semibold leading-snug">
                <Link href={`/artigos/${a.slug}`} className="hover:text-green-300">{a.title}</Link>
              </h3>
              <p className="mt-2 text-sm text-gray-400 line-clamp-3">{a.description}</p>
              <p className="mt-3 text-xs text-gray-500">{a.category} · por {a.author}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* O que dá para fazer */}
      <section className="mt-12 mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-gray-900/60 p-5">
          <h2 className="font-semibold text-lg">Onde assistir</h2>
          <p className="mt-2 text-sm text-gray-300">
            Cada filme e série mostra em quais serviços de streaming, aluguel ou compra ele está disponível no Brasil.
          </p>
        </div>
        <div className="rounded-xl bg-gray-900/60 p-5">
          <h2 className="font-semibold text-lg">Suas listas</h2>
          <p className="mt-2 text-sm text-gray-300">
            Entre com sua conta Google para salvar favoritos, marcar o que já viu e acompanhar episódios de séries.
          </p>
        </div>
        <div className="rounded-xl bg-gray-900/60 p-5">
          <h2 className="font-semibold text-lg">Comunidade</h2>
          <p className="mt-2 text-sm text-gray-300">
            Comente filmes, séries e episódios e veja o que outras pessoas acharam antes de dar play.
          </p>
        </div>
      </section>
    </div>
  );
}
