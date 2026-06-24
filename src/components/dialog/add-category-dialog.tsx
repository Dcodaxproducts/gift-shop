"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ImageIcon, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "../ui/textarea";
import { useCreateGiftCategory, useUpdateGiftCategory } from "@/hooks/useGiftCategories";
import { useStorage } from "@/hooks/useStorage";
import type { GiftCategory } from "@/types/gift-categories";
import { UPLOAD_FOLDERS } from "@/utils/file";

type AddCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: GiftCategory | null;
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

export function AddCategoryDialog({
  open,
  onOpenChange,
  category,
}: AddCategoryDialogProps) {
  const iconInputRef = useRef<HTMLInputElement | null>(null);

  const [visible, setVisible] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconPreview, setIconPreview] = useState<string | undefined>();
  const [iconUrl, setIconUrl] = useState<string | undefined>();
  const [iconUploadId, setIconUploadId] = useState<string | undefined>();

  const createGiftCategoryMutation = useCreateGiftCategory();
  const updateGiftCategoryMutation = useUpdateGiftCategory();
  const { upload, remove: deleteUpload, isUploading } = useStorage();
  const isEditMode = !!category;

  const resetForm = () => {
    setVisible(category?.isActive ?? true);
    setName(category?.name ?? "");
    setDescription(category?.description ?? "");
    setIconPreview(category?.imageUrl ?? undefined);
    setIconUrl(category?.imageUrl ?? undefined);
    setIconUploadId(undefined);

    if (iconInputRef.current) {
      iconInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open, category?.id]);

  const handleIconButtonClick = () => {
    if (isUploading || iconPreview) return;
    iconInputRef.current?.click();
  };

  const handleIconChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (iconPreview) return;

    const allowedTypes = ["image/png", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return;
    }

    // Show preview instantly
    const dataUrl = await fileToDataUrl(file);
    setIconPreview(dataUrl);
    setIconUrl(undefined);

    // Upload to S3 via presigned URL
    const result = await upload(file, UPLOAD_FOLDERS.GIFT_CATEGORY_IMAGES);

    if (result) {
      setIconUrl(result.fileUrl);
      setIconPreview(result.fileUrl);
      setIconUploadId(result.uploadId);
    } else {
      // Upload failed — clear preview
      setIconPreview(undefined);
    }
  };

  const handleRemoveIcon = async () => {
    if (isUploading) return;

    if (iconUploadId) {
      const deleted = await deleteUpload(iconUploadId);
      if (!deleted) return;
    }

    setIconPreview(undefined);
    setIconUrl(undefined);
    setIconUploadId(undefined);

    if (iconInputRef.current) {
      iconInputRef.current.value = "";
    }
  };

  const handleSaveCategory = async () => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName || createGiftCategoryMutation.isPending || updateGiftCategoryMutation.isPending || isUploading) return;

    try {
      const payload = {
        name: trimmedName,
        description: trimmedDescription || undefined,
        imageUrl: category ? iconUrl ?? "" : iconUrl,
        isActive: visible,
      };

      if (category) {
        await updateGiftCategoryMutation.mutateAsync({
          id: category.id,
          payload,
        });
      } else {
        await createGiftCategoryMutation.mutateAsync(payload);
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
    if (!nextOpen && !createGiftCategoryMutation.isPending && !updateGiftCategoryMutation.isPending && !isUploading) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const isBusy = createGiftCategoryMutation.isPending || updateGiftCategoryMutation.isPending || isUploading;

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      title={isEditMode ? "Edit Category" : "Add New Category"}
      className="max-w-95"
      contentClassName="px-[22px] pb-0 pt-[21px]"
      footerClassName="justify-center gap-3 border-t border-slate-100 py-4"
      footer={
        <>
          <Button
            onClick={handleSaveCategory}
            disabled={!name.trim() || isBusy}
          >
            {createGiftCategoryMutation.isPending || updateGiftCategoryMutation.isPending
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
      <div className="space-y-4.5">
        <div className="flex flex-col items-center text-center">
          <input
            ref={iconInputRef}
            type="file"
            accept="image/png,image/svg+xml"
            className="hidden"
            onChange={handleIconChange}
          />

          <div className="relative">
            <button
              type="button"
              className="flex size-16.5 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border border-dashed border-slate-300 bg-white text-slate-400 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-70"
              aria-label="Upload category icon"
              onClick={handleIconButtonClick}
              disabled={isUploading || Boolean(iconPreview)}
            >
              {isUploading ? (
                <Loader2 className="size-4 animate-spin text-primary" />
              ) : iconPreview ? (
                <img
                  src={iconPreview}
                  alt="Category icon"
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

            {iconPreview && !isUploading && (
              <button
                type="button"
                aria-label="Remove category icon"
                className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-white text-rose-500 shadow-sm transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isBusy}
                onClick={handleRemoveIcon}
              >
                <Trash2 className="size-3.5" strokeWidth={2.25} />
              </button>
            )}
          </div>

          <p className="mt-3 text-[9px] leading-3 text-slate-400">
            Suggested size: 512x512px.
            <br />
            PNG or SVG format.
          </p>
        </div>

        <div>
          <Label htmlFor="category-name">Category Name</Label>
          <Input
            id="category-name"
            placeholder="e.g. Anniversary Gifts"
            className="h-9! rounded-md text-xs mt-0.5"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="category-description">Description</Label>
          <Textarea
            id="category-description"
            placeholder="Briefly describe the contents of this category..."
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
