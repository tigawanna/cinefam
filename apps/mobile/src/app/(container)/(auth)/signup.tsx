import { env } from "@/lib/env";
import * as WebBrowser from "expo-web-browser";
import { Button, Text, View } from "react-native";

export default function SignUpScreen() {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Create your account</Text>
      <Text style={{ color: "#888" }}>
        Sign up on the web to sync watchlists and watched history across devices.
      </Text>
      <Button
        title="Open web sign up"
        onPress={() => WebBrowser.openBrowserAsync(`${env.EXPO_PUBLIC_API_URL}/auth/signup`)}
      />
    </View>
  );
}
