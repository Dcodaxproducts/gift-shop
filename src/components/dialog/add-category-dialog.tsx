"use client";

import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "../ui/textarea";
import { useCreateGiftCategory } from "@/hooks/useGiftCategories";
import { useStorage } from "@/hooks/useStorage";
import { UPLOAD_FOLDERS } from "@/utils/file";

type AddCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
}: AddCategoryDialogProps) {
  const iconInputRef = useRef<HTMLInputElement | null>(null);

  const [visible, setVisible] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconPreview, setIconPreview] = useState<string | undefined>();
  const [iconUrl, setIconUrl] = useState<string | undefined>();

  const createGiftCategoryMutation = useCreateGiftCategory();
  const { upload, isUploading } = useStorage();

  const resetForm = () => {
    setVisible(true);
    setName("");
    setDescription("");
    setIconPreview(undefined);
    setIconUrl(undefined);

    if (iconInputRef.current) {
      iconInputRef.current.value = "";
    }
  };

  const handleIconButtonClick = () => {
    if (isUploading) return;
    iconInputRef.current?.click();
  };

  const handleIconChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      event.target.value = "";
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
    } else {
      // Upload failed — clear preview
      setIconPreview(undefined);
      event.target.value = "";
    }
  };

  const handleSaveCategory = async () => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName || createGiftCategoryMutation.isPending || isUploading) return;

    try {
      await createGiftCategoryMutation.mutateAsync({
        name: trimmedName,
        description: trimmedDescription || undefined,
        imageUrl: iconUrl,
        isActive: visible,
      });

      resetForm();
      onOpenChange(false);
    } catch {
      // Error toast is already handled inside useCreateGiftCategory onError.
    }
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !createGiftCategoryMutation.isPending && !isUploading) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const isBusy = createGiftCategoryMutation.isPending || isUploading;

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Add New Category"
      className="max-w-[380px]"
      contentClassName="px-[22px] pb-0 pt-[21px]"
      footerClassName="justify-center gap-3 border-t border-slate-100 py-4"
      footer={
        <>
          <Button
            onClick={handleSaveCategory}
            disabled={!name.trim() || isBusy}
          >
            {createGiftCategoryMutation.isPending
              ? "Saving..."
              : isUploading
              ? "Uploading..."
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
            ref={iconInputRef}
            type="file"
            accept="image/png,image/svg+xml"
            className="hidden"
            onChange={handleIconChange}
          />

          <button
            type="button"
            className="flex size-[66px] cursor-pointer flex-col items-center justify-center rounded-full border border-dashed border-slate-300 bg-white text-slate-400 transition hover:border-[#6d28d9] hover:text-[#6d28d9] overflow-hidden"
            aria-label="Upload category icon"
            onClick={handleIconButtonClick}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="size-4 animate-spin text-[#6d28d9]" />
            ) : iconPreview ? (
              <Image
                src={iconPreview}
                alt="Category icon"
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
