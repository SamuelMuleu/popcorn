import type { Metadata } from "next";
import Link from "next/link";
import { MOVIE_GENRES, TV_GENRES, genreHref } from "@/lib/genres";

export const metadata: Metadata = {
  title: "Gêneros de filmes e séries",
  description:
    "Explore filmes e séries por gênero: ação, comédia, drama, terror, ficção científica, animação e mais. Entenda o que caracteriza cada um e veja os títulos mais populares.",
  alternates: { canonical: "/generos" },
};

function GenreList({ title, type, list }: { title: string; type: "movie" | "tv"; list: typeof MOVIE_GENRES }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((g) => (
          <li key={g.slug}>
            <Link
              href={genreHref(type, g.slug)}
              className="block h-full rounded-xl border border-white/10 bg-gray-900/60 p-5 hover:border-green-500/50"
            >
              <h3 className="text-lg font-semibold text-green-300">{g.name}</h3>
              <p className="mt-2 text-sm text-gray-300 line-clamp-3">{g.intro}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function GenresPage() {
  return (
    <div className="max-w-6xl mx-auto pt-6">
      <h1 className="text-3xl md:text-4xl font-black">Gêneros de filmes e séries</h1>
      <p className="mt-3 max-w-3xl text-gray-300">
        Gênero é um atalho para encontrar histórias parecidas com as que você já gosta. Em cada página explicamos o que
        caracteriza o gênero, damos uma dica para aproveitar melhor e listamos os títulos mais populares no momento.
      </p>
      <GenreList title="Filmes" type="movie" list={MOVIE_GENRES} />
      <GenreList title="Séries" type="tv" list={TV_GENRES} />
    </div>
  );
}
