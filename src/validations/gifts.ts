import { z } from "zod";

export const giftVariantSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, "Variant name is required"),
  // sku: z.string().trim().min(1, "Variant SKU is required"),
  price: z.number().positive("Variant price must be greater than 0"),
});

export const createGiftSchema = z.object({
  name: z.string().trim().min(1, "Gift name is required"),
  description: z.string().trim().min(1, "Description is required"),
  categoryId: z.string().trim().min(1, "Category is required"),
  providerId: z.string().trim().min(1, "Provider is required"),
  imageUrls: z.array(z.string().url("Image URL is invalid")),
  isPublished: z.boolean(),
  variants: z.array(giftVariantSchema).min(1, "Add at least one variant"),
});

export type CreateGiftFormValues = z.infer<typeof createGiftSchema>;
