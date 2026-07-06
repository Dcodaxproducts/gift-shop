import type { Metadata } from "next";
import { DisputeDetailsPage } from "@/components/pages/dispute-details";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Dispute Details | ${SITE_NAME}`,
  description: "Review dispute evidence and internal transaction data.",
};

export default function DisputeRefundDetails() {
  return (
      <DisputeDetailsPage />
  );
}
