import { z } from "zod";

const requiredNumber = (fieldName: string) => (
  z.preprocess(
    (value) => {
      if (value === "" || value === null || value === undefined) return undefined;
      return Number(value);
    },
    z.number({ error: `${fieldName} is required` }).min(0, `${fieldName} is required`),
  )
);

export const refundCancellationTierSchema = z.object({
  daysBeforeDelivery: requiredNumber("Days before delivery"),
  deductionPercent: requiredNumber("Deduction percent"),
  label: z.string().trim().min(1, "Label is required"),
});

export const refundCancellationTiersSchema = z.object({
  cancellationTiers: z
    .array(refundCancellationTierSchema)
    .min(1, "At least one cancellation tier is required"),
});

export type RefundCancellationTiersFormValues = z.input<typeof refundCancellationTiersSchema>;
export type RefundCancellationTiersSubmitValues = z.output<typeof refundCancellationTiersSchema>;
