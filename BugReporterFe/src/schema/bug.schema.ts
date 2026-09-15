import { z } from "zod";

export const BugSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required."
    }).max(100, {
    message: "Bug title must be less than 100 characters."
  }),
  developmentArea: z.string().min(1, {
    message: "Development Area is required."
  }),
  severity: z.enum(["low", "normal", "high", "extreme"]),
  stepsToReproduce: z.array(z.string()).min(1, {
    message: "A Step to Reproduce is required."
    }).max(10, {
    message: "Bug cannot have more than 10 steps to reproduce."
  }),
  environmentsUsed: z.array(z.string()).min(1, {
    message: "Bug must have at least one environment."
  }),
  expectedResult: z.string().min(1, {
    message: "Expected result is required."
    }).max(250, {
    message: "Expected result must be less than 250 characters."
  }),
  actualResult: z.string().min(1, {
    message: "Actual Result is required."
    }).max(250, {
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

// * Schema's and types for the BugWizard *

export const BugPageOneSchema = BugSchema.pick({
  title: true,
  developmentArea: true,
  environmentsUsed: true
})

export const BugPageTwoSchema = BugSchema.pick({
  severity: true,
  stepsToReproduce: true
})

export const BugPageThreeSchema = BugSchema.pick({
  expectedResult: true,
  actualResult: true
})

export type BugPageOneData = z.infer<typeof BugPageOneSchema>;
export type BugPageTwoData = z.infer<typeof BugPageTwoSchema>;
export type BugPageThreeData = z.infer<typeof BugPageThreeSchema>;