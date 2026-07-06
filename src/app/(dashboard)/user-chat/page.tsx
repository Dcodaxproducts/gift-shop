import type { Metadata } from "next";
import { UserChatPage } from "@/components/pages/user-chat";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `User Chat | ${SITE_NAME}`,
};

export default function UserChat() {
  return (
      <UserChatPage />
  );
}
