"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Plus, Star, X } from "lucide-react";
import {
  giftCategoryOptions,
  giftProviderOptions,
} from "@/constants/gifts";
import { PageHeader } from "@/components/common/page-header";
import { FilterSection } from "@/components/common/filter-section";
import { AddCategoryDialog } from "@/components/dialog/add-category-dialog";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import MyImage from "@/components/common/MyImage";
import { useDebounce } from "@/hooks/useDebounce";
import { useGifts } from "@/hooks/useGift";
import type { Gift as GiftItem } from "@/types/gifts";
import { StatusBadge } from "@/utils/status";

const formatPrice = (price?: number | string) => {
  const numericPrice = typeof price === "string" ? Number(price) : price;

  if (typeof numericPrice !== "number" || Number.isNaN(numericPrice)) {
    return "$0";
  }

  return numericPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export function GiftsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [provider, setProvider] = useState("all");
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const limit = 10;
  const router = useRouter();
  const debouncedSearch = useDebounce(search, 400);

  const { data: gifts = [], isLoading } = useGifts({
    page,
    limit,
    search: debouncedSearch || undefined,
    categoryId: category === "all" ? undefined : category,
    providerId: provider === "all" ? undefined : provider,
  });

  const hasNextPage = gifts.length === limit;
  const pagination = {
    total: (page - 1) * limit + gifts.length + (hasNextPage ? 1 : 0),
    page,
    limit,
    totalPages: page + (hasNextPage ? 1 : 0),
    hasNext: hasNextPage,
    hasPrevious: page > 1,
  };

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
        data={gifts}
        loading={isLoading}
        pagination={{ ...pagination, page, onPageChange: setPage }}
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
        row={(item: GiftItem) => (
          <>
            <TableCell>
              <div className="flex items-center gap-3">
                <span className="relative block size-11 overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                  <MyImage
                    src={item.imagesUrl?.[0]}
                    alt={item.name}
                    fill
                    sizes="44px"
                  />
                </span>

                <span className="max-w-32.5 text-xs font-semibold leading-4 ">
                  {item.name}
                </span>
              </div>
            </TableCell>
            <TableCell>{item.categoryName ?? item.category?.name ?? item.categoryId ?? "-"}</TableCell>
            <TableCell>{item.providerName ?? item.provider?.businessName ?? item.provider?.name ?? item.providerId ?? "-"}</TableCell>
            <TableCell className="font-semibold">{formatPrice(item.price)}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                {item.rating ?? "0.0"}
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
