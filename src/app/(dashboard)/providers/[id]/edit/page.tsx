import type { Metadata } from "next";
import { ProviderFormPage } from "@/components/pages/provider-form";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Edit Provider | ${SITE_NAME}`,
  description: "Update provider profile details.",
};

export default function EditProvider() {
  return (
    <ProviderFormPage mode="edit" />
  );
}
