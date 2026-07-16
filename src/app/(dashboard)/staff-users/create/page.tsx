import type { Metadata } from "next";
import { StaffFormPage } from "@/components/pages/staff-form";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = { title: `Create Staff | ${SITE_NAME}` };

export default function CreateStaff() {
  return <StaffFormPage mode="create" />;
}
