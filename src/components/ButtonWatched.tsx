import { MdCheckCircle } from "react-icons/md";

interface ButtonWatchedProps {
    id: number;
    type: "movie" | "tv";
    onClick: (id: number, type: "movie" | "tv") => void;
    isWatched?: boolean;
}

export default function ButtonWatched({ id, type, onClick, isWatched = false }: ButtonWatchedProps) {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(id, type);
    };

    return (
        <button
            onClick={handleClick}
            aria-label={isWatched ? "Remover de assistidos" : "Marcar como assistido"}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${isWatched
                ? "bg-green-700 hover:bg-green-800"
                : "bg-black/60 hover:bg-green-800"
                }`}
        >
            <MdCheckCircle className="text-white text-xl" />
        </button>
    );
}
