import { z } from "zod";

export const broadcastSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  message: z.string().trim().min(1, "Message is required"),
  audience: z.enum(["ALL_USERS", "PROVIDER", "USER"], {
    message: "Audience is required",
  }),
});

export type BroadcastFormValues = z.infer<typeof broadcastSchema>;
