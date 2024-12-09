import { View, Text, ViewProps, Pressable } from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import useResponsive from "@/hooks/useResponsive";
import { ThemedText } from "./ThemedText";
import { FontAwesome } from "@expo/vector-icons";

interface Props extends ViewProps {
  title: string;
  selected: boolean;
  onPress: () => void;
}

export const Option = ({ title, selected, onPress, ...props }: Props) => {
  const color = useThemeColor();
  const { scale, verticalScale } = useResponsive();
  return (
    <Pressable
      onPress={onPress}
      {...props}
      style={[
        props.style,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          borderColor: selected ? color.primary : "transparent",
          backgroundColor: color.gray,
          borderRadius: scale(10),
          paddingVertical: verticalScale(12),
          paddingHorizontal: scale(25),
          borderWidth: 2,
        },
      ]}
    >
      <ThemedText type="subtitle">{title}</ThemedText>
      <FontAwesome
        name={selected ? "check-circle" : "circle-o"}
        color={selected ? color.primary : color.secondary}
        size={verticalScale(20)}
      />
    </Pressable>
  );
};
