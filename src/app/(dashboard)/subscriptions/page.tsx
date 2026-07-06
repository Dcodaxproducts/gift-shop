import type { Metadata } from "next";
import { SubscriptionPlansPage } from "@/components/pages/subscription-plans";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Subscription Plans | ${SITE_NAME}`,
  description: "Configure pricing tiers and subscription entitlements.",
};

export default function Subscriptions() {
  return (
      <SubscriptionPlansPage />
  );
}
