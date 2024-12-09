import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Step = {
  key: string;
  title: string;
  subtitle: string;
  placeholder?: string;
  stepTitle: string;
  stepCount: number;
  type: string;
  inputs?: { [key: string]: string | undefined };
  value?: string;
  maximum?: number;
  values?: { title: string; value: boolean; description?: string }[];
};

interface RegisterStepState {
  steps: Step[];
  inputs: {
    email: string;
    password: string;
    firstName: string;
    gender: string;
    age: string;
    country: string;
    height: string;
    weight: string;
    desiredWeight: string;
    goals: string[];
    weightLossBarrier: string[];
    gainWeightOptions: string[];
    maintainWeightOptions: string[];
    gainMuscleGoal: string[];
    dietFocus: string[];
    manageStress: string[];
    currentSteps: string[];
    activity: string[];
    weeklyGoal: string[];
  };
  setInput: (key: string, value: any) => void;
  setSteps: (newSteps: Step[]) => void;
  getInput: (key: string) => string | undefined;
}

const useRegisterStep = create<RegisterStepState, [any]>((set, get) => ({
  inputs: {
    firstName: "",
    goals: [],
    email: "",
    password: "",
    gender: "male",
    age: "",
    country: "",
    height: "",
    weight: "",
    desiredWeight: "",
    weightLossBarrier: [],
    gainWeightOptions: [],
    maintainWeightOptions: [],
    gainMuscleGoal: [],
    dietFocus: [],
    manageStress: [],
    currentSteps: [],
    activity: [],
    weeklyGoal: [],
  },
  steps: [
    {
      key: "firstName",
      title: "First, what can we call you?",
      subtitle: "We'd like to get to know you.",
      placeholder: "First Name",
      stepTitle: "Welcome",
      stepCount: 1,
      value: "",
      type: "input",
    },
    {
      key: "goals",
      title: "Hey. Let's start with your goals.",
      subtitle: "Select up to three that are most important to you.",
      values: [
        { title: "Lose weight", value: false },
        { title: "Gain weight", value: false },
        { title: "Maintain weight", value: false },
        { title: "Gain muscle", value: false },
        { title: "Modify My Diet", value: false },
        { title: "Manage Stress", value: false },
        { title: "Increase Step Count", value: false },
      ],
      stepTitle: "Goals",
      type: "multipleSelect",
      maximum: 3,
      stepCount: 1,
    },
  ],

  setInput: (key: string, value: any) =>
    set((state) => ({
      inputs: {
        ...state.inputs,
        [key]: value,
      },
    })),
  getInput: (key: string) => get().inputs[key],
  setSteps: (newSteps: Step[]) =>
    set(() => ({
      steps: newSteps,
    })),
}));

export default useRegisterStep;
