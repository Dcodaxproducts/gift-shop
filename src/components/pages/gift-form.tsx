"use client";

import { type ChangeEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Eye, Gift } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import PageHeader from "@/components/common/page-header";
import { GiftMediaGalleryCard } from "@/components/custom/gift-media-gallery-card";
import { GiftInfoForm } from "@/components/forms/gift-info-form";
import { PricingVariantsForm } from "@/components/forms/pricing-variants-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useGiftCategories } from "@/hooks/useGiftCategories";
import { useProviders } from "@/hooks/useProviders";
import { useStorage } from "@/hooks/useStorage";
import { UPLOAD_FOLDERS } from "@/utils/file";
import { createGiftSchema, type CreateGiftFormValues } from "@/validations/gifts";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

const emptyGiftValues: CreateGiftFormValues = {
  name: "",
  description: "",
  categoryId: "",
  price: 1,
  providerId: "",
  imageUrls: [],
  isPublished: false,
  variants: [],
};

type GiftFormMode = "create" | "edit";

type GiftFormPageProps = {
  defaultValues?: CreateGiftFormValues;
  isInitialLoading?: boolean;
  mode: GiftFormMode;
  onSubmit: (values: CreateGiftFormValues) => void;
  saving?: boolean;
};

export function GiftFormPage({
  defaultValues,
  isInitialLoading = false,
  mode,
  onSubmit,
  saving = false,
}: GiftFormPageProps) {
  const router = useRouter();
  const { upload, remove: deleteUpload, isUploading } = useStorage();

  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});
  const [uploadIds, setUploadIds] = useState<Record<string, string>>({});

  const { data: categories = [], isLoading: categoriesLoading } = useGiftCategories({
    limit: 100,
    sortBy: "name",
    sortOrder: "ASC",
  });

  const { data: providers = [], isLoading: providersLoading } = useProviders({
    limit: 100,
    status: "APPROVED",
    sortBy: "businessName",
    sortOrder: "ASC",
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<CreateGiftFormValues>({
    resolver: zodResolver(createGiftSchema),
    defaultValues: defaultValues ?? emptyGiftValues,
  });

  const { append, fields, remove } = useFieldArray({
    control,
    keyName: "fieldId",
    name: "variants",
  });

  const categoryId = useWatch({ control, name: "categoryId" });
  const providerId = useWatch({ control, name: "providerId" });
  const imageUrls = useWatch({ control, name: "imageUrls" }) ?? [];
  const isPublished = useWatch({ control, name: "isPublished" });

  const pageTitle = mode === "create" ? "Create New Gift" : "Edit Gift";
  const submitLabel = mode === "create" ? "Save Gift" : "Update Gift";
  const isBusy = saving || isUploading || isInitialLoading;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    return () => {
      Object.values(imagePreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";

    if (files.length === 0) return;

    const hasInvalidFile = files.some((file) => !ACCEPTED_IMAGE_TYPES.includes(file.type));
    if (hasInvalidFile) {
      toast.error("Please upload PNG, JPG, or WebP images only.");
      return;
    }

    const uploadedUrls: string[] = [];
    const newPreviews: Record<string, string> = {};
    const newUploadIds: Record<string, string> = {};

    for (const file of files) {
      const previewUrl = URL.createObjectURL(file);
      const result = await upload(file, UPLOAD_FOLDERS.GIFT_IMAGES);

      if (result?.fileUrl) {
        uploadedUrls.push(result.fileUrl);
        newPreviews[result.fileUrl] = previewUrl;
        newUploadIds[result.fileUrl] = result.uploadId;
      } else {
        URL.revokeObjectURL(previewUrl);
      }
    }

    if (uploadedUrls.length > 0) {
      setImagePreviews((prev) => ({ ...prev, ...newPreviews }));
      setUploadIds((prev) => ({ ...prev, ...newUploadIds }));
      setValue("imageUrls", [...imageUrls, ...uploadedUrls], {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const handleRemoveImage = async (url: string) => {
    const uploadId = uploadIds[url];

    if (uploadId) {
      const deleted = await deleteUpload(uploadId);
      if (!deleted) return;
      setUploadIds((prev) => {
        const next = { ...prev };
        delete next[url];
        return next;
      });
    }

    setImagePreviews((prev) => {
      const next = { ...prev };
      if (next[url]) {
        URL.revokeObjectURL(next[url]);
        delete next[url];
      }
      return next;
    });

    setValue(
      "imageUrls",
      imageUrls.filter((imageUrl) => imageUrl !== url),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <PageHeader
        title={pageTitle}
        description="Define gift parameters, pricing, and provider details for the marketplace."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
          <GiftInfoForm
            categories={categories}
            categoriesLoading={categoriesLoading}
            categoryId={categoryId}
            errors={errors}
            onCategoryChange={(val) => setValue("categoryId", val, { shouldDirty: true, shouldValidate: true })}
            register={register}
          />

          <PricingVariantsForm
            errors={errors}
            fields={fields}
            onAdd={() => append({ id: Date.now().toString(), name: "", price: 0 })}
            onRemove={remove}
            register={register}
          />

          <GiftMediaGalleryCard
            errorMessage={errors.imageUrls?.message}
            imagePreviews={imagePreviews}
            imageUrls={imageUrls}
            isUploading={isUploading}
            onRemove={handleRemoveImage}
            onUpload={handleImageUpload}
          />
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent>
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Eye className="size-4" strokeWidth={2.25} />
                </span>
                <h2 className="text-sm font-semibold">Visibility</h2>
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    This gift will be live on the storefront immediately after saving.
                  </p>
                  <Switch
                    checked={isPublished}
                    onClick={() => setValue("isPublished", !isPublished, { shouldDirty: true })}
                    className="h-6 w-11 shrink-0"
                    disabled={isBusy}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Briefcase className="size-4" strokeWidth={2.25} />
                </span>
                <h2 className="text-sm font-semibold">Provider</h2>
              </div>
              <div className="mt-5 space-y-2">
                <Label>Assignment</Label>
                <Select
                  value={providerId}
                  onValueChange={(val) => setValue("providerId", val, { shouldDirty: true, shouldValidate: true })}
                  disabled={isBusy}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={providersLoading ? "Loading providers..." : "Select a provider"} />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.providerId?.message && (
                  <p className="px-1 text-xs font-medium leading-5 text-destructive">
                    {errors.providerId.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-10 rounded-xl px-5 text-xs"
          disabled={isBusy}
          onClick={() => router.push("/gifts")}
        >
          Cancel & Exit
        </Button>
        <Button type="submit" className="h-10 rounded-xl px-5 text-xs gap-2" disabled={isBusy}>
          <Gift className="size-4" strokeWidth={2.25} />
          {saving ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
