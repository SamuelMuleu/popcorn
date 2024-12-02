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
import { MdFavorite } from "react-icons/md";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path:string;
}
interface Serie {
  id: number;
  name: string;
  backdrop_path: string;
  poster_path:string;
}

const MovieCard = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [series, setSeries] = useState<Serie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
              language: "pt-BR",
            },
          }
        );
        setMovies(response.data.results);
        console.log(response.data.results)
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
      <h1 className="text-2xl font-semibold mb-6 text-center">
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
            <CarouselItem key={movie.id} className=" basis-1/3 relative ">
              <div className="p-2 flex flex-col items-center justify-center">
                <div className="w-full h-40 overflow-hidden rounded-2xl">
                <MdFavorite className="absolute left-[305px] hover:text-red-700  hover:scale-150  "/>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    width={400}
                    height={400}
                    alt="movie image"
                    className="md:w-full md:h-full w-36 h-36 object-cover md:object-contain"
                  />
                </div>
                <p>{movie.title}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-5 -mt-16" />
        <CarouselNext className="mr-5 -mt-16" />
      </Carousel>

      {/*Series*/}
      <div>
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Series Populares
        </h1>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {series.map((serie) => (
              <CarouselItem key={serie.id} className=" basis-1/3 relative ">
                <div className="p-2 flex flex-col items-center justify-center">
                  <div className="w-full h-40 overflow-hidden rounded-xl">
                  <MdFavorite className="absolute left-[305px] hover:text-red-700  hover:scale-150  "/>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                      width={200}
                      height={200}
                      alt="movie image"
                        className="md:w-full md:h-full w-36 h-36 object-cover md:object-contain"
                    />
                  </div>
                  <p className="text-white">{serie.name}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-5 -mt-16" />
          <CarouselNext className="mr-5 -mt-16" />
        </Carousel>
      </div>
    </div>
  );
};

export default MovieCard;
