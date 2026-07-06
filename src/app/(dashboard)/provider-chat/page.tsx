import type { Metadata } from "next";
import { ProviderChatPage } from "@/components/pages/provider-chat";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Provider Chat | ${SITE_NAME}`,
};

export default function ProviderChat() {
  return (
      <ProviderChatPage />
  );
}
