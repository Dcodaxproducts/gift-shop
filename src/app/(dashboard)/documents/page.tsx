import type { Metadata } from "next";
import { DocumentsPage } from "@/components/pages/documents";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Document Management | ${SITE_NAME}`,
  description: "Manage required document definitions for providers.",
};

export default function Documents() {
  return <DocumentsPage />;
}
