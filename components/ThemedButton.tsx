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
import { FontAwesome } from "@expo/vector-icons";

export interface ThemedButtonProps extends TouchableOpacityProps {
  type?: "outline" | "filled";
  title?: string;
  textStyle?: TextStyle;
  textColor?: string;
  backgroundColor?: string;
  rightIcon?: () => React.ReactNode;
  leftIcon?: () => React.ReactNode;
  disabled?: boolean;
}

export const ThemedButton = React.forwardRef<View, ThemedButtonProps>(
  (
    {
      style,
      type = "outline",
      title,
      textStyle,
      textColor,
      rightIcon,
      leftIcon,
      backgroundColor,
      disabled,
      ...otherProps
    },
    ref
  ) => {
    const color = useThemeColor();
    const { scale, moderateScale, verticalScale } = useResponsive();

    const buttonStyles = StyleSheet.create({
      container: {
        position: "relative",
        flexDirection: "row",
        paddingVertical: verticalScale(12),
        paddingHorizontal: moderateScale(16),
        borderRadius: moderateScale(8),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:
          type === "filled" && backgroundColor
            ? backgroundColor
            : type === "filled"
            ? color.primary
            : "transparent",
        opacity: disabled ? 0.5 : 1,
        borderWidth: type === "outline" ? moderateScale(1) : 0,
        borderColor:
          textColor && type === "outline"
            ? textColor
            : type === "outline"
            ? color.primary
            : "transparent",
      },
      text: {
        fontFamily: "bold",
        fontSize: moderateScale(18),
        marginHorizontal: scale(30),
        color: textColor
          ? textColor
          : type === "filled"
          ? color.background
          : color.primary,
      },
    });

    return (
      <TouchableOpacity
        disabled={disabled}
        ref={ref}
        style={[buttonStyles.container, style]}
        {...otherProps}
      >
        {leftIcon && leftIcon()}
        {title && <Text style={[buttonStyles.text, textStyle]}>{title}</Text>}
        {rightIcon && rightIcon()}
      </TouchableOpacity>
    );
  }
);

export const AnimatedThemedButton =
  Animated.createAnimatedComponent(ThemedButton);
