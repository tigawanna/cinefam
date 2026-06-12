import { Text, View } from "react-native";

export default function CommunityScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Community</Text>
      <Text style={{ marginTop: 8, color: "#888" }}>
        Public watchlists and friend activity will appear here.
      </Text>
    </View>
  );
}
