import type { Metadata } from "next";
import { ProviderDetailsPage } from "@/components/pages/provider-details";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Provider Profile | ${SITE_NAME}`,
  description: "Review provider details, listed items, business information, and account actions.",
};

export default function ProviderDetails() {
  return (
      <ProviderDetailsPage />
  );
}
