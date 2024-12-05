import { Dimensions } from "react-native";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

// Base width and height to scale values based on (you can use 375x667 for iPhone 6/7/8 as a baseline)
const BASE_WIDTH = 414;
const BASE_HEIGHT = 896;

console.log("width", width);
console.log("height", height);

// Scale function to adjust based on screen size
const scale = (size: number) => (width / BASE_WIDTH) * size; // Scales based on width
const verticalScale = (size: number) => (height / BASE_HEIGHT) * size; // Scales based on height
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor; // Moderate scaling

export const responsive = {
  scale,
  verticalScale,
  moderateScale,
};
