"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import AdSlot from "@/components/AdSlot";
import { PosterGrid, type PosterItem } from "@/components/PosterCard";
import { AD_SLOTS } from "@/lib/adsense";

interface Result {
  id: number;
  media_type: string;
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
}

const toItem = (r: Result): PosterItem => ({
  id: r.id,
  type: r.media_type === "tv" ? "tv" : "movie",
  title: r.title || r.name || "",
  year: (r.release_date || r.first_air_date || "").slice(0, 4),
  posterPath: r.poster_path,
  rating: r.vote_average,
});

export default function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState<string>(searchParams.get("q") || "");
  const [results, setResults] = useState<PosterItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) {
      setResults([]);
      setLoading(false);
      setError(null);
      setSearched("");
      return;
    }

    // Espera o usuário parar de digitar e cancela a busca anterior,
    // para uma resposta antiga não sobrescrever a mais recente.
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      router.replace(`/search?q=${encodeURIComponent(term)}`, { scroll: false });
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://api.themoviedb.org/3/search/multi", {
          signal: controller.signal,
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            query: term,
            // pt-BR faz o TMDB devolver e ranquear pelo título brasileiro
            language: "pt-BR",
            region: "BR",
            include_adult: false,
          },
        });
        const list: Result[] = response.data.results || [];
        setResults(
          list
            .filter((r) => (r.media_type === "movie" || r.media_type === "tv") && r.poster_path)
            .map(toItem)
        );
        setSearched(term);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError("Não foi possível buscar agora. Verifique sua conexão e tente de novo.");
        console.error(err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, router]);

  const term = query.trim();
  const showEmpty = !loading && !error && searched !== "" && searched === term && results.length === 0;

  return (
    <div className="max-w-6xl mx-auto pt-6">
      <h1 className="text-3xl md:text-4xl font-black">Buscar filmes e séries</h1>
      <p className="mt-2 text-gray-300">Pesquise pelo título em português ou pelo original.</p>

      <form
        role="search"
        className="relative mt-6 max-w-xl"
        onSubmit={(e) => {
          e.preventDefault();
          inputRef.current?.blur();
        }}
      >
        <label htmlFor="busca" className="sr-only">Buscar filme ou série</label>
        <FaSearch aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          id="busca"
          type="search"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          autoFocus
          placeholder="Ex.: Ainda Estou Aqui, Breaking Bad..."
          className="w-full h-12 rounded-xl border border-white/10 bg-gray-900/80 pl-11 pr-4 text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        />
      </form>

      <div className="mt-8" aria-live="polite">
        {loading && <p className="text-gray-300">Buscando…</p>}
        {error && <p className="text-red-400">{error}</p>}
        {showEmpty && (
          <p className="text-gray-300">
            Nenhum filme ou série encontrado para &quot;{term}&quot;. Confira a grafia ou tente o título original.
          </p>
        )}
        {!loading && results.length > 0 && (
          <p className="mb-4 text-sm text-gray-400">
            {results.length} resultado{results.length > 1 ? "s" : ""} para &quot;{searched}&quot;
          </p>
        )}
      </div>

      {results.length > 0 && <PosterGrid items={results} withActions />}

      {/* Só mostra anúncio quando há resultados (política do AdSense: sem anúncio em tela vazia) */}
      {results.length > 0 && <AdSlot slot={AD_SLOTS.search} />}
    </div>
  );
}
