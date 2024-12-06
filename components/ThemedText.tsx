import React from "react";
import { Text, type TextProps } from "react-native";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import useResponsive from "@/hooks/useResponsive";
import Animated from "react-native-reanimated";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "success"
    | "warning";
};

export const ThemedText = React.forwardRef<Text, ThemedTextProps>(
  ({ style, lightColor, darkColor, type = "default", ...rest }, ref) => {
    const color = useThemeColor();
    const { moderateScale } = useResponsive();

    const getDefaultStyles = () => {
      switch (type) {
        case "title":
          return {
            fontFamily: "bold",
            fontSize: moderateScale(30),
            color: color.text,
          };
        case "subtitle":
          return {
            fontFamily: "medium",
            fontSize: moderateScale(20),
            color: color.text,
          };

        case "link":
          return {
            fontFamily: "medium",
            fontSize: moderateScale(16),
            color: color.primary,
          };
        case "success":
          return {
            fontFamily: "medium",
            fontSize: moderateScale(16),
            color: color.success,
          };
        case "warning":
          return {
            fontFamily: "medium",
            fontSize: moderateScale(16),
            color: color.error,
          };
        case "default":
        default:
          return {
            fontFamily: "regular",
            fontSize: moderateScale(16),
            color: color.text,
          };
      }
    };

    return <Text ref={ref} style={[getDefaultStyles(), style]} {...rest} />;
  }
);

export const AnimatedThemedText = Animated.createAnimatedComponent(ThemedText);
