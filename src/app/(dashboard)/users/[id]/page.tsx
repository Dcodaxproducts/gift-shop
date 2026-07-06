import type { Metadata } from "next";
import { UserDetailsPage } from "@/components/pages/user-details/index";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `User Profile | ${SITE_NAME}`,
};

export default function UserDetails() {
  return (
    <UserDetailsPage />
  );
}
