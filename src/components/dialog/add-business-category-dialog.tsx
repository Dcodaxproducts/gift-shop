"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateProviderBusinessCategory,
  useUpdateProviderBusinessCategory,
} from "@/hooks/useProviderBusinessCategories";
import { useStorage } from "@/hooks/useStorage";
import type { ProviderBusinessCategory } from "@/types/provider-business-categories";
import { UPLOAD_FOLDERS } from "@/utils/file";

type AddBusinessCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: ProviderBusinessCategory | null;
};

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }
      reject(new Error("Invalid file result"));
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

export function AddBusinessCategoryDialog({
  open,
  onOpenChange,
  category,
}: AddBusinessCategoryDialogProps) {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [visible, setVisible] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const createBusinessCategoryMutation = useCreateProviderBusinessCategory();
  const updateBusinessCategoryMutation = useUpdateProviderBusinessCategory();
  const { upload, isUploading } = useStorage();
  const isEditMode = !!category;

  const resetForm = () => {
    setVisible(category?.isActive ?? true);
    setName(category?.name ?? "");
    setDescription(category?.description ?? "");
    setImagePreview(category?.imageUrl ?? undefined);
    setImageUrl(category?.imageUrl ?? undefined);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (open) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, category?.id]);

  const handleImageButtonClick = () => {
    if (isUploading) return;
    imageInputRef.current?.click();
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      event.target.value = "";
      return;
    }

    const dataUrl = await fileToDataUrl(file);
    setImagePreview(dataUrl);
    setImageUrl(undefined);

    const result = await upload(file, UPLOAD_FOLDERS.GIFT_CATEGORY_IMAGES);

    if (result) {
      setImageUrl(result.fileUrl);
    } else {
      setImagePreview(undefined);
      event.target.value = "";
    }
  };

  const handleSaveCategory = async () => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (
      !trimmedName ||
      createBusinessCategoryMutation.isPending ||
      updateBusinessCategoryMutation.isPending ||
      isUploading
    ) {
      return;
    }

    try {
      const payload = {
        name: trimmedName,
        description: trimmedDescription || undefined,
        imageUrl,
        isActive: visible,
      };

      if (category) {
        await updateBusinessCategoryMutation.mutateAsync({
          id: category.id,
          payload,
        });
      } else {
        await createBusinessCategoryMutation.mutateAsync(payload);
      }

      resetForm();
      onOpenChange(false);
    } catch {
      // Error toast is handled inside the mutation hooks.
    }
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (
      !nextOpen &&
      !createBusinessCategoryMutation.isPending &&
      !updateBusinessCategoryMutation.isPending &&
      !isUploading
    ) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const isBusy =
    createBusinessCategoryMutation.isPending ||
    updateBusinessCategoryMutation.isPending ||
    isUploading;

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      title={isEditMode ? "Edit Category" : "Add New Category"}
      className="max-w-[380px]"
      contentClassName="px-[22px] pb-0 pt-[21px]"
      footerClassName="justify-center gap-3 border-t border-slate-100 py-4"
      footer={
        <>
          <Button
            onClick={handleSaveCategory}
            disabled={!name.trim() || isBusy}
          >
            {createBusinessCategoryMutation.isPending ||
            updateBusinessCategoryMutation.isPending
              ? "Saving..."
              : isUploading
              ? "Uploading..."
              : isEditMode
              ? "Update Category"
              : "Save Category"}
          </Button>

          <Button
            variant="outline"
            className="w-32"
            onClick={handleCancel}
            disabled={isBusy}
          >
            Cancel
          </Button>
        </>
      }
    >
      <div className="space-y-[18px]">
        <div className="flex flex-col items-center text-center">
          <input
            ref={imageInputRef}
            type="file"
            accept="image/png,image/svg+xml"
            className="hidden"
            onChange={handleImageChange}
          />

          <button
            type="button"
            className="flex size-[66px] cursor-pointer flex-col items-center justify-center rounded-full border border-dashed border-slate-300 bg-white text-slate-400 transition hover:border-[#6d28d9] hover:text-[#6d28d9] overflow-hidden"
            aria-label="Upload category image"
            onClick={handleImageButtonClick}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="size-4 animate-spin text-[#6d28d9]" />
            ) : imagePreview ? (
              <Image
                src={imagePreview}
                alt="Category image"
                width={66}
                height={66}
                className="size-full rounded-full object-cover"
              />
            ) : (
              <>
                <ImageIcon className="size-3.5" strokeWidth={2.2} />
                <span className="mt-1 text-[7px] font-bold tracking-[0.08em]">
                  UPLOAD ICON
                </span>
              </>
            )}
          </button>

          <p className="mt-3 text-[9px] leading-3 text-slate-400">
            Suggested size: 512x512px.
            <br />
            PNG or SVG format.
          </p>
        </div>

        <div>
          <Label htmlFor="business-category-name">Category Name</Label>
          <Input
            id="business-category-name"
            placeholder="e.g. Gift Store"
            className="h-9! rounded-md text-xs mt-0.5"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="business-category-description">Description</Label>
          <Textarea
            id="business-category-description"
            placeholder="Briefly describe the providers in this category..."
            className="rounded-md text-xs! mt-0.5"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-3">
          <div>
            <Label>Visible on Storefront</Label>
            <p className="mt-0.5 text-[8px] leading-3 text-slate-400">
              Enable this to make the category public.
            </p>
          </div>

          <Switch
            checked={visible}
            onClick={() => setVisible((current) => !current)}
          />
        </div>
      </div>
    </Dialog>
  );
}
