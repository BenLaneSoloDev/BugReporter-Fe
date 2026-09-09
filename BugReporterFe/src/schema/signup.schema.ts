import { z } from "zod";

const passwordValidation: RegExp = new RegExp(
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
);

export const SignupSchema = z.object({
  firstName: z.string().max(100, {
    message: "First name must be less than 100 characters."
  }),
  lastName: z.string().max(100, {
    message: "Last name must be less than 100 characters."
  }).optional(),
  email: z.email(),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters."
  }).regex(passwordValidation, {
    message: "Password must include atleast one number, one uppercase letter, one lowercase letter, and one special character."
  })
});

export type SignupFormData = z.infer<typeof SignupSchema>;