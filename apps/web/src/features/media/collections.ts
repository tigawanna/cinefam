import { clientEnv } from "@/lib/client-env";

export type TmdbDiscoverItem = {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
};

export type UserMediaStatus = {
  tmdb_id: number;
  media_type: "movie" | "tv";
  in_watchlist: boolean;
  watched: boolean;
  watchlist_ids: string[];
};

const apiBase = clientEnv.VITE_API_URL;

export async function fetchDiscoverMovies(): Promise<TmdbDiscoverItem[]> {
  const response = await fetch(`${apiBase}/api/tmdb/discover/movie`);
  if (!response.ok) throw new Error("Failed to fetch TMDB discover");
  const data = (await response.json()) as { results: TmdbDiscoverItem[] };
  return data.results.map((item) => ({
    ...item,
    media_type: "movie" as const,
  }));
}
