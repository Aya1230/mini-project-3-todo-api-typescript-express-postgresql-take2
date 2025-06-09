import { z } from "zod";

export const createSchema = z.object({
  body: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1).optional(),
      completed: z.boolean().optional(),
    })
    .strict(),
});

export const deleteSchema = z.object({
  params: z.object({
    id: z
      .string()
      .min(1)
      .refine((value) => {
        return /^\d+$/.test(value);
      }, "ID must contain only numbers"),
  }),
});
