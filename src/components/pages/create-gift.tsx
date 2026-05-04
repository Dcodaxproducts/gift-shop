"use client";

import { ImagePlus, Info, Package2, Sparkles, Tag } from "lucide-react";
import { giftCategoryOptions, giftProviderOptions } from "@/constants/gifts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SectionTitle({ icon: Icon, title }: { icon: typeof Package2; title: string }) {
  return (
    <CardTitle className="flex items-center gap-2 text-sm font-bold text-slate-950">
      <span className="flex size-7 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-3.5" strokeWidth={2.25} />
      </span>
      {title}
    </CardTitle>
  );
}

export function CreateGiftPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-950">Create Gift</h1>
          <p className="mt-1 text-sm text-slate-500">Add a new gift listing with provider, pricing, and inventory details.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 rounded-xl px-5 text-xs">Save Draft</Button>
          <Button className="h-10 rounded-xl px-5 text-xs">Publish Gift</Button>
        </div>
      </div>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <Card className="rounded-2xl border border-border bg-white shadow-sm">
            <CardHeader className="p-5 pb-4">
              <SectionTitle icon={Info} title="Gift Information" />
            </CardHeader>
            <CardContent className="space-y-4 px-5 pb-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="gift-title" className="text-[10px] uppercase tracking-wide text-slate-500">Gift Name</Label>
                  <Input id="gift-title" placeholder="Enter gift name" className="h-10! rounded-2xl bg-white text-xs" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-wide text-slate-500">Category</Label>
                  <Select defaultValue="experience">
                    <SelectTrigger className="h-10 w-full rounded-2xl bg-white text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {giftCategoryOptions.filter((option) => option.value !== "all").map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-wide text-slate-500">Provider</Label>
                  <Select defaultValue="wellnesshub">
                    <SelectTrigger className="h-10 w-full rounded-2xl bg-white text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {giftProviderOptions.filter((option) => option.value !== "all").map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="gift-description" className="text-[10px] uppercase tracking-wide text-slate-500">Description</Label>
                  <textarea
                    id="gift-description"
                    placeholder="Write a short description for this gift..."
                    className="min-h-32 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border bg-white shadow-sm">
            <CardHeader className="p-5 pb-4">
              <SectionTitle icon={Tag} title="Pricing & Inventory" />
            </CardHeader>
            <CardContent className="space-y-4 px-5 pb-5">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="gift-price" className="text-[10px] uppercase tracking-wide text-slate-500">Price</Label>
                  <Input id="gift-price" placeholder="$199.00" className="h-10! rounded-2xl bg-white text-xs" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gift-stock" className="text-[10px] uppercase tracking-wide text-slate-500">Stock</Label>
                  <Input id="gift-stock" placeholder="250" className="h-10! rounded-2xl bg-white text-xs" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gift-sku" className="text-[10px] uppercase tracking-wide text-slate-500">SKU</Label>
                  <Input id="gift-sku" placeholder="GFT-1024" className="h-10! rounded-2xl bg-white text-xs" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="rounded-2xl border border-border bg-white shadow-sm">
            <CardHeader className="p-5 pb-4">
              <SectionTitle icon={ImagePlus} title="Gift Media" />
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <button
                type="button"
                className="flex min-h-52 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-primary/20 bg-slate-50 px-4 text-center transition hover:bg-primary/5"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                  <ImagePlus className="size-5" />
                </span>
                <p className="mt-4 text-xs font-bold text-slate-700">Click to upload gift image</p>
                <p className="mt-1 text-[10px] text-slate-400">PNG, JPG up to 5MB</p>
              </button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border bg-white shadow-sm">
            <CardHeader className="p-5 pb-4">
              <SectionTitle icon={Sparkles} title="Publishing" />
            </CardHeader>
            <CardContent className="space-y-3 px-5 pb-5">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Visibility</p>
                <p className="mt-1 text-xs font-semibold text-slate-700">Public listing</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Featured Slot</p>
                <p className="mt-1 text-xs font-semibold text-slate-700">Homepage carousel eligible</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
