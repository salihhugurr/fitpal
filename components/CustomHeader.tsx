import { TouchableOpacity, View } from "react-native";
import React from "react";
import useResponsive from "@/hooks/useResponsive";
import { ThemedText } from "./ThemedText";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  headerTitle?: string;
  goBackActive?: boolean;
  rightComponent?: () => React.ReactNode;
};

export const CustomHeader = ({
  headerTitle,
  goBackActive,
  rightComponent,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { verticalScale, moderateScale, scale } = useResponsive();
  const color = useThemeColor();
  return (
    <View
      style={{
        height: top + verticalScale(60),
        paddingHorizontal: scale(30),
        position: "relative",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: verticalScale(20),
        borderBottomWidth: 1,
        borderColor: color.border,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: "absolute",
          left: scale(40),
          bottom: verticalScale(20),
        }}
      >
        {goBackActive && (
          <AntDesign
            name="arrowleft"
            size={moderateScale(30)}
            color={color.text}
          />
        )}
      </TouchableOpacity>
      <ThemedText type="subtitle" style={{ fontFamily: "bold" }}>
        {headerTitle}
      </ThemedText>
      <View style={{ position: "absolute", right: scale(40) }}>
        {rightComponent && rightComponent()}
      </View>
    </View>
  );
};
