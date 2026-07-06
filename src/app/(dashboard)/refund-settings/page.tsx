import type { Metadata } from "next";
import { RefundSettingsPage } from "@/components/pages/refund-settings";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Refund Policy Settings | ${SITE_NAME}`,
  description: "Manage global refund windows and auto-approval criteria.",
};

export default function RefundSettings() {
  return (
      <RefundSettingsPage />
  );
}
