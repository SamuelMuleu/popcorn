"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Movies {
  id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
}

const Page = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
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

    fetchPopularMovies();
  }, []);
  console.log(movies);

  if (error) return <div>{error}</div>;
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Popular Movies</h1>
      <ul className="space-y-4">
        {movies.map((movie) => (
          <li key={movie.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p>Rating: {movie.vote_average}</p>
            <div className="relative w-full h-64">

            <Image
              layout="fill"
              objectFit="contain"
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full  rounded"
            />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
