"use client";

import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import MyImage from "@/components/common/MyImage";
import { Dialog } from "@/components/ui/dialog";

type ImagePreviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  selectedImage: number;
  productName: string;
  onPrevious: () => void;
  onNext: () => void;
};

export function ImagePreviewDialog({
  open,
  onOpenChange,
  images,
  selectedImage,
  productName,
  onPrevious,
  onNext,
}: ImagePreviewDialogProps) {
  const image = images[selectedImage];
  const hasMultipleImages = images.length > 1;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={productName}
      description={`${selectedImage + 1} of ${images.length}`}
      className="max-w-5xl rounded-lg"
      contentClassName="p-0"
      headerClassName="px-5"
    >
      <div className="relative h-[72vh] max-h-[760px] min-h-[360px] bg-slate-100">
        {image ? (
          <MyImage
            src={image}
            alt={`${productName} preview`}
            fill
            sizes="90vw"
            className="object-contain"
          />
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
              className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white"
              onClick={onPrevious}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white"
              onClick={onNext}
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        ) : null}
      </div>
    </Dialog>
  );
}
