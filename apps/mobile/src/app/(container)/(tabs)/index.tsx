import { watchlistsCollection } from "@/lib/db/collections";
import { syncLibraryFromServer } from "@/lib/sync/library-api";
import { useLiveQuery } from "@tanstack/react-db";
import { useCallback, useState } from "react";
import { Button, Text, View } from "react-native";

export default function WatchlistScreen() {
  const watchlists = useLiveQuery((q) => q.from({ watchlists: watchlistsCollection }));
  const [syncError, setSyncError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  const handleSync = useCallback(async () => {
    setSyncing(true);
    setSyncError(null);
    try {
      await syncLibraryFromServer();
    } catch (error) {
      setSyncError(error instanceof Error ? error.message : "Sync failed");
    } finally {
      setSyncing(false);
    }
  }, []);

  const rows = watchlists.data ?? [];

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Your watchlists</Text>
      <Button
        title={syncing ? "Syncing..." : "Sync from server"}
        onPress={handleSync}
        disabled={syncing}
      />
      {syncError ? <Text style={{ color: "#c0392b" }}>{syncError}</Text> : null}
      {rows.length === 0 ? (
        <Text style={{ color: "#888" }}>
          No watchlists locally yet. Sync after signing in on web, or add lists once mobile auth is
          wired.
        </Text>
      ) : (
        rows.map((list) => (
          <View
            key={list.id}
            style={{
              padding: 16,
              borderRadius: 12,
              backgroundColor: "rgba(124, 58, 237, 0.1)",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{list.title}</Text>
            {list.overview ? <Text style={{ marginTop: 4, color: "#888" }}>{list.overview}</Text> : null}
          </View>
        ))
      )}
    </View>
  );
}
