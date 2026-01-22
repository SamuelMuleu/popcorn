"use client";

import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
    src: string;
    overlayOpacity?: number;
}

export default function VideoBackground({
    src,
    overlayOpacity = 0.6
}: VideoBackgroundProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Garante que o vídeo toque mesmo se houver problemas de autoplay
        const playVideo = async () => {
            try {
                await video.play();
            } catch (error) {
                console.log("Autoplay bloqueado pelo navegador:", error);
                // Tenta novamente após interação do usuário
                const handleInteraction = async () => {
                    try {
                        await video.play();
                        document.removeEventListener("click", handleInteraction);
                        document.removeEventListener("touchstart", handleInteraction);
                    } catch (err) {
                        console.log("Não foi possível reproduzir o vídeo:", err);
                    }
                };

                document.addEventListener("click", handleInteraction, { once: true });
                document.addEventListener("touchstart", handleInteraction, { once: true });
            }
        };

        // Aguarda o vídeo estar pronto
        if (video.readyState >= 3) {
            playVideo();
        } else {
            video.addEventListener("loadeddata", playVideo, { once: true });
        }

        // Previne pausas acidentais
        const handlePause = () => {
            if (!video.ended) {
                video.play().catch(() => { });
            }
        };

        video.addEventListener("pause", handlePause);

        return () => {
            video.removeEventListener("pause", handlePause);
        };
    }, []);

    return (
        <>
            {/* Vídeo de fundo */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="fixed top-0 left-0 w-full h-full object-cover -z-20"
                style={{
                    // Otimizações de performance
                    willChange: "auto",
                    transform: "translateZ(0)", // Force GPU acceleration
                }}
            >
                <source src={src} type="video/mp4" />
            </video>

            {/* Overlay escuro */}
            <div
                className="fixed top-0 left-0 w-full h-full bg-black -z-10"
                style={{ opacity: overlayOpacity }}
            />
        </>
    );
}
