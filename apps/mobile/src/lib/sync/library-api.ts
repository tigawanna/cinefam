import { env } from "@/lib/env";
import { watchlistsCollection } from "@/lib/db/collections";
import type { LibrarySnapshot } from "@cinefam/db/types";

const apiBase = env.EXPO_PUBLIC_API_URL;

export async function pullLibrarySnapshot(): Promise<LibrarySnapshot> {
  const response = await fetch(`${apiBase}/api/library/snapshot`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Library sync failed: ${response.status}`);
  }
  return response.json() as Promise<LibrarySnapshot>;
}

export async function hydrateLocalWatchlists(snapshot: LibrarySnapshot) {
  for (const watchlist of snapshot.watchlists) {
    watchlistsCollection.insert(watchlist);
  }
}

export async function syncLibraryFromServer() {
  const snapshot = await pullLibrarySnapshot();
  await hydrateLocalWatchlists(snapshot);
  return snapshot;
}
