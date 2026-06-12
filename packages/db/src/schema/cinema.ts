import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const mediaItems = pgTable(
  "media_items",
  {
    id: text("id").primaryKey(),
    tmdbId: integer("tmdb_id").notNull(),
    mediaType: text("media_type", { enum: ["movie", "tv"] }).notNull(),
    title: text("title").notNull(),
    posterPath: text("poster_path"),
    backdropPath: text("backdrop_path"),
    releaseDate: text("release_date"),
    voteAverage: real("vote_average"),
    genreIds: integer("genre_ids").array(),
    imdbId: text("imdb_id"),
    addedBy: text("added_by").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("media_items_tmdb_idx").on(table.tmdbId, table.mediaType),
    index("media_items_added_by_idx").on(table.addedBy),
  ],
);

export const watchlists = pgTable(
  "watchlists",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    overview: text("overview"),
    ownerId: text("owner_id").notNull(),
    visibility: text("visibility", { enum: ["public", "private", "followers_only"] })
      .notNull()
      .default("private"),
    isCollaborative: boolean("is_collaborative").notNull().default(false),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("watchlists_owner_idx").on(table.ownerId)],
);

export const watchlistEntries = pgTable(
  "watchlist_entries",
  {
    watchlistId: text("watchlist_id")
      .notNull()
      .references(() => watchlists.id, { onDelete: "cascade" }),
    itemId: text("item_id")
      .notNull()
      .references(() => mediaItems.id, { onDelete: "cascade" }),
    addedBy: text("added_by").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.watchlistId, table.itemId] }),
    index("watchlist_entries_item_idx").on(table.itemId),
  ],
);

export const watchedEntries = pgTable(
  "watched_entries",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    itemId: text("item_id")
      .notNull()
      .references(() => mediaItems.id, { onDelete: "cascade" }),
    watchedAt: timestamp("watched_at", { withTimezone: true }).notNull().defaultNow(),
    personalRating: real("personal_rating"),
    notes: text("notes"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("watched_entries_user_idx").on(table.userId),
    index("watched_entries_item_idx").on(table.itemId),
  ],
);

export const follows = pgTable(
  "follows",
  {
    id: text("id").primaryKey(),
    followerId: text("follower_id").notNull(),
    followingId: text("following_id").notNull(),
    status: text("status", { enum: ["pending", "accepted", "blocked"] }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("follows_follower_idx").on(table.followerId)],
);

export const watchlistLikes = pgTable(
  "watchlist_likes",
  {
    userId: text("user_id").notNull(),
    itemId: text("item_id")
      .notNull()
      .references(() => mediaItems.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.itemId] })],
);
