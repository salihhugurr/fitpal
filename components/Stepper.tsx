import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { Easing, withTiming } from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor"; // Assuming this is a custom hook
import useResponsive from "@/hooks/useResponsive";

interface StepperProps {
  step: number; // Current step
  totalStep: number; // Total number of steps
}

const Stepper: React.FC<StepperProps> = ({ step, totalStep }) => {
  const { scale, verticalScale } = useResponsive();
  const { primary, gray } = useThemeColor();

  const progress = (step / totalStep) * 100;

  const animatedProgress = withTiming(progress, {
    duration: 300,
    easing: Easing.out(Easing.ease),
  });

  return (
    <View style={[styles.container, { marginVertical: verticalScale(10) }]}>
      <View style={styles.stepContainer}>
        {Array.from({ length: totalStep }).map((_, index) => {
          const isActive = index < step; // Highlight previous steps
          return (
            <Animated.View
              key={index}
              style={[
                styles.stepBar,
                {
                  flex: 1,
                  backgroundColor: isActive ? primary : gray, // Active bar color
                  height: 4,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  stepBar: {
    marginHorizontal: 1, // Space between the bars
  },
});

export default Stepper;
