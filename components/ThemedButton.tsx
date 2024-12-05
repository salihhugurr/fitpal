import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
  StyleSheet,
  TextStyle,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import useResponsive from "@/hooks/useResponsive";
import Animated from "react-native-reanimated";

export interface ThemedButtonProps extends TouchableOpacityProps {
  type?: "outline" | "filled"; // Added 'filled' type for solid button
  title: string; // Button label
  textStyle?: TextStyle;
}

export const ThemedButton = React.forwardRef<View, ThemedButtonProps>(
  ({ style, type = "outline", title, textStyle, ...otherProps }, ref) => {
    const color = useThemeColor(); // Get the current theme colors
    const { scale, moderateScale, verticalScale } = useResponsive(); // Get responsive scaling

    const buttonStyles = StyleSheet.create({
      container: {
        paddingVertical: verticalScale(12),
        paddingHorizontal: moderateScale(16),
        borderRadius: moderateScale(8),
        alignItems: "center",
        justifyContent: "center",
        // Button styles based on type
        backgroundColor: type === "filled" ? color.primary : "transparent",
        borderWidth: type === "outline" ? moderateScale(1) : 0,
        borderColor: type === "outline" ? color.primary : "transparent",
      },
      text: {
        fontFamily: "medium",
        fontSize: moderateScale(16),
        color: type === "filled" ? color.background : color.primary, // Text color based on type
      },
    });

    return (
      <TouchableOpacity
        ref={ref}
        style={[buttonStyles.container, style]}
        {...otherProps}
      >
        <Text style={[buttonStyles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
);

export const AnimatedThemedButton =
  Animated.createAnimatedComponent(ThemedButton);
