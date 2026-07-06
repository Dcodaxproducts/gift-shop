import type { Metadata } from "next";
import { RolesPermissionsPage } from "@/components/pages/roles-permissions";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Role & Permission Management | ${SITE_NAME}`,
  description: "Manage admin roles and permission access.",
};

export default function RolesPermissions() {
  return (
      <RolesPermissionsPage />
  );
}
