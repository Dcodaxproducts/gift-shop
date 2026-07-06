import type { Metadata } from "next";
import { ProvidersPage } from "@/components/pages/providers";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Providers | ${SITE_NAME}`,
  description: "Manage fintech service providers and their approval workflows.",
};

export default function Providers() {
  return (
      <ProvidersPage />
  );
}
