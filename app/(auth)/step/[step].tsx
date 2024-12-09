import { create } from "zustand";
import { Option, ScreenLayout, ThemedButton, ThemedInput } from "@/components";
import { ThemedText } from "@/components/ThemedText";
import useResponsive from "@/hooks/useResponsive";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import {
  generateGoalSteps,
  goalStepKeys,
  lastGoalSteps,
} from "@/utils/generateGoalSteps";
import useRegisterStep from "@/store/step";
import Stepper from "@/components/Stepper";

export default function CreateAccount() {
  const { scale, verticalScale } = useResponsive();
  const color = useThemeColor();
  const { step } = useLocalSearchParams();
  const { steps, setSteps, setInput, getInput } = useRegisterStep();
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

  const handleNext = () => {
    if (currentStep.key === "goals") {
      const goalSteps = generateGoalSteps(currentStep?.values || []);
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
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      router.navigate(`/step/${currentStepIndex - 1}`);
    }
  };

  const handleSelect = (goal: { title: string; value: boolean }) => {
    let values: string[] | undefined =
      (getInput(currentStep.key) as unknown as string[]) || [];

    if (values?.includes(goal.title) && currentStep?.maximum !== 1) {
      values = values.filter((v) => v !== goal.title);
    } else if (!goal.value && currentStep?.maximum === 1) {
      values = [goal.title];
    } else if (values.length !== currentStep?.maximum) {
      values.push(goal.title);
    }

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
              onChange={(text) => setInput("age", text.replace(/[^0-9]/g, ""))}
              fieldName="Age"
            />
            <ThemedInput
              value={getInput("country") || ""}
              onChange={(text) => setInput("country", text)}
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
              onChange={(text) =>
                setInput("height", text.replace(/[^0-9]/g, ""))
              }
              fieldName="Height"
            />
            <ThemedInput
              value={getInput("weight") || ""}
              onChange={(text) =>
                setInput("weight", text.replace(/[^0-9]/g, ""))
              }
              fieldName="Weight"
            />
            <ThemedInput
              value={getInput("desiredWeight") || ""}
              onChange={(text) =>
                setInput("desiredWeight", text.replace(/[^0-9]/g, ""))
              }
              fieldName="Desired Weight"
            />
          </View>
        )}

        {currentStep.key === "register" && (
          <View
            style={{ marginTop: verticalScale(20), gap: verticalScale(20) }}
          >
            <ThemedInput
              value={getInput("email") || ""}
              onChange={(text) => setInput("email", text)}
              fieldName="Email Address"
            />
            <ThemedInput
              value={getInput("password") || ""}
              onChange={(text) => setInput("password", text)}
              fieldName="Password"
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
              onChange={(text) => setInput(currentStep.key, text)}
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
