"use client";

import { useState } from "react";
import { Edit2, Gem, Laptop, Plus, Ticket, Utensils, X } from "lucide-react";
import {
  giftCategoryItems,
  giftCategoryPagination,
  type GiftCategoryIcon,
  type GiftCategoryItem,
  type GiftCategoryTone,
} from "@/constants/gift-categories";
import { PageHeader } from "@/components/common/page-header";
import { AddCategoryDialog } from "@/components/dialog/add-category-dialog";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const categoryIconMap: Record<GiftCategoryIcon, typeof Ticket> = {
  voucher: Ticket,
  food: Utensils,
  luxury: Gem,
  electronics: Laptop,
};

const toneClassMap: Record<GiftCategoryTone, string> = {
  purple: "bg-primary/10 text-primary",
  orange: "bg-amber-50 text-amber-500",
  violet: "bg-violet-50 text-violet-500",
  emerald: "bg-emerald-50 text-emerald-500",
};

export function GiftCategoriesPage() {
  const [page, setPage] = useState(1);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Gift Categories"
        description="Manage and organize your catalog of gift types."
        actions={
          <Button onClick={() => setAddCategoryOpen(true)}>
            <Plus className="mr-2 size-3.5" />
            Add Category
          </Button>
        }
      />

      <AddCategoryDialog open={addCategoryOpen} onOpenChange={setAddCategoryOpen} />

      <DataTable
        data={giftCategoryItems}
        pagination={{ ...giftCategoryPagination, page, onPageChange: setPage }}
        headers={
          <>
            <TableHead>Category Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Total Gifts</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
        row={(item: GiftCategoryItem) => {
          const Icon = categoryIconMap[item.icon];

          return (
            <>
              <TableCell>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full",
                      toneClassMap[item.tone],
                    )}
                  >
                    <Icon className="size-4" strokeWidth={2.25} />
                  </span>
                  <span className="text-xs font-semibold text-slate-950">
                    {item.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <p className="max-w-[360px] text-xs leading-5 text-slate-500">
                  {item.description}
                </p>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {item.totalGifts}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <Button
                    variant="ghost"
                    className="size-9 rounded-full text-emerald-500 hover:bg-emerald-50"
                  >
                    <Edit2 className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="size-9 rounded-full text-rose-500 hover:bg-rose-50"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </>
          );
        }}
      />
    </div>
  );
}
