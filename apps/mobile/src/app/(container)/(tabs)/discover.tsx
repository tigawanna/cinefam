import { discoverMovies } from "@/lib/tmdb/client";
import { getDisplayTitle, getPosterUrl } from "@/types/unified-media";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { FlatList, Text, View } from "react-native";

export default function DiscoverScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ["discover", "movie"],
    queryFn: () => discoverMovies(),
  });

  const results = (data?.results ?? []) as Array<{
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    media_type?: "movie";
  }>;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={results}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListHeaderComponent={
          <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8 }}>Discover</Text>
        }
        ListEmptyComponent={
          isLoading ? (
            <Text style={{ color: "#888" }}>Loading...</Text>
          ) : (
            <Text style={{ color: "#888" }}>No titles found. Is the web API running?</Text>
          )
        }
        renderItem={({ item }) => {
          const unified = {
            ...item,
            media_type: "movie" as const,
            overview: "",
            backdrop_path: null,
          };
          const poster = getPosterUrl(item.poster_path, "w185");
          return (
            <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
              {poster ? (
                <Image source={{ uri: poster }} style={{ width: 56, height: 84, borderRadius: 8 }} />
              ) : (
                <View
                  style={{
                    width: 56,
                    height: 84,
                    borderRadius: 8,
                    backgroundColor: "#333",
                  }}
                />
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "600" }}>{getDisplayTitle(unified)}</Text>
                <Text style={{ color: "#888", marginTop: 2 }}>★ {item.vote_average.toFixed(1)}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
