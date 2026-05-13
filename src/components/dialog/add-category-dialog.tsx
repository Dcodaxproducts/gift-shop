"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "../ui/textarea";

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
      className="max-w-[380px]"
      contentClassName="px-[22px] pb-0 pt-[21px]"
      footerClassName="justify-center gap-3 border-t border-slate-100 py-4"
      footer={
        <>
          <Button
            onClick={() => onOpenChange(false)}
          >
            Save Category
          </Button>
          <Button
            variant="outline"
            className="w-32"
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

        <div>
          <Label htmlFor="category-name">
            Category Name
          </Label>
          <Input
            id="category-name"
            placeholder="e.g. Anniversary Gifts"
            className="h-9! rounded-md text-xs mt-0.5"
          />
        </div>

        <div>
          <Label htmlFor="category-description">
            Description
          </Label>
          <Textarea
            id="category-description"
            placeholder="Briefly describe the contents of this category..."
            className="rounded-md text-xs! mt-0.5"
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
