"use client";

import { useState } from "react";
import { Edit2, Plus, X } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { AddCategoryDialog } from "@/components/dialog/add-category-dialog";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import { useGiftCategories } from "@/hooks/useGiftCategories";
import type { GiftCategory } from "@/types/gift-categories";
import MyImage from "../common/MyImage";

export function GiftCategoriesPage() {
  const [page, setPage] = useState(1);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);

  const limit = 10;
  const { data: categories = [], isLoading } = useGiftCategories({ page, limit });
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
        title="Gift Categories"
        description="Manage and organize your catalog of gift types."
        actions={
          <Button onClick={() => setAddCategoryOpen(true)}>
            <Plus className="mr-2 size-3.5" />
            Add Category
          </Button>
        }
      />

      <AddCategoryDialog
        open={addCategoryOpen}
        onOpenChange={setAddCategoryOpen}
      />

      <DataTable
        data={categories}
        loading={isLoading}
        pagination={{ ...pagination, onPageChange: setPage }}
        headers={
          <>
            <TableHead>Category Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Total Gifts</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
        row={(item: GiftCategory) => (
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
              <p className="max-w-[360px] truncate text-xs leading-5 text-slate-500 first-letter:uppercase">
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