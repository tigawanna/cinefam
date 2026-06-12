import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Profile</Text>
      <Text style={{ marginTop: 8, color: "#888" }}>
        Sign in via Better Auth on web to sync your profile across devices.
      </Text>
    </View>
  );
}
