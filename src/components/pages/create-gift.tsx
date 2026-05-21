"use client";

import { useState } from "react";
import {
  Briefcase,
  CloudUpload,
  Eye,
  Gift,
  ImageIcon,
  Info,
} from "lucide-react";
import { giftCategoryOptions, giftProviderOptions } from "@/constants/gifts";
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
    <Card>
      <CardContent>
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-4" strokeWidth={2.25} />
          </span>
          <h2 className="text-sm font-semibold">{title}</h2>
        </div>
        <div className="mt-5">{children}</div>
      </CardContent>
    </Card>
  );
}

export function CreateGiftPage() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create New Gift"
        description="Add a new item to your catalog by providing the details below."
      />

      <SectionCard icon={Info} title="Gift Information">
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="gift-name">Gift Name</Label>
            <Input
              id="gift-name"
              placeholder="e.g. Premium Spa Day Voucher"
              className="h-11! rounded-xl bg-slate-50 text-xs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gift-description">Description</Label>
            <textarea
              id="gift-description"
              placeholder="Describe the gift features, inclusions, and terms..."
              className="min-h-[110px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select>
                <SelectTrigger className="h-11 w-full rounded-xl text-xs">
                  <SelectValue placeholder="Select category" />
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

            <div className="space-y-2">
              <Label htmlFor="gift-price">Price</Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  $
                </span>
                <Input
                  id="gift-price"
                  placeholder="0.00"
                  className="h-11! rounded-xl bg-slate-50 pl-7 text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard icon={ImageIcon} title="Media Upload">
        <button
          type="button"
          className="flex min-h-[180px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-5 text-center transition hover:bg-slate-100"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CloudUpload className="size-5" />
          </span>
          <p className="mt-3 text-xs font-semibold text-slate-700">
            Drag and drop images here
          </p>
          <p className="mt-1 text-[10px] text-slate-400">
            Supported formats: PNG, JPG, WEBP (Max 5MB)
          </p>
          <span className="mt-4 inline-flex h-8 items-center rounded-lg bg-white px-4 text-[11px] font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
            Browse Files
          </span>
        </button>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard icon={Briefcase} title="Provider Assignment">
          <div className="space-y-2">
            <Label>Select Provider</Label>
            <Select>
              <SelectTrigger className="h-11 w-full rounded-xl bg-slate-50 text-xs">
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                {giftProviderOptions
                  .filter((option) => option.value !== "all")
                  .map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </SectionCard>

        <SectionCard icon={Eye} title="Status">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
            <div>
              <p className="text-xs font-semibold text-slate-700">Gift Visibility</p>
              <p className="mt-0.5 text-[10px] text-slate-400">
                Toggle active or inactive status
              </p>
            </div>
            <Switch
              checked={visible}
              onClick={() => setVisible((current) => !current)}
              className="h-6 w-11"
            />
          </div>
        </SectionCard>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="h-10 rounded-xl px-5 text-xs">
          Cancel
        </Button>
        <Button className="h-10 rounded-xl px-5 text-xs gap-2">
          <Gift className="size-4" strokeWidth={2.25} />
          Save Gift
        </Button>
      </div>
    </div>
  );
}