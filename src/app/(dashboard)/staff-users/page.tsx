import type { Metadata } from "next";
import { StaffUsersPage } from "@/components/pages/staff-users";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = { title: `Staff Management | ${SITE_NAME}` };

export default function StaffUsers() {
  return <StaffUsersPage />
}
