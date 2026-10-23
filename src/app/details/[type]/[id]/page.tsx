import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache, type ReactNode } from "react";
import DetailClient from "@/components/DetailClient";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { PosterRow } from "@/components/PosterCard";
import { AD_SLOTS } from "@/lib/adsense";
import { genreLinkById } from "@/lib/genres";
import { toPosters } from "@/lib/poster";
import { SITE_URL } from "@/lib/site";
import {
  type MediaDetail,
  type MediaType,
  TmdbNotFound,
  certificationBR,
  formatDateBR,
  formatRuntime,
  getDetail,
  languageName,
  originalTitleOf,
  statusName,
  titleOf,
  yearOf,
} from "@/lib/tmdb";

export const revalidate = 86400; // 1 dia

type Params = Promise<{ type: string; id: string }>;

const load = cache(async (typeParam: string, idParam: string): Promise<MediaDetail | null> => {
  if (typeParam !== "movie" && typeParam !== "tv") return null;
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) return null;
  try {
    return await getDetail(typeParam, id);
  } catch (err) {
    if (err instanceof TmdbNotFound) return null;
    throw err;
  }
});

const clip = (text: string, max = 155) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { type, id } = await params;
  const d = await load(type, id);
  if (!d) return { title: "Título não encontrado", robots: { index: false } };

  const kind = type === "movie" ? "Filme" : "Série";
  const name = titleOf(d);
  const year = yearOf(d);
  const title = `${name}${year ? ` (${year})` : ""}: sinopse, elenco e onde assistir`;
  const description = clip(
    d.overview
      ? `${kind}${year ? ` de ${year}` : ""}. ${d.overview}`
      : `Veja informações sobre ${name}: elenco, trailer, nota e onde assistir no Brasil.`
  );
  const image = d.backdrop_path || d.poster_path;

  return {
    title,
    description,
    alternates: { canonical: `/details/${type}/${id}` },
    openGraph: {
      type: type === "movie" ? "video.movie" : "video.tv_show",
      title: `${name}${year ? ` (${year})` : ""}`,
      description,
      url: `/details/${type}/${id}`,
      images: image ? [{ url: `https://image.tmdb.org/t/p/w780${image}`, alt: name }] : undefined,
    },
  };
}

export default async function DetailPage({ params }: { params: Params }) {
  const { type: typeParam, id: idParam } = await params;
  const d = await load(typeParam, idParam);
  if (!d) notFound();

  const type = typeParam as MediaType;
  const name = titleOf(d);
  const original = originalTitleOf(d);
  const directors = d.credits?.crew.filter((c) => c.job === "Director").map((c) => c.name) || [];
  const writers =
    d.credits?.crew
      .filter((c) => c.department === "Writing")
      .map((c) => c.name)
      .filter((n, i, arr) => arr.indexOf(n) === i)
      .slice(0, 4) || [];
  const creators = d.created_by?.map((c) => c.name) || [];
  const cast = (d.credits?.cast || []).slice(0, 12);
  const providers = d["watch/providers"]?.results?.BR || null;
  const cert = certificationBR(d);
  const runtime = type === "movie" ? formatRuntime(d.runtime) : formatRuntime(d.episode_run_time?.[0]);
  const recommendations = toPosters((d.recommendations?.results || []).filter((r) => r.poster_path), type, 18);
  const similar = recommendations.length ? [] : toPosters((d.similar?.results || []).filter((r) => r.poster_path), type, 18);

  const facts: [string, ReactNode][] = [];
  if (original && original !== name) facts.push(["Título original", original]);
  if (type === "movie" && d.release_date) facts.push(["Lançamento", formatDateBR(d.release_date)]);
  if (type === "tv" && d.first_air_date) facts.push(["Estreia", formatDateBR(d.first_air_date)]);
  if (runtime) facts.push([type === "movie" ? "Duração" : "Duração do episódio", runtime]);
  if (type === "tv" && d.number_of_seasons)
    facts.push(["Temporadas", `${d.number_of_seasons} (${d.number_of_episodes || "?"} episódios)`]);
  if (d.genres?.length)
    facts.push([
      "Gêneros",
      d.genres.map((g, i) => {
        const href = genreLinkById(type, g.id);
        return (
          <span key={g.id}>
            {i > 0 && ", "}
            {href ? <Link href={href} className="text-green-400 hover:underline">{g.name}</Link> : g.name}
          </span>
        );
      }),
    ]);
  if (directors.length) facts.push([directors.length > 1 ? "Direção" : "Direção", directors.join(", ")]);
  if (creators.length) facts.push(["Criação", creators.join(", ")]);
  if (writers.length && type === "movie") facts.push(["Roteiro", writers.join(", ")]);
  if (d.networks?.length) facts.push(["Emissora / plataforma", d.networks.map((n) => n.name).join(", ")]);
  if (d.production_countries?.length) facts.push(["País", d.production_countries.map((c) => c.name).join(", ")]);
  if (d.original_language) facts.push(["Idioma original", languageName(d.original_language)]);
  if (cert) facts.push(["Classificação no Brasil", cert === "L" ? "Livre" : `${cert} anos`]);
  if (d.status) facts.push(["Situação", statusName(d.status)]);
  if (d.vote_count)
    facts.push(["Nota do público (TMDB)", `${d.vote_average.toFixed(1)}/10 · ${d.vote_count.toLocaleString("pt-BR")} votos`]);

  const url = `${SITE_URL}/details/${type}/${d.id}`;
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type === "movie" ? "Movie" : "TVSeries",
    name,
    url,
    ...(original && original !== name ? { alternateName: original } : {}),
    ...(d.overview ? { description: d.overview } : {}),
    ...(d.poster_path ? { image: `https://image.tmdb.org/t/p/w500${d.poster_path}` } : {}),
    ...(type === "movie" && d.release_date ? { datePublished: d.release_date } : {}),
    ...(type === "tv" && d.first_air_date ? { startDate: d.first_air_date } : {}),
    ...(d.genres?.length ? { genre: d.genres.map((g) => g.name) } : {}),
    ...(directors.length ? { director: directors.map((n) => ({ "@type": "Person", name: n })) } : {}),
    ...(creators.length ? { creator: creators.map((n) => ({ "@type": "Person", name: n })) } : {}),
    ...(cast.length ? { actor: cast.slice(0, 6).map((c) => ({ "@type": "Person", name: c.name })) } : {}),
    ...(type === "tv" && d.number_of_seasons ? { numberOfSeasons: d.number_of_seasons } : {}),
    ...(d.vote_count >= 10
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Number(d.vote_average.toFixed(1)),
            bestRating: 10,
            worstRating: 0,
            ratingCount: d.vote_count,
          },
        }
      : {}),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Filmes e Séries", item: `${SITE_URL}/movies` },
      { "@type": "ListItem", position: 3, name, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={[jsonLd, breadcrumb]} />
      <nav aria-label="Você está em" className="max-w-4xl mx-auto px-4 sm:px-7 pt-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-white">Início</Link> ›{" "}
        <Link href="/movies" className="hover:text-white">Filmes e Séries</Link> ›{" "}
        <span className="text-gray-300">{name}</span>
      </nav>

      <DetailClient
        type={type}
        id={d.id}
        initialDetail={d}
        initialProviders={providers}
        initialVideos={d.videos?.results || []}
        initialSeasons={d.seasons || []}
      >
        {/* FICHA TÉCNICA */}
        <section className="mt-10" aria-labelledby="ficha">
          <h2 id="ficha" className="text-xl sm:text-2xl font-semibold mb-4">Ficha técnica</h2>
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 rounded-xl bg-gray-900/60 p-5">
            {facts.map(([label, value]) => (
              <div key={label} className="flex flex-col">
                <dt className="text-xs uppercase tracking-wide text-gray-400">{label}</dt>
                <dd className="text-gray-100">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ELENCO */}
        {cast.length > 0 && (
          <section className="mt-10" aria-labelledby="elenco">
            <h2 id="elenco" className="text-xl sm:text-2xl font-semibold mb-4">Elenco principal</h2>
            <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {cast.map((c) => (
                <li key={`${c.id}-${c.character}`} className="text-center">
                  <div className="relative mx-auto aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-800">
                    {c.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${c.profile_path}`}
                        alt={c.name}
                        fill
                        sizes="(max-width: 640px) 30vw, 120px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-3xl text-gray-600" aria-hidden="true">👤</div>
                    )}
                  </div>
                  <p className="mt-2 text-sm font-medium leading-tight">{c.name}</p>
                  {c.character && <p className="text-xs text-gray-400 leading-tight">{c.character}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        <AdSlot slot={AD_SLOTS.details} />

        {/* RECOMENDAÇÕES (links internos para outros títulos) */}
        <PosterRow
          title={type === "movie" ? "Se você gostou, veja também" : "Séries parecidas"}
          items={recommendations.length ? recommendations : similar}
          withActions
        />
      </DetailClient>
    </>
  );
}
