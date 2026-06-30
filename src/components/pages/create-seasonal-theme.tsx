"use client";

import { useRouter } from "next/navigation";
import { SeasonalThemeForm } from "@/components/pages/seasonal-theme-form";
import { useCreateSeasonalTheme } from "@/hooks/useThemes";
import type { CreateSeasonalThemePayload } from "@/types/themes";

export function CreateSeasonalThemePage() {
  const router = useRouter();
  const createTheme = useCreateSeasonalTheme();

  const handleSubmit = (payload: CreateSeasonalThemePayload) => {
    createTheme.mutate(payload, {
      onSuccess: () => router.push("/seasonal-themes"),
    });
  };

  return (
    <SeasonalThemeForm
      mode="create"
      saving={createTheme.isPending}
      onSubmit={handleSubmit}
    />
  );
}
