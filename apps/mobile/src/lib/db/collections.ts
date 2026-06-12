import type { WatchlistRow } from "@cinefam/db/types";
import { createCollection } from "@tanstack/db";
import { persistedCollectionOptions } from "@tanstack/expo-db-sqlite-persistence";
import { getDbPersistence } from "./persistence";

const persistence = getDbPersistence();

export const watchlistsCollection = createCollection(
  persistedCollectionOptions<WatchlistRow, string>({
    id: "watchlists",
    getKey: (row) => row.id,
    persistence,
    schemaVersion: 1,
  }),
);
