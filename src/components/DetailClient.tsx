"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosReturnLeft } from "react-icons/io";
import StarRating from "@/components/StarRating";
import ButtonFavorite from "@/components/ButtonFavorite";
import ButtonWatched from "@/components/ButtonWatched";
import SeasonEpisodes from "@/components/SeasonEpisodes";
import CommentsSection from "@/components/CommentsSection";
import { useAuth } from "@/app/context/AuthContext";
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Detail {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  tagline?: string;
}

interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

interface WatchProviders {
  flatrate?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
}

interface Video {
  key: string;
  site: string;
  type: string;
  official?: boolean;
  name?: string;
}

interface Episode {
  id: number;
  episode_number: number;
  name: string;
  overview: string;
  still_path: string;
  air_date: string;
}

interface Season {
  id: number;
  season_number: number;
  name: string;
  episode_count: number;
  overview: string;
  poster_path: string;
  episodes?: Episode[];
}

interface DetailClientProps {
  type: "movie" | "tv";
  id: number;
  initialDetail?: Detail;
  initialProviders?: WatchProviders | null;
  initialVideos?: Video[];
  initialSeasons?: Season[];
  /** Conteúdo renderizado no servidor (ficha técnica, elenco...) exibido antes dos comentários */
  children?: React.ReactNode;
}

export default function DetailClient({
  type,
  id,
  initialDetail,
  initialProviders,
  initialVideos,
  initialSeasons,
  children,
}: DetailClientProps) {
  const router = useRouter();
  const [detail, setDetail] = useState<Detail | null>(initialDetail || null);
  const [watchProviders, setWatchProviders] = useState<WatchProviders | null>(initialProviders ?? null);
  const [videos, setVideos] = useState<Video[]>(initialVideos || []);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<{ id: number; type: string }[]>([]);
  const [seasons, setSeasons] = useState<Season[]>(initialSeasons || []);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [watchedEpisodes, setWatchedEpisodes] = useState<{ seriesId: number; season: number; episode: number }[]>([]);
  const [watched, setWatched] = useState<{ id: number; type: string }[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (id && type && !initialDetail) {
      const fetchDetails = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/${type}/${id}?language=pt-BR`,
            {
              params: {
                api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
              },
            }
          );
          setDetail(response.data);
        } catch (err) {
          setError("Erro ao carregar detalhes.");
          console.error(err);
        }
      };

      const fetchProviders = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/${type}/${id}/watch/providers`,
            {
              params: {
                api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
              },
            }
          );

          setWatchProviders(response.data.results.BR || null);
        } catch (err) {
          console.error("Erro ao carregar providers:", err);
        }
      };

      const fetchVideos = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/${type}/${id}/videos?language=pt-BR`,
            {
              params: {
                api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
              },
            }
          );
          setVideos(response.data.results);
        } catch (err) {
          console.error("Erro ao carregar vídeos:", err);
        }
      };

      const fetchSeasons = async () => {
        if (type === "tv") {
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/tv/${id}?language=pt-BR`,
              {
                params: {
                  api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                },
              }
            );
            setSeasons(response.data.seasons || []);
          } catch (err) {
            console.error("Erro ao carregar temporadas:", err);
          }
        }
      };

      fetchDetails();
      fetchVideos();
      fetchProviders();
      fetchSeasons();
    }
  }, [id, type, initialDetail]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const userFavoritesRef = doc(db, "favorites", user.uid);

        try {
          const docSnap = await getDoc(userFavoritesRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setFavorites(data.favorites || []);
          }
        } catch (err) {
          console.error("Erro ao buscar favoritos: ", err);
        }
      }
    };

    fetchFavorites();

    const fetchWatchedEpisodes = async () => {
      if (user) {
        const userWatchedRef = doc(db, "watchedEpisodes", user.uid);
        try {
          const docSnap = await getDoc(userWatchedRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setWatchedEpisodes(data.episodes || []);
          }
        } catch (err) {
          console.error("Erro ao buscar episódios :", err);
        }
      }
    };

    fetchWatchedEpisodes();

    const fetchWatched = () => {
      if (user) {
        const userWatchedRef = doc(db, "watched", user.uid);
        return onSnapshot(userWatchedRef, (docSnap) => {
          if (docSnap.exists()) {
            setWatched(docSnap.data().watched || []);
          } else {
            setWatched([]);
          }
        });
      }
    };

    const unsubscribeWatched = fetchWatched();

    return () => {
      if (unsubscribeWatched) unsubscribeWatched();
    };
  }, [user]);

  const saveFavorite = async (itemId: number, itemType: "movie" | "tv") => {
    if (user) {
      const userId = user.uid;
      const userFavoritesRef = doc(db, "favorites", userId);

      try {
        const docSnap = await getDoc(userFavoritesRef);
        const newFavorite = { id: itemId, type: itemType };

        if (docSnap.exists()) {
          const currentFavorites = docSnap.data()?.favorites || [];
          const isFavorite = currentFavorites.some(
            (favorite: { id: number; type: string }) =>
              favorite.id === itemId && favorite.type === itemType
          );

          if (isFavorite) {
            await updateDoc(userFavoritesRef, {
              favorites: arrayRemove(newFavorite),
            });
            setFavorites((prev) =>
              prev.filter(
                (favorite) => favorite.id !== itemId || favorite.type !== itemType
              )
            );
          } else {
            await updateDoc(userFavoritesRef, {
              favorites: arrayUnion(newFavorite),
            });
            setFavorites((prev) => [...prev, newFavorite]);
          }
        } else {
          await setDoc(userFavoritesRef, {
            favorites: [newFavorite],
          });
          setFavorites([newFavorite]);
        }
      } catch (err) {
        console.error("Erro ao salvar favorito: ", err);
      }
    }
  };

  const isFavorite = (itemId: number, itemType: string) => {
    return favorites.some((fav) => fav.id === itemId && fav.type === itemType);
  };

  const saveWatched = async (itemId: number, itemType: "movie" | "tv") => {
    if (user) {
      const userWatchedRef = doc(db, "watched", user.uid);

      try {
        const docSnap = await getDoc(userWatchedRef);
        const itemData = { id: itemId, type: itemType };

        if (docSnap.exists()) {
          const currentWatched = docSnap.data().watched || [];
          const alreadyWatched = currentWatched.some(
            (item: { id: number; type: string }) => item.id === itemId && item.type === itemType
          );

          if (alreadyWatched) {
            await updateDoc(userWatchedRef, {
              watched: arrayRemove(itemData),
            });
          } else {
            await updateDoc(userWatchedRef, {
              watched: arrayUnion(itemData),
            });
          }
        } else {
          await setDoc(userWatchedRef, {
            watched: [itemData],
          });
        }
      } catch (err) {
        console.error("Erro ao salvar assistido: ", err);
      }
    }
  };

  const isWatched = (itemId: number, itemType: string) => {
    return watched.some((item) => item.id === itemId && item.type === itemType);
  };

  const toggleWatchedEpisode = async (seriesId: number, season: number, episode: number) => {
    if (!user) return;

    const userWatchedRef = doc(db, "watchedEpisodes", user.uid);
    const episodeData = { seriesId, season, episode };

    try {
      const docSnap = await getDoc(userWatchedRef);
      const isWatched = watchedEpisodes.some(
        (ep) => ep.seriesId === seriesId && ep.season === season && ep.episode === episode
      );

      if (docSnap.exists()) {
        if (isWatched) {
          await updateDoc(userWatchedRef, {
            episodes: arrayRemove(episodeData),
          });
          setWatchedEpisodes((prev) =>
            prev.filter((ep) => !(ep.seriesId === seriesId && ep.season === season && ep.episode === episode))
          );
        } else {
          await updateDoc(userWatchedRef, {
            episodes: arrayUnion(episodeData),
          });
          setWatchedEpisodes((prev) => [...prev, episodeData]);
        }
      } else {
        await setDoc(userWatchedRef, {
          episodes: [episodeData],
        });
        setWatchedEpisodes([episodeData]);
      }
    } catch (err) {
      console.error("Erro ao marcar episódio:", err);
    }
  };

  const isEpisodeWatched = (seriesId: number, season: number, episode: number) => {
    return watchedEpisodes.some(
      (ep) => ep.seriesId === seriesId && ep.season === season && ep.episode === episode
    );
  };

  const toggleAllEpisodesInSeason = async (seriesId: number, season: number, episodeCount: number) => {
    if (!user) return;

    const userWatchedRef = doc(db, "watchedEpisodes", user.uid);
    const seasonEpisodes = Array.from({ length: episodeCount }, (_, i) => ({
      seriesId,
      season,
      episode: i + 1,
    }));

    try {
      const docSnap = await getDoc(userWatchedRef);
      type WatchedEp = { seriesId: number; season: number; episode: number };
      let currentEpisodes: WatchedEp[] = docSnap.exists() ? docSnap.data().episodes || [] : [];

      // Verificar se todos os episódios da temporada já estão marcados
      const allWatchedInSeason = seasonEpisodes.every((ep) =>
        currentEpisodes.some(
          (e) => e.seriesId === ep.seriesId && e.season === ep.season && e.episode === ep.episode
        )
      );

      if (allWatchedInSeason) {
        // Desmarcar todos os episódios da temporada
        currentEpisodes = currentEpisodes.filter(
          (ep) => !(ep.seriesId === seriesId && ep.season === season)
        );
        setWatchedEpisodes((prev) =>
          prev.filter((ep) => !(ep.seriesId === seriesId && ep.season === season))
        );
      } else {
        // Marcar todos os episódios da temporada
        const newEpisodes = seasonEpisodes.filter((ep) => {
          return !currentEpisodes.some(
            (e) => e.seriesId === ep.seriesId && e.season === ep.season && e.episode === ep.episode
          );
        });
        currentEpisodes = [...currentEpisodes, ...newEpisodes];
        setWatchedEpisodes((prev) => [...prev, ...newEpisodes]);
      }

      // setDoc com merge funciona mesmo se o documento ainda não existir
      await setDoc(userWatchedRef, { episodes: currentEpisodes }, { merge: true });
    } catch (err) {
      console.error("Erro ao marcar/desmarcar temporada:", err);
    }
  };

  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!detail) return <div className="text-center mt-10">Carregando...</div>;

  const youtube = videos.filter((v) => v.site === "YouTube");
  const trailer =
    youtube.find((v) => v.type === "Trailer" && v.official) ||
    youtube.find((v) => v.type === "Trailer") ||
    youtube.find((v) => v.type === "Teaser");

  const formatarDataBR = (data: string | undefined): string => {
    if (!data) {
      return "Data não informada";
    }
    const dateObj = new Date(data + "T00:00:00");
    return new Intl.DateTimeFormat("pt-BR").format(dateObj);
  };

  return (
    <div className="min-h-screen text-white p-4 sm:p-7">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end">
          <button
            onClick={() => (window.history.length > 1 ? router.back() : router.push("/movies"))}
            className="mb-4 bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center gap-2"
          >
            <IoIosReturnLeft size={20} />
            Voltar
          </button>
        </div>

        {/* BACKDROP */}
        <div
          className="relative h-auto min-h-[400px] sm:h-96 rounded-lg"
          style={{
            backgroundImage: detail.backdrop_path ? `url(https://image.tmdb.org/t/p/w1280${detail.backdrop_path})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

          {/* CONTEÚDO */}
          <div className="relative flex flex-col sm:flex-row items-center sm:items-start h-full p-5 gap-5">
            <div className="flex-shrink-0">
              <Image
                src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                width={200}
                height={300}
                alt={`Pôster de ${detail.title || detail.name}`}
                className="rounded-lg w-40 sm:w-52 h-auto"
                priority
              />
              <div className="mt-3 flex gap-2 justify-center sm:justify-start">
                <ButtonWatched
                  id={detail.id}
                  type={type}
                  onClick={saveWatched}
                  isWatched={isWatched(detail.id, type)}
                />
                <ButtonFavorite
                  id={detail.id}
                  type={type}
                  onClick={saveFavorite}
                  isFavorite={isFavorite(detail.id, type)}
                />
              </div>
            </div>

            <div className="text-center sm:text-left w-full">
              <h1 className="text-2xl sm:text-4xl font-bold">
                {detail.title || detail.name}
              </h1>
              <p className="mt-1 text-sm sm:text-base">
                {formatarDataBR(detail.release_date || detail.first_air_date)}
              </p>
              {detail.tagline && <p className="mt-2 italic text-gray-200">{detail.tagline}</p>}
              <h2 className="sr-only">Sinopse</h2>
              <p className="mt-2 text-sm sm:text-base">
                {detail.overview || "Sinopse ainda não disponível em português."}
              </p>
              <div className="mt-4 flex justify-center sm:justify-start">
                <StarRating rating={detail.vote_average} />
              </div>
            </div>
          </div>
        </div>

        {/* ONDE ASSISTIR */}
        <section className="mt-10 mb-10" aria-labelledby="onde-assistir">
          <h2 id="onde-assistir" className="text-xl sm:text-2xl font-semibold mb-4">
            Onde assistir {detail.title || detail.name} no Brasil
          </h2>
          {watchProviders && (watchProviders.flatrate?.length || watchProviders.rent?.length || watchProviders.buy?.length) ? (
            <div className="space-y-6">
              {([
                ["Streaming por assinatura", watchProviders.flatrate],
                ["Aluguel", watchProviders.rent],
                ["Compra digital", watchProviders.buy],
              ] as [string, Provider[] | undefined][])
                .filter(([, list]) => list && list.length > 0)
                .map(([label, list]) => (
                  <div key={label}>
                    <h3 className="text-base font-semibold mb-3 text-green-400">{label}</h3>
                    <ul className="flex flex-wrap gap-4">
                      {list!
                        .filter((provider) =>
                          !provider.provider_name.toLowerCase().includes("channel") &&
                          !provider.provider_name.toLowerCase().includes("standard") &&
                          !provider.provider_name.toLowerCase().includes("with ads")
                        )
                        .map((provider) => (
                          <li key={provider.provider_id} className="flex flex-col items-center gap-2">
                            <div className="w-14 h-14 rounded-lg overflow-hidden">
                              <Image
                                src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                                alt={provider.provider_name}
                                width={56}
                                height={56}
                                className="w-full h-full object-contain rounded-lg"
                              />
                            </div>
                            <span className="text-xs text-center max-w-[72px]">{provider.provider_name}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              <p className="text-xs text-gray-400">
                Disponibilidade no Brasil segundo o{" "}
                <a href="https://www.justwatch.com/br" target="_blank" rel="noopener noreferrer" className="underline">
                  JustWatch
                </a>
                . Os catálogos mudam com frequência: confirme no serviço antes de assinar.
              </p>
            </div>
          ) : (
            <p className="text-gray-300">
              No momento não encontramos este título em serviços de streaming, aluguel ou compra no Brasil. Os
              catálogos mudam com frequência — volte mais tarde ou salve nos favoritos para lembrar.
            </p>
          )}
        </section>

        {/* TRAILER (antes ficava dentro do bloco acima e sumia quando não havia streaming no BR) */}
        {trailer && (
          <section className="mt-10 mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Trailer</h2>
            <div className="relative w-full pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
                title={`Trailer de ${detail.title || detail.name}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        )}

        {/* TEMPORADAS E EPISÓDIOS (só para séries) */}
        {type === "tv" && seasons.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Temporadas e Episódios</h2>


            {/* Seletor de Temporadas */}
            <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-custom">
              {seasons
                .filter((season) => season.season_number > 0) // Filtrar temporadas especiais
                .map((season) => (
                  <button
                    key={season.id}
                    onClick={() => setSelectedSeason(season.season_number)}
                    className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all duration-300 ${selectedSeason === season.season_number
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-black font-bold shadow-lg shadow-green-500/50 scale-105"
                      : "bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 hover:shadow-md border border-gray-700/50"
                      }`}
                  >
                    Temporada {season.season_number}
                  </button>
                ))}
            </div>

            {/* Lista de Episódios */}
            {user ? (
              <SeasonEpisodes
                seriesId={Number(id)}
                seasonNumber={selectedSeason}
                onToggleWatched={toggleWatchedEpisode}
                isEpisodeWatched={isEpisodeWatched}
                onMarkAllWatched={toggleAllEpisodesInSeason}
              />
            ) : (
              <div className="text-center py-8 bg-gray-800/50 rounded-lg">
                <p className="text-gray-300">Faça login para marcar episódios como assistidos</p>
              </div>
            )}
          </div>
        )}

        {/* Ficha técnica, elenco, recomendações e anúncio (vindos do servidor) */}
        {children}

        {/* COMENTÁRIOS */}
        <div className="mt-10">
          <CommentsSection
            contentId={Number(id)}
            contentType={type as "movie" | "episode"}
          />
        </div>
      </div>
    </div>
  );
}