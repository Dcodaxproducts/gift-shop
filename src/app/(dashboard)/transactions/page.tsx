import type { Metadata } from "next";
import { TransactionsPage } from "@/components/pages/transactions";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Transaction Monitoring | ${SITE_NAME}`,
  description: "Monitor platform transactions, status, and payment activity.",
};

export default function Transactions() {
  return (
      <TransactionsPage />
  );
}
