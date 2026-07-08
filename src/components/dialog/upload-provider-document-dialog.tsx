"use client";

import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { FileUp, Loader2, X } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDocuments } from "@/hooks/useDocuments";
import { useSubmitProviderDocument } from "@/hooks/useProviders";
import { useStorage } from "@/hooks/useStorage";
import { UPLOAD_FOLDERS } from "@/utils/file";

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
];

const uploadSchema = z.object({
  documentId: z.string().min(1, "Please select a document type"),
  fileUrl: z.string().min(1, "Please upload a file"),
});

type UploadFormErrors = Partial<Record<keyof z.infer<typeof uploadSchema>, string>>;

type UploadProviderDocumentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  providerId: string;
};

export function UploadProviderDocumentDialog({
  open,
  onOpenChange,
  providerId,
}: UploadProviderDocumentDialogProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [documentId, setDocumentId] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState<UploadFormErrors>({});

  const { data: documentsData } = useDocuments({ limit: 100, isActive: true });
  const documents = documentsData?.data ?? [];
  const submitMutation = useSubmitProviderDocument();
  const { upload, isUploading } = useStorage();

  const resetForm = () => {
    setDocumentId("");
    setFileUrl("");
    setFileName("");
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (open) resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrors((prev) => ({ ...prev, fileUrl: "Only PDF, PNG, JPG, or WebP files are allowed" }));
      e.target.value = "";
      return;
    }

    setErrors((prev) => ({ ...prev, fileUrl: undefined }));
    setFileName(file.name);

    const result = await upload(file, UPLOAD_FOLDERS.PROVIDER_DOCUMENTS);

    if (result) {
      setFileUrl(result.fileUrl);
    } else {
      setFileName("");
      setFileUrl("");
      e.target.value = "";
    }
  };

  const handleSubmit = async () => {
    const result = uploadSchema.safeParse({ documentId, fileUrl });

    if (!result.success) {
      const fieldErrors: UploadFormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof UploadFormErrors;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      await submitMutation.mutateAsync({
        id: providerId,
        payload: result.data,
      });
      resetForm();
      onOpenChange(false);
    } catch {
      // Error toast handled by mutation hook
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !submitMutation.isPending && !isUploading) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const isBusy = submitMutation.isPending || isUploading;

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Upload Document"
      description="Select a document type and upload the file for this provider."
      className="max-w-[420px]"
      contentClassName="px-[22px] pb-0 pt-[21px]"
      footerClassName="justify-center gap-3 border-t border-slate-100 py-4"
      footer={
        <>
          <Button onClick={handleSubmit} disabled={isBusy}>
            {submitMutation.isPending
              ? "Submitting..."
              : isUploading
                ? "Uploading..."
                : "Submit Document"}
          </Button>
          <Button
            variant="outline"
            className="w-32"
            onClick={() => handleOpenChange(false)}
            disabled={isBusy}
          >
            Cancel
          </Button>
        </>
      }
    >
      <div className="space-y-[18px]">
        <div>
          <Label>Document Type</Label>
          <Select
            value={documentId}
            onValueChange={(value) => {
              setDocumentId(value);
              if (errors.documentId) setErrors((prev) => ({ ...prev, documentId: undefined }));
            }}
          >
            <SelectTrigger className="mt-0.5 h-9! rounded-md text-xs">
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              {documents.map((doc) => (
                <SelectItem key={doc.id} value={doc.id}>
                  {doc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.documentId && (
            <p className="mt-1.5 px-1 text-xs font-medium leading-5 text-destructive">
              {errors.documentId}
            </p>
          )}
        </div>

        <div>
          <Label>File</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.webp"
            className="hidden"
            onChange={handleFileChange}
          />

          {fileName ? (
            <div className="mt-0.5 flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5">
              <div className="flex items-center gap-2 overflow-hidden">
                {isUploading ? (
                  <Loader2 className="size-4 shrink-0 animate-spin text-primary" />
                ) : (
                  <FileUp className="size-4 shrink-0 text-primary" />
                )}
                <span className="truncate text-xs font-medium">
                  {isUploading ? "Uploading..." : fileName}
                </span>
              </div>
              {!isUploading && (
                <button
                  type="button"
                  className="ml-2 shrink-0 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition"
                  onClick={() => {
                    setFileName("");
                    setFileUrl("");
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="mt-0.5 flex w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-white py-6 text-slate-400 transition hover:border-primary hover:text-primary"
            >
              <FileUp className="size-5" />
              <span className="mt-1.5 text-[10px] font-semibold">
                Click to upload (PDF, PNG, JPG)
              </span>
            </button>
          )}
          {errors.fileUrl && (
            <p className="mt-1.5 px-1 text-xs font-medium leading-5 text-destructive">
              {errors.fileUrl}
            </p>
          )}
        </div>
      </div>
    </Dialog>
  );
}
