export type MediaType = "movie" | "tv";
export type WatchlistVisibility = "public" | "private" | "followers_only";
export type FollowStatus = "pending" | "accepted" | "blocked";

export type MediaItemRow = {
  id: string;
  tmdbId: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string | null;
  voteAverage: number | null;
  genreIds: number[] | null;
  imdbId: string | null;
  addedBy: string;
  updatedAt: string;
  createdAt: string;
};

export type WatchlistRow = {
  id: string;
  title: string;
  overview: string | null;
  ownerId: string;
  visibility: WatchlistVisibility;
  isCollaborative: boolean;
  updatedAt: string;
  createdAt: string;
};

export type WatchedEntryRow = {
  id: string;
  userId: string;
  itemId: string;
  watchedAt: string;
  personalRating: number | null;
  notes: string | null;
  updatedAt: string;
};

export type LibrarySnapshot = {
  watchlists: WatchlistRow[];
  mediaItems: MediaItemRow[];
  watchedEntries: WatchedEntryRow[];
  syncedAt: string;
};
