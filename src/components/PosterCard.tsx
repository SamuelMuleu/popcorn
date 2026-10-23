import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FaStar } from "react-icons/fa";
import CardActions from "@/components/CardActions";

export interface PosterItem {
  id: number;
  type: "movie" | "tv";
  title: string;
  year?: string;
  posterPath: string | null;
  rating?: number;
}

interface PosterCardProps {
  item: PosterItem;
  priority?: boolean;
  /** Mostra os botões padrão de assistido/favorito */
  withActions?: boolean;
  /** Selo no canto inferior direito do pôster (ex.: "12 de 40 eps", "Completa") */
  badge?: ReactNode;
  /** Linha extra abaixo do título */
  note?: ReactNode;
}

/**
 * Card padrão do site. O link cobre pôster e título; os botões ficam fora do link
 * (botão dentro de link é inválido e confunde leitor de tela e teclado).
 */
export function PosterCard({ item, priority = false, withActions = false, badge, note }: PosterCardProps) {
  const typeLabel = item.type === "movie" ? "Filme" : "Série";
  return (
    <div className="group relative">
      <Link
        href={`/details/${item.type}/${item.id}`}
        prefetch={false}
        className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1215]"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-gray-800 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)]">
          {item.posterPath ? (
            <Image
              src={`https://image.tmdb.org/t/p/w342${item.posterPath}`}
              alt={`Pôster de ${item.title}`}
              fill
              unoptimized
              loading={priority ? undefined : "lazy"}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              priority={priority}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-3 text-center text-sm text-gray-300">{item.title}</div>
          )}
          {/* Degradê só embaixo para os selos ficarem legíveis sobre qualquer pôster */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
          {typeof item.rating === "number" && item.rating > 0 && (
            <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-amber-300">
              <FaStar aria-hidden="true" size={10} />
              <span className="sr-only">Nota </span>
              {item.rating.toFixed(1)}
            </span>
          )}
          {badge && (
            <span className="absolute bottom-2 right-2 rounded-md bg-emerald-600 px-1.5 py-0.5 text-xs font-semibold text-white">
              {badge}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm font-semibold leading-snug line-clamp-2 text-gray-100 group-hover:text-green-300">
          {item.title}
        </p>
        <p className="text-xs text-gray-400">
          {typeLabel}
          {item.year && ` · ${item.year}`}
        </p>
        {note && <p className="mt-0.5 text-xs text-emerald-300">{note}</p>}
      </Link>

      {withActions && (
        <div className="absolute inset-x-2 top-2 z-10 flex items-start justify-between">
          <CardActions id={item.id} type={item.type} title={item.title} />
        </div>
      )}
    </div>
  );
}

const gridCols = "grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";

export function PosterGrid({
  items,
  withActions = false,
  badgeFor,
  noteFor,
}: {
  items: PosterItem[];
  withActions?: boolean;
  badgeFor?: (item: PosterItem) => ReactNode;
  noteFor?: (item: PosterItem) => ReactNode;
}) {
  return (
    <ul className={gridCols}>
      {items.map((it, i) => (
        <li key={`${it.type}-${it.id}`}>
          <PosterCard
            item={it}
            priority={i < 6}
            withActions={withActions}
            badge={badgeFor?.(it)}
            note={noteFor?.(it)}
          />
        </li>
      ))}
    </ul>
  );
}

export function PosterRow({
  title,
  href,
  items,
  withActions = false,
  id,
}: {
  title: string;
  href?: string;
  items: PosterItem[];
  withActions?: boolean;
  id?: string;
}) {
  if (!items.length) return null;
  return (
    <section className="mt-10 scroll-mt-20" id={id}>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-balance">{title}</h2>
        {href && (
          <Link href={href} prefetch={false} className="shrink-0 py-2 text-sm text-green-400 hover:text-green-300">
            Ver mais →
          </Link>
        )}
      </div>
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 pt-1 scrollbar-custom md:mx-0 md:px-0">
        {items.map((it) => (
          <li key={`${it.type}-${it.id}`} className="w-36 shrink-0 snap-start sm:w-40 md:w-44">
            <PosterCard item={it} withActions={withActions} />
          </li>
        ))}
      </ul>
    </section>
  );
}
