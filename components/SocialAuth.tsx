import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import { ThemedButton } from "./ThemedButton";
import { ThemedText } from "./ThemedText";
import useResponsive from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";

export const SocialAuth = () => {
  const { scale } = useResponsive();
  const color = useThemeColor();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: scale(40),
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: color.border }} />
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          Or
        </ThemedText>
        <View style={{ flex: 1, height: 1, backgroundColor: color.border }} />
      </View>
      <ThemedButton
        title="Continue with Google"
        type="outline"
        textColor={color.backgroundOpposite}
        leftIcon={() => (
          <AntDesign
            color={color.backgroundOpposite}
            name="google"
            size={scale(40)}
          />
        )}
      />
      <ThemedButton
        title="Continue with Apple"
        type="outline"
        textColor={color.backgroundOpposite}
        leftIcon={() => (
          <AntDesign
            color={color.backgroundOpposite}
            name="apple1"
            size={scale(40)}
          />
        )}
      />
    </>
  );
};
