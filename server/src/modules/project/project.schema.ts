import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Project name must be at least 2 characters")
      .max(100, "Project name cannot exceed 100 characters"),

    description: z
      .string()
      .trim()
      .max(1000, "Description cannot exceed 1000 characters")
      .optional(),
  }),

  query: z.object({}).optional(),

  params: z.object({}).optional(),
});

export const updateProjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Project name must be at least 2 characters")
      .max(100, "Project name cannot exceed 100 characters")
      .optional(),

    description: z
      .string()
      .trim()
      .max(1000, "Description cannot exceed 1000 characters")
      .optional(),
  }),

  query: z.object({}).optional(),

  params: z.object({}).optional(),
});
  

  