import { z } from "zod";

export const stepSchemas = z.object({
  firstName: z.object({
    firstName: z.string().min(1, "First name is required"),
  }),
  goals: z.object({
    goals: z
      .array(
        z.object({
          title: z.string(),
          value: z.boolean(),
        })
      )
      .refine((goals) => goals.some((goal) => goal.value), {
        message: "Please select at least one goal.",
      }),
  }),
});
