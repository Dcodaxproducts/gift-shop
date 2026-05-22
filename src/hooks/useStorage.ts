import { useState } from "react";
import { toast } from "sonner";
import {
  completeUpload,
  deleteUpload,
  getPresignedUrl,
  uploadFileToS3,
} from "@/services/storage";
import { generateFileName } from "@/utils/file";

interface UploadResult {
  fileUrl: string;
  key: string;
  uploadId: string;
}

interface UseStorageReturn {
  upload: (file: File, folder?: string) => Promise<UploadResult | null>;
  remove: (id: string) => Promise<boolean>;
  isUploading: boolean;
}

export const useStorage = (): UseStorageReturn => {
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (
    file: File,
    folder?: string,
  ): Promise<UploadResult | null> => {
    setIsUploading(true);

    try {
      // Step 1: Get presigned URL from your backend
      const { id, uploadUrl, fileUrl, objectKey } = await getPresignedUrl({
        fileName: generateFileName(file),
        contentType: file.type,
        folder,
      });

      await uploadFileToS3(uploadUrl, file);
      const completedUpload = await completeUpload({ uploadId: id });

      return {
        fileUrl: completedUpload.fileUrl || fileUrl,
        key: completedUpload.objectKey || objectKey,
        uploadId: id,
      };
    } catch {
      toast.error("Failed to upload image. Please try again.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteUpload(id);
      return true;
    } catch {
      toast.error("Failed to delete upload. Please try again.");
      return false;
    }
  };

  return { upload, remove, isUploading };
};
