"use client";

import { useState } from "react";
import { AlertCircle, Plus, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { productVariants, type ProductVariant } from "@/constants/product-details";
import { cn } from "@/lib/utils";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);

function StockBadge({ stock }: { stock: number }) {
  const isCritical = stock <= 5;
  const isLow = stock > 5 && stock <= 15;

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900">
      {stock}
      {isCritical ? (
        <AlertCircle className="size-3.5 text-rose-500" strokeWidth={2.5} />
      ) : isLow ? (
        <TrendingDown className="size-3.5 text-amber-500" strokeWidth={2.5} />
      ) : null}
    </span>
  );
}

function VariantRow({ variant }: { variant: ProductVariant }) {
  return (
    <TableRow>
      <TableCell className="px-0 py-3.5">
        <div className="flex items-center gap-3">
          <span
            className="size-4 shrink-0 rounded-full border border-slate-200"
            style={{ backgroundColor: variant.swatchColor }}
          />
          <span className="text-xs font-medium text-slate-900">
            {variant.name}
          </span>
        </div>
      </TableCell>
      <TableCell className="px-0 py-3.5 text-xs text-slate-500">
        {variant.sku}
      </TableCell>
      <TableCell className="px-0 py-3.5">
        <StockBadge stock={variant.stock} />
      </TableCell>
      <TableCell className="px-0 py-3.5 text-xs font-medium text-slate-900">
        {formatPrice(variant.price)}
      </TableCell>
      <TableCell className="px-0 py-3.5 text-right">
        <button
          type="button"
          className="text-xs font-semibold text-primary hover:underline"
        >
          Edit
        </button>
      </TableCell>
    </TableRow>
  );
}

export function InventoryManagementCard() {
  const [isActive, setIsActive] = useState(true);

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <CardContent className="p-0">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold ">
            Inventory Management
          </h2>
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-medium text-slate-500">Status:</span>
            <Switch
              checked={isActive}
              onClick={() => setIsActive((current) => !current)}
            />
            <span
              className={cn(
                "text-[11px] font-semibold",
                isActive ? "text-primary" : "text-slate-400",
              )}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <Table>
            <TableHeader className="border-b border-slate-100">
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-0 py-2.5 text-[10px] tracking-wider">
                  Variant
                </TableHead>
                <TableHead className="px-0 py-2.5 text-[10px] tracking-wider">
                  SKU
                </TableHead>
                <TableHead className="px-0 py-2.5 text-[10px] tracking-wider">
                  Stock
                </TableHead>
                <TableHead className="px-0 py-2.5 text-[10px] tracking-wider">
                  Price
                </TableHead>
                <TableHead className="px-0 py-2.5 text-right text-[10px] tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100">
              {productVariants.map((variant) => (
                <VariantRow key={variant.id} variant={variant} />
              ))}
            </TableBody>
          </Table>
        </div>

        <button
          type="button"
          className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 text-xs font-semibold text-slate-500 transition hover:border-primary hover:text-primary"
        >
          <Plus className="size-3.5" strokeWidth={2.5} />
          Add New Variant
        </button>
      </CardContent>
    </Card>
  );
}
