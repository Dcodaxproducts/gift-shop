import type { Metadata } from "next";
import { SITE_NAME } from "@/constants/site";
import { NotificationsPage } from "@/components/pages/notification";

export const metadata: Metadata = {
  title: `Notifications | ${SITE_NAME}`,
  description: "View and manage all your notifications.",
};

export default function Notifications() {
  return (
    <NotificationsPage />
  );
}