import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

interface ButtonFavoriteProps {
  id: number;
  type: "movie" | "tv";
  onClick: (id: number, type: "movie" | "tv") => void;
  isFavorite?: boolean;
  /** Nome do título, para o leitor de tela dizer "Adicionar X aos favoritos" */
  title?: string;
}

export default function ButtonFavorite({ id, type, onClick, isFavorite = false, title }: ButtonFavoriteProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(id, type);
  };
  const label = isFavorite
    ? `Remover ${title ? `${title} ` : ""}dos favoritos`
    : `Adicionar ${title ? `${title} ` : ""}aos favoritos`;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      aria-pressed={isFavorite}
      title={isFavorite ? "Nos favoritos" : "Favoritar"}
      className={`card-action ${isFavorite ? "bg-rose-600 text-white hover:bg-rose-500" : "bg-black/65 text-white hover:bg-black/85"}`}
    >
      {isFavorite ? <MdFavorite aria-hidden="true" size={20} /> : <MdFavoriteBorder aria-hidden="true" size={20} />}
    </button>
  );
}
