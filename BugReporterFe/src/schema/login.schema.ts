import { z } from "zod";

const passwordValidation: RegExp = new RegExp(
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
);

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters."
  }).regex(passwordValidation, {
    message: "Password must include atleast one number, one uppercase letter, one lowercase letter, and one special character."
  })
});

export type LoginFormData = z.infer<typeof LoginSchema>;