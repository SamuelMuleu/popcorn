import type { PosterItem } from "@/components/PosterCard";
import { type MediaItem, type MediaType, titleOf, typeOf, yearOf } from "./tmdb";

export const toPoster = (m: MediaItem, fallback: MediaType): PosterItem => ({
  id: m.id,
  type: typeOf(m, fallback),
  title: titleOf(m),
  year: yearOf(m),
  posterPath: m.poster_path,
  rating: m.vote_average,
});

export const toPosters = (list: MediaItem[], fallback: MediaType, limit = 20) =>
  list.slice(0, limit).map((m) => toPoster(m, fallback));
