// utils/file.ts
import { v4 as uuidv4 } from "uuid";

const MIME_TO_EXT: Record<string, string> = {
  "image/png": "png",
  "image/svg+xml": "svg",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf",
};

export const getFileExtension = (file: File): string => {
  return MIME_TO_EXT[file.type] ?? file.name.split(".").pop() ?? "bin";
};

export const generateFileName = (file: File): string => {
  return `${uuidv4()}.${getFileExtension(file)}`;
};

export const UPLOAD_FOLDERS = {
  GIFT_CATEGORY_IMAGES: "gift-category-images",
  GIFT_IMAGES: "gift-images",
  PROVIDER_LOGOS: "provider-logos",
  PROVIDER_AVATARS: "provider-avatars",
  PROVIDER_ITEM_IMAGES: "provider-item-images",
  USER_AVATARS: "user-avatars",
  ADMIN_AVATARS: "admin-avatars",
  BROADCAST_IMAGES: "broadcast-images",
  CHAT_ATTACHMENTS: "chat-attachments",
  GIFT_MESSAGE_MEDIA: "gift-message-media",
  CUSTOMER_CONTACT_AVATARS: "customer-contact-avatars",
  PROVIDER_DOCUMENTS: "provider-documents",
  PROVIDER_SUPPORT_ATTACHMENTS: "provider-support-attachments",
} as const;

export type UploadFolder = (typeof UPLOAD_FOLDERS)[keyof typeof UPLOAD_FOLDERS];