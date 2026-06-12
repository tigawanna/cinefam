import { env } from "@/lib/env";
import * as WebBrowser from "expo-web-browser";
import { Button, Text, View } from "react-native";

export default function SignInScreen() {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Welcome to Cinefam</Text>
      <Text style={{ color: "#888" }}>
        Authentication is handled by Better Auth on the web app. Open the sign-in page in your
        browser to link your account.
      </Text>
      <Button
        title="Open web sign in"
        onPress={() => WebBrowser.openBrowserAsync(`${env.EXPO_PUBLIC_API_URL}/auth`)}
      />
    </View>
  );
}
