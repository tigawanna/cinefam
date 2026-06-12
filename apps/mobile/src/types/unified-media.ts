export type MediaType = "movie" | "tv";

export interface UnifiedMediaItem {
  id: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  media_type: MediaType;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  in_watchlist?: boolean;
  watched?: boolean;
}

export function getDisplayTitle(item: UnifiedMediaItem): string {
  return item.title ?? item.name ?? "Unknown";
}

export function getPosterUrl(path: string | null, size: "w185" | "w342" | "w500" = "w342"): string | null {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
