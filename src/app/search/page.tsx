"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import ButtonFavorite from "@/components/ButtonFavorite";
import ButtonWatched from "@/components/ButtonWatched";
import { db, auth } from "@/lib/firebase";
import { motion } from "motion/react";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Results {
  name: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  id: number;
  media_type: string;
}


const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Results[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<{ id: number; type: string }[]>(
    []
  );
  const [watched, setWatched] = useState<{ id: number; type: string }[]>([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi`,
          {
            params: {
              api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
              query,
            },
          }
        );

        if (response.data.results) {
          const filteredResults = response.data.results.filter((item: Results) => {
            return item.poster_path !== null && item.poster_path !== undefined;
          });

          setResults(filteredResults);
        } else {
          setResults([]);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError("Erro ao buscar os resultados.");
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

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
          setFavorites([newFavorite]);
        }
      } catch (err) {
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

    const fetchWatchedMovies = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const userWatchedRef = doc(db, "watched", userId);

        try {
          const docSnap = await getDoc(userWatchedRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setWatched(data.watched || []);
          }
        } catch (err) {
          console.error("Erro ao buscar assistidos: ", err);
        }
      }
    };

    fetchWatchedMovies();
  }, []);

  const isFavorite = (id: number, type: string) => {
    return favorites.some((fav) => fav.id === id && fav.type === type);
  };

  const saveWatched = async (id: number, type: "movie" | "tv") => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userWatchedRef = doc(db, "watched", userId);

      try {
        const docSnap = await getDoc(userWatchedRef);
        const newWatched = { id, type };

        if (docSnap.exists()) {
          const currentWatched = docSnap.data()?.watched || [];

          const isWatched = currentWatched.some(
            (item: { id: number; type: string }) =>
              item.id === id && item.type === type
          );

          if (isWatched) {
            await updateDoc(userWatchedRef, {
              watched: arrayRemove(newWatched),
            });
            setWatched((prev) =>
              prev.filter(
                (item) => item.id !== id || item.type !== type
              )
            );
          } else {
            await updateDoc(userWatchedRef, {
              watched: arrayUnion(newWatched),
            });
            setWatched((prev) => [...prev, newWatched]);
          }
        } else {
          await setDoc(userWatchedRef, {
            watched: [newWatched],
          });
          setWatched([newWatched]);
        }
      } catch (err) {
        console.error("Erro ao salvar assistido: ", err);
      }
    }
  };

  const isWatched = (id: number, type: string) => {
    return watched.some((item) => item.id === id && item.type === type);
  };

  return (
    <div className="flex flex-col gap-10 mt-10 items-center justify-center">
      <div className="text-2xl font-black">O que gostaria de assistir?</div>
      <form className="relative" onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
        e.preventDefault()
      }>
        <input
          type="text"
          placeholder="Procure"
          className="w-[336px] pl-12 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
        <FaSearch className="absolute top-3 left-4 text-gray-500" />
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {results.length > 0 && (
        <Carousel className="mt-2 w-[336px] rounded-md p-4">
          <CarouselContent className="mt-5 space-y-3">
            {results.map((item) => (
              <CarouselItem
                key={item.id}
                className="text-white basis-1/2 flex flex-col items-center justify-center relative"
              >
                <Link href={`/details/${item.media_type}/${item.id}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative"
                  >
                    <div className="absolute top-[-18px] left-[160px]">

                      <ButtonFavorite
                        id={item.id}
                        type={item.media_type as "movie" | "tv"}
                        onClick={saveFavorite}
                        isFavorite={isFavorite(item.id, item.media_type)}
                      />
                    </div>

                    {/* Botão Watched apenas para filmes */}
                    {item.media_type === "movie" && (
                      <div className="absolute top-[-18px] left-[10px]">
                        <ButtonWatched
                          id={item.id}
                          type="movie"
                          onClick={saveWatched}
                          isWatched={isWatched(item.id, "movie")}
                        />
                      </div>
                    )}

                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      width={200}
                      height={200}
                      alt="movie image"
                      className="md:w-full md:h-full rounded-lg object-contain"
                    />
                  </motion.div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-7 " />
          <CarouselNext className="mr-7 " />
        </Carousel>
      )}
    </div>
  );
};

export default Search;