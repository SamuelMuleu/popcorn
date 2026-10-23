// Cliente do TMDB para uso no SERVIDOR (páginas renderizadas, sitemap, metadata).
// Com isso o HTML já chega pronto para o Google e para o revisor do AdSense.
import "server-only";

const API = "https://api.themoviedb.org/3";
const KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY || "";

export const IMG = (path: string | null | undefined, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export type MediaType = "movie" | "tv";

export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
  media_type?: MediaType | "person";
}

export interface Paged<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character?: string;
  profile_path: string | null;
  order?: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface WatchProviders {
  link?: string;
  flatrate?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
}

export interface Video {
  key: string;
  site: string;
  type: string;
  official?: boolean;
  name?: string;
}

export interface Season {
  id: number;
  season_number: number;
  name: string;
  episode_count: number;
  overview: string;
  poster_path: string;
  air_date?: string;
}

export interface MediaDetail extends MediaItem {
  genres: Genre[];
  runtime?: number;
  episode_run_time?: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  status?: string;
  tagline?: string;
  original_language?: string;
  production_countries?: { iso_3166_1: string; name: string }[];
  created_by?: { id: number; name: string }[];
  networks?: { id: number; name: string }[];
  seasons?: Season[];
  credits?: { cast: CastMember[]; crew: CrewMember[] };
  videos?: { results: Video[] };
  "watch/providers"?: { results: Record<string, WatchProviders> };
  recommendations?: Paged<MediaItem>;
  similar?: Paged<MediaItem>;
  release_dates?: { results: { iso_3166_1: string; release_dates: { certification: string }[] }[] };
  content_ratings?: { results: { iso_3166_1: string; rating: string }[] };
}

export class TmdbNotFound extends Error {}

async function tmdb<T>(path: string, params: Record<string, string | number> = {}, revalidate = 3600): Promise<T> {
  const url = new URL(`${API}${path}`);
  url.searchParams.set("api_key", KEY);
  url.searchParams.set("language", "pt-BR");
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));

  const res = await fetch(url, { next: { revalidate } });
  if (res.status === 404) throw new TmdbNotFound(path);
  if (!res.ok) throw new Error(`TMDB ${res.status} em ${path}`);
  return res.json() as Promise<T>;
}

/** Versão que nunca quebra a página: em erro devolve lista vazia. */
async function list(path: string, params: Record<string, string | number> = {}): Promise<MediaItem[]> {
  try {
    const data = await tmdb<Paged<MediaItem>>(path, params);
    return data.results.filter((i) => i.poster_path);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export const getTrending = () => list("/trending/all/week").then((r) => r.filter((i) => i.media_type !== "person"));
export const getPopularMovies = (page = 1) => list("/movie/popular", { page, region: "BR" });
export const getTopRatedMovies = (page = 1) => list("/movie/top_rated", { page, region: "BR" });
export const getNowPlaying = () => list("/movie/now_playing", { region: "BR" });
export const getPopularSeries = (page = 1) => list("/tv/popular", { page });
export const getTopRatedSeries = (page = 1) => list("/tv/top_rated", { page });

export const discoverByGenre = (type: MediaType, genreId: number, page = 1) =>
  list(`/discover/${type}`, {
    with_genres: genreId,
    sort_by: "popularity.desc",
    "vote_count.gte": 200,
    include_adult: "false",
    page,
  });

export const getDetail = (type: MediaType, id: number) =>
  tmdb<MediaDetail>(`/${type}/${id}`, {
    append_to_response: `credits,videos,watch/providers,recommendations,similar,${
      type === "movie" ? "release_dates" : "content_ratings"
    }`,
    include_video_language: "pt,en,null",
  });

// ---------- helpers de exibição ----------

export const titleOf = (m: { title?: string; name?: string }) => m.title || m.name || "";
export const originalTitleOf = (m: { original_title?: string; original_name?: string }) =>
  m.original_title || m.original_name || "";
export const yearOf = (m: { release_date?: string; first_air_date?: string }) =>
  (m.release_date || m.first_air_date || "").slice(0, 4);

export const typeOf = (m: MediaItem, fallback: MediaType): MediaType =>
  m.media_type === "movie" || m.media_type === "tv" ? m.media_type : fallback;

export function formatDateBR(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(
    new Date(`${date}T00:00:00`)
  );
}

export function formatRuntime(min?: number) {
  if (!min) return "";
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h}h${m ? ` ${m}min` : ""}` : `${m}min`;
}

export function certificationBR(d: MediaDetail): string {
  if (d.release_dates) {
    const br = d.release_dates.results.find((r) => r.iso_3166_1 === "BR");
    const c = br?.release_dates.map((x) => x.certification).find(Boolean);
    if (c) return c;
  }
  if (d.content_ratings) {
    const br = d.content_ratings.results.find((r) => r.iso_3166_1 === "BR");
    if (br?.rating) return br.rating;
  }
  return "";
}

const LANGS: Record<string, string> = {
  en: "Inglês", pt: "Português", es: "Espanhol", fr: "Francês", it: "Italiano", de: "Alemão",
  ja: "Japonês", ko: "Coreano", zh: "Chinês", cn: "Chinês", hi: "Hindi", tr: "Turco", ru: "Russo",
  sv: "Sueco", da: "Dinamarquês", no: "Norueguês", pl: "Polonês", th: "Tailandês", ar: "Árabe",
};
export const languageName = (code?: string) => (code ? LANGS[code] || code.toUpperCase() : "");

const STATUS: Record<string, string> = {
  Released: "Lançado", "Post Production": "Em pós-produção", "In Production": "Em produção",
  Planned: "Planejado", Rumored: "Rumor", Canceled: "Cancelado",
  "Returning Series": "Em exibição", Ended: "Finalizada", Pilot: "Piloto",
};
export const statusName = (s?: string) => (s ? STATUS[s] || s : "");
