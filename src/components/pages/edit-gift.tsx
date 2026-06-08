"use client";
import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ErrorMessage } from "@/components/common/error-message";
import { GiftFormPage } from "@/components/pages/gift-form";
import { useGift, useUpdateGift } from "@/hooks/useGift";
import type { Gift, GiftVariant } from "@/types/gifts";
import type { CreateGiftFormValues } from "@/validations/gifts";

const toNumber = (value: number | string | undefined | null, fallback = 0) => {
  const nextValue = Number(value);

  return Number.isFinite(nextValue) ? nextValue : fallback;
};

const getGiftImages = (gift: Gift) => {
  if (Array.isArray(gift.imageUrls) && gift.imageUrls.length > 0) {
    return gift.imageUrls;
  }

  if (Array.isArray(gift.images) && gift.images.length > 0) {
    return gift.images;
  }

  return gift.imagesUrl ? [gift.imagesUrl] : [];
};

const mapVariant = (variant: GiftVariant, index: number) => ({
  id: variant.id ?? `${index}-${variant.name}`,
  name: variant.name,
  price: toNumber(variant.price ?? variant.originalPrice, 1),
});

const mapGiftToFormValues = (gift: Gift): CreateGiftFormValues => ({
  name: gift.name ?? "",
  description: gift.description ?? "",
  categoryId: gift.categoryId ?? gift.category?.id ?? "",
  price: toNumber(gift.price, 1),
  providerId: gift.providerId ?? gift.provider?.id ?? "",
  imageUrls: getGiftImages(gift),
  isPublished: gift.isActive ?? gift.status === "ACTIVE",
  variants: gift.variants?.map(mapVariant) ?? [],
});

export function EditGiftPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const giftId = params?.id ?? "";
  const { data: gift, isError, isLoading, refetch } = useGift(giftId);
  const updateGift = useUpdateGift();

  const defaultValues = useMemo(
    () => (gift ? mapGiftToFormValues(gift) : undefined),
    [gift],
  );

  const handleSubmit = (values: CreateGiftFormValues) => {
    if (!giftId) return;

    updateGift.mutate(
      { id: giftId, payload: values },
      { onSuccess: () => router.push("/gifts") },
    );
  };

  if (isError) {
    return (
      <ErrorMessage
        message="Gift not found."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <GiftFormPage
      defaultValues={defaultValues}
      isInitialLoading={isLoading}
      mode="edit"
      onSubmit={handleSubmit}
      saving={updateGift.isPending}
    />
  );
}
