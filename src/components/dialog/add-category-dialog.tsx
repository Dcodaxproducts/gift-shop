"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const categoryInputClass = "h-8! rounded-md border-slate-200 bg-white px-3 text-[11px] placeholder:text-slate-400 focus:ring-2";

const categoryLabelClass = "text-[10px] font-semibold leading-none text-slate-700";

type AddCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddCategoryDialog({ open, onOpenChange }: AddCategoryDialogProps) {
  const [visible, setVisible] = useState(true);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add New Category"
      className="max-w-[380px] rounded-none border-0 shadow-2xl shadow-slate-950/25"
      headerClassName="px-[22px] py-[18px]"
      contentClassName="px-[22px] pb-0 pt-[21px]"
      footerClassName="justify-center gap-3 border-t border-slate-100 bg-slate-50/40 px-[22px] py-4"
      titleClassName="text-sm font-bold text-slate-950"
      footer={
        <>
          <Button
            className="h-[34px] min-w-[123px] rounded-lg bg-[#6d28d9] px-6 text-[11px] font-bold shadow-lg shadow-[#6d28d9]/25 hover:bg-[#5b21b6]"
            onClick={() => onOpenChange(false)}
          >
            Save Category
          </Button>
          <Button
            variant="outline"
            className="h-[34px] min-w-[123px] rounded-lg border-slate-200 bg-white px-6 text-[11px] font-semibold text-slate-600 hover:bg-slate-50"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </>
      }
    >
      <div className="space-y-[18px]">
        <div className="flex flex-col items-center text-center">
          <button
            type="button"
            className="flex size-[66px] flex-col items-center justify-center rounded-full border border-dashed border-slate-300 bg-white text-slate-400 transition hover:border-[#6d28d9] hover:text-[#6d28d9]"
            aria-label="Upload category icon"
          >
            <ImageIcon className="size-3.5" strokeWidth={2.2} />
            <span className="mt-1 text-[7px] font-bold tracking-[0.08em]">UPLOAD ICON</span>
          </button>
          <p className="mt-3 text-[9px] leading-3 text-slate-400">
            Suggested size: 512x512px.
            <br />
            PNG or SVG format.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category-name" className={categoryLabelClass}>
            Category Name
          </Label>
          <Input
            id="category-name"
            placeholder="e.g. Anniversary Gifts"
            className={categoryInputClass}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category-description" className={categoryLabelClass}>
            Description
          </Label>
          <textarea
            id="category-description"
            placeholder="Briefly describe the contents of this category..."
            className="min-h-[82px] w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-4 text-[11px] leading-4 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-3">
          <div>
            <p className="text-[10px] font-bold text-slate-700">Visible on Storefront</p>
            <p className="mt-0.5 text-[8px] leading-3 text-slate-400">
              Enable this to make the category public.
            </p>
          </div>
          <Switch
            checked={visible}
            onClick={() => setVisible((current) => !current)}
            className={visible ? "bg-[#ff5a1f]" : "bg-slate-200"}
          />
        </div>

        <div className="min-h-[76px] space-y-2">
          <Label className={categoryLabelClass}>Display Pattern</Label>
        </div>
      </div>
    </Dialog>
  );
}
