"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { MdFavoriteBorder } from "react-icons/md";
import { db } from "@/lib/firestore";
import { useAuth } from "@/app/context/AuthContext";
import { useUserLists, type ListItem } from "@/app/context/UserListsContext";
import { PosterGrid, type PosterItem } from "@/components/PosterCard";
import Tabs from "@/components/Tabs";

interface Info {
  title: string;
  posterPath: string | null;
  year: string;
  rating: number;
  totalEpisodes?: number;
}

const keyOf = (type: string, id: number) => `${type}-${id}`;

function SkeletonGrid() {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i}>
          <div className="aspect-[2/3] w-full animate-pulse rounded-xl bg-white/10 motion-reduce:animate-none" />
          <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
        </li>
      ))}
    </ul>
  );
}

function Empty({ children, href, cta }: { children: ReactNode; href: string; cta: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/15 px-6 py-10 text-center">
      <p className="text-gray-300">{children}</p>
      <Link href={href} className="mt-4 inline-flex h-11 items-center rounded-lg bg-green-700 px-5 font-semibold hover:bg-green-600">
        {cta}
      </Link>
    </div>
  );
}

function Section({ title, count, children }: { title: string; count: number; children: ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-xl font-bold md:text-2xl">
        {title} <span className="text-base font-normal tabular-nums text-gray-400">({count})</span>
      </h2>
      {children}
    </section>
  );
}

export default function MyListsPage() {
  const { user, loading: authLoading } = useAuth();
  const { favorites, watched, ready } = useUserLists();
  const [info, setInfo] = useState<Record<string, Info>>({});
  const [episodesBySeries, setEpisodesBySeries] = useState<Map<number, number> | null>(null);

  // Episódios marcados (para "Assistindo" e "Séries completas")
  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "watchedEpisodes", user.uid))
      .then((snap) => {
        const map = new Map<number, number>();
        for (const ep of (snap.data()?.episodes as { seriesId: number }[]) || []) {
          map.set(ep.seriesId, (map.get(ep.seriesId) || 0) + 1);
        }
        setEpisodesBySeries(map);
      })
      .catch((err) => {
        console.error("Erro ao carregar episódios:", err);
        setEpisodesBySeries(new Map());
      });
  }, [user]);

  // Busca título/pôster de tudo que ainda não temos (uma vez por título)
  const wanted = useMemo(() => {
    const all: ListItem[] = [...favorites, ...watched];
    episodesBySeries?.forEach((_, seriesId) => all.push({ id: seriesId, type: "tv" }));
    return all.filter((x, i, arr) => arr.findIndex((y) => y.id === x.id && y.type === x.type) === i);
  }, [favorites, watched, episodesBySeries]);

  useEffect(() => {
    const missing = wanted.filter((x) => !info[keyOf(x.type, x.id)]);
    if (!missing.length) return;
    let cancelled = false;
    Promise.allSettled(
      missing.map((x) =>
        axios
          .get(`https://api.themoviedb.org/3/${x.type}/${x.id}`, {
            params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, language: "pt-BR" },
          })
          .then((r) => [keyOf(x.type, x.id), r.data] as const)
      )
    ).then((settled) => {
      if (cancelled) return;
      const next: Record<string, Info> = {};
      settled.forEach((s, idx) => {
        if (s.status !== "fulfilled") {
          // Guarda um registro mínimo para não tentar de novo em loop
          const x = missing[idx];
          next[keyOf(x.type, x.id)] = { title: "Título indisponível", posterPath: null, year: "", rating: 0 };
          return;
        }
        const [k, d] = s.value;
        next[k] = {
          title: d.title || d.name || "Sem título",
          posterPath: d.poster_path,
          year: (d.release_date || d.first_air_date || "").slice(0, 4),
          rating: d.vote_average || 0,
          totalEpisodes: d.number_of_episodes,
        };
      });
      setInfo((prev) => ({ ...prev, ...next }));
    });
    return () => {
      cancelled = true;
    };
  }, [wanted, info]);

  const toItems = (list: ListItem[]): PosterItem[] =>
    list
      .filter((x) => info[keyOf(x.type, x.id)])
      .map((x) => {
        const i = info[keyOf(x.type, x.id)];
        return { id: x.id, type: x.type, title: i.title, year: i.year, posterPath: i.posterPath, rating: i.rating };
      });

  // Listas derivadas (mais recentes primeiro)
  const favMovies = favorites.filter((x) => x.type === "movie").reverse();
  const favSeries = favorites.filter((x) => x.type === "tv").reverse();
  const watchedMovies = watched.filter((x) => x.type === "movie").reverse();
  const watchedSeries = watched.filter((x) => x.type === "tv").reverse();

  const seriesProgress: { item: ListItem; seen: number; total: number }[] = [];
  episodesBySeries?.forEach((seen, id) => {
    const total = info[keyOf("tv", id)]?.totalEpisodes || 0;
    seriesProgress.push({ item: { id, type: "tv" }, seen, total });
  });
  const completed = seriesProgress.filter((s) => s.total > 0 && s.seen >= s.total);
  const inProgress = seriesProgress.filter((s) => !(s.total > 0 && s.seen >= s.total));
  const progressOf = (id: number) => seriesProgress.find((s) => s.item.id === id);

  const stillLoading = !ready || episodesBySeries === null || wanted.some((x) => !info[keyOf(x.type, x.id)]);
  const grid = (list: ListItem[], extra?: Partial<Parameters<typeof PosterGrid>[0]>) =>
    stillLoading && toItems(list).length < list.length ? <SkeletonGrid /> : <PosterGrid items={toItems(list)} withActions {...extra} />;

  if (authLoading) {
    return (
      <div className="max-w-6xl mx-auto pt-6">
        <h1 className="text-3xl md:text-4xl font-black">Minhas listas</h1>
        <div className="mt-8"><SkeletonGrid /></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center">
        <MdFavoriteBorder aria-hidden="true" className="mx-auto text-green-400" size={48} />
        <h1 className="mt-4 text-3xl font-black">Suas listas ficam aqui</h1>
        <p className="mt-3 text-gray-300">
          Entre com sua conta Google para salvar favoritos, marcar o que já assistiu e acompanhar os episódios das
          suas séries em qualquer dispositivo.
        </p>
        <Link href="/signin" className="mt-6 inline-flex h-12 items-center rounded-xl bg-green-700 px-6 font-bold hover:bg-green-600">
          Entrar
        </Link>
      </div>
    );
  }

  const firstName = user.displayName?.split(" ")[0];

  return (
    <div className="max-w-6xl mx-auto pt-6">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-black">Minhas listas</h1>
        <p className="mt-2 text-gray-300">
          {firstName ? `${firstName}, aqui` : "Aqui"} ficam seus favoritos, o que você já assistiu e as séries em
          andamento. Use os botões de cada pôster para marcar ou desmarcar.
        </p>
      </header>

      <Tabs
        defaultTab="favorites"
        tabs={[
          {
            id: "favorites",
            label: "Favoritos",
            count: favorites.length,
            content:
              favorites.length === 0 && ready ? (
                <Empty href="/movies" cta="Explorar populares">
                  Você ainda não favoritou nada. Toque no coração de qualquer pôster para guardar aqui.
                </Empty>
              ) : (
                <>
                  {favMovies.length > 0 && <Section title="Filmes" count={favMovies.length}>{grid(favMovies)}</Section>}
                  {favSeries.length > 0 && <Section title="Séries" count={favSeries.length}>{grid(favSeries)}</Section>}
                  {!ready && <SkeletonGrid />}
                </>
              ),
          },
          {
            id: "watched",
            label: "Assistidos",
            count: watched.length + completed.length,
            content:
              watched.length === 0 && completed.length === 0 && ready ? (
                <Empty href="/movies" cta="Ver o que está em alta">
                  Nada marcado como assistido ainda. Use o botão de olho nos pôsteres para registrar o que já viu.
                </Empty>
              ) : (
                <>
                  {watchedMovies.length > 0 && <Section title="Filmes" count={watchedMovies.length}>{grid(watchedMovies)}</Section>}
                  {watchedSeries.length > 0 && <Section title="Séries" count={watchedSeries.length}>{grid(watchedSeries)}</Section>}
                  {completed.length > 0 && (
                    <Section title="Séries com todos os episódios vistos" count={completed.length}>
                      {grid(completed.map((c) => c.item), { badgeFor: () => "Completa" })}
                    </Section>
                  )}
                </>
              ),
          },
          {
            id: "watching",
            label: "Assistindo",
            count: inProgress.length,
            content:
              inProgress.length === 0 && episodesBySeries !== null ? (
                <Empty href="/generos" cta="Encontrar uma série">
                  Nenhuma série em andamento. Na página de uma série, marque os episódios que já viu para acompanhar
                  o progresso aqui.
                </Empty>
              ) : (
                <Section title="Séries em andamento" count={inProgress.length}>
                  {grid(
                    inProgress.map((s) => s.item),
                    {
                      badgeFor: (it) => {
                        const p = progressOf(it.id);
                        return p ? `${p.seen}${p.total ? `/${p.total}` : ""} eps` : null;
                      },
                      noteFor: (it) => {
                        const p = progressOf(it.id);
                        return p && p.total ? `${Math.round((p.seen / p.total) * 100)}% assistida` : null;
                      },
                    }
                  )}
                </Section>
              ),
          },
        ]}
      />
    </div>
  );
}
