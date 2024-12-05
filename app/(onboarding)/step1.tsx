import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useUserStore from "@/store/user";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const { setIsFirstOpenFalse } = useUserStore();
  return (
    <ThemedView type="container" style={{ flex: 1, gap: 20 }}>
      <ThemedText type="title">Step1</ThemedText>
      <ThemedButton
        title="Step 2"
        type="filled"
        onPress={() => router.navigate("/(onboarding)/step2")}
      />
      <ThemedButton
        title="Skip"
        type="outline"
        onPress={() => {
          setIsFirstOpenFalse();
        }}
      />
    </ThemedView>
  );
}
