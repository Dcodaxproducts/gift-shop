import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .url("Image URL is invalid")
  .optional()
  .or(z.literal(""));

const optionalNumber = z.number().optional();

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const providerBaseSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().min(1, "Email is required").email("Email is invalid"),
  contact: z.string().trim().min(1, "Contact is required"),
  businessName: z.string().trim().min(1, "Business name is required"),
  businessCategoryId: z.string().trim().min(1, "Business category is required"),
  taxId: z.string().trim().optional(),
  businessAddress: z.string().trim().min(1, "Business address is required"),
  businessBio: z.string().trim().optional(),
  companyLogoUrl: optionalUrl,
  coverImageUrl: optionalUrl,
  location: z
    .object({
      lat: optionalNumber,
      lng: optionalNumber,
    })
    .optional(),
});

export const providerSchema = providerBaseSchema.extend({
  password: passwordSchema,
});

export const updateProviderSchema = providerBaseSchema.extend({
  password: z.string().optional(),
});

export type ProviderFormValues = z.infer<typeof updateProviderSchema>;
