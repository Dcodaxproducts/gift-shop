import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ProductDetailsPage } from "@/components/pages/product-details";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Product Details | ${SITE_NAME}`,
  description:
    "Review product sales performance, inventory variants, and quick actions.",
};

export default function ProductDetails() {
  return (
    <DashboardShell>
      <ProductDetailsPage />
    </DashboardShell>
  );
}
