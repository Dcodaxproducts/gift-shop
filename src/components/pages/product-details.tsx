"use client";

import { useParams } from "next/navigation";
import { InventoryManagementCard } from "@/components/cards/InventoryManagementCard";
import { ProductQuickActionsCard } from "@/components/cards/ProductQuickActionsCard";
import { SalesPerformanceCard } from "@/components/cards/SalesPerformanceCard";
import { SystemMetadataCard } from "@/components/cards/SystemMetadataCard";
import { productMetadata } from "@/constants/product-details";

export function ProductDetailsPage() {
  const params = useParams();
  const productId = (params?.id as string | undefined) ?? productMetadata.productId;

  const metadataRows = [
    { label: "Created", value: productMetadata.createdAt },
    { label: "Last Edited", value: productMetadata.lastEdited },
    {
      label: "Visibility",
      value: productMetadata.visibility,
      highlight: true,
    },
  ];

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight ">
            {productMetadata.name}
          </h1>
          <p className="mt-1 text-xs text-slate-500">Product ID: {productId}</p>
        </div>
        <span className="inline-flex h-7 items-center gap-1.5 self-start rounded-full bg-slate-100 px-3 text-[11px] font-semibold text-slate-600">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Active on Store
        </span>
      </header>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <SalesPerformanceCard />
          <InventoryManagementCard />
        </div>

        <aside className="space-y-5">
          <ProductQuickActionsCard />
          <SystemMetadataCard rows={metadataRows} />
        </aside>
      </section>
    </div>
  );
}
