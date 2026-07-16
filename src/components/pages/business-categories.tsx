"use client";

import { useState } from "react";
import { Edit2, Plus, X } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { AddBusinessCategoryDialog } from "@/components/dialog/add-business-category-dialog";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import { Can } from "@/components/auth/can";
import {
  useDeleteProviderBusinessCategory,
  useProviderBusinessCategories,
} from "@/hooks/useProviderBusinessCategories";
import type { ProviderBusinessCategory } from "@/types/provider-business-categories";
import { StatusBadge } from "@/utils/status";

export function BusinessCategoriesPage() {
  const [page, setPage] = useState(1);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [editCategory, setEditCategory] =
    useState<ProviderBusinessCategory | null>(null);
  const [deleteTarget, setDeleteTarget] =
    useState<ProviderBusinessCategory | null>(null);

  const limit = 10;
  const { data: categories = [], isLoading } = useProviderBusinessCategories({
    page,
    limit,
  });
  const {
    mutate: deleteBusinessCategory,
    isPending: isDeleting,
  } = useDeleteProviderBusinessCategory();
  const hasNextPage = categories.length === limit;
  const pagination = {
    total: (page - 1) * limit + categories.length + (hasNextPage ? 1 : 0),
    page,
    limit,
    totalPages: page + (hasNextPage ? 1 : 0),
    hasNext: hasNextPage,
    hasPrevious: page > 1,
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Business Categories"
        description="Manage and organize your provider business categories."
        actions={
          <Can module="providerBusinessCategories" action="create">
            <Button onClick={() => setAddCategoryOpen(true)}>
              <Plus className="mr-2 size-3.5" />
              Add Category
            </Button>
          </Can>
        }
      />

      <AddBusinessCategoryDialog
        open={addCategoryOpen || !!editCategory}
        onOpenChange={(open) => {
          setAddCategoryOpen(open);
          if (!open) {
            setEditCategory(null);
          }
        }}
        category={editCategory}
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
          deleteBusinessCategory(deleteTarget.id, {
            onSuccess: () => setDeleteTarget(null),
          });
        }}
      />

      <DataTable
        data={categories}
        loading={isLoading}
        pagination={{ ...pagination, onPageChange: setPage }}
        headers={
          <>
            <TableHead>Category Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
        row={(item: ProviderBusinessCategory) => (
          <>
            <TableCell>
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold uppercase text-primary">
                  {(item.iconKey || item.name).charAt(0)}
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

            <TableCell>{
              StatusBadge({ status: item.isActive ? "ACTIVE" : "INACTIVE" })
              }
            </TableCell>

            <TableCell>
              <div className="flex items-center justify-end">
                <Can module="providerBusinessCategories" action="update">
                  <Button
                    variant="ghost"
                    className="size-9 rounded-full text-emerald-500 hover:bg-emerald-50"
                    onClick={() => setEditCategory(item)}
                  >
                    <Edit2 className="size-4" />
                  </Button>
                </Can>
                <Can module="providerBusinessCategories" action="delete">
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
        )}
      />
    </div>
  );
}
