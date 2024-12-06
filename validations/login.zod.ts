import { z } from "zod";

export const loginValidation = z.object({
  email: z
    .string()
    .min(1, "Email field is required")
    .email("Please enter a valid email")
    .default(""),
  password: z
    .string()
    .min(1, "Password can not be empty")
    .min(6, "Password should be at least 6 characters")
    .refine(
      (val) => /[A-Z]/.test(val), // At least one uppercase letter
      { message: "Password must contain at least one uppercase letter" }
    )
    .refine(
      (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), // At least one special character
      { message: "Password must contain at least one special character" }
    )
    .default(""),
  rememberMe: z.boolean().describe("Remember Me"),
});
