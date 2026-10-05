import { z } from "zod";

export const taskStatusSchema = z.enum([
  "TODO",
  "IN_PROGRESS",
  "DONE",
]);

export const taskPrioritySchema = z.enum([
  "LOW",
  "MEDIUM",
  "HIGH",
]);

// Create Task
export const createTaskSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(2, "Task title must be at least 2 characters")
      .max(150, "Task title cannot exceed 150 characters"),

    description: z
      .string()
      .trim()
      .max(2000, "Description cannot exceed 2000 characters")
      .optional(),

    priority: taskPrioritySchema.default("MEDIUM"),


    dueDate: z
      .coerce
      .date()
      .optional(),
  }),
});

// Update Task
export const updateTaskSchema = z.object({
  body: z
    .object({
      title: z
        .string()
        .trim()
        .min(2, "Task title must be at least 2 characters")
        .max(150, "Task title cannot exceed 150 characters")
        .optional(),

      description: z
        .string()
        .trim()
        .max(2000, "Description cannot exceed 2000 characters")
        .optional(),

      status: taskStatusSchema.optional(),

      priority: taskPrioritySchema.optional(),

      

      dueDate: z
        .coerce
        .date()
        .nullable()
        .optional(),
    })
    .refine(
      (data) => Object.keys(data).length > 0,
      {
        message: "At least one field is required",
      }
    ),
});