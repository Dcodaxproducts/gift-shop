import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ProviderFormPage } from "@/components/pages/provider-form";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Edit Provider | ${SITE_NAME}`,
  description: "Update provider profile details.",
};

const mockProviderDefaults = {
  userName: "Gifts & Blooms Co.",
  email: "hello@giftsandblooms.co",
  contact: "GB-8849201-X",
  password: "************",
  businessName: "giftsandblooms.co",
  businessCategory: "Gift",
  taxId: "123-456-890",
  businessAddress: "Shop No A-12, Tokyo, Japan",
  businessBio:
    "Gifts & Blooms Co. is a premier artisan floral and boutique gifting provider based in London. We specialize in ethically sourced blooms and curated gift hampers that celebrate life's most precious moments with elegance and style.",
};

export default function EditProvider() {
  return (
    <DashboardShell>
      <ProviderFormPage mode="edit" defaultValues={mockProviderDefaults} />
    </DashboardShell>
  );
}
