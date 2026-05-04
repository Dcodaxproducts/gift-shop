"use client";

import { useState } from "react";
import { Coffee, ImagePlus, Package, ShieldCheck } from "lucide-react";
import { giftCategoryOptions } from "@/constants/gifts";
import { PageHeader } from "@/components/common/page-header";
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
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-4" strokeWidth={2.25} />
          </span>
          <h2 className="text-sm font-bold text-slate-950">{title}</h2>
        </div>
        <div className="mt-5">{children}</div>
      </CardContent>
    </Card>
  );
}

export function EditGiftPage() {
  const [published, setPublished] = useState(true);
  const tags = ["Premium", "Best Seller"];

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Gift" />

      <section className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
        <SectionCard icon={ImagePlus} title="Gift Media">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <div className="flex aspect-[4/4.5] items-center justify-center bg-[radial-gradient(circle_at_top,#f6ede2_0%,#e8d6bf_50%,#dcc3a4_100%)] p-6">
              <div className="flex h-full w-full items-center justify-center rounded-[28px] border border-white/70 bg-white/30 shadow-inner">
                <div className="relative flex items-end gap-3">
                  <div className="absolute -right-7 top-1 h-20 w-20 rounded-full bg-[#8c6239]/10 blur-xl" />
                  <div className="absolute -left-9 bottom-0 h-24 w-24 rounded-full bg-[#c9a274]/12 blur-xl" />
                  <div className="flex size-24 items-center justify-center rounded-[28px] bg-[#6f4e37] text-white shadow-lg shadow-[#6f4e37]/20">
                    <Coffee className="size-10" strokeWidth={2.1} />
                  </div>
                  <div className="mb-2 h-16 w-12 rounded-[16px] bg-[#f7f2ea] shadow-md" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <Button variant="outline" className="h-10 w-full rounded-xl text-xs">
                Update Image
              </Button>
            </div>
          </div>
        </SectionCard>

        <div className="space-y-5">
          <SectionCard icon={Package} title="Product Details">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="gift-name">Gift Name</Label>
                <Input id="gift-name" defaultValue="Premium Coffee Set" className="h-11! rounded-xl bg-slate-50 text-xs" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gift-price">Price</Label>
                  <Input id="gift-price" defaultValue="$79.99" className="h-11! rounded-xl bg-slate-50 text-xs" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue="physical">
                    <SelectTrigger className="h-11 w-full rounded-xl bg-slate-50 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {giftCategoryOptions.filter((option) => option.value !== "all").map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gift-description">Description</Label>
                <textarea
                  id="gift-description"
                  defaultValue="A curated premium coffee gift set with artisan beans, ceramic mug, and handcrafted accessories for coffee lovers."
                  className="min-h-32 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gift-stock">Stock</Label>
                  <Input id="gift-stock" defaultValue="48" className="h-11! rounded-xl bg-slate-50 text-xs" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gift-sku">SKU</Label>
                  <Input id="gift-sku" defaultValue="COF-PRM-204" className="h-11! rounded-xl bg-slate-50 text-xs" />
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={ShieldCheck} title="Visibility & Tags">
            <div className="space-y-5">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div>
                  <p className="text-xs font-semibold text-slate-700">Published</p>
                  <p className="mt-1 text-[11px] text-slate-400">This gift is visible to customers</p>
                </div>
                <Switch checked={published} onClick={() => setPublished((current) => !current)} className="h-6 w-11" />
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold text-slate-700">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn("inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary")}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <div className="flex justify-end gap-3">
            <Button variant="outline" className="h-10 rounded-xl px-5 text-xs">
              Cancel Changes
            </Button>
            <Button className="h-10 rounded-xl px-5 text-xs">
              Update Gift
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
