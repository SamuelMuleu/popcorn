"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { MdCheckCircle, MdComment } from "react-icons/md";
import Image from "next/image";
import CommentsSection from "./CommentsSection";

interface Episode {
    id: number;
    episode_number: number;
    name: string;
    overview: string;
    still_path: string;
    air_date: string;
}

interface SeasonEpisodesProps {
    seriesId: number;
    seasonNumber: number;
    onToggleWatched: (seriesId: number, season: number, episode: number) => void;
    isEpisodeWatched: (seriesId: number, season: number, episode: number) => boolean;
}

export default function SeasonEpisodes({
    seriesId,
    seasonNumber,
    onToggleWatched,
    isEpisodeWatched
}: SeasonEpisodesProps) {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());

    useEffect(() => {
        const fetchEpisodes = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?language=pt-BR`,
                    {
                        params: {
                            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                        },
                    }
                );
                setEpisodes(response.data.episodes || []);
            } catch (err) {
                console.error("Erro ao carregar episódios:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEpisodes();
    }, [seriesId, seasonNumber]);

    if (loading) {
        return <div className="text-center py-4">Carregando episódios...</div>;
    }

    return (
        <div className="space-y-4">
            {episodes.map((episode) => {
                const watched = isEpisodeWatched(seriesId, seasonNumber, episode.episode_number);

                return (
                    <div
                        key={episode.id}
                        className={`flex gap-4 p-4 rounded-lg transition-all ${watched ? "bg-green-900/20 border border-green-700/30" : "bg-gray-800/50"
                            }`}
                    >
                        {/* Episode Image */}
                        <div className="flex-shrink-0 relative">
                            {episode.still_path ? (
                                <Image
                                    src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                                    width={150}
                                    height={85}
                                    alt={episode.name}
                                    className="rounded-lg object-cover"
                                />
                            ) : (
                                <div className="w-[150px] h-[85px] bg-gray-700 rounded-lg flex items-center justify-center text-gray-500">
                                    Sem imagem
                                </div>
                            )}
                        </div>

                        {/* Episode Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-semibold text-lg">
                                    {episode.episode_number}. {episode.name}
                                </h3>
                                <button
                                    onClick={() => onToggleWatched(seriesId, seasonNumber, episode.episode_number)}
                                    className={`flex-shrink-0 p-2 rounded-full transition-all duration-300 hover:scale-110 ${watched
                                        ? "bg-green-700 hover:bg-green-800"
                                        : "bg-gray-700 hover:bg-green-800"
                                        }`}
                                    aria-label={watched ? "Marcar como não assistido" : "Marcar como assistido"}
                                >
                                    <MdCheckCircle className="text-white text-xl" />
                                </button>
                            </div>
                            {episode.overview && (
                                <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                                    {episode.overview}
                                </p>
                            )}
                            {episode.air_date && (
                                <p className="text-xs text-gray-400 mt-1">
                                    Lançamento: {new Date(episode.air_date).toLocaleDateString("pt-BR")}
                                </p>
                            )}

                            {/* Botão para expandir comentários */}
                            <button
                                onClick={() => {
                                    const newExpanded = new Set(expandedComments);
                                    if (expandedComments.has(episode.episode_number)) {
                                        newExpanded.delete(episode.episode_number);
                                    } else {
                                        newExpanded.add(episode.episode_number);
                                    }
                                    setExpandedComments(newExpanded);
                                }}
                                className="mt-3 flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
                            >
                                <MdComment size={18} />
                                {expandedComments.has(episode.episode_number)
                                    ? "Ocultar comentários"
                                    : "Ver comentários"
                                }
                            </button>

                            {/* Seção de comentários expandível */}
                            {expandedComments.has(episode.episode_number) && (
                                <div className="mt-4 pt-4 border-t border-gray-700">
                                    <CommentsSection
                                        contentId={episode.id}
                                        contentType="episode"
                                        seriesId={seriesId}
                                        season={seasonNumber}
                                        episode={episode.episode_number}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
