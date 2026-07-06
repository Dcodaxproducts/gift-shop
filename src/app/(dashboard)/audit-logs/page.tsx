import type { Metadata } from "next";
import { AuditLogsPage } from "@/components/pages/audit-logs";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Audit Logs | ${SITE_NAME}`,
  description: "Review system audit logs and admin activity.",
};

export default function AuditLogs() {
  return (
    <AuditLogsPage />
  );
}
