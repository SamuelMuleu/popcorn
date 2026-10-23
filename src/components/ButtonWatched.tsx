import { MdCheck, MdOutlineVisibility } from "react-icons/md";

interface ButtonWatchedProps {
  id: number;
  type: "movie" | "tv";
  onClick: (id: number, type: "movie" | "tv") => void;
  isWatched?: boolean;
  /** Nome do título, para o leitor de tela */
  title?: string;
}

export default function ButtonWatched({ id, type, onClick, isWatched = false, title }: ButtonWatchedProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(id, type);
  };
  const label = isWatched
    ? `Desmarcar ${title ? `${title} ` : ""}como assistido`
    : `Marcar ${title ? `${title} ` : ""}como assistido`;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      aria-pressed={isWatched}
      title={isWatched ? "Assistido" : "Marcar como assistido"}
      className={`card-action ${isWatched ? "bg-emerald-600 text-white hover:bg-emerald-500" : "bg-black/65 text-white hover:bg-black/85"}`}
    >
      {isWatched ? <MdCheck aria-hidden="true" size={20} /> : <MdOutlineVisibility aria-hidden="true" size={20} />}
    </button>
  );
}
