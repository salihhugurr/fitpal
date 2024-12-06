import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const BASE_WIDTH = 414;
const BASE_HEIGHT = 896;

const scale = (size: number) => (width / BASE_WIDTH) * size;
const verticalScale = (size: number) => (height / BASE_HEIGHT) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const responsive = {
  scale,
  verticalScale,
  moderateScale,
};
