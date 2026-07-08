"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  useCreateDocument,
  useUpdateDocument,
} from "@/hooks/useDocuments";
import type { Document } from "@/services/documents";

const documentSchema = z.object({
  name: z
    .string()
    .min(1, "Document name is required")
    .max(100, "Document name must be 100 characters or less"),
  isRequired: z.boolean(),
});

type DocumentFormErrors = Partial<Record<keyof z.infer<typeof documentSchema>, string>>;

type AddDocumentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: Document | null;
};

export function AddDocumentDialog({
  open,
  onOpenChange,
  document,
}: AddDocumentDialogProps) {
  const [name, setName] = useState("");
  const [isRequired, setIsRequired] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<DocumentFormErrors>({});

  const createMutation = useCreateDocument();
  const updateMutation = useUpdateDocument();
  const isEditMode = !!document;

  const resetForm = () => {
    setName(document?.name ?? "");
    setIsRequired(document?.isRequired ?? true);
    setIsActive(document?.isActive ?? true);
    setErrors({});
  };

  useEffect(() => {
    if (open) resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, document?.id]);

  const handleSave = async () => {
    const result = documentSchema.safeParse({
      name: name.trim(),
      isRequired,
    });

    if (!result.success) {
      const fieldErrors: DocumentFormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof DocumentFormErrors;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      if (document) {
        await updateMutation.mutateAsync({
          id: document.id,
          payload: { ...result.data, isActive },
        });
      } else {
        await createMutation.mutateAsync(result.data);
      }

      resetForm();
      onOpenChange(false);
    } catch {
      // Error toast handled by mutation hooks
    }
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !createMutation.isPending && !updateMutation.isPending) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const isBusy = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      title={isEditMode ? "Edit Document" : "Add New Document"}
      className="max-w-[380px]"
      contentClassName="px-[22px] pb-0 pt-[21px]"
      footerClassName="justify-center gap-3 border-t border-slate-100 py-4"
      footer={
        <>
          <Button onClick={handleSave} disabled={isBusy}>
            {isBusy
              ? "Saving..."
              : isEditMode
                ? "Update Document"
                : "Save Document"}
          </Button>

          <Button
            variant="outline"
            className="w-32"
            onClick={handleCancel}
            disabled={isBusy}
          >
            Cancel
          </Button>
        </>
      }
    >
      <div className="space-y-[18px]">
        <div>
          <Label htmlFor="document-name">Document Name</Label>
          <Input
            id="document-name"
            placeholder="e.g. Business License"
            className="h-9! rounded-md text-xs mt-0.5"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            errorMessage={errors.name}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-3">
          <div>
            <Label>Required Document</Label>
            <p className="mt-0.5 text-[8px] leading-3 text-slate-400">
              Providers must upload this document.
            </p>
          </div>

          <Switch
            checked={isRequired}
            onClick={() => setIsRequired((v) => !v)}
          />
        </div>

        {isEditMode && (
          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-3">
            <div>
              <Label>Active Status</Label>
              <p className="mt-0.5 text-[8px] leading-3 text-slate-400">
                Deactivated documents are hidden from providers.
              </p>
            </div>

            <Switch
              checked={isActive}
              onClick={() => setIsActive((v) => !v)}
            />
          </div>
        )}
      </div>
    </Dialog>
  );
}
