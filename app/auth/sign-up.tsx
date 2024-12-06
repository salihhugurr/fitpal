import { Divider, ScreenLayout, SocialAuth, ThemedButton } from "@/components";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useResponsive from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function SignUp() {
  const { scale, verticalScale, moderateScale } = useResponsive();
  const color = useThemeColor();
  return (
    <ScreenLayout goBackActive headerTitle="Sign Up">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: verticalScale(60),
        }}
      >
        <View
          style={{
            marginBottom: verticalScale(20),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText type="title">Welcome! Let's customize</ThemedText>
          <ThemedText type="title">Fitpal for your goals</ThemedText>
        </View>
        <View
          style={{
            width: "100%",
            paddingVertical: verticalScale(20),
            gap: verticalScale(20),
            paddingHorizontal: scale(50),
            justifyContent: "center",
          }}
        >
          <ThemedButton title="Continue" type="filled" />
          <SocialAuth />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: scale(10),
            }}
          >
            <ThemedText>You already have an account?</ThemedText>
            <TouchableOpacity onPress={() => router.replace("/auth/sign-in")}>
              <ThemedText type="link">Sign In</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ThemedText type="subtitle">Privacy Policy</ThemedText>
      </View>
    </ScreenLayout>
  );
}
