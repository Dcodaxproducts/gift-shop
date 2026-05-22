"use client";

import { type ChangeEvent, useRef } from "react";
import Image from "next/image";
import { CloudUpload, ImageIcon, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MyImage from "@/components/common/MyImage";

const acceptedImageTypes = ["image/png", "image/jpeg", "image/webp"];

type GiftMediaGalleryCardProps = {
  errorMessage?: string;
  imagePreviews: Record<string, string>;
  imageUrls: string[];
  isUploading: boolean;
  onRemove: (url: string) => void;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function GiftMediaGalleryCard({
  errorMessage,
  imagePreviews,
  imageUrls,
  isUploading,
  onRemove,
  onUpload,
}: GiftMediaGalleryCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ImageIcon className="size-4" strokeWidth={2.25} />
            </span>
            <h2 className="text-sm font-semibold">Media Gallery</h2>
          </div>
        </div>
        <div className="mt-5">
          <div>
            <input
              ref={inputRef}
              type="file"
              accept={acceptedImageTypes.join(",")}
              multiple
              className="hidden"
              onChange={onUpload}
            />

            <div className="flex flex-wrap gap-3">
              {imageUrls.map((url, index) => {
                const previewUrl = imagePreviews[url];
                const displayUrl = previewUrl ?? url;

                return (
                  <div
                    key={url}
                    className="relative size-22 overflow-hidden rounded-xl bg-slate-100"
                  >
                    {previewUrl ? (
                      <Image
                        src={displayUrl}
                        alt={`Gift image ${index + 1}`}
                        fill
                        sizes="88px"
                        unoptimized
                        className="size-full object-cover"
                      />
                    ) : (
                      <MyImage
                        src={displayUrl}
                        alt={`Gift image ${index + 1}`}
                        fill
                        sizes="88px"
                        className="object-cover"
                      />
                    )}
                    {index === 0 && (
                      <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-md bg-primary px-1.5 py-0.5 text-[8px] font-semibold text-white">
                        PRIMARY COVER
                      </span>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute right-1 top-1 size-6 rounded-full bg-white/90 p-0 text-slate-500 hover:text-rose-500"
                      onClick={() => onRemove(url)}
                      disabled={isUploading}
                      aria-label="Remove gift image"
                    >
                      <X className="size-3.5" />
                    </Button>
                  </div>
                );
              })}

              <Button
                type="button"
                variant="outline"
                className="flex size-22 flex-col items-center justify-center rounded-xl border-dashed border-slate-300 bg-slate-50 p-0 transition hover:bg-slate-100"
                disabled={isUploading}
                onClick={() => inputRef.current?.click()}
              >
                {isUploading ? (
                  <Loader2 className="size-5 animate-spin text-slate-400" />
                ) : (
                  <CloudUpload className="size-5 text-slate-400" />
                )}
                <span className="mt-1 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                  {isUploading ? "Uploading" : "Add More"}
                </span>
              </Button>
            </div>

            {errorMessage ? (
              <p className="mt-1.5 px-1 text-xs font-medium leading-5 text-destructive">{errorMessage}</p>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
