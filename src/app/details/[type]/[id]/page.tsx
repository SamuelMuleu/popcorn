"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosReturnLeft } from "react-icons/io";
import StarRating from "@/components/StarRating";
import ButtonFavorite from "@/components/ButtonFavorite";
import { useAuth } from "@/app/context/AuthContext";
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Detail {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
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

export default function DetailPage() {
  const { type, id } = useParams();
  const router = useRouter();
  const [detail, setDetail] = useState<Detail | null>(null);
  const [watchProviders, setWatchProviders] = useState<WatchProviders | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<{ id: number; type: string }[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (id && type) {
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
          console.log("Providers:", response.data.results.BR);
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

      fetchDetails();
      fetchVideos();
      fetchProviders();
    }
  }, [id, type]);

  // Buscar favoritos (igual ao Search)
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
  }, [user]);

  // Função para salvar/remover favorito (igual ao Search)
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

  // Verificar se é favorito (igual ao Search)
  const isFavorite = (itemId: number, itemType: string) => {
    return favorites.some((fav) => fav.id === itemId && fav.type === itemType);
  };

  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!detail) return <div className="text-center mt-10">Carregando...</div>;

  const trailer = videos.find(
    (video) =>
      video.site === "YouTube" &&
      (video.type === "Trailer" || video.type === "Teaser")
  );

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
            onClick={() => router.back()}
            className="mb-4 bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center gap-2"
          >
            <IoIosReturnLeft size={20} />
            Voltar
          </button>
        </div>

        {/* BACKDROP */}
        <div
          className="relative h-64 sm:h-96 rounded-lg"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
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
                alt={detail.title || detail.name || "Poster"}
                className="rounded-lg w-40 sm:w-52 h-auto"
              />
              <div className="mt-3">
                <ButtonFavorite
                  id={detail.id}
                  type={type as "movie" | "tv"}
                  onClick={saveFavorite}
                  isFavorite={isFavorite(detail.id, type as string)}
                />
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-4xl font-bold">
                {detail.title || detail.name}
              </h1>
              <p className="mt-1 text-sm sm:text-base">
                {formatarDataBR(detail.release_date || detail.first_air_date)}
              </p>
              <p className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
                {detail.overview}
              </p>
              <div className="mt-4 flex justify-center">
                <StarRating rating={detail.vote_average} />
              </div>
            </div>
          </div>
        </div>
        {/* ONDE ASSISTIR */}
        {watchProviders && (
          <div className="mt-10 mb-10">


            {/* Streaming (Flatrate) */}
            {watchProviders.flatrate && watchProviders.flatrate.length > 0 && (
              <div className="mb-6 flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold mb-3 text-green-400">
                  Disponível para Streaming
                </h3>
                <div className="flex flex-wrap gap-4 ">
                  {watchProviders.flatrate.map((provider) => (
                    <div
                      key={provider.provider_id}
                      className="flex flex-col items-center gap-2 rounded-lg"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden p-1">
                        <Image
                          src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                          alt={provider.provider_name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                      <span className="text-xs text-center max-w-[64px]">
                        {provider.provider_name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {trailer && (
              <div className="sm:mt-4 mt-64 mb-10">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Trailer</h2>
                <div className="relative w-full pb-[56.25%] h-0">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}


          </div>

        )}
      </div>

    </div >

  );
}