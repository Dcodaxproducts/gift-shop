"use client";

import { useState } from "react";
import { Edit2, Plus, X } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { AddDocumentDialog } from "@/components/dialog/add-document-dialog";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import {
  useDeleteDocument,
  useDocuments,
} from "@/hooks/useDocuments";
import type { Document } from "@/services/documents";
import { StatusBadge } from "@/utils/status";

export function DocumentsPage() {
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Document | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Document | null>(null);

  const limit = 10;
  const { data, isLoading } = useDocuments({ page, limit });
  const documents = data?.data ?? [];
  const meta = data?.meta;

  const { mutate: deleteDocument, isPending: isDeleting } = useDeleteDocument();

  const pagination = {
    total: meta?.total ?? 0,
    page: meta?.page ?? page,
    limit: meta?.limit ?? limit,
    totalPages: meta?.totalPages ?? 1,
    hasNext: (meta?.page ?? page) < (meta?.totalPages ?? 1),
    hasPrevious: (meta?.page ?? page) > 1,
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Document Management"
        description="Manage required document definitions for providers."
        actions={
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="mr-2 size-3.5" />
            Add Document
          </Button>
        }
      />

      <AddDocumentDialog
        open={addOpen || !!editTarget}
        onOpenChange={(open) => {
          setAddOpen(open);
          if (!open) setEditTarget(null);
        }}
        document={editTarget}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Deactivate Document"
        description="Are you sure you want to deactivate this document definition? Providers will no longer be required to upload it."
        confirmLabel="Deactivate"
        loading={isDeleting}
        onConfirm={() => {
          if (!deleteTarget) return;
          deleteDocument(deleteTarget.id, {
            onSuccess: () => setDeleteTarget(null),
          });
        }}
      />

      <DataTable
        data={documents}
        loading={isLoading}
        pagination={{ ...pagination, onPageChange: setPage }}
        headers={
          <>
            <TableHead>Document Name</TableHead>
            <TableHead>Required</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
        row={(item: Document) => (
          <>
            <TableCell>
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold uppercase text-primary">
                  {item.name.charAt(0)}
                </span>
                <span className="text-xs font-semibold capitalize">
                  {item.name}
                </span>
              </div>
            </TableCell>

            <TableCell>
              {StatusBadge({ status: item.isRequired ? "Yes" : "No" })}
            </TableCell>

            <TableCell>
              {StatusBadge({ status: item.isActive ? "ACTIVE" : "INACTIVE" })}
            </TableCell>

            <TableCell>
              <div className="flex items-center justify-end">
                <Button
                  variant="ghost"
                  className="size-9 rounded-full text-emerald-500 hover:bg-emerald-50"
                  onClick={() => setEditTarget(item)}
                >
                  <Edit2 className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="size-9 rounded-full text-rose-500 hover:bg-rose-50"
                  onClick={() => setDeleteTarget(item)}
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
