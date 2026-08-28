import { z } from "zod";

export const createRoleFormSchema = z.object({
  name: z.string().trim().min(1, "Role name is required"),
  description: z.string().trim().optional(),
});

export type CreateRoleFormData = z.infer<typeof createRoleFormSchema>;
