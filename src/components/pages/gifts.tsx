"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Plus, Star, X } from "lucide-react";
import { giftStatusOptions } from "@/constants/filter-options";
import PageHeader from "@/components/common/page-header";
import { FilterSection } from "@/components/common/filter-section";
import { AddCategoryDialog } from "@/components/dialog/add-category-dialog";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { Can } from "@/components/auth/can";
import MyImage from "@/components/common/MyImage";
import { useDebounce } from "@/hooks/useDebounce";
import { useGiftCategories } from "@/hooks/useGiftCategories";
import { useDeleteGift, useGifts } from "@/hooks/useGift";
import type { Gift as GiftItem, GiftStatus } from "@/types/gifts";
import { StatusBadge } from "@/utils/status";

const giftColumns = ["Gift Name", "Category", "Provider", "Price", "Rating", "Status", "Actions"];

export function GiftsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GiftItem | null>(null);
  const limit = 10;
  const router = useRouter();
  const debouncedSearch = useDebounce(search, 400);
  const { mutate: deleteGift, isPending: isDeleting } = useDeleteGift();
  const { data: giftCategories = [] } = useGiftCategories({ lookup: true });

  const { data: gifts = [], isLoading } = useGifts({
    page,
    limit,
    search: debouncedSearch || undefined,
    categoryId: category === "all" ? undefined : category,
    status: status === "all" ? undefined : (status as GiftStatus),
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

  const renderGiftRow = (item: GiftItem) => (
    <>
      <TableCell>
        <div className="flex items-center gap-3">
          <span className="relative block size-11 overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
            <MyImage
              src={item.imageUrls?.[0]}
              alt={item.name}
              fill
              sizes="44px"
            />
          </span>

          <span className="max-w-32.5 text-xs font-semibold leading-4 capitalize">
            {item.name}
          </span>
        </div>
      </TableCell>
      <TableCell className="capitalize">{item.category?.name ?? "-"}</TableCell>
      <TableCell className="capitalize">{item.provider?.businessName ?? "-"}</TableCell>
      <TableCell className="font-semibold">${item.price?.toFixed(2)}</TableCell>
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
          <Can module="gifts" action="update">
            <Button
              variant="ghost"
              className="size-9 rounded-full text-emerald-500 hover:bg-emerald-50"
              onClick={() => router.push(`/gifts/${item.id}`)}
            >
              <Edit2 className="size-4" />
            </Button>
          </Can>
          <Can module="gifts" action="delete">
            <Button
              variant="ghost"
              className="size-9 rounded-full text-rose-500 hover:bg-rose-50"
              onClick={() => setDeleteTarget(item)}
            >
              <X className="size-4" />
            </Button>
          </Can>
        </div>
      </TableCell>
    </>
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Gift Inventory"
        description="Manage and monitor all gift listings across the platform."
        actions={
          <Can module="gifts" action="create">
            <Button onClick={() => router.push("/gifts/create")}>
              <Plus className="mr-2 size-3.5" />
              Add New Gift
            </Button>
          </Can>
        }
      />

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
            options: [
              { value: "all", label: "All Categories" },
              ...giftCategories.map((giftCategory) => ({ value: giftCategory.id, label: giftCategory.name })),
            ],
          },
          {
            value: status,
            onChange: setStatus,
            placeholder: "Status",
            width: "sm:w-[130px]",
            options: giftStatusOptions,
          },
        ]}
      />

      <DataTable
        data={gifts}
        loading={isLoading}
        pagination={{ ...pagination, page, onPageChange: setPage }}
        headers={giftColumns}
        row={renderGiftRow}
      />

      <AddCategoryDialog
        open={addCategoryOpen}
        onOpenChange={setAddCategoryOpen}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title="Delete Gift"
        description="Are you sure you want to delete this gift? This action cannot be undone."
        confirmLabel="Delete"
        loading={isDeleting}
        onConfirm={() => {
          if (!deleteTarget) return;

          deleteGift(deleteTarget.id, {
            onSuccess: () => setDeleteTarget(null),
          });
        }}
      />
    </div>
  );
}
