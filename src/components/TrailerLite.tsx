"use client";

import { useState } from "react";
import { FaPlay } from "react-icons/fa";

/**
 * Mostra a capa do trailer e só carrega o player do YouTube (~700 KB) quando a pessoa clica.
 */
export default function TrailerLite({ videoKey, title }: { videoKey: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full rounded-lg"
        src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0`}
        title={`Trailer de ${title}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Assistir ao trailer de ${title}`}
      className="group absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- miniatura do YouTube, já otimizada na origem */}
      <img
        src={`https://i.ytimg.com/vi/${videoKey}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-black/70 text-white shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-transform duration-200 group-hover:scale-105 group-hover:bg-red-600">
        <FaPlay aria-hidden="true" size={22} className="ml-1" />
      </span>
    </button>
  );
}
