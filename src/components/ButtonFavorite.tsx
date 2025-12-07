import { MdFavorite } from "react-icons/md";

interface ButtonFavoriteProps {
  id: number;
  type: "movie" | "tv";
  onClick: (id: number, type: "movie" | "tv") => void;
  isFavorite?: boolean; // Opcional para manter compatibilidade
}

export default function ButtonFavorite({ id, type, onClick, isFavorite = true }: ButtonFavoriteProps) {
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    e.stopPropagation();
    onClick(id, type);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={`absolute top-5 right-4 z-10 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
        isFavorite 
          ? "bg-red-700 hover:bg-red-800" 
          : "bg-green-800 hover:bg-green-900"
      }`}
    >
      <MdFavorite className="text-white text-xl" />
    </button>
  );
}