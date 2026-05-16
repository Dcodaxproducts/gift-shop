"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Download, 
  Edit2, 
  Eye, 
  ListFilter, 
  Plus, 
  Search, 
  X 
} from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { FilterSection } from "@/components/common/filter-section";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import { ProviderStatsCard } from "@/components/cards/ProviderStatsCard";
import { StatusBadge } from "@/utils/status";
import { useProviders, useProviderStats, useExportProviders } from "@/hooks/useProviders";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { providerToneClass, providerTones, type ProviderTone } from "@/constants/providers";
import { providerStatusOptions, providerApprovalOptions } from "@/constants/filter-options";
import type {
  Provider,
  ProviderApproval,
  ProviderStatus,
  ProviderStats as ProviderStatsData,
} from "@/types/providers";
import { getInitials } from "@/utils/getInitials";


export function ProvidersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProviderStatus | "all">("all");
  const [approval, setApproval] = useState<ProviderApproval | "all">("all");
  
  const limit = 10;
  const debouncedSearch = useDebounce(search, 400);

  // Data Fetching
  const { data, isLoading } = useProviders({
    page,
    limit,
    search: debouncedSearch || undefined,
    status: status === "all" ? undefined : status,
    approval: approval === "all" ? undefined : approval,
  });

  const { data: statsData } = useProviderStats();
  const exportProviders = useExportProviders();

  // Derived State
  const providers = data?.providers ?? [];

  const pagination = data?.pagination ?? {
    total: 0,
    page,
    limit,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Providers"
        description="Manage fintech service providers and their performance metrics."
        actions={
          <>
            <Button variant="outline" onClick={() => exportProviders.mutate()} disabled={exportProviders.isPending}>
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

      <FilterSection
        searchPlaceholder="Search providers by name, email, or status..."
        searchValue={search}
        onSearchChange={(value) => { setSearch(value); setPage(1); }}
        filters={[
          {
            value: status,
            onChange: (value) => { setStatus(value as any); setPage(1); },
            placeholder: "Status",
            width: "sm:w-[140px]",
            options: providerStatusOptions as any,
          },
          {
            value: approval,
            onChange: (value) => { setApproval(value as any); setPage(1); },
            placeholder: "Approval",
            width: "sm:w-[150px]",
            options: providerApprovalOptions as any,
          },
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
        row={(item: Provider, index) => {
          const tone: ProviderTone = providerTones[index % providerTones.length];
          return (
            <>
              <TableCell>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-2xl text-xs font-semibold shadow-sm bg-primary/10 text-primary">
                    {getInitials(item.businessName)}
                  </span>
                  <span className="font-semibold ">
                    {item.businessName}
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
                    onClick={() => router.push(`/providers/${item.id}/edit`)}
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