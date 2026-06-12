import { libraryRoutes } from "@/server/library-routes";
import { tmdbRoutes } from "@/server/tmdb-routes";
import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ContentfulStatusCode } from "hono/utils/http-status";

type ApiBindings = { Bindings: CloudflareBindings };

export const apiRoutes = new Hono<ApiBindings>()
  .use(
    "*",
    cors({
      origin: (origin, c) => {
        const raw = String(c.env.CORS_ORIGINS ?? c.env.BETTER_AUTH_URL ?? "http://localhost:3072");
        const allowed = raw
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean);
        if (!origin) return allowed[0];
        return allowed.includes(origin) ? origin : allowed[0];
      },
      credentials: true,
      allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      maxAge: 86400,
    }),
  )
  .get("/health", (c) =>
    c.json({
      ok: true,
      service: "cinefam",
    }),
  )
  .route("/tmdb", tmdbRoutes)
  .route("/library", libraryRoutes)
  .onError((error, c) => {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = (error as { status?: number }).status ?? 500;
    return c.json({ message }, status as ContentfulStatusCode);
  });

export const honoApp = new Hono<ApiBindings>().route("/api", apiRoutes);

export type HonoAppType = typeof honoApp;
