import { z } from "zod";

export const taskFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(100, "Title cannot exceed 100 characters"),
    desc: z
      .string()
      .trim()
      .min(1, "Description is required")
      .max(500, "Description cannot exceed 1000 characters")
      .optional(),
    start_date: z.string().datetime({
      message: "Invalid start date",
    }),
    end_date: z.string().datetime({
      message: "Invalid end date",
    }).optional(),
  })
  .refine((data) => data.end_date && new Date(data.end_date) > new Date(data.start_date), {
    message: "End date must be after start date",
    path: ["end_date"],
  });
