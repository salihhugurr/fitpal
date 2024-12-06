import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export function useThemeColor() {
  const theme = useColorScheme() ?? "light";

  return Colors[theme];
}
