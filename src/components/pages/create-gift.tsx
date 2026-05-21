"use client";

import { useState } from "react";
import {
  Briefcase,
  CloudUpload,
  Eye,
  Gift,
  ImageIcon,
  Info,
  Plus,
  Tag,
  Trash2,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ─── Types ───────────────────────────────────────────────────────────────────

type Variant = {
  id: string;
  name: string;
  sku: string;
  price: string;
};

// ─── SectionCard ─────────────────────────────────────────────────────────────

function SectionCard({
  icon: Icon,
  title,
  children,
  headerRight,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-4" strokeWidth={2.25} />
            </span>
            <h2 className="text-sm font-semibold">{title}</h2>
          </div>
          {headerRight}
        </div>
        <div className="mt-5">{children}</div>
      </CardContent>
    </Card>
  );
}

// ─── Variants Table ───────────────────────────────────────────────────────────

function VariantsTable({
  variants,
  onAdd,
  onRemove,
  onChange,
}: {
  variants: Variant[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof Variant, value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-100">
            <TableHead className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Variant Name
            </TableHead>
            <TableHead className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              SKU/ID Code
            </TableHead>
            <TableHead className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Price ($)
            </TableHead>
            <TableHead className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.map((variant) => (
            <TableRow key={variant.id} className="border-slate-100">
              <TableCell className="py-2.5">
                <Input
                  value={variant.name}
                  onChange={(e) => onChange(variant.id, "name", e.target.value)}
                  placeholder="e.g. Solo Experience"
                  className="h-8 rounded-lg bg-slate-50 text-xs"
                />
              </TableCell>
              <TableCell className="py-2.5">
                <Input
                  value={variant.sku}
                  onChange={(e) => onChange(variant.id, "sku", e.target.value)}
                  placeholder="SPA-001-S"
                  className="h-8 rounded-lg bg-slate-50 text-xs font-mono"
                />
              </TableCell>
              <TableCell className="py-2.5">
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-primary font-semibold">
                    $
                  </span>
                  <Input
                    value={variant.price}
                    onChange={(e) => onChange(variant.id, "price", e.target.value)}
                    placeholder="0.00"
                    className="h-8 rounded-lg bg-slate-50 pl-6 text-xs text-primary font-semibold"
                  />
                </div>
              </TableCell>
              <TableCell className="py-2.5">
                <button
                  type="button"
                  onClick={() => onRemove(variant.id)}
                  className="flex size-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-1.5 text-[11px] font-semibold text-primary transition hover:opacity-75"
      >
        <Plus className="size-3.5" />
        Add Another Variant
      </button>
    </div>
  );
}

// ─── Media Gallery ────────────────────────────────────────────────────────────

function MediaGallery() {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Placeholder uploaded images */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative size-[88px] overflow-hidden rounded-xl bg-slate-100"
        >
          <div className="h-full w-full bg-linear-to-br from-slate-200 to-slate-300" />
          {i === 1 && (
            <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-md bg-primary px-1.5 py-0.5 text-[8px] font-semibold text-white">
              ★ PRIMARY COVER
            </span>
          )}
        </div>
      ))}

      {/* Add more */}
      <button
        type="button"
        className="flex size-[88px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 transition hover:bg-slate-100"
      >
        <CloudUpload className="size-5 text-slate-400" />
        <span className="mt-1 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
          Add More
        </span>
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CreateGiftPage() {
  const [visible, setVisible] = useState(false);
  const [variants, setVariants] = useState<Variant[]>([
    { id: "1", name: "Solo Experience", sku: "SPA-001-S", price: "120.00" },
    { id: "2", name: "Couples Retreat", sku: "SPA-001-C", price: "210.00" },
  ]);

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "", sku: "", price: "" },
    ]);
  };

  const removeVariant = (id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id));
  };

  const updateVariant = (id: string, field: keyof Variant, value: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v)),
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create New Gift"
        description="Define gift parameters, pricing, and provider details for the marketplace."
      />

      {/* Two-column layout: left main, right sidebar */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">

        {/* ── Left column ── */}
        <div className="space-y-6">

          {/* Gift Information */}
          <SectionCard icon={Info} title="Gift Information">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gift-name">Gift Name</Label>
                <Input
                  id="gift-name"
                  placeholder="e.g. Premium Spa Day Voucher"
                  className="h-11 rounded-xl bg-slate-50 text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger className="h-11 w-full rounded-xl text-xs">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {giftCategoryOptions
                      .filter((o) => o.value !== "all")
                      .map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gift-description">Description</Label>
                <textarea
                  id="gift-description"
                  placeholder="Describe the gift experience in detail..."
                  className="min-h-[100px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </div>
          </SectionCard>

          {/* Pricing & Variants */}
          <SectionCard
            icon={Tag}
            title="Pricing & Variants"
            headerRight={
              <span className="text-[10px] font-semibold text-primary">
                Multiple variants
              </span>
            }
          >
            <VariantsTable
              variants={variants}
              onAdd={addVariant}
              onRemove={removeVariant}
              onChange={updateVariant}
            />
          </SectionCard>

          {/* Media Gallery */}
          <SectionCard icon={ImageIcon} title="Media Gallery">
            <MediaGallery />
          </SectionCard>
        </div>

        {/* ── Right sidebar ── */}
        <div className="space-y-6">

          {/* Visibility */}
          <SectionCard icon={Eye} title="Visibility">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  This gift will be live on the storefront immediately after saving.
                </p>
                <Switch
                  checked={visible}
                  onClick={() => setVisible((c) => !c)}
                  className="h-6 w-11 shrink-0"
                />
              </div>

              <div className="rounded-xl bg-amber-50 px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-600">
                  Status Note
                </p>
                <p className="mt-1 text-[10px] text-amber-600">
                  Currently in Draft mode. Providers must approve final pricing.
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Provider */}
          <SectionCard icon={Briefcase} title="Provider">
            <div className="space-y-2">
              <Label className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Assignment
              </Label>
              <Select>
                <SelectTrigger className="h-11 w-full rounded-xl bg-slate-50 text-xs">
                  <SelectValue placeholder="Select a provider" />
                </SelectTrigger>
                <SelectContent>
                  {giftProviderOptions
                    .filter((o) => o.value !== "all")
                    .map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="h-10 rounded-xl px-5 text-xs">
          Cancel & Exit
        </Button>
        <Button className="h-10 rounded-xl px-5 text-xs gap-2">
          <Gift className="size-4" strokeWidth={2.25} />
          Save Gift
        </Button>
      </div>
    </div>
  );
}