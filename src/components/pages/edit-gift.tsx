"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Plus, Upload, X } from "lucide-react";
import { giftCategoryOptions } from "@/constants/gifts";
import PageHeader from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

function SectionCard({
  icon: Icon,
  title,
  children,
  className,
}: {
  icon?: React.ElementType;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("rounded-2xl border border-slate-200 bg-white shadow-sm", className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-2.5">
          {Icon ? (
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-4" strokeWidth={2.25} />
            </span>
          ) : null}
          <h2 className="text-sm font-semibold ">{title}</h2>
        </div>
        <div className="mt-5">{children}</div>
      </CardContent>
    </Card>
  );
}

function CheckOption({
  checked,
  onToggle,
  label,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-2.5 text-left"
    >
      <span
        className={cn(
          "flex size-4 items-center justify-center rounded-full border transition",
          checked
            ? "border-primary bg-primary text-white"
            : "border-slate-300 bg-white",
        )}
      >
        {checked ? <Check className="size-2.5" strokeWidth={3.5} /> : null}
      </span>
      <span className="text-xs font-medium text-slate-700">{label}</span>
    </button>
  );
}

export function EditGiftPage() {
  const [publishedOnStorefront, setPublishedOnStorefront] = useState(true);
  const [featureInHotDeals, setFeatureInHotDeals] = useState(false);
  const [tags, setTags] = useState(["Premium", "Best Seller"]);

  const removeTag = (tag: string) =>
    setTags((current) => current.filter((t) => t !== tag));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Gift"
        description="Modify existing gift details in the gourmet catalog."
      />

      <section className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
        <SectionCard title="Gift Media" className="self-start">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80"
              alt="Premium Coffee Set"
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />
          </div>
          <Button className="w-full my-3 h-9! rounded-full px-5 text-xs gap-2 bg-primary/10 text-primary! shadow-none hover:bg-primary/20!">
            <Upload className="size-3.5" strokeWidth={2.5} />
            Update Image
          </Button>
          <p className="text-center text-[10px] text-slate-400">
            Recommended: 800x800px JPG/PNG
          </p>
        </SectionCard>

        <div className="space-y-5">
          <SectionCard title="Product Details">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="gift-name">Gift Name</Label>
                <Input
                  id="gift-name"
                  defaultValue="Premium Coffee Set"
                  className="h-11! rounded-xl bg-slate-50 text-xs"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gift-price">Price ($)</Label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                      $
                    </span>
                    <Input
                      id="gift-price"
                      defaultValue="45.00"
                      className="h-11! rounded-xl bg-slate-50 pl-7 text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue="physical">
                    <SelectTrigger className="h-11 w-full rounded-xl bg-slate-50 text-xs">
                      <SelectValue placeholder="Gourmet" />
                    </SelectTrigger>
                    <SelectContent>
                      {giftCategoryOptions
                        .filter((option) => option.value !== "all")
                        .map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gift-description">Short Description</Label>
                <textarea
                  id="gift-description"
                  defaultValue="Curated selection of ethically sourced roasted beans with a designer ceramic dripper and filters."
                  className="min-h-[88px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gift-stock">Stock Inventory</Label>
                  <Input
                    id="gift-stock"
                    defaultValue="124"
                    className="h-11! rounded-xl bg-slate-50 text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gift-sku">SKU Number</Label>
                  <Input
                    id="gift-sku"
                    defaultValue="COF-PRM-001"
                    className="h-11! rounded-xl bg-slate-50 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="ghost" className="text-xs">
                  Cancel Changes
                </Button>
                <Button className="h-10 rounded-xl px-5 text-xs gap-2">
                  <Upload className="size-3.5" strokeWidth={2.5} />
                  Update Gift
                </Button>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Visibility & Tags">
            <div className="space-y-5">
              <div className="space-y-3">
                <CheckOption
                  checked={publishedOnStorefront}
                  onToggle={() => setPublishedOnStorefront((c) => !c)}
                  label="Published on storefront"
                />
                <CheckOption
                  checked={featureInHotDeals}
                  onToggle={() => setFeatureInHotDeals((c) => !c)}
                  label='Feature in "Hot Deals"'
                />
              </div>

              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Active Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-primary/70 hover:text-primary"
                      >
                        <X className="size-3" strokeWidth={2.5} />
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full border border-dashed border-slate-300 px-3 py-1.5 text-[11px] font-semibold text-slate-500 hover:border-primary hover:text-primary"
                  >
                    <Plus className="size-3" strokeWidth={2.5} />
                    Add Tag
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </section>
    </div>
  );
}