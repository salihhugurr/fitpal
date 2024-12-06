import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

const BASE_WIDTH = 828;
const BASE_HEIGHT = 896;

const useResponsive = () => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const onResize = () => {
      setScreenWidth(Dimensions.get("window").width);
      setScreenHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", onResize);
  }, []);

  const scale = (size: number) => (screenWidth / BASE_WIDTH) * size;
  const verticalScale = (size: number) => (screenHeight / BASE_HEIGHT) * size;
  const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

  return {
    scale,
    verticalScale,
    moderateScale,
    screenWidth,
    screenHeight,
  };
};

export default useResponsive;
