import { Slider } from "@/components";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { onboardingData } from "@/constants";
import useResponsive from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import useUserStore from "@/store/user";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { setIsFirstOpenFalse } = useUserStore();
  const color = useThemeColor();
  const { scale, verticalScale } = useResponsive();
  return (
    <ThemedView
      type="container"
      style={{
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: scale(10),
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: scale(50),
          paddingTop: verticalScale(50),
        }}
      >
        <ThemedText type="title">Welcome to</ThemedText>
        <ThemedText type="title" style={{ color: color.primary }}>
          FitPal
        </ThemedText>
      </View>
      <Slider data={onboardingData} />
      <View
        style={{
          gap: verticalScale(10),
          marginVertical: verticalScale(25),
          paddingHorizontal: scale(50),
        }}
      >
        <ThemedButton
          title="Sign In"
          type="outline"
          onPress={() => router.navigate("/(auth)")}
        />
        <ThemedButton
          title="Sign Up For Free"
          type="filled"
          onPress={() => router.navigate("/(auth)/sign-up")}
        />
      </View>
    </ThemedView>
  );
}
