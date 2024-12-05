"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db, auth } from "@/lib/firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { MdFavorite } from "react-icons/md";

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

const MovieCard = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Serie[]>([]);
  const [error, setError] = useState<string | null>(null);

  const saveFavorite = async (movieId: number) => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userFavoritesRef = doc(db, "favorites", userId);

      try {
        const docSnap = await getDoc(userFavoritesRef);
        if (docSnap.exists()) {
          await updateDoc(userFavoritesRef, {
            favorites: arrayUnion(movieId),
          });
        } else {
          await setDoc(userFavoritesRef, {
            favorites: [movieId],
          });
        }
      } catch (err) {
        console.error("Erro ao salvar favorito: ", err || err);
      }
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
          {
            params: {
              api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,

              language: "pt-BR",
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
          `https://api.themoviedb.org/3/discover/tv`,
          {
            params: {
              api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
              language: "pt-BR",
              page: "1",
            },
          }
        );
        setSeries(response.data.results);
      } catch (err) {
        setError("Erro ao carregar filmes. Tente novamente mais tarde.");
        console.error(err);
      }
    };

    fetchSeries();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen text-white p-4">
      <h1 className="text-2xl font-semibold mb-6  text-start opacity-25">
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
              className="flex-shrink-0 basis-1/1 w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px] "
            >
              <div className="p-2 flex flex-col items-center justify-center">
                <div className="w-full overflow-hidden flex flex-col justify-center   rounded-2xl relative">
                  <button onClick={() => saveFavorite(movie.id)}>
                    {" "}
                    <MdFavorite className="absolute md:top-0 right-0 top-0 md:right-[9.5rem] text-white text-2xl hover:text-red-700 hover:scale-125 transition-transform duration-200" />
                  </button>
                
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      width={200}
                      height={300}
                      alt="movie image"
                      className="w-full h-auto object-cover sm:w-[150px] sm:h-[225px] md:w-[200px] md:h-[300px] lg:w-[250px] lg:object-contain lg:h-[275px]"
                    />
                 
                  <p className="flex justify-center  md:ml-14 md:mt-4 w-full md:max-w-40">
                    {movie.title}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-5 md:ml-0 -mt-10" />
        <CarouselNext className="md:mr-0 mr-5 -mt-10" />
      </Carousel>

      {/* Series */}
      <div className="mt-4">
        <h1 className="text-2xl font-semibold mb-4  text-start opacity-25">
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
                <div className="p-2 flex flex-col items-center justify-center">
                  <div className="w-full overflow-hidden rounded-2xl relative mb-10">
               
                    <button onClick={() => saveFavorite(serie.id)}>
                    <MdFavorite className="absolute md:top-6 right-0 top-6 md:right-[9.5rem] text-white text-2xl hover:text-red-700 hover:scale-125 transition-transform duration-200" />
                    </button>
                   

                      <Image
                        src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                        width={200}
                        height={300}
                        alt="serie image"
                        className="w-full h-auto object-cover sm:w-[150px] sm:h-[225px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:object-contain lg:h-[275px]"
                      />
      
                    <p className="flex justify-center  md:ml-14 md:mt-4 w-full md:max-w-40">
                      {serie.name}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-5 md:ml-2 -mt-10" />
          <CarouselNext className="md:-mr-1 mr-5 -mt-10" />
        </Carousel>
      </div>
    </div>
  );
};

export default MovieCard;
