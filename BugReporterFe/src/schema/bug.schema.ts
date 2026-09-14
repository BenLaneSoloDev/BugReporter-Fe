import { z } from "zod";

export const BugSchema = z.object({
  title: z.string().max(100, {
    message: "Bug title must be less than 100 characters."
  }),
  developmentArea: z.string(),
  severity: z.enum(["low", "normal", "high", "extreme"]),
  stepsToReproduce: z.array(z.string()).max(10, {
    message: "Bug cannot have more than 10 steps to reproduce."
  }),
  environmentsUsed: z.array(z.string()).min(1, {
    message: "Bug must have at least one environment."
  }),
  expectedResult: z.string().max(250, {
    message: "Expected result must be less than 250 characters."
  }),
  actualResult: z.string().max(250, {
    message: "Actual result must be less than 250 characters."
  })
});

export type BugFormData = z.infer<typeof BugSchema>;

const BugSchemaPost = BugSchema.extend({
  project: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId format.")
})

export type BugPostData = z.infer<typeof BugSchemaPost>


const BugSchemaGet = BugSchemaPost.extend({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId format."),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type BugGetData = z.infer<typeof BugSchemaGet>