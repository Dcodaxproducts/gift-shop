import type { Metadata } from "next";
import { ProviderDisputePage } from "@/components/pages/provider-dispute";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Provider Dispute | ${SITE_NAME}`,
  description: "Review and manage provider dispute cases.",
};

export default function ProviderDispute() {
  return (
      <ProviderDisputePage />
  );
}
