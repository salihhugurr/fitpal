import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme, View, ViewProps } from "react-native";
import { CustomHeader } from "./CustomHeader";
import { StatusBar } from "expo-status-bar";
interface ScreenLayoutProps extends ViewProps {
  headerTitle?: string;
  goBackActive?: boolean;
}
export const ScreenLayout = ({
  headerTitle,
  goBackActive,
  children,
}: ScreenLayoutProps) => {
  const color = useThemeColor();
  const theme = useColorScheme() ?? "light";
  return (
    <View style={{ flex: 1, backgroundColor: color.background }}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      {headerTitle && (
        <CustomHeader headerTitle={headerTitle} goBackActive={goBackActive} />
      )}
      <ThemedView type="screen" style={{ flex: 1 }}>
        {children}
      </ThemedView>
    </View>
  );
};
