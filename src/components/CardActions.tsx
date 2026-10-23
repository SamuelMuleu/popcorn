"use client";

import ButtonFavorite from "@/components/ButtonFavorite";
import ButtonWatched from "@/components/ButtonWatched";
import { useUserLists } from "@/app/context/UserListsContext";

/** Botões padrão de todo card: assistido (esquerda) e favorito (direita). */
export default function CardActions({ id, type, title }: { id: number; type: "movie" | "tv"; title: string }) {
  const { isFavorite, isWatched, toggleFavorite, toggleWatched } = useUserLists();
  return (
    <>
      <ButtonWatched id={id} type={type} title={title} onClick={toggleWatched} isWatched={isWatched(id, type)} />
      <ButtonFavorite id={id} type={type} title={title} onClick={toggleFavorite} isFavorite={isFavorite(id, type)} />
    </>
  );
}
