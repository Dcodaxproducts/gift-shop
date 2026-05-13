"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Gift, Plus, Star, X } from "lucide-react";
import {
  giftCategoryOptions,
  giftInventoryItems,
  giftPagination,
  giftProviderOptions,
  type GiftInventoryItem,
} from "@/constants/gifts";
import { PageHeader } from "@/components/common/page-header";
import { FilterSection } from "@/components/common/filter-section";
import { AddCategoryDialog } from "@/components/dialog/add-category-dialog";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import { StatusBadge } from "@/utils/status";

export function GiftsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [provider, setProvider] = useState("all");
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Gift Inventory"
        description="Manage and monitor all gift listings across the platform."
        actions={
          <Button onClick={() => router.push("/gifts/create")}>
            <Plus className="mr-2 size-3.5" />
            Add New Gift
          </Button>
        }
      />

      <AddCategoryDialog open={addCategoryOpen} onOpenChange={setAddCategoryOpen} />

      {/* <GiftCard /> */}

      <FilterSection
        searchPlaceholder="Search gifts by name, ID, or provider..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            value: category,
            onChange: setCategory,
            placeholder: "Category",
            width: "sm:w-[135px]",
            options: giftCategoryOptions.map((option) => ({ value: option.value, label: option.label })),
          },
          {
            value: provider,
            onChange: setProvider,
            placeholder: "Provider",
            width: "sm:w-[130px]",
            options: giftProviderOptions.map((option) => ({ value: option.value, label: option.label })),
          },
        ]}
      />

      <DataTable
        data={giftInventoryItems}
        pagination={{ ...giftPagination, page, onPageChange: setPage }}
        headers={
          <>
            <TableHead>Gift Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
        row={(item: GiftInventoryItem) => (
          <>
            <TableCell>
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-white shadow-sm">
                  <Gift className="size-4" />
                </span>
                <span className="max-w-[130px] text-xs font-semibold leading-4 text-slate-950">
                  {item.name}
                </span>
              </div>
            </TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.provider}</TableCell>
            <TableCell className="font-semibold">{item.price}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                {item.rating}
              </span>
            </TableCell>
            <TableCell>
              <StatusBadge status={item.status} />
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
        )}
      />
    </div>
  );
}
