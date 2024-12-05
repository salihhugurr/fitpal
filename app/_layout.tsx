import { Stack, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import useUserStore from "@/store/user";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const router = useRouter();
  const user = useUserStore();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        regular: require("../assets/fonts/Poppins-Regular.ttf"),
        medium: require("../assets/fonts/Poppins-Medium.ttf"),
        bold: require("../assets/fonts/Poppins-Bold.ttf"),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    if (!fontLoaded) return;

    console.log("first", user.isFirstOpen, user.accessToken);

    if (user.isFirstOpen && !user.accessToken) {
      router.push("/(onboarding)/step1");
    } else if (!user.isFirstOpen && !user.accessToken) {
      router.push("/(auth)");
    } else if (!user.isFirstOpen && user.accessToken) {
      router.push("/(tabs)");
    }
  }, [user]);

  if (!fontLoaded) {
    return null; // or a loading spinner
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen redirect={user.isFirstOpen} name="(auth)" />
        <Stack.Screen redirect={!user.accessToken} name="(tabs)" />
      </Stack>
    </QueryClientProvider>
  );
}
