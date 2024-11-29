"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Movies {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
}

interface Series {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
}

const MovieCard = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        console.log(err);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchTv = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        setSeries(response.data.results);
      } catch (err) {
        setError("Failed to fetch series. Please try again later.");
        console.log(err);
      }
    };
    fetchTv();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="">
      <p className="text-2xl font-bold mb-4 text-white opacity-35">Movies</p>

      {/* Input */}
      <div className="mb-6">
        <input
          type="text"
          className="rounded-lg w-[268px] bg-background_input border-t-2 border-r-2 border-l-2 border-green-200 focus:outline-1 pl-8 py-1 focus:outline-green-200 px-2 placeholder:text-lg"
          placeholder="Procure"
        />
      </div>

      {/* Lista de Filmes */}
      <Carousel className="flex mt-6 flex-wrap">
        <CarouselContent className="">
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="basis-1/3 flex items-center justify-center flex-col"
            >
              <div className="relative w-24 h-40">
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={`Poster of ${movie.title}`}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="mt-2 text-white opacity-70">{movie.title}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <p className="text-2xl font-bold mb-4 text-white opacity-35">Series</p>

      {/* Lista de Séries */}
      <Carousel className="flex mt-6 flex-wrap">
        <CarouselContent className="">
          {series.map((tv) => (
            <CarouselItem
              key={tv.id}
              className="basis-1/3 flex items-center justify-center flex-col"
            >
              <div className="relative w-24 h-40">
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  src={`https://image.tmdb.org/t/p/w500${tv.backdrop_path}`}
                  alt={`Poster of ${tv.title}`}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="mt-2 text-white opacity-70">{tv.title}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MovieCard;
