import { z } from "zod";

export const BugSchema = z.object({
  title: z.string(),
  developmentArea: z.string(),
  severity: z.string(),
  stepsToReproduce: z.array(z.string()),
  environmentsUsed: z.array(z.string()),
  expectedResult: z.string(),
  actualResult: z.string()
});

export type BugFormData = z.infer<typeof BugSchema>;

const BugSchemaGet = BugSchema.extend({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId format"),
  project: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId format"),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type BugGetData = z.infer<typeof BugSchemaGet>