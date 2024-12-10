import { create } from "zustand";
import { Option, ScreenLayout, ThemedButton, ThemedInput } from "@/components";
import { ThemedText } from "@/components/ThemedText";
import useResponsive from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, TouchableOpacity, View } from "react-native";
import {
  generateGoalSteps,
  goalStepKeys,
  lastGoalSteps,
} from "@/utils/generateGoalSteps";
import useRegisterStep, { RegisterPayload } from "@/store/step";
import Stepper from "@/components/Stepper";
import { openApi } from "@/services";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@/store/user";

export default function CreateAccount() {
  const { scale, verticalScale } = useResponsive();
  const color = useThemeColor();
  const { step } = useLocalSearchParams();
  const mutation = useMutation({
    onSuccess: (data) => {
      Alert.alert(data.data.message, "You can now sign in", [
        { text: "OK", onPress: () => router.replace("/(auth)") },
      ]);
    },
    onError: (error) => {
      console.log(error);
      Alert.alert("Registration failed:", error.message);
    },
    mutationFn: (inputs: RegisterPayload) => {
      return openApi.post("api/auth/register", inputs);
    },
  });
  const { steps, setSteps, setInput, getInput, inputs } = useRegisterStep();
  const currentStepIndex = step ? Number(step) : 0;
  const currentStep = steps[currentStepIndex];
  const error =
    (currentStep.key === "aboutYourself" &&
      (!getInput("age") || !getInput("country") || !getInput("gender"))) ||
    (currentStep.key === "physicalInfo" &&
      (!getInput("height") ||
        !getInput("weight") ||
        !getInput("desiredWeight"))) ||
    (currentStep.key === "register" &&
      (!getInput("email") || !getInput("password")));

  const handleRegister = () => {
    mutation.mutate(inputs);
  };

  const handleNext = () => {
    if (currentStep.key === "goals") {
      const goalSteps = generateGoalSteps(
        getInput("goals") as unknown as string[]
      );
      const newSteps = [
        ...steps.filter((s) => !goalStepKeys.includes(s.key)),
        ...goalSteps,
        ...lastGoalSteps((getInput("goals") as unknown as string[]) || []),
      ];
      setSteps(newSteps);
      router.navigate(`/step/${currentStepIndex + 1}`);
    } else if (currentStep.key !== "register") {
      router.navigate(`/step/${currentStepIndex + 1}`);
    } else {
      handleRegister();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      router.navigate(`/step/${currentStepIndex - 1}`);
    }
  };

  const handleSelect = (goal: { title: string }) => {
    let values: string[] | undefined =
      (getInput(currentStep.key) as unknown as string[]) || [];
    const selected = values?.find((v) => v === goal.title);

    const oneSelectionAllowed = [
      "Lose weight",
      "Gain weight",
      "Maintain weight",
    ];
    if (selected) {
      values = values.filter((v) => v !== goal.title);
    } else if (
      oneSelectionAllowed.includes(goal.title) &&
      values.length > 0 &&
      !selected
    ) {
      console.log("girdi");
      values = values.filter((v) => !oneSelectionAllowed.includes(v));
      values.push(goal.title);
    } else if (values?.includes(goal.title) && currentStep?.maximum !== 1) {
      values = values.filter((v) => v !== goal.title);
    } else if (!selected && currentStep?.maximum === 1) {
      values = [goal.title];
    } else if (values.length !== currentStep?.maximum) {
      values.push(goal.title);
    }

    console.log(values);

    setInput(currentStep.key, values);
  };

  return (
    <ScreenLayout
      goBackActive={currentStepIndex === 0}
      headerTitle={currentStep.stepTitle}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: scale(50),
          paddingVertical: verticalScale(10),
        }}
      >
        <Stepper step={currentStep.stepCount} totalStep={5} />
        {currentStep.type !== "encouragement" && (
          <View style={{ gap: verticalScale(10) }}>
            <ThemedText type="title">{currentStep.title}</ThemedText>
            <ThemedText style={{ opacity: 0.5 }} type="subtitle">
              {currentStep.subtitle}
            </ThemedText>
          </View>
        )}

        {currentStep.key === "aboutYourself" && (
          <View
            style={{ marginTop: verticalScale(20), gap: verticalScale(20) }}
          >
            <View style={{ flexDirection: "row", gap: scale(15) }}>
              <Option
                title="Male"
                selected={getInput("gender") === "male"}
                onPress={() => setInput("gender", "male")}
                style={{ flex: 1 }}
              />
              <Option
                title="Female"
                selected={getInput("gender") === "female"}
                onPress={() => setInput("gender", "female")}
                style={{ flex: 1 }}
              />
            </View>
            <ThemedInput
              value={getInput("age") || ""}
              onChangeText={(text) =>
                setInput("age", text.replace(/[^0-9]/g, ""))
              }
              fieldName="Age"
            />
            <ThemedInput
              value={getInput("country") || ""}
              onChangeText={(text) => setInput("country", text)}
              fieldName="Country"
            />
          </View>
        )}

        {currentStep.key === "physicalInfo" && (
          <View
            style={{ marginTop: verticalScale(20), gap: verticalScale(20) }}
          >
            <ThemedInput
              value={getInput("height") || ""}
              onChangeText={(text) =>
                setInput("height", text.replace(/[^0-9]/g, ""))
              }
              fieldName="Height (cm)"
            />
            <ThemedInput
              value={getInput("weight") || ""}
              onChangeText={(text) =>
                setInput("weight", text.replace(/[^0-9]/g, ""))
              }
              fieldName="Weight (kg)"
            />
            <ThemedInput
              value={getInput("desiredWeight") || ""}
              onChangeText={(text) =>
                setInput("desiredWeight", text.replace(/[^0-9]/g, ""))
              }
              fieldName="Desired Weight (kg)"
            />
          </View>
        )}

        {currentStep.key === "register" && (
          <View
            style={{ marginTop: verticalScale(20), gap: verticalScale(20) }}
          >
            <ThemedInput
              value={getInput("email") || ""}
              onChangeText={(text) => setInput("email", text)}
              fieldName="Email Address"
              autoCapitalize="none"
            />
            <ThemedInput
              value={getInput("password") || ""}
              onChangeText={(text) => setInput("password", text)}
              fieldName="Password"
              secureTextEntry
            />
          </View>
        )}

        {/* Input Step */}
        {currentStep.type === "input" && (
          <View
            style={{
              marginVertical: verticalScale(20),
              gap: verticalScale(10),
            }}
          >
            <ThemedInput
              value={getInput(currentStep.key) || ""}
              onChangeText={(text) => setInput(currentStep.key, text)}
              fieldName={currentStep?.placeholder || ""}
            />
          </View>
        )}

        {/* Multiple Select Step */}
        {currentStep.type === "multipleSelect" && (
          <View>
            {currentStep?.values?.map((option, index) => {
              const selected = getInput(currentStep.key)?.includes(
                option.title
              );
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: color.gray,
                    paddingVertical: verticalScale(12),
                    paddingHorizontal: scale(25),
                    borderWidth: 2,
                    borderColor: selected ? color.primary : "transparent",
                    borderRadius: scale(10),
                    marginVertical: verticalScale(5),
                  }}
                  onPress={() => handleSelect(option)}
                >
                  <View style={{ width: "80%" }}>
                    <ThemedText type="subtitle" style={{ color: color.text }}>
                      {option.title}
                    </ThemedText>
                    {option?.description && (
                      <ThemedText style={{ color: color.text }}>
                        {option?.description}
                      </ThemedText>
                    )}
                  </View>
                  <FontAwesome
                    name={selected ? "check-square" : "square-o"}
                    color={selected ? color.primary : color.secondary}
                    size={verticalScale(20)}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Step Completion */}
        {currentStep.type === "encouragement" && (
          <View
            style={{
              gap: verticalScale(10),
              flex: 1,
              justifyContent: "flex-end",
              marginBottom: verticalScale(20),
            }}
          >
            <ThemedText type="title">{currentStep.title}</ThemedText>
            <ThemedText type="subtitle">{currentStep.subtitle}</ThemedText>
            {steps.length >= currentStepIndex + 1 && (
              <ThemedText>
                Now let's talk about, {steps[currentStepIndex + 1].title}
              </ThemedText>
            )}
          </View>
        )}
      </View>

      {/* Navigation Buttons */}
      <View
        style={{
          flexDirection: "row",
          gap: scale(20),
          paddingHorizontal: scale(50),
        }}
      >
        {currentStepIndex !== 0 && (
          <ThemedButton
            onPress={handlePrevious}
            type="filled"
            backgroundColor={color.secondary}
            leftIcon={() => (
              <Feather
                name="arrow-left"
                style={{ paddingHorizontal: scale(20) }}
                color={color.background}
              />
            )}
          />
        )}
        <ThemedButton
          disabled={
            (!getInput(currentStep.key) &&
              getInput(currentStep?.key) !== undefined) ||
            getInput(currentStep?.key)?.length === 0 ||
            error
          }
          onPress={handleNext}
          backgroundColor={color.secondary}
          type="filled"
          title={
            currentStepIndex === steps.length - 1 && currentStep.key !== "goals"
              ? "Register"
              : "Next"
          }
          style={{ flex: 1 }}
        />
      </View>
    </ScreenLayout>
  );
}
