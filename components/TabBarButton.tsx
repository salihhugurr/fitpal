import { Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import useResponsive from "@/hooks/useResponsive";
import { Icon } from "@expo/vector-icons/build/createIconSet";
import { AnimatedThemedText } from "./ThemedText";

type Props = {
  isFocused: boolean;
  label: string;
  routeName: string;
  color: string;
  style?: StyleSheet;
  onPress: () => void;
  onLongPress: () => void;
};

const TabBarButton = (props: Props) => {
  const { isFocused, label, routeName, color } = props;
  const { moderateScale, verticalScale } = useResponsive();

  const icons: any = {
    index: (props: Icon<any, any>) => (
      <AntDesign name="home" size={moderateScale(20)} {...props} />
    ),
    plan: (props: Icon<any, any>) => (
      <Feather name="compass" size={moderateScale(20)} {...props} />
    ),
    food_log: (props: Icon<any, any>) => (
      <AntDesign name="apple1" size={moderateScale(20)} {...props} />
    ),
    progress: (props: Icon<any, any>) => (
      <Feather name="bar-chart-2" size={moderateScale(20)} {...props} />
    ),
    profile: (props: Icon<any, any>) => (
      <FontAwesome name="user-o" size={moderateScale(20)} {...props} />
    ),
  };

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);
    const top = interpolate(scale.value, [0, 1], [0, 8]);

    return {
      // styles
      transform: [{ scale: scaleValue }],
      top,
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      // styles
      opacity,
    };
  });
  return (
    <Pressable {...props} style={styles.container}>
      <Animated.View style={[animatedIconStyle]}>
        {icons[routeName]({
          color,
        })}
      </Animated.View>

      <AnimatedThemedText
        style={[
          {
            color,
            fontSize: moderateScale(14),
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </AnimatedThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 4,
  },
});

export default TabBarButton;
