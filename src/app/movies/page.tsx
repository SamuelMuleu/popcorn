import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import { PosterRow } from "@/components/PosterCard";
import { AD_SLOTS } from "@/lib/adsense";
import { toPosters } from "@/lib/poster";
import { getNowPlaying, getPopularMovies, getPopularSeries, getTopRatedMovies, getTopRatedSeries } from "@/lib/tmdb";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Filmes e séries populares: o que está em alta",
  description:
    "Veja os filmes mais populares, os lançamentos em cartaz nos cinemas e as séries mais bem avaliadas, com sinopse, elenco e onde assistir no Brasil.",
  alternates: { canonical: "/movies" },
};

export default async function MoviesPage() {
  const [popular, topSeries, nowPlaying, topMovies, popularSeries] = await Promise.all([
    getPopularMovies(),
    getTopRatedSeries(),
    getNowPlaying(),
    getTopRatedMovies(),
    getPopularSeries(),
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="pt-6 md:max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black">Filmes e séries populares</h1>
        <p className="mt-3 text-gray-300">
          Uma seleção atualizada diariamente com o que mais está sendo procurado. Clique em qualquer título para ver
          sinopse, elenco, trailer e em quais serviços ele está disponível no Brasil. Se preferir, navegue pelos{" "}
          <Link href="/generos" className="text-green-400 underline underline-offset-2">gêneros</Link> ou leia os{" "}
          <Link href="/artigos" className="text-green-400 underline underline-offset-2">guias e listas</Link>.
        </p>
      </header>

      <PosterRow title="Filmes populares" items={toPosters(popular, "movie")} withActions />
      <PosterRow id="series" title="Séries mais bem avaliadas" items={toPosters(topSeries, "tv")} withActions />

      <AdSlot slot={AD_SLOTS.movies} />

      <PosterRow title="Em cartaz nos cinemas" items={toPosters(nowPlaying, "movie")} withActions />
      <PosterRow title="Filmes mais bem avaliados" items={toPosters(topMovies, "movie")} withActions />
      <PosterRow title="Séries populares agora" items={toPosters(popularSeries, "tv")} withActions />
    </div>
  );
}
