import Image from "next/image";
import Link from "next/link";

export interface PosterItem {
  id: number;
  type: "movie" | "tv";
  title: string;
  year?: string;
  posterPath: string | null;
  rating?: number;
}

export function PosterCard({ item, priority = false }: { item: PosterItem; priority?: boolean }) {
  return (
    <Link
      href={`/details/${item.type}/${item.id}`}
      className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-gray-800">
        {item.posterPath ? (
          <Image
            src={`https://image.tmdb.org/t/p/w342${item.posterPath}`}
            alt={`Pôster de ${item.title}`}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 180px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center p-2 text-center text-sm text-gray-400">{item.title}</div>
        )}
        {typeof item.rating === "number" && item.rating > 0 && (
          <span className="absolute top-2 right-2 rounded-md bg-black/75 px-1.5 py-0.5 text-xs font-semibold text-yellow-300">
            ★ {item.rating.toFixed(1)}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm font-medium leading-tight line-clamp-2 group-hover:text-green-300">{item.title}</p>
      {item.year && <p className="text-xs text-gray-400">{item.year}</p>}
    </Link>
  );
}

export function PosterGrid({ items }: { items: PosterItem[] }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {items.map((it, i) => (
        <li key={`${it.type}-${it.id}`}>
          <PosterCard item={it} priority={i < 6} />
        </li>
      ))}
    </ul>
  );
}

export function PosterRow({ title, href, items }: { title: string; href?: string; items: PosterItem[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-10">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        {href && (
          <Link href={href} className="text-sm text-green-400 hover:text-green-300 shrink-0">
            Ver mais →
          </Link>
        )}
      </div>
      <ul className="flex gap-4 overflow-x-auto pb-3 scrollbar-custom snap-x">
        {items.map((it) => (
          <li key={`${it.type}-${it.id}`} className="w-32 sm:w-36 md:w-40 shrink-0 snap-start">
            <PosterCard item={it} />
          </li>
        ))}
      </ul>
    </section>
  );
}
