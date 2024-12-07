import { useCallback, useEffect, useRef, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useRouter } from "expo-router";
import useUserStore from "@/store/user";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import useResponsive from "@/hooks/useResponsive";
import LottieView from "lottie-react-native";

export default function App() {
  const user = useUserStore();
  const router = useRouter();
  const animation = useRef<LottieView>(null);

  const { moderateScale, verticalScale } = useResponsive();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        regular: require("../assets/fonts/Poppins-Regular.ttf"),
        medium: require("../assets/fonts/Poppins-Medium.ttf"),
        bold: require("../assets/fonts/Poppins-Bold.ttf"),
      });
    };

    loadFonts();
  }, []);

  const hideSplash = useCallback(() => {
    SplashScreen.hide();
    if (user.isFirstOpen) {
      router.replace("/(onboarding)");
    } else if (!user.accessToken) {
      router.replace("/(auth)");
    } else {
      router.replace("/(tabs)");
    }
  }, [user]);

  return (
    <ThemedView
      type="container"
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThemedText type="title">Welcome to FitPal👋</ThemedText>
      <LottieView
        autoPlay
        loop={false}
        ref={animation}
        onAnimationFinish={hideSplash}
        style={{
          width: moderateScale(250),
          height: moderateScale(250),
          marginTop: moderateScale(20),
        }}
        source={require("@/assets/animations/splash.json")}
      />
      <ThemedView
        style={{
          position: "absolute",
          bottom: verticalScale(40),
          flexDirection: "row",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText>Powered by</ThemedText>
        <ThemedText type="link">Salih UĞUR</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
