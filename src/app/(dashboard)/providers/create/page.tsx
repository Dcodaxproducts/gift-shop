import type { Metadata } from "next";
import { ProviderFormPage } from "@/components/pages/provider-form";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Add New Provider | ${SITE_NAME}`,
  description: "Create a new provider profile on the platform.",
};

export default function CreateProvider() {
  return (
      <ProviderFormPage mode="create" />
  );
}
