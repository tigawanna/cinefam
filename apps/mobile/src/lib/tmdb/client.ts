import { env } from "@/lib/env";

const apiBase = env.EXPO_PUBLIC_API_URL;

export async function discoverMovies(page = 1) {
  const response = await fetch(`${apiBase}/api/tmdb/discover/movie?page=${page}`);
  if (!response.ok) throw new Error("Failed to fetch movies");
  return response.json();
}

export async function discoverTv(page = 1) {
  const response = await fetch(`${apiBase}/api/tmdb/discover/tv?page=${page}`);
  if (!response.ok) throw new Error("Failed to fetch TV shows");
  return response.json();
}

export async function searchMulti(query: string) {
  const response = await fetch(
    `${apiBase}/api/tmdb/search/multi?query=${encodeURIComponent(query)}`,
  );
  if (!response.ok) throw new Error("Failed to search");
  return response.json();
}
