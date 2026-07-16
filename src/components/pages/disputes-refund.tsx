"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { FilterSection } from "@/components/common/filter-section";
import { DisputeRefundStatsCard } from "@/components/cards/DisputeRefundStatsCard";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import { Can } from "@/components/auth/can";
import { disputeRefundCategoryOptions, disputeRefundStatusOptions } from "@/constants/filter-options";
import { useDebounce } from "@/hooks/useDebounce";
import { useDisputeStats, useDisputes, useExportDisputes } from "@/hooks/useDisputes";
import type { Dispute, DisputeStatus } from "@/types/disputes";
import { StatusBadge } from "@/utils/status";

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);
}

function getDaysOpen(createdAt: string) {
  const createdDate = new Date(createdAt);

  if (Number.isNaN(createdDate.getTime())) return 0;

  return Math.max(Math.ceil((Date.now() - createdDate.getTime()) / 86400000), 0);
}

export function DisputesRefundPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState<DisputeStatus | "all">("all");
  const limit = 10;
  const debouncedSearch = useDebounce(search, 400);
  const { data: stats } = useDisputeStats();
  const exportDisputes = useExportDisputes();
  const { data: disputesResponse, isLoading } = useDisputes({
    page,
    limit,
    search: debouncedSearch || undefined,
    category: category === "all" ? undefined : category,
    status: status === "all" ? undefined : status,
  });

  const mockDisputesResponse: any = {
    data: [
      {
        id: "disp-101",
        caseId: "DIS-2026-9942",
        status: "OPEN",
        priority: "HIGH",
        reason: "Product not received after 14 days of estimated delivery.",
        amount: 250.00,
        currency: "USD",
        createdAt: "2026-06-08T10:00:00Z",
        lastUpdatedAt: "2026-06-10T15:30:00Z",
        claimDetails: "Customer claims the package was marked delivered but never arrived at the doorstep.",
        customer: {
          id: "cust-501",
          name: "Zeeshan Khan",
          email: "zeeshan@example.com",
        },
        transaction: {
          id: "tx-701",
          transactionId: "TXN-77319-ORD",
          paymentStatus: "SUCCESS",
          processorAuthCode: "AUTH-99812",
          amount: 250.00,
          currency: "USD",
        },
        sla: {
          deadlineAt: "2026-06-15T10:00:00Z",
          remainingText: "4 days left",
          isApproachingDeadline: true,
        },
        refund: {
          eligible: true,
          eligibleReason: "Standard delivery time protection limit breached.",
          maxRefundAmount: 250.00,
        },
      },
      {
        id: "disp-102",
        caseId: "DIS-2026-4102",
        status: "IN_REVIEW",
        priority: "MEDIUM",
        reason: "Fraudulent transaction reported by cardholder.",
        amount: 1250.50,
        currency: "USD",
        createdAt: "2026-06-01T14:30:00Z",
        lastUpdatedAt: "2026-06-11T09:00:00Z",
        claimDetails: "Unauthorized charge alert raised by issuer bank fraud detection engine.",
        customer: {
          id: "cust-502",
          name: "Mariam Malik",
          email: "mariam.m@example.com",
        },
        transaction: {
          id: "tx-702",
          transactionId: "TXN-11042-ORD",
          paymentStatus: "SUCCESS",
          processorAuthCode: "AUTH-44120",
          amount: 1250.50,
          currency: "USD",
        },
        sla: {
          deadlineAt: "2026-06-22T14:30:00Z",
          remainingText: "11 days left",
          isApproachingDeadline: false,
        },
        refund: {
          eligible: true,
          eligibleReason: "Merchant collateral buffer allows partial or full settlement.",
          maxRefundAmount: 1250.50,
        },
      },
      {
        id: "disp-103",
        caseId: "DIS-2026-0851",
        status: "RESOLVED",
        priority: "LOW",
        reason: "Duplicate charge for subscription cycle.",
        amount: 45.00,
        currency: "USD",
        createdAt: "2026-05-25T09:15:00Z",
        lastUpdatedAt: "2026-05-26T11:20:00Z",
        claimDetails: "System glitch charged the customer twice within 2 seconds for June cycle.",
        customer: {
          id: "cust-503",
          name: "Bilal Ahmed",
          email: "bilal99@example.com",
        },
        transaction: {
          id: "tx-703",
          transactionId: "TXN-90822-ORD",
          paymentStatus: "SUCCESS",
          processorAuthCode: "AUTH-00128",
          amount: 45.00,
          currency: "USD",
        },
        sla: null, // Case resolved, no active SLA needed
        refund: {
          eligible: false,
          eligibleReason: "Full refund already processed manually via gateway provider panel.",
          maxRefundAmount: 0.00,
        },
      },
      {
        id: "disp-104",
        caseId: "DIS-2026-3319",
        status: "ESCALATED",
        priority: "HIGH",
        reason: "Item significantly not as described.",
        amount: 890.00,
        currency: "USD",
        createdAt: "2026-06-10T16:00:00Z",
        lastUpdatedAt: "2026-06-11T17:10:00Z",
        claimDetails: "Customer received counterfeit or damaged components instead of a brand new setup.",
        customer: {
          id: "cust-504",
          name: "Sana Raza",
          email: "sana.raza@example.com",
        },
        transaction: {
          id: "tx-704",
          transactionId: "TXN-55410-ORD",
          paymentStatus: "SUCCESS",
          processorAuthCode: "AUTH-88712",
          amount: 890.00,
          currency: "USD",
        },
        sla: {
          deadlineAt: "2026-06-12T16:00:00Z",
          remainingText: "23 hours left",
          isApproachingDeadline: true,
        },
        refund: {
          eligible: true,
          eligibleReason: "Escalation review parameters auto-approved for full reimbursement.",
          maxRefundAmount: 890.00,
        },
      }
    ],
    meta: {
      page: 1,
      limit: 10,
      total: 4,
      totalPages: 1,
    },
  };

  const disputes = mockDisputesResponse?.data ?? [];

  // const disputes = disputesResponse?.data ?? [];
  const meta = mockDisputesResponse?.meta ?? {
    page,
    limit,
    total: 0,
    totalPages: 1,
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as DisputeStatus | "all");
    setPage(1);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Dispute & Refund Cases"
        description="Manage, review, and resolve customer disputes within allowed limits."
        actions={
          <Can module="disputes" action="read">
            <Button onClick={() => exportDisputes.mutate()} disabled={disputesResponse?.data?.length === 0 || exportDisputes.isPending}>
              <Download className="mr-2 size-3.5" />
              {exportDisputes.isPending ? "Exporting..." : "Export"}
            </Button>
          </Can>
        }
      />

      <DisputeRefundStatsCard data={stats} />

      <FilterSection
        searchPlaceholder="Search by case ID, customer, or transaction..."
        searchValue={search}
        onSearchChange={handleSearchChange}
        filters={[
          {
            value: category,
            onChange: handleCategoryChange,
            placeholder: "All Categories",
            width: "sm:w-37.5",
            options: disputeRefundCategoryOptions,
          },
          {
            value: status,
            onChange: handleStatusChange,
            placeholder: "All Status",
            width: "sm:w-32.5",
            options: disputeRefundStatusOptions,
          },
        ]}
      />

      <DataTable
        data={disputes}
        loading={isLoading}
        pagination={{
          total: meta.total,
          page: meta.page,
          limit,
          totalPages: meta.totalPages,
          hasNext: meta.page < meta.totalPages,
          hasPrevious: meta.page > 1,
          onPageChange: setPage,
        }}
        headers={
          <>
            <TableHead>Case ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Days Open</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </>
        }
        row={(item: Dispute) => (
          <>
            <TableCell className="font-semibold text-primary">{item.caseId}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <p className="font-semibold">{item.customer.name}</p>
                <p className="text-xs text-slate-400">{item.customer.email}</p>
              </div>
            </TableCell>
            <TableCell className="text-slate-500">{item.transaction.transactionId}</TableCell>
            <TableCell className="font-semibold">{formatCurrency(item.amount, item.currency)}</TableCell>
            <TableCell>{StatusBadge({ status: item.status })}</TableCell>
            <TableCell className="font-medium">{getDaysOpen(item.createdAt)} days</TableCell>
            <TableCell className="text-right">
              <Can
                module="disputes"
                action={item.status === "RESOLVED" ? "read" : "update"}
              >
                <Button
                  variant="ghost"
                  className="text-primary"
                // onClick={() => router.push(`/disputes-refund/${encodeURIComponent(item.id)}`)}
                >
                  {item.status === "RESOLVED" ? "History" : "Review"}
                </Button>
              </Can>
            </TableCell>
          </>
        )}
      />
    </div>
  );
}
