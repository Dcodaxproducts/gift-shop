import { z } from "zod";

export const suspensionFormSchema = z.object({
  reason: z.string().min(1, "Please select a suspension reason"),
  comments: z.string().optional(),
});

export type SuspensionFormData = z.infer<typeof suspensionFormSchema>;