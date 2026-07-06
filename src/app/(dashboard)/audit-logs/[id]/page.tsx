import type { Metadata } from "next";
import { AuditLogDetailsPage } from "@/components/pages/audit-log-details";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Audit Log Detail | ${SITE_NAME}`,
  description: "Review audit log event details and payload changes.",
};

export default function AuditLogDetail() {
  return (
      <AuditLogDetailsPage />
  );
}
