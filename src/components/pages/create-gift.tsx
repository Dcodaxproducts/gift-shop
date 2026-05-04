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

function FormSection({
  title,
  description,
  children,
  className = "",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="text-sm font-black text-slate-950">{title}</h2>
      <p className="mt-1 text-[11px] leading-5 text-slate-400">{description}</p>
      <div className="mt-4">{children}</div>
    </section>
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

      <Card className="rounded-[26px] border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
            <FormSection
              title="Gift Information"
              description="Enter the main details of the gift"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gift-name" className="text-[10px] uppercase tracking-wide text-slate-500">Gift Name</Label>
                  <Input id="gift-name" placeholder="e.g. Luxury Spa Package" className="h-11! rounded-2xl bg-white text-xs" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gift-description" className="text-[10px] uppercase tracking-wide text-slate-500">Description</Label>
                  <textarea
                    id="gift-description"
                    placeholder="Describe the gift, what it includes, and why it is special..."
                    className="min-h-[132px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
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
            </FormSection>

            <div className="space-y-8">
              <FormSection
                title="Media Upload"
                description="Upload a high-quality image for this gift"
              >
                <button
                  type="button"
                  className="flex min-h-[240px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 text-center transition hover:bg-slate-100"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                    <ImagePlus className="size-5" />
                  </span>
                  <p className="mt-4 text-xs font-bold text-slate-700">Drag &amp; drop image here</p>
                  <p className="mt-1 text-[10px] text-slate-400">or click to browse files</p>
                </button>
              </FormSection>

              <FormSection
                title="Provider Assignment"
                description="Select the provider responsible for this gift"
              >
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
              </FormSection>

              <FormSection
                title="Status"
                description="Choose whether this gift should be visible"
              >
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <div>
                    <p className="text-xs font-bold text-slate-700">Gift Visibility</p>
                    <p className="mt-1 text-[10px] text-slate-400">Show this gift on the storefront</p>
                  </div>
                  <Switch
                    checked={visible}
                    onClick={() => setVisible((current) => !current)}
                    className="h-6 w-11"
                  />
                </div>
              </FormSection>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-5">
            <Button variant="outline" className="h-10 rounded-xl px-5 text-xs">Cancel</Button>
            <Button className="h-10 rounded-xl px-5 text-xs">Save Gift</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
