"use client";

import { type ChangeEvent, useRef, useState } from "react";
import { Camera, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import MyImage from "@/components/common/MyImage";
import { Button } from "@/components/ui/button";
import { useStorage } from "@/hooks/useStorage";
import { cn } from "@/lib/utils";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

type S3ImageUploaderProps = {
  value?: string;
  folder: string;
  alt: string;
  label?: string;
  description?: string;
  imageClassName?: string;
  placeholderClassName?: string;
  errorMessage?: string;
  disabled?: boolean;
  onChange: (url: string) => void;
};

export function S3ImageUploader({
  value,
  folder,
  alt,
  label = "Upload image",
  description = "PNG, JPG, or WebP up to 5MB",
  imageClassName,
  placeholderClassName,
  errorMessage,
  disabled,
  onChange,
}: S3ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadId, setUploadId] = useState<string | null>(null);
  const { upload, remove, isUploading } = useStorage();
  const [isRemoving, setIsRemoving] = useState(false);
  const isBusy = disabled || isUploading || isRemoving;

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;
    if (value) {
      toast.error("Remove the current image before uploading a new one.");
      return;
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please upload PNG, JPG, or WebP images only.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Please upload an image smaller than 5MB.");
      return;
    }

    const result = await upload(file, folder);
    if (!result?.fileUrl) return;

    setUploadId(result.uploadId);
    onChange(result.fileUrl);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      if (uploadId) {
        const deleted = await remove(uploadId);
        if (!deleted) return;
      }

      setUploadId(null);
      onChange("");
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        className={cn(
          "group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-primary/25 bg-primary/5 text-center transition hover:border-primary/60 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-70",
          errorMessage && "border-destructive bg-white hover:border-destructive",
          placeholderClassName,
        )}
        disabled={isBusy || Boolean(value)}
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          <MyImage
            src={value}
            alt={alt}
            width={1080}
            height={1920}
            className={cn("h-full w-full object-cover", imageClassName)}
          />
        ) : (
          <div className="flex flex-col items-center px-4">
            <span className="flex size-12 items-center justify-center rounded-full bg-white text-primary shadow-sm">
              {isBusy ? (
                <Loader2 className="size-5 animate-spin" strokeWidth={2.2} />
              ) : (
                <Camera className="size-5" strokeWidth={2.2} />
              )}
            </span>
            <p className="mt-3 text-xs font-semibold text-slate-700">{label}</p>
            <p className="mt-1 max-w-48 text-[10px] font-medium leading-4 text-slate-400">
              {description}
            </p>
          </div>
        )}
      </button>
      {errorMessage ? (
        <p className="mt-1.5 px-1 text-xs font-medium leading-5 text-destructive">
          {errorMessage}
        </p>
      ) : null}

      {value ? (
        <Button
          type="button"
          aria-label="Remove image"
          variant="ghost"
          className="absolute right-3 top-3 size-8 rounded-full bg-white/95 p-0 text-rose-500 shadow-sm hover:bg-rose-50 hover:text-rose-600"
          disabled={isBusy}
          onClick={handleRemove}
        >
          {isRemoving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="size-4" />
          )}
        </Button>
      ) : null}
    </div>
  );
}
