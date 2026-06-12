import { createDb } from "@/db/postgres";
import { getAuth } from "@/lib/auth";
import {
  mediaItems,
  watchedEntries,
  watchlistEntries,
  watchlists,
} from "@cinefam/db/schema";
import type { LibrarySnapshot } from "@cinefam/db/types";
import { and, eq, inArray } from "drizzle-orm";
import { Hono } from "hono";

type LibraryBindings = { Bindings: CloudflareBindings };

async function requireUser(c: { env: CloudflareBindings; req: { raw: Request } }) {
  const auth = getAuth();
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session?.user) {
    return null;
  }
  return session.user;
}

function toIso(value: Date | string | null | undefined): string {
  if (!value) return new Date().toISOString();
  return value instanceof Date ? value.toISOString() : value;
}

export const libraryRoutes = new Hono<LibraryBindings>()
  .get("/snapshot", async (c) => {
    const user = await requireUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const db = createDb(c.env);
    const userWatchlists = await db
      .select()
      .from(watchlists)
      .where(eq(watchlists.ownerId, user.id));

    const watchlistIds = userWatchlists.map((row) => row.id);
    const entries =
      watchlistIds.length > 0
        ? await db
            .select()
            .from(watchlistEntries)
            .where(inArray(watchlistEntries.watchlistId, watchlistIds))
        : [];

    const itemIds = [...new Set(entries.map((row) => row.itemId))];
    const items =
      itemIds.length > 0
        ? await db.select().from(mediaItems).where(inArray(mediaItems.id, itemIds))
        : [];

    const watched = await db
      .select()
      .from(watchedEntries)
      .where(eq(watchedEntries.userId, user.id));

    const snapshot: LibrarySnapshot = {
      watchlists: userWatchlists.map((row) => ({
        id: row.id,
        title: row.title,
        overview: row.overview,
        ownerId: row.ownerId,
        visibility: row.visibility,
        isCollaborative: row.isCollaborative,
        updatedAt: toIso(row.updatedAt),
        createdAt: toIso(row.createdAt),
      })),
      mediaItems: items.map((row) => ({
        id: row.id,
        tmdbId: row.tmdbId,
        mediaType: row.mediaType,
        title: row.title,
        posterPath: row.posterPath,
        backdropPath: row.backdropPath,
        releaseDate: row.releaseDate,
        voteAverage: row.voteAverage,
        genreIds: row.genreIds,
        imdbId: row.imdbId,
        addedBy: row.addedBy,
        updatedAt: toIso(row.updatedAt),
        createdAt: toIso(row.createdAt),
      })),
      watchedEntries: watched.map((row) => ({
        id: row.id,
        userId: row.userId,
        itemId: row.itemId,
        watchedAt: toIso(row.watchedAt),
        personalRating: row.personalRating,
        notes: row.notes,
        updatedAt: toIso(row.updatedAt),
      })),
      syncedAt: new Date().toISOString(),
    };

    return c.json(snapshot);
  })
  .get("/watchlists", async (c) => {
    const user = await requireUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const db = createDb(c.env);
    const rows = await db.select().from(watchlists).where(eq(watchlists.ownerId, user.id));
    return c.json({ watchlists: rows });
  })
  .post("/watchlists", async (c) => {
    const user = await requireUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const body = (await c.req.json()) as {
      id: string;
      title: string;
      overview?: string;
      visibility?: "public" | "private" | "followers_only";
      isCollaborative?: boolean;
    };

    if (!body.id || !body.title) {
      return c.json({ error: "id and title are required" }, 400);
    }

    const db = createDb(c.env);
    const [row] = await db
      .insert(watchlists)
      .values({
        id: body.id,
        title: body.title,
        overview: body.overview ?? null,
        ownerId: user.id,
        visibility: body.visibility ?? "private",
        isCollaborative: body.isCollaborative ?? false,
      })
      .onConflictDoUpdate({
        target: watchlists.id,
        set: {
          title: body.title,
          overview: body.overview ?? null,
          visibility: body.visibility ?? "private",
          isCollaborative: body.isCollaborative ?? false,
          updatedAt: new Date(),
        },
      })
      .returning();

    return c.json({ watchlist: row });
  })
  .delete("/watchlists/:id", async (c) => {
    const user = await requireUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const db = createDb(c.env);
    await db
      .delete(watchlists)
      .where(and(eq(watchlists.id, c.req.param("id")), eq(watchlists.ownerId, user.id)));

    return c.json({ ok: true });
  });
