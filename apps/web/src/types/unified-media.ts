export type MediaType = "movie" | "tv";

export interface UnifiedMediaItem {
  id: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids?: number[];
  vote_average: number;
  vote_count: number;
  media_type: MediaType;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  release_date?: string;
  first_air_date?: string;
  imdb_id?: string | null;
  in_watchlist?: boolean;
  watched?: boolean;
}

export function isMovie(item: UnifiedMediaItem): item is UnifiedMediaItem & { media_type: "movie" } {
  return item.media_type === "movie";
}

export function getDisplayTitle(item: UnifiedMediaItem): string {
  if (isMovie(item)) {
    return item.title ?? item.original_title ?? "Unknown Movie";
  }
  return item.name ?? item.original_name ?? "Unknown Show";
}

export function getReleaseYear(item: UnifiedMediaItem): string | undefined {
  const date = isMovie(item) ? item.release_date : item.first_air_date;
  if (!date) return undefined;
  return new Date(date).getFullYear().toString();
}

export function getPosterUrl(path: string | null, size: "w185" | "w342" | "w500" = "w342"): string | null {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
