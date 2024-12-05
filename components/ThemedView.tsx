import React from "react";
import { ScrollView, View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import useResponsive from "@/hooks/useResponsive";
import Animated from "react-native-reanimated";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  scrollView?: boolean;
  type?: "default" | "container";
};

export const ThemedView = React.forwardRef<View, ThemedViewProps>(
  (
    {
      style,
      lightColor,
      darkColor,
      scrollView,
      type = "default",
      ...otherProps
    },
    ref
  ) => {
    const ViewComponent = scrollView ? ScrollView : View;
    const color = useThemeColor();
    const { bottom, top, left } = useSafeAreaInsets();
    const { scale } = useResponsive();

    const containerStyle = type === "container" && {
      paddingHorizontal: left + scale(10),
      paddingTop: top,
      paddingBottom: bottom,
    };

    return (
      <ViewComponent
        ref={ref}
        style={[
          {
            backgroundColor: color.background,
            ...containerStyle,
          },
          style,
        ]}
        {...otherProps}
      />
    );
  }
);

export const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);
