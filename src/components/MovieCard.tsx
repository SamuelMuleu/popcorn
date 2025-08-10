"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db, auth } from "@/lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { MdFavorite } from "react-icons/md";
import { motion } from "motion/react";


interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  media_type: string;
}

interface Serie {
  id: number;
  name: string;
  backdrop_path: string;
  media_type: string;
  poster_path: string;
}

const MovieCard = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Serie[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [favorites, setFavorites] = useState<{ id: number; type: string }[]>(
    []
  );

  const saveFavorite = async (id: number, type: "movie" | "tv") => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userFavoritesRef = doc(db, "favorites", userId);

      try {
        const docSnap = await getDoc(userFavoritesRef);
        const newFavorite = { id, type };

        if (docSnap.exists()) {
          const currentFavorites = docSnap.data()?.favorites || [];

          const isFavorite = currentFavorites.some(
            (favorite: { id: number; type: string }) =>
              favorite.id === id && favorite.type === type
          );

          if (isFavorite) {
            await updateDoc(userFavoritesRef, {
              favorites: arrayRemove(newFavorite),
            });
            setFavorites((prev) =>
              prev.filter(
                (favorite) => favorite.id !== id || favorite.type !== type
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
        }
      } catch (err) {
        if (err instanceof Error) {
          setError("Erro ao salvar favorito: " + err.message);
        }
        console.error("Erro ao salvar favorito: ", err);
      }
    }
  };


  useEffect(() => {
    const fetchFavorites = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const userFavoritesRef = doc(db, "favorites", userId);
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
  }, []);

  const isFavorite = (id: number, type: string) => {
    return favorites.some((fav) => fav.id === id && fav.type === type);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          {
            params: {
              api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            },
          }
        );

        setMovies(response.data.results);
        console.log(response.data.results);
      } catch (err) {
        setError("Erro ao carregar filmes. Tente novamente mais tarde.");
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
          {
            params: {
              api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
              page: "1",
            },
          }
        );
        setSeries(response.data.results);
      } catch (err) {
        setError("Erro ao carregar series. Tente novamente mais tarde.");
        console.error(err);
      }
    };

    fetchSeries();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;



  return (
    <div className="min-h-screen text-white p-7">
      <h1 className="text-2xl font-semibold mb-6 text-start opacity-25">
        Filmes Populares
      </h1>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="flex-shrink-0 basis-1/1 w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px]"
            >
              <Link href={`/details/movie/${movie.id}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="p-2 flex flex-col items-center justify-center"
                >
                  <div className="w-full overflow-hidden flex flex-col justify-center rounded-2xl relative">
                <button
                        className="absolute top-2 md:left-48 left-24 md:top-1 z-10 hover:scale-150"
                        onClick={(e) => {
                          e.preventDefault();
                          const type = movie.media_type
                            ? movie.media_type
                            : "tv";
                          saveFavorite(movie.id, type as "movie" | "tv");
                        }}
                      >
                        {" "}
                        <MdFavorite
                          className={`${isFavorite(movie.id, movie.media_type || "tv")
                              ? "text-red-700"
                              : "text-white"
                            } hover:scale-150`}
                        />
                      </button>


                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      width={200}
                      height={300}
                      alt="movie image"
                      className="w-full h-auto object-cover sm:w-[150px] sm:h-[225px] md:w-[200px] md:h-[300px] lg:w-[250px] lg:object-contain lg:h-[275px]"
                    />

                    <p className="flex justify-center md:ml-14 md:mt-4 w-full md:max-w-40">
                      {movie.title}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-5 md:ml-0 -mt-10" />
        <CarouselNext className="md:mr-0 mr-5 -mt-10" />
      </Carousel>

      {/* Series */}
      <motion.div className="mt-10">
        <h1 className="text-2xl font-semibold mb-4 text-start opacity-25">
          Séries Populares
        </h1>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {series.map((serie) => (
              <CarouselItem
                key={serie.id}
                className="flex-shrink-0 basis-1/1 w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px] relative"
              >
                <Link href={`/details/tv/${serie.id}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="p-2 flex flex-col items-center justify-center"
                  >
                    <div className="w-full overflow-hidden rounded-2xl relative mb-10">
                      <button
                        className="absolute top-2 md:left-48 left-24 md:top-1 z-10 hover:scale-150"
                        onClick={(e) => {
                          e.preventDefault();
                          const type = serie.media_type
                            ? serie.media_type
                            : "tv";
                          saveFavorite(serie.id, type as "movie" | "tv");
                        }}
                      >
                        {" "}
                        <MdFavorite
                          className={`${isFavorite(serie.id, serie.media_type || "tv")
                              ? "text-red-700"
                              : "text-white"
                            } hover:scale-150`}
                        />
                      </button>

                      <Image
                        src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                        width={200}
                        height={300}
                        alt="serie image"
                        className="w-full h-auto object-cover sm:w-[150px] sm:h-[225px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:object-contain lg:h-[275px]"
                      />

                      <p className="flex justify-center md:ml-14 md:mt-4 w-full md:max-w-40">
                        {serie.name}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-5 md:ml-2 -mt-10" />
          <CarouselNext className="md:-mr-1 mr-5 -mt-10" />
        </Carousel>
      </motion.div>
    </div>
  );
};

export default MovieCard;
