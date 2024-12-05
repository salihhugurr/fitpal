import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

// Base width and height to scale values based on
const BASE_WIDTH = 828; // Base width (reference device)
const BASE_HEIGHT = 896; // Base height (reference device)

const useResponsive = () => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  console.log("width", screenWidth);
  console.log("height", screenHeight);

  useEffect(() => {
    const onResize = () => {
      setScreenWidth(Dimensions.get("window").width);
      setScreenHeight(Dimensions.get("window").height);
    };

    // Listen for dimension changes
    Dimensions.addEventListener("change", onResize);
  }, []);

  // Scaling functions
  const scale = (size: number) => (screenWidth / BASE_WIDTH) * size;
  const verticalScale = (size: number) => (screenHeight / BASE_HEIGHT) * size;
  const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

  return {
    scale,
    verticalScale,
    moderateScale,
  };
};

export default useResponsive;
