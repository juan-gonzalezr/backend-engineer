import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({ required_error: " Username is required" }),
  email: z.string({ required_error: " Email is required" }),
  password: z.string({ required_error: " Password is required" }),
});

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }),
  password: z.string({ required_error: "Password is required" }),
});