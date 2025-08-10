"use client";

import { MdFavorite } from "react-icons/md";

// Define as propriedades que o componente vai receber
interface ButtonFavoriteProps {
  id: number;
  type: "movie" | "tv";
  onClick: (id: number, type: "movie" | "tv") => void;
}

export default function ButtonFavorite({ id, type, onClick }: ButtonFavoriteProps) {
  
  // Função para lidar com o clique
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Impede que o clique no botão ative o Link que o envolve
    e.preventDefault(); 
    e.stopPropagation();

    // Chama a função que foi passada pelo componente pai
    onClick(id, type);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Remover dos favoritos"
      className="absolute top-6 right-5 z-10 p-2 bg-red-700 rounded-full transition-all duration-300 hover:bg-black/60 hover:scale-110"
    >
      <MdFavorite className="text-white text-xl " />
    </button>
  );
}