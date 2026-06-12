import { asyncStoragePersister, PersistQueryClientProvider, queryClient } from "@/lib/tanstack/client";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(container)" />
        </Stack>
      </PaperProvider>
    </PersistQueryClientProvider>
  );
}
