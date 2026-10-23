import type { MetadataRoute } from "next";
import { ARTICLES } from "@/content/articles";
import { MOVIE_GENRES, TV_GENRES, genreHref } from "@/lib/genres";
import { SITE_URL } from "@/lib/site";
import { getPopularMovies, getPopularSeries, getTopRatedMovies, getTopRatedSeries } from "@/lib/tmdb";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const u = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], lastModified: Date = now) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  const staticPages = [
    u("/", 1, "daily"),
    u("/movies", 0.9, "daily"),
    u("/generos", 0.8, "weekly"),
    u("/artigos", 0.8, "weekly"),
    u("/about", 0.4, "yearly"),
    u("/contact", 0.3, "yearly"),
    u("/privacy", 0.2, "yearly"),
    u("/terms", 0.2, "yearly"),
  ];

  const articles = ARTICLES.map((a) =>
    u(`/artigos/${a.slug}`, 0.8, "monthly", new Date(`${a.updatedAt || a.publishedAt}T12:00:00`))
  );

  const genres = [
    ...MOVIE_GENRES.map((g) => u(genreHref("movie", g.slug), 0.7, "weekly")),
    ...TV_GENRES.map((g) => u(genreHref("tv", g.slug), 0.7, "weekly")),
  ];

  // Títulos populares e mais bem avaliados (os que mais recebem buscas)
  const pages = [1, 2, 3, 4, 5];
  const lists = await Promise.all([
    ...pages.map((p) => getPopularMovies(p).then((r) => r.map((m) => `/details/movie/${m.id}`))),
    ...pages.map((p) => getTopRatedMovies(p).then((r) => r.map((m) => `/details/movie/${m.id}`))),
    ...pages.slice(0, 3).map((p) => getPopularSeries(p).then((r) => r.map((m) => `/details/tv/${m.id}`))),
    ...pages.slice(0, 3).map((p) => getTopRatedSeries(p).then((r) => r.map((m) => `/details/tv/${m.id}`))),
  ]);
  // Filmes citados nos artigos
  const fromArticles = ARTICLES.flatMap((a) => [...a.body.matchAll(/\/details\/(movie|tv)\/\d+/g)].map((m) => m[0]));

  const details = [...new Set([...lists.flat(), ...fromArticles])].map((path) => u(path, 0.6, "weekly"));

  return [...staticPages, ...articles, ...genres, ...details];
}
