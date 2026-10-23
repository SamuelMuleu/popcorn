"use client";

import { useEffect, useState } from "react";

interface VideoBackgroundProps {
  src: string;
  poster: string;
  overlayOpacity?: number;
}

/**
 * Fundo da página. Mostra uma imagem leve (poster) de imediato e só carrega o vídeo
 * em telas grandes, sem economia de dados e sem "reduzir movimento".
 * Antes era um vídeo 4K de 78 MB baixado em toda página, inclusive no celular.
 */
export default function VideoBackground({ src, poster, overlayOpacity = 0.6 }: VideoBackgroundProps) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bigScreen = window.matchMedia("(min-width: 1024px)").matches;
    setShowVideo(bigScreen && !reduceMotion && !nav.connection?.saveData);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-20 bg-cover bg-center bg-[#0b1215]"
        style={{ backgroundImage: `url(${poster})` }}
      />
      {showVideo && (
        <video
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={poster}
          className="fixed inset-0 w-full h-full object-cover -z-20"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div aria-hidden="true" className="fixed inset-0 bg-black -z-10" style={{ opacity: overlayOpacity }} />
    </>
  );
}
