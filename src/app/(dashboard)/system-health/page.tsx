import type { Metadata } from "next";
import { SystemLogsPage } from "@/components/pages/system-logs";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `System Logs | ${SITE_NAME}`,
  description: "Track system performance, uptime, and integrations in real time.",
};

export default function SystemLogs() {
  return (
      <SystemLogsPage />
  );
}
