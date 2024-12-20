"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { getDoc, doc, updateDoc, arrayRemove } from "firebase/firestore";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MdFavorite } from "react-icons/md";
import { motion } from "motion/react";

interface Favorite {
  id: number;
  type: "movie" | "tv";
  poster_path: string;
  name?: string;
  title?: string;
}

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
}

interface Serie {
  id: number;
  name: string;
  backdrop_path: string;
  poster_path: string;
}

const Library = () => {
  const [movies, setMovies] = useState<Favorite[]>([]);
  const [tvShows, setTvShows] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [movieDetails, setMovieDetails] = useState<Movie[]>([]);
  const [tvShowDetails, setTvShowDetails] = useState<Serie[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, "favorites", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const favorites = data?.favorites || [];

            const favoriteMovies = favorites.filter(
              (fav: Favorite) => fav.type === "movie"
            );
            const favoriteTvShows = favorites.filter(
              (fav: Favorite) => fav.type === "tv"
            );

            setMovies(favoriteMovies);
            setTvShows(favoriteTvShows);

            const movieIds = favoriteMovies.map((movie: Movie) => movie.id);

            const tvShowIds = favoriteTvShows.map((tv: Serie) => tv.id);

            const moviePromises = movieIds.map((id: number) =>
              axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                params: {
                  api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                },
              })
            );

            const tvShowPromises = tvShowIds.map((id: number) =>
              axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
                params: {
                  api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                },
              })
            );

            const movieResponses = await Promise.all(moviePromises);
            const tvShowResponses = await Promise.all(tvShowPromises);

            setMovieDetails(movieResponses.map((res) => res.data));
            setTvShowDetails(tvShowResponses.map((res) => res.data));
          } else {
            setError("Nenhum favorito encontrado.");
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError("Erro ao carregar os favoritos.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchFavorites();
    }
  }, [user]);

  if (!user) {
    return (
      <motion.div
        className="flex items-center font-bold text-gradientColorStops-custom-green justify-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Faça login para Salvar Seus Favoritos
      </motion.div>
    );
  }

  if (loading)
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Carregando favoritos...
      </motion.div>
    );

  if (error)
    return (
      <motion.div
        className="text-red-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error}
      </motion.div>
    );

  const removeFavorite = async (id: number, type: "movie" | "tv") => {
    if (!user) return;

    try {
      const docRef = doc(db, "favorites", user.uid);

      await updateDoc(docRef, {
        favorites: arrayRemove({ id, type }),
      });
      if (type === "movie") {
        setMovies((prev) => prev.filter((fav) => fav.id !== id));
        setMovieDetails((prev) => prev.filter((movie) => movie.id !== id));
      } else if (type === "tv") {
        setTvShows((prev) => prev.filter((fav) => fav.id !== id));
        setTvShowDetails((prev) => prev.filter((tv) => tv.id !== id));
      }
    } catch (error) {
      console.error("Erro ao remover o favorito:", error);
    }
  };

  return (
    <div className="min-h-screen text-white p-7">
      <h1 className="text-2xl font-semibold text-start opacity-25">
        Filmes Preferidos
      </h1>
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {movies.length === 0 ? (
            <div>Você não tem filmes favoritos ainda.</div>
          ) : (
            movieDetails.map((movie: Movie) => (
              <CarouselItem
                key={movie.id}
                className="md:w-[200px] basis-1/1 w-48 basis-1/1 relative p-4 "
              >
                <button onClick={() => removeFavorite(movie.id, "movie")}>
                  <MdFavorite className="absolute md:top-14 right-4 top-14 md:right-4 hover:text-white text-2xl text-red-700 hover:scale-125 transition-transform duration-200" />
                </button>
                <motion.div className="overflow-hidden rounded-lg">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={`Imagem de filme`}
                    width={200}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
                <div className="mt-2 text-center">
                  <p className="font-semibold">{movie.title}</p>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="ml-5 md:ml-56 -mt-10" />
        <CarouselNext className="md:mr-56 mr-5 -mt-10" />
      </Carousel>

      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-2xl font-semibold text-start opacity-25"
      >
        <div className="text-2xl font-semibold mt-10 text-start opacity-25">
          Séries Preferidas
        </div>
        <Carousel className="flex items-center justify-center ">
          <CarouselContent>
            {tvShows.length === 0 ? (
              <div>Você não tem séries favoritas ainda.</div>
            ) : (
              tvShowDetails.map((tv: Serie) => (
                <CarouselItem
                  key={tv.id}
                  className="md:w-[200px] w-48 basis-1/1 relative p-4 "
                >
                  <button onClick={() => removeFavorite(tv.id, "tv")}>
                    <MdFavorite className="absolute md:top-14 right-4 top-14 md:right-4 hover:text-white text-2xl text-red-700 hover:scale-125 transition-transform duration-200" />
                  </button>
                  <motion.div className="overflow-hidden rounded-lg">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                      alt={`Imagem de série`}
                      width={200}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                  <div className="mt-2 text-center">
                    <p className="font-semibold">{tv.name}</p>
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 md:left-10 md:top-1/2 md:translate-y-0 -mt-0" />
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 md:right-10 md:top-1/2 md:translate-y-0 -mt-0" />
        </Carousel>
      </motion.div>
    </div>
  );
};

export default Library;
