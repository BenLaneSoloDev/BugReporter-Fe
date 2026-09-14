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

const ProjectSchemaGet = ProjectSchema.extend({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId format"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
})

export type ProjectImportData = z.infer<typeof ProjectSchemaGet>

export const ProjectSchemeDelete = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId format");

export type MongoId = z.infer<typeof ProjectSchemeDelete>;