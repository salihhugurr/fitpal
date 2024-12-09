import { Step } from "@/store/step";

export const generateGoalSteps = (
  selectedGoals: { title: string; value: boolean }[]
) => {
  const goalSteps: Step[] = [];

  if (selectedGoals.find((g) => g.title === "Lose weight" && g?.value)) {
    goalSteps.push({
      key: "weightLossBarrierEncouragement",
      title: "Embark on Your Weight Loss Journey!",
      subtitle: "Let’s identify the barriers and take actionable steps.",
      type: "encouragement",
      stepCount: 1,
      stepTitle: "Weight Loss Barrier",
    });
    goalSteps.push({
      key: "weightLossBarrier",
      title: "What has been the biggest barrier in losing weight?",
      subtitle: "Select all that apply.",
      type: "multipleSelect",
      values: [
        { title: "Lack of time", value: false },
        { title: "Inconsistent workouts", value: false },
        { title: "Unhealthy eating habits", value: false },
        { title: "Lack of motivation", value: false },
        { title: "Medical issues", value: false },
        { title: "Stress", value: false },
        { title: "Other", value: false },
      ],
      stepCount: 1,
      stepTitle: "Weight Loss Barrier",
    });
  }

  if (selectedGoals.find((g) => g.title === "Gain weight" && g?.value)) {
    goalSteps.push({
      key: "gainWeightEncouragement",
      title: "Achieve Your Weight Gain Goals!",
      subtitle: "Let’s identify challenges and find effective solutions.",
      type: "encouragement",
      stepCount: 1,
      stepTitle: "Gain Weight",
    });
    goalSteps.push({
      key: "gainWeightOptions",
      title: "What are the challenges to gaining weight?",
      subtitle: "Select all that apply.",
      type: "multipleSelect",
      values: [
        { title: "Fast metabolism", value: false },
        { title: "Inconsistent meals", value: false },
        { title: "Lack of appetite", value: false },
        { title: "Busy schedule", value: false },
        { title: "Other", value: false },
      ],
      stepCount: 1,
      stepTitle: "Gain Weight Options",
    });
  }

  if (selectedGoals.find((g) => g.title === "Maintain weight" && g?.value)) {
    goalSteps.push({
      key: "maintainWeightEncouragement",
      title: "Stay on Track with Your Weight!",
      subtitle: "Consistency is key. Let’s define your focus areas.",
      type: "encouragement",
      stepCount: 1,
      stepTitle: "Maintain Weight",
    });
    goalSteps.push({
      key: "maintainWeightOptions",
      title: "What is your focus in maintaining weight?",
      subtitle: "Select all that apply.",
      type: "multipleSelect",
      values: [
        { title: "Stay consistent with workouts", value: false },
        { title: "Maintain healthy eating habits", value: false },
        { title: "Balance calorie intake", value: false },
        { title: "Keep stress levels low", value: false },
        { title: "Other", value: false },
      ],
      stepCount: 1,
      stepTitle: "Maintain Weight Options",
    });
  }

  if (selectedGoals.find((g) => g.title === "Gain muscle" && g?.value)) {
    goalSteps.push({
      key: "gainMuscleEncouragement",
      title: "Build Your Strength and Muscle!",
      subtitle: "Define your goals and create a strong foundation.",
      type: "encouragement",
      stepCount: 1,
      stepTitle: "Gain Muscle",
    });
    goalSteps.push({
      key: "gainMuscleGoal",
      title: "What result are you looking for?",
      subtitle: "Choose one.",
      type: "multipleSelect",
      maximum: 1,
      values: [
        {
          title: "Tone up",
          description: "Get lean and defined.",
          value: false,
        },
        {
          title: "Bulk up",
          description: "Build mass and strength.",
          value: false,
        },
        {
          title: "Get strong",
          description: "Improve overall power.",
          value: false,
        },
      ],
      stepCount: 1,
      stepTitle: "Gain Muscle Goal",
    });
  }

  if (selectedGoals.find((g) => g.title === "Modify My Diet" && g?.value)) {
    goalSteps.push({
      key: "dietEncouragement",
      title: "Transform Your Diet for a Healthier You!",
      subtitle: "Let’s focus on nutrition and dietary improvements.",
      type: "encouragement",
      stepCount: 1,
      stepTitle: "Diet Focus",
    });
    goalSteps.push({
      key: "dietFocus",
      title: "What do you want to focus on?",
      subtitle: "Select all that apply.",
      type: "multipleSelect",
      values: [
        { title: "Track macros", value: false },
        { title: "Eat vegan", value: false },
        { title: "Eat vegetarian", value: false },
        { title: "Limit sugar", value: false },
        { title: "Eat gluten-free", value: false },
        { title: "Improve hydration", value: false },
      ],
      stepCount: 1,
      stepTitle: "Diet Focus",
    });
  }

  if (selectedGoals.find((g) => g.title === "Manage Stress" && g?.value)) {
    goalSteps.push({
      key: "stressManagementEncouragement",
      title: "Reduce Stress, Improve Life!",
      subtitle: "Explore methods to balance and improve mental well-being.",
      type: "encouragement",
      stepCount: 1,
      stepTitle: "Stress Management",
    });
    goalSteps.push({
      key: "manageStress",
      title: "How do you want to manage your stress?",
      subtitle: "Select all that apply.",
      type: "multipleSelect",
      values: [
        { title: "Practice mindfulness", value: false },
        { title: "Exercise regularly", value: false },
        { title: "Improve sleep quality", value: false },
        { title: "Take breaks", value: false },
        { title: "Seek professional support", value: false },
        { title: "Other", value: false },
      ],
      stepCount: 1,
      stepTitle: "Manage Stress",
    });
  }

  if (
    selectedGoals.find((g) => g.title === "Increase Step Count" && g?.value)
  ) {
    goalSteps.push({
      key: "stepCountEncouragement",
      title: "Get Moving Towards Better Health!",
      subtitle: "Track and improve your daily activity levels.",
      type: "encouragement",
      stepCount: 1,
      stepTitle: "Step Count",
    });
    goalSteps.push({
      key: "currentSteps",
      title: "How many steps do you currently take per day?",
      subtitle: "Choose one.",
      type: "multipleSelect",
      maximum: 1,
      values: [
        { title: "< 2,000 steps", value: false },
        { title: "2,000 - 5,000 steps", value: false },
        { title: "5,000 - 10,000 steps", value: false },
        { title: "10,000+ steps", value: false },
      ],
      stepCount: 1,
      stepTitle: "Current Steps",
    });
  }

  return goalSteps;
};

export const lastGoalSteps = (goals: string[]) => {
  console.log("goals", goals);
  const text = goals?.includes("Lose weight")
    ? "Lose"
    : goals?.includes("Gain weight")
    ? "Gain"
    : "";
  console.log("text", text);
  let goalSteps: Step[] = [];
  goalSteps = [
    {
      key: "activity",
      stepCount: 2,
      stepTitle: "Activity Level",
      title: "What is your activity level?",
      subtitle: "Not including workouts - we count that seperately",
      type: "multipleSelect",
      maximum: 1,
      values: [
        {
          title: "Not Very Active",
          description: "Spend most of the day sitting (e.g. desk job)",
          value: false,
        },
        {
          title: "Lightly Active",
          description:
            "Spend good part of day on your feet (e.g. teacher, salesperson)",
          value: false,
        },
        {
          title: "Active",
          description:
            "Spend a good part of day doing some physical activity (e.g. food server, postal carrier)",
          value: false,
        },
        {
          title: "Very Active",
          description:
            "Spend most of the day doing heavy physical activity (e.g. construction worker, mechanic)",
          value: false,
        },
      ],
    },
    {
      key: "aboutYourself",
      stepCount: 3,
      stepTitle: "You",
      title: "Tell us a little bit about yourself",
      subtitle:
        "Please select which gender we should use to calculate your calorie needs.",
      type: "multipleInput",
      inputs: {
        gender: "male",
        age: "",
        country: "",
      },
    },
    {
      key: "physicalInfo",
      stepCount: 4,
      stepTitle: "You",
      title: "Just a few more questions",
      subtitle:
        "To achieve your goals, we need to know a few more things about you.",
      type: "multipleInput",
    },
    {
      key: "weeklyGoal",
      stepCount: 4,
      stepTitle: "Goal",
      title: "What is your weekly goal?",
      subtitle: "",
      type: "multipleSelect",
      values: [
        {
          title: text + " 0,2 kilograms per week",
          value: false,
        },
        {
          title: text + " 0,5 kilograms per week",
          description: "(Recommended)",
          value: false,
        },
        {
          title: text + " 0,8 kilograms per week",
          value: false,
        },
        {
          title: text + " 1 kilogram per week",
          value: false,
        },
      ],
      maximum: 1,
    },
    {
      key: "register",
      stepCount: 5,
      stepTitle: "Register",
      title: "We are done! Create your account.",
      subtitle: "You are 1 step away from your goals.",
      type: "register",
    },
  ];
  if (!text) {
    return goalSteps.filter((step) => step.key !== "weeklyGoal");
  }
  return goalSteps;
};

export const goalStepKeys = [
  "weightLossBarrierEncouragement",
  "weightLossBarrier",
  "gainWeightEncouragement",
  "gainWeightOptions",
  "maintainWeightEncouragement",
  "maintainWeightOptions",
  "gainMuscleEncouragement",
  "gainMuscleGoal",
  "dietEncouragement",
  "dietFocus",
  "stressManagementEncouragement",
  "manageStress",
  "stepCountEncouragement",
  "currentSteps",
  "activity",
  "aboutYourself",
  "physicalInfo",
  "weeklyGoal",
  "register",
];
