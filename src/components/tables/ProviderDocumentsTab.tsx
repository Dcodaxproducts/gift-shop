"use client";

import { useState } from "react";
import { Check, ChevronDown, ExternalLink, Upload, X } from "lucide-react";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableHead } from "@/components/ui/table";
import { StatusBadge } from "@/utils/status";
import { useProviderDocuments, useReviewProviderDocument } from "@/hooks/useProviders";
import { UploadProviderDocumentDialog } from "@/components/dialog/upload-provider-document-dialog";
import { Can } from "@/components/auth/can";
import { useCan } from "@/hooks/useCan";
import type { ProviderDocument, ProviderDocumentStatus } from "@/types/providers";

const REVIEW_OPTIONS: { label: string; value: Exclude<ProviderDocumentStatus, "PENDING">; icon: typeof Check }[] = [
  { label: "Approve", value: "APPROVED", icon: Check },
  { label: "Reject", value: "REJECTED", icon: X },
];

function ProviderDocumentsTab({ providerId }: { providerId: string }) {
  const [uploadOpen, setUploadOpen] = useState(false);
  const { can } = useCan();
  const canEdit = can("providers", "update");
  const { data: documents = [], isLoading } = useProviderDocuments(providerId);
  const { mutate: reviewDocument, isPending: isReviewing } = useReviewProviderDocument(providerId);

  return (
    <div className="border border-b-0 border-slate-200 rounded-2xl">
      <div className="flex flex-col gap-3 rounded-t-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold">Provider Documents</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Upload and manage required documents for this provider.
          </p>
        </div>
        <Can module="providers" action="update">
          <Button onClick={() => setUploadOpen(true)}>
            <Upload className="mr-2 size-3.5" />
            Upload Document
          </Button>
        </Can>
      </div>

      <UploadProviderDocumentDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        providerId={providerId}
      />

      <DataTable
        data={documents}
        loading={isLoading}
        isBorder={false}
        headers={
          <>
            <TableHead>Document Name</TableHead>
            <TableHead>Required</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted On</TableHead>
            <TableHead className="text-right">File</TableHead>
          </>
        }
        row={(item: ProviderDocument) => (
          <>
            <TableCell className="font-semibold capitalize">
              {item.name}
            </TableCell>

            <TableCell>
              <StatusBadge status={item.isRequired ? "Yes" : "No"} />
            </TableCell>

            <TableCell>
              {item.submission ? (
                item.submission.status === "PENDING" && canEdit ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        disabled={isReviewing}
                        className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-semibold text-amber-600 transition hover:bg-amber-100"
                      >
                        Pending
                        <ChevronDown className="size-3" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-36">
                      {REVIEW_OPTIONS.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() =>
                            reviewDocument({
                              submissionId: item.submission!.id,
                              status: option.value,
                            })
                          }
                        >
                          <option.icon className="size-3.5" />
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <StatusBadge status={item.submission.status} />
                )
              ) : (
                <span className="text-xs italic text-slate-300">Not submitted</span>
              )}
            </TableCell>

            <TableCell className="text-xs text-slate-500">
              {item.submission
                ? new Date(item.submission.createdAt).toLocaleDateString()
                : "—"}
            </TableCell>

            <TableCell>
              <div className="flex justify-end">
                {item.submission ? (
                  <a
                    href={item.submission.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-9 items-center justify-center rounded-full text-primary hover:bg-primary/10 transition"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                ) : (
                  <span className="text-xs italic text-slate-300">—</span>
                )}
              </div>
            </TableCell>
          </>
        )}
      />
    </div>
  );
}

export default ProviderDocumentsTab;
