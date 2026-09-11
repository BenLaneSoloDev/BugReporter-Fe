import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().max(100, {
    message: "Title must be less than 100 characters."
  }),
  description: z.string().max(500, {
    message: "Description must be less than 500 characters."
  }).optional(),
  developmentAreas: z.array(z.string()).min(1, {
    message: "A development area must be provided"
  }),
  environments: z.array(z.string()).min(1, {
    message: "An environment must be provided"
  }),
});

export type ProjectFormData = z.infer<typeof ProjectSchema>;