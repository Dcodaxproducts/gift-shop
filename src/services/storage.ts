import { api } from "@/lib/axios";

interface PresignedUrlResponse {
  uploadUrl: string;
  fileUrl: string;
  key: string;
}

interface GetPresignedUrlPayload {
  fileName: string;
  contentType: string;
  folder?: string;
}

interface CompleteUploadPayload {
  key: string;
}

interface CompleteUploadResponse {
  fileUrl: string;
}

export const getPresignedUrl = async (
  payload: GetPresignedUrlPayload,
): Promise<PresignedUrlResponse> => {
  const { data } = await api.post("/uploads/presigned-url", payload);
  const body = data as { data: PresignedUrlResponse };

  return body.data;
};

export const uploadFileToS3 = async (
  uploadUrl: string,
  file: File,
): Promise<void> => {
  await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });
};

export const completeUpload = async (
  payload: CompleteUploadPayload,
): Promise<CompleteUploadResponse> => {
  const { data } = await api.post("/uploads/complete", payload);
  const body = data as { data: CompleteUploadResponse };

  return body.data;
};
