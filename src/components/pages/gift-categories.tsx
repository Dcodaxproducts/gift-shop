"use client";

import { useState } from "react";
import { Edit2, Plus, X } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { AddCategoryDialog } from "@/components/dialog/add-category-dialog";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { Can } from "@/components/auth/can";
import { useDeleteGiftCategory, useGiftCategories } from "@/hooks/useGiftCategories";
import type { GiftCategory } from "@/types/gift-categories";
import MyImage from "../common/MyImage";
import { StatusBadge } from "@/utils/status";

const giftCategoryColumns = ["Category Name", "Description", "Total Gifts", "Status", "Actions"];

export function GiftCategoriesPage() {
  const [page, setPage] = useState(1);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<GiftCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GiftCategory | null>(null);

  const limit = 10;
  const { data: categories = [], isLoading } = useGiftCategories({ page, limit });
  const { mutate: deleteGiftCategory, isPending: isDeleting } = useDeleteGiftCategory();
  const hasNextPage = categories.length === limit;
  const pagination = {
    total: (page - 1) * limit + categories.length + (hasNextPage ? 1 : 0),
    page,
    limit,
    totalPages: page + (hasNextPage ? 1 : 0),
    hasNext: hasNextPage,
    hasPrevious: page > 1,
  };

  const renderGiftCategoryRow = (item: GiftCategory) => (
    <>
      <TableCell>
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full">
            {item.imageUrl ? (
              <MyImage
                src={item.imageUrl}
                alt={item.name}
                width={36}
                height={36}
                className="size-full rounded-full object-cover"
              />
            ) : (
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold uppercase text-primary">
                {item.name.charAt(0)}
              </span>
            )}
          </span>

          <span className="text-xs font-semibold  capitalize">
            {item.name}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <p className="max-w-90 truncate text-xs leading-5 text-slate-500 first-letter:uppercase">
          {item.description ?? (
            <span className="italic text-slate-300">No description</span>
          )}
        </p>
      </TableCell>

      <TableCell>
        <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {item.totalGifts ?? 0}
        </span>
      </TableCell>

      <TableCell>
        <StatusBadge status={item.isActive ? "ACTIVE" : "INACTIVE"} />
      </TableCell>

      <TableCell>
        <div className="flex items-center justify-end">
          <Can module="giftCategories" action="update">
            <Button
              variant="ghost"
              className="size-9 rounded-full text-emerald-500 hover:bg-emerald-50"
              onClick={() => setEditCategory(item)}
            >
              <Edit2 className="size-4" />
            </Button>
          </Can>
          <Can module="giftCategories" action="delete">
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
        title="Gift Categories"
        description="Manage and organize your catalog of gift types."
        actions={
          <Can module="giftCategories" action="create">
            <Button onClick={() => setAddCategoryOpen(true)}>
              <Plus className="mr-2 size-3.5" />
              Add Category
            </Button>
          </Can>
        }
      />

      <AddCategoryDialog
        open={addCategoryOpen || !!editCategory}
        onOpenChange={(open) => {
          setAddCategoryOpen(open);
          if (!open) {
            setEditCategory(null);
          }
        }}
        category={editCategory}
      />

      <DataTable
        data={categories}
        loading={isLoading}
        pagination={{ ...pagination, onPageChange: setPage }}
        headers={giftCategoryColumns}
        row={renderGiftCategoryRow}
      />
      
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
        confirmLabel="Delete"
        loading={isDeleting}
        onConfirm={() => {
          if (!deleteTarget) return;
          deleteGiftCategory(deleteTarget.id, {
            onSuccess: () => setDeleteTarget(null),
          });
        }}
      />

    </div>
  );
}
