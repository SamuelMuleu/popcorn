"use client";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import axios from "axios";
import Image from "next/image";

interface Results {
  name: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  id: number;
}

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Results[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]); // Lista de IDs favoritos
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
              language: "pt-BR",
            },
          }
        );

        setResults(response.data.results);
      } catch (err) {
        setError("Erro ao buscar os resultados.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-10 mt-10 items-center justify-center">
      <div className="text-2xl font-black">O que gostaria de assistir?</div>
      <form className="relative">
        <input
          type="text"
          placeholder="Procure"
          className="w-[336px] pl-12 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FaSearch className="absolute top-3 left-4 text-gray-500" />
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {results.length > 0 && (
        <div className="mt-2 w-[336px] relative bg-gray-800 rounded-md p-4">
          <h3 className="font-bold text-white">Resultados:</h3>

          <ul className="mt-5 space-y-3">
            {results.map((item) => (
              <li
                key={item.id}
                className="text-white flex flex-col items-center justify-center relative"
              >
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute left-[255px] top-1 hover:scale-150"
                >
                  {favorites.includes(item.id) ? (
                    <MdFavorite className="text-red-700" />
                  ) : (
                    <MdFavoriteBorder className="text-gray-400 hover:text-red-700" />
                  )}
                </button>

                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  width={200}
                  height={200}
                  alt="movie image"
                  className="md:w-full md:h-full rounded-lg object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
