import type { Metadata } from "next";
import { EditSeasonalThemePage } from "@/components/pages/edit-seasonal-theme";
import { SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Edit Seasonal Theme | ${SITE_NAME}`,
  description: "Edit seasonal theme artwork and schedule.",
};

export default function EditSeasonalTheme() {
  return (
      <EditSeasonalThemePage />
  );
}
