import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="signin" options={{ title: "Sign in" }} />
      <Stack.Screen name="signup" options={{ title: "Sign up" }} />
    </Stack>
  );
}
