import { useState } from "react";
import { toast } from "sonner";
import {
  getPresignedUrl,
  uploadFileToS3,
} from "@/services/storage";
import { generateFileName } from "@/utils/file";

interface UploadResult {
  fileUrl: string;
  key: string;
}

interface UseStorageReturn {
  upload: (file: File, folder?: string) => Promise<UploadResult | null>;
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
      const { uploadUrl, key } = await getPresignedUrl({
        fileName: generateFileName(file),
        contentType: file.type,
        folder,
      });

      await uploadFileToS3(uploadUrl, file);

      return { fileUrl: uploadUrl, key };
    } catch {
      toast.error("Failed to upload image. Please try again.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading };
};
