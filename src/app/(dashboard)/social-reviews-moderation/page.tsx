import type { Metadata } from "next";
import { SocialReviewsModerationPage } from "@/components/pages/social-reviews-moderation";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Social & Reviews Moderation | ${SITE_NAME}`,
  description: "Manage review moderation queues and review policy settings.",
};

export default function SocialReviewsModeration() {
  return (
      <SocialReviewsModerationPage />
  );
}
