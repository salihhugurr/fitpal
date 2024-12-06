import React from "react";
import { ScrollView, useColorScheme, View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import Animated from "react-native-reanimated";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  scrollView?: boolean;
  type?: "default" | "container" | "screen";
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

    const containerStyle =
      type === "container"
        ? {
            flex: 1,
            paddingHorizontal: left,
            paddingTop: top,
            paddingBottom: bottom,
          }
        : type === "screen"
        ? {
            flex: 1,
            paddingHorizontal: left,
            paddingBottom: bottom,
          }
        : undefined;

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
