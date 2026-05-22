import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { UserChatPage } from "@/components/pages/user-chat";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `User Chat | ${SITE_NAME}`,
};

export default function UserChat() {
  return (
    <DashboardShell>
      <UserChatPage />
    </DashboardShell>
  );
}
