import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Index() {
  return (
    <ThemedView type="container" style={{ flex: 1 }}>
      <ThemedText type="title">Profile</ThemedText>
    </ThemedView>
  );
}
