import { Hono } from "hono";

type TmdbBindings = { Bindings: CloudflareBindings };

const TMDB_BASE = "https://api.themoviedb.org/3";

async function tmdbFetch(path: string, apiKey: string, search = "") {
  const url = new URL(`${TMDB_BASE}${path}`);
  url.searchParams.set("api_key", apiKey);
  if (search) {
    const extra = new URLSearchParams(search);
    extra.forEach((value, key) => url.searchParams.set(key, value));
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw Object.assign(new Error(`TMDB request failed: ${response.status}`), {
      status: response.status,
    });
  }
  return response.json();
}

export const tmdbRoutes = new Hono<TmdbBindings>()
  .get("/discover/movie", async (c) => {
    const apiKey = c.env.TMDB_API_KEY;
    if (!apiKey) return c.json({ message: "TMDB_API_KEY not configured" }, 503);
    const data = await tmdbFetch("/discover/movie", apiKey, c.req.url.split("?")[1] ?? "");
    return c.json(data);
  })
  .get("/discover/tv", async (c) => {
    const apiKey = c.env.TMDB_API_KEY;
    if (!apiKey) return c.json({ message: "TMDB_API_KEY not configured" }, 503);
    const data = await tmdbFetch("/discover/tv", apiKey, c.req.url.split("?")[1] ?? "");
    return c.json(data);
  })
  .get("/search/multi", async (c) => {
    const apiKey = c.env.TMDB_API_KEY;
    if (!apiKey) return c.json({ message: "TMDB_API_KEY not configured" }, 503);
    const data = await tmdbFetch("/search/multi", apiKey, c.req.url.split("?")[1] ?? "");
    return c.json(data);
  })
  .get("/movie/:id", async (c) => {
    const apiKey = c.env.TMDB_API_KEY;
    if (!apiKey) return c.json({ message: "TMDB_API_KEY not configured" }, 503);
    const data = await tmdbFetch(`/movie/${c.req.param("id")}`, apiKey);
    return c.json(data);
  })
  .get("/tv/:id", async (c) => {
    const apiKey = c.env.TMDB_API_KEY;
    if (!apiKey) return c.json({ message: "TMDB_API_KEY not configured" }, 503);
    const data = await tmdbFetch(`/tv/${c.req.param("id")}`, apiKey);
    return c.json(data);
  });
