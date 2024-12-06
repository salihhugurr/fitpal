import { useThemeColor } from "@/hooks/useThemeColor";
import { View } from "react-native";

export const Divider = () => {
  const color = useThemeColor();
  return <View style={{ height: 1, backgroundColor: color.border }} />;
};
