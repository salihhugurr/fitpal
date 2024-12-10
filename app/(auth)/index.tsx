import { DynamicForm, ScreenLayout, SocialAuth } from "@/components";
import { ThemedText } from "@/components/ThemedText";
import useResponsive from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { openApi } from "@/services";
import useUserStore from "@/store/user";
import { LoginPayload, loginValidation } from "@/validations";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert, TouchableOpacity, View } from "react-native";

export default function SignIn() {
  const { scale, verticalScale } = useResponsive();
  const { setUser, setAccessToken, setIsFirstOpenFalse } = useUserStore();
  const mutation = useMutation({
    onSuccess: (data) => {
      console.log("data", data);
      setUser(data.data.user);
      setAccessToken(data.data.token);
      setIsFirstOpenFalse();
      router.replace("/(tabs)");
    },
    onError: (error) => {
      console.log(error);
      Alert.alert("Login failed:", error.message);
    },
    mutationFn: (inputs: LoginPayload) => {
      return openApi.post("api/auth/login", inputs);
    },
  });
  const color = useThemeColor();
  return (
    <ScreenLayout goBackActive headerTitle="Sign In">
      <View
        style={{
          marginVertical: verticalScale(20),
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: scale(50),
        }}
      >
        <DynamicForm
          schema={loginValidation}
          onSubmit={(data) => {
            mutation.mutate(data);
          }}
        />
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
        <SocialAuth />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: scale(10),
          }}
        >
          <ThemedText>You don't have an account?</ThemedText>
          <TouchableOpacity onPress={() => router.replace("/(auth)/sign-up")}>
            <ThemedText type="link">Sign Up</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ThemedText type="subtitle">Privacy Policy</ThemedText>
      </View>
    </ScreenLayout>
  );
}
