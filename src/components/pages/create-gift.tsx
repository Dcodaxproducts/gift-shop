"use client";

import { GiftFormPage } from "@/components/pages/gift-form";
import { useCreateGift } from "@/hooks/useGift";
import type { CreateGiftFormValues } from "@/validations/gifts";

export function CreateGiftPage() {
  const createGift = useCreateGift();

  const handleSubmit = (values: CreateGiftFormValues) => {
    createGift.mutate(values);
  };

  return (
    <GiftFormPage
      mode="create"
      onSubmit={handleSubmit}
      saving={createGift.isPending}
    />
  );
}
