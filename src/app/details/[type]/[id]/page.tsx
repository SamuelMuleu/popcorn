"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosReturnLeft } from "react-icons/io";
import StarRating from "@/components/StarRating";
import ButtonFavorite from "@/components/ButtonFavorite";
import { useAuth } from "@/app/context/AuthContext";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
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
  const [provider, setProvider] = useState<Provider | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);
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
                      language: "pt-BR",

              },
            }
          );
          setProvider(response.data.results.BR);
        } catch (err) {
          setError("Erro ao carregar detalhes.");
          console.error(err);
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
    console.log(provider)
    
    }

  }, [id, type]);

  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!detail) return <div className="text-center mt-10">Carregando...</div>;
   

console.log(videos)
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

  const removeFavorite = async (id: number, type: "movie" | "tv") => {
    if (!user) return;

    try {
      const docRef = doc(db, "favorites", user.uid);
      await updateDoc(docRef, {
        favorites: arrayRemove({ id, type }),
      });
    } catch (error) {
      console.error("Erro ao remover o favorito:", error);
    }
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
                  type="movie"
                  onClick={removeFavorite}
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
              <p className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">{detail.overview}</p>
              <div className="mt-4 flex justify-center">
                <StarRating rating={detail.vote_average} />
              </div>
              
            </div>
          </div>
        </div>


        {trailer && (
          <div className=" sm:mt-4 mt-64 mb-10">
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
    </div>
  );
}
