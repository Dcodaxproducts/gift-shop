"use client";

import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { giftCategoryOptions, giftProviderOptions } from "@/constants/gifts";
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

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-sm font-black text-slate-950">{title}</h2>
      <p className="mt-1 text-[11px] text-slate-400">{description}</p>
    </div>
  );
}

export function CreateGiftPage() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-950">Create New Gift</h1>
        <p className="mt-1 text-sm text-slate-500">Add a new gift listing to your inventory</p>
      </div>

      <Card className="rounded-[24px] border border-border bg-white shadow-sm">
        <CardContent className="space-y-8 p-6">
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="space-y-4">
              <SectionHeading
                title="Gift Information"
                description="Enter the main details for this gift listing"
              />
              <div className="space-y-2">
                <Label htmlFor="gift-name" className="text-[10px] uppercase tracking-wide text-slate-500">Gift Name</Label>
                <Input id="gift-name" placeholder="Enter gift name" className="h-11! rounded-2xl bg-white text-xs" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gift-description" className="text-[10px] uppercase tracking-wide text-slate-500">Description</Label>
                <textarea
                  id="gift-description"
                  placeholder="Describe the gift experience, contents, and highlights..."
                  className="min-h-32 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-wide text-slate-500">Category</Label>
                  <Select defaultValue="experience">
                    <SelectTrigger className="h-11 w-full rounded-2xl bg-white text-xs">
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
                  <Label htmlFor="gift-price" className="text-[10px] uppercase tracking-wide text-slate-500">Price</Label>
                  <Input id="gift-price" placeholder="$49.99" className="h-11! rounded-2xl bg-white text-xs" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <SectionHeading
                title="Media Upload"
                description="Add the main image for this gift"
              />
              <button
                type="button"
                className="flex min-h-[250px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 text-center transition hover:bg-slate-100"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                  <ImagePlus className="size-5" />
                </span>
                <p className="mt-4 text-xs font-bold text-slate-700">Upload Gift Image</p>
                <p className="mt-1 text-[10px] text-slate-400">PNG, JPG recommended · 1200 × 900</p>
              </button>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="space-y-4">
              <SectionHeading
                title="Provider Assignment"
                description="Choose which provider will fulfill this gift"
              />
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-wide text-slate-500">Provider</Label>
                <Select defaultValue="wellnesshub">
                  <SelectTrigger className="h-11 w-full rounded-2xl bg-white text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {giftProviderOptions.filter((option) => option.value !== "all").map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <SectionHeading
                title="Status"
                description="Control whether the gift is visible to customers"
              />
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div>
                  <p className="text-xs font-bold text-slate-700">Visible on store</p>
                  <p className="mt-1 text-[10px] text-slate-400">Customers can browse and purchase this gift</p>
                </div>
                <Switch checked={visible} onClick={() => setVisible((current) => !current)} className="h-6 w-11" />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-2">
            <Button variant="outline" className="h-10 rounded-xl px-5 text-xs">Cancel</Button>
            <Button className="h-10 rounded-xl px-6 text-xs">Save Gift</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
