import type { Metadata } from "next";
import { DisputesRefundPage } from "@/components/pages/disputes-refund";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Dispute & Refund Cases | ${SITE_NAME}`,
  description: "Manage dispute and refund cases across customer transactions.",
};

export default function DisputesRefund() {
  return (
      <DisputesRefundPage />
  );
}
