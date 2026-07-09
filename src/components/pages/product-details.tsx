"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Edit2,
  ImageIcon,
  Maximize2,
  PackageCheck,
  Star,
  Store,
  Tag,
} from "lucide-react";
import MyImage from "@/components/common/MyImage";
import PageHeader from "@/components/common/page-header";
import { ErrorMessage } from "@/components/common/error-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePreviewDialog } from "@/components/dialog/image-preview-dialog";
import { ProductDetailsSkeleton } from "@/components/skeletons";
import { useGift } from "@/hooks/useGift";
import { cn } from "@/lib/utils";
import type { Gift, GiftVariant } from "@/types/gifts";
import { StatusBadge } from "@/utils/status";

const formatPrice = (
  price?: number | string | null,
  currency = "USD",
) => {
  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice)) {
    return "-";
  }

  return numericPrice.toLocaleString("en-US", {
    style: "currency",
    currency,
  });
};

const formatDate = (value?: string) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getGiftImages = (gift?: Gift) => {
  if (!gift) return [];

  const images = [
    gift.imageUrl,
    ...(gift.imageUrls ?? []),
    gift.imagesUrl,
    ...(gift.images ?? []),
  ].filter((image): image is string => Boolean(image));

  return Array.from(new Set(images));
};

const MAX_VISIBLE_THUMBNAILS = 5;

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof PackageCheck;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Card className="rounded-lg p-4">
      <CardContent>
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-slate-400">{label}</p>
            <div className="mt-1 truncate text-sm font-semibold text-slate-900">
              {value}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0">
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className="max-w-[65%] text-right text-xs font-semibold text-slate-800">
        {value}
      </dd>
    </div>
  );
}

function VariantRow({
  variant,
  currency,
}: {
  variant: GiftVariant;
  currency?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-100 bg-slate-50/60 p-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-semibold text-slate-900">
            {variant.name}
          </p>
          {variant.isDefault ? (
            <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
              Default
            </span>
          ) : null}
          {variant.isPopular ? (
            <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-600">
              Popular
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-[11px] font-medium text-slate-400">
          {variant.isActive === false ? "Inactive variant" : "Active variant"}
        </p>
      </div>
      <p className="shrink-0 text-sm font-semibold text-slate-900">
        {formatPrice(variant.price ?? variant.originalPrice, currency)}
      </p>
    </div>
  );
}

export function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const giftId = params?.id ?? "";
  const { data: gift, isError, isLoading, refetch } = useGift(giftId);
  const images = useMemo(() => getGiftImages(gift), [gift]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const activeImage = images[selectedImage] ?? images[0];
  const variants = gift?.variants ?? [];
  const categoryName = gift?.categoryName ?? gift?.category?.name ?? "-";
  const providerName =
    gift?.providerName ?? gift?.provider?.businessName ?? gift?.provider?.name ?? "-";
  const isStoreVisible = gift?.status === "ACTIVE";
  const hasMultipleImages = images.length > 1;
  const visibleThumbnails =
    images.length > MAX_VISIBLE_THUMBNAILS
      ? images.slice(0, MAX_VISIBLE_THUMBNAILS - 1)
      : images;
  const hiddenImageCount = Math.max(images.length - visibleThumbnails.length, 0);

  const showPreviousImage = () => {
    setSelectedImage((current) =>
      images.length ? (current - 1 + images.length) % images.length : 0,
    );
  };

  const showNextImage = () => {
    setSelectedImage((current) =>
      images.length ? (current + 1) % images.length : 0,
    );
  };

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError || !gift) {
    return (
      <ErrorMessage
        message="Gift details could not be loaded."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title={gift.name}
        description={gift.shortDescription ?? `${categoryName} by ${providerName}`}
        actions={
          <>
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="size-4" />
              Back
            </Button>
            <Button onClick={() => router.push(`/gifts/${gift.id}`)}>
              <Edit2 className="size-4" />
              Edit Gift
            </Button>
          </>
        }
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <InfoTile
          icon={PackageCheck}
          label="Base Price"
          value={formatPrice(gift.price, gift.currency)}
        />
        <InfoTile
          icon={Tag}
          label="Category"
          value={categoryName}
        />
        <InfoTile
          icon={Store}
          label="Provider"
          value={providerName}
        />
        <InfoTile
          icon={Star}
          label="Rating"
          value={`${gift.rating ?? 0} (${gift.reviewCount ?? 0} reviews)`}
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,520px)_minmax(320px,1fr)]">
        <div className="space-y-5">
          <Card className="overflow-hidden rounded-lg p-0">
            <div className="relative h-72 bg-slate-100 sm:h-80 lg:h-72 xl:h-80">
              {activeImage ? (
                <button
                  type="button"
                  className="group relative block size-full"
                  onClick={() => setPreviewOpen(true)}
                  aria-label="Preview product image"
                >
                  <MyImage
                    src={activeImage}
                    alt={gift.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 520px, 100vw"
                  />
                  <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-slate-700 opacity-0 shadow-sm transition group-hover:opacity-100">
                    <Maximize2 className="size-4" />
                  </span>
                </button>
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">
                  <ImageIcon className="size-10" />
                </div>
              )}

              {hasMultipleImages ? (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white"
                    onClick={showPreviousImage}
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white"
                    onClick={showNextImage}
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              ) : null}
            </div>
            {images.length > 1 ? (
              <div className="grid grid-cols-5 gap-3 border-t border-slate-100 p-4">
                {visibleThumbnails.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-lg border bg-slate-100",
                      selectedImage === index
                        ? "border-primary ring-2 ring-primary/15"
                        : "border-slate-100",
                    )}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View product image ${index + 1}`}
                  >
                    <MyImage
                      src={image}
                      alt={`${gift.name} thumbnail ${index + 1}`}
                      fill
                      sizes="96px"
                    />
                  </button>
                ))}
                {hiddenImageCount > 0 ? (
                  <button
                    type="button"
                    className="relative aspect-square overflow-hidden rounded-lg border border-slate-100 bg-slate-900 text-sm font-semibold text-white"
                    onClick={() => {
                      setSelectedImage(visibleThumbnails.length);
                      setPreviewOpen(true);
                    }}
                    aria-label={`View ${hiddenImageCount} more product images`}
                  >
                    <MyImage
                      src={images[visibleThumbnails.length]}
                      alt={`${gift.name} more images`}
                      fill
                      sizes="96px"
                      className="opacity-45"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-slate-950/35">
                      +{hiddenImageCount}
                    </span>
                  </button>
                ) : null}
              </div>
            ) : null}
          </Card>

          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-slate-600 first-letter:uppercase">
                {gift.description || "No description provided for this gift."}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Pricing Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {variants.length > 0 ? (
                variants.map((variant, index) => (
                  <VariantRow
                    key={variant.id ?? `${variant.name}-${index}`}
                    variant={variant}
                    currency={gift.currency}
                  />
                ))
              ) : (
                <p className="text-sm text-slate-500">No variants configured.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-5">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent>
              <dl>
                <DetailRow label="Status" value={<StatusBadge status={gift.status} />} />
                <DetailRow
                  label="Moderation"
                  value={
                    gift.moderationStatus ? (
                      <StatusBadge status={gift.moderationStatus} />
                    ) : (
                      "-"
                    )
                  }
                />
                <DetailRow
                  label="Store Visibility"
                  value={
                    <span className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold",
                      isStoreVisible
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-500",
                    )}>
                      <CheckCircle2 className="size-3" />
                      {isStoreVisible ? "Published" : "Hidden"}
                    </span>
                  }
                />
                <DetailRow label="Featured" value={gift.isFeatured ? "Yes" : "No"} />
              </dl>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl>
                <DetailRow label="Category" value={categoryName} />
                <DetailRow label="Provider" value={providerName} />
                <DetailRow label="Currency" value={gift.currency ?? "USD"} />
                <DetailRow label="Variants" value={variants.length} />
              </dl>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CalendarDays className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Created</p>
                    <p className="mt-1 text-xs text-slate-500">{formatDate(gift.createdAt)}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <CalendarDays className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Last Updated</p>
                    <p className="mt-1 text-xs text-slate-500">{formatDate(gift.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>

      <ImagePreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        images={images}
        selectedImage={selectedImage}
        productName={gift.name}
        onPrevious={showPreviousImage}
        onNext={showNextImage}
      />
    </div>
  );
}
