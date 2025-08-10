"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import axios from "axios";
import Image from "next/image";
 import Link from "next/link";
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

        setResults(response.data.results);
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
          await updateDoc(userFavoritesRef, {
            favorites: arrayUnion(newFavorite),
          });
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

  return (
    <div className="flex flex-col gap-10 mt-10 items-center justify-center">
      <div className="text-2xl font-black">O que gostaria de assistir?</div>
      <form className="relative" onSubmit={(e: React.FormEvent<HTMLFormElement>)=>
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
        <Carousel className="mt-2 w-[336px] relative bg-gray-800 rounded-md p-4">
          <h1 className="text-2xl font-semibold text-start opacity-25">
            Resultados:
          </h1>

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
                 transition={{ duration: 0.7 }}>

                <button
  onClick={(e) => {
   
    e.preventDefault();
 
    e.stopPropagation(); 

    saveFavorite(item.id, item.media_type as "movie" | "tv");
  }}
  className="absolute top-4 right-1 md:top-1 z-10 hover:scale-150"
>
  <MdFavorite
    className={`${
      isFavorite(item.id, item.media_type)
        ? "text-red-700"
        : "text-white"
    } hover:scale-150`}
  />
</button>

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
