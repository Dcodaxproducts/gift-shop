import type { Metadata } from "next";
import { ProviderPayoutsPage } from "@/components/pages/provider-payouts";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Provider Payouts | ${SITE_NAME}`,
  description: "Manage and monitor provider earnings and payout distributions.",
};

export default function Payouts() {
  return (
    <ProviderPayoutsPage />
  );
}
