"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  Edit2,
  Eye,
  FileText,
  Plus,
  X
} from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { FilterSection } from "@/components/common/filter-section";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import { ProviderStatsCard } from "@/components/cards/ProviderStatsCard";
import { StatusBadge } from "@/utils/status";
import { useDeleteProvider, useProviders, useProviderStats, useExportProviders } from "@/hooks/useProviders";
import { useDebounce } from "@/hooks/useDebounce";
import { providerStatusOptions } from "@/constants/filter-options";
import type {
  Provider,
  ProviderStatus,
} from "@/types/providers";
import MyImage from "../common/MyImage";

export function ProvidersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProviderStatus | "all">("all");
  const [deleteTarget, setDeleteTarget] = useState<Provider | null>(null);

  const limit = 10;
  const debouncedSearch = useDebounce(search, 400);

  // Data Fetching
  const { data: providers = [], isLoading } = useProviders({
    page,
    limit,
    search: debouncedSearch || undefined,
    status: status === "all" ? undefined : status,
  });

  const { data: statsData } = useProviderStats();
  const exportProviders = useExportProviders();
  const { mutate: deleteProvider, isPending: isDeleting } = useDeleteProvider();

  const hasNextPage = providers.length === limit;
  const pagination = {
    total: (page - 1) * limit + providers.length + (hasNextPage ? 1 : 0),
    page,
    limit,
    totalPages: page + (hasNextPage ? 1 : 0),
    hasNext: hasNextPage,
    hasPrevious: page > 1,
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Providers"
        description="Manage fintech service providers and their performance metrics."
        actions={
          <>
            <Button variant="outline" onClick={() => exportProviders.mutate()} disabled={providers?.length === 0 || exportProviders.isPending}>
              <Download className="mr-2 size-3.5" />
              {exportProviders.isPending ? "Exporting..." : "Export"}
            </Button>
            <Button onClick={() => router.push("/providers/create")}>
              <Plus className="mr-2 size-3.5" />
              Add Provider
            </Button>
          </>
        }
      />

      <ProviderStatsCard data={statsData} />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title="Delete Provider"
        description="Are you sure you want to delete this provider? This action cannot be undone."
        confirmLabel="Delete"
        loading={isDeleting}
        onConfirm={() => {
          if (!deleteTarget) return;

          deleteProvider(deleteTarget.id, {
            onSuccess: () => setDeleteTarget(null),
          });
        }}
      />

      <FilterSection
        searchPlaceholder="Search providers by name, email, or status..."
        searchValue={search}
        onSearchChange={(value) => { setSearch(value); setPage(1); }}
        filters={[
          {
            value: status,
            onChange: (value) => { setStatus(value as ProviderStatus | "all"); setPage(1); },
            placeholder: "Status",
            width: "sm:w-[140px]",
            options: providerStatusOptions,
          }
        ]}
      />

      <DataTable
        data={providers}
        loading={isLoading}
        pagination={{ ...pagination, page, onPageChange: setPage }}
        headers={
          <>
            <TableHead>Provider</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </>
        }
        row={(item: Provider) => {
          return (
            <>
              <TableCell>
                <div className="flex items-center gap-3">
                  <span className="relative block size-11 overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                    <MyImage
                      src={item.companyLogoUrl}
                      alt="provider-logo"
                      fill
                      sizes="44px"
                    />
                  </span>

                  <span className="max-w-32.5 text-xs font-semibold leading-4 ">
                    {item.name}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-slate-500">
                {item.email}
              </TableCell>

              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>

              <TableCell className="font-semibold">
                ${item.revenue}
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    className="size-9 rounded-full text-primary hover:bg-primary/10"
                    onClick={() => router.push(`/providers/${item.id}`)}
                  >
                    <Eye className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="size-9 rounded-full text-amber-500 hover:bg-amber-50"
                    onClick={() => router.push(`/providers/${item.id}?tab=documents`)}
                  >
                    <FileText className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => router.push(`/providers/${item.id}/edit`)}
                    className="size-9 rounded-full text-emerald-500 hover:bg-emerald-50"
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
          );
        }}
      />
    </div>
  );
}
