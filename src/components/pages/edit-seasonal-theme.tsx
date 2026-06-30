"use client";

import { useParams, useRouter } from "next/navigation";
import { ErrorMessage } from "@/components/common/error-message";
import { SeasonalThemeForm } from "@/components/pages/seasonal-theme-form";
import { useSeasonalTheme, useUpdateSeasonalTheme } from "@/hooks/useThemes";
import type { CreateSeasonalThemePayload } from "@/types/themes";

export function EditSeasonalThemePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const themeId = params?.id ?? "";
  const { data: theme, isError, refetch } = useSeasonalTheme(themeId);
  const updateTheme = useUpdateSeasonalTheme();

  const handleSubmit = (payload: CreateSeasonalThemePayload) => {
    if (!themeId) return;

    updateTheme.mutate(
      { id: themeId, payload },
      { onSuccess: () => router.push("/seasonal-themes") },
    );
  };

  if (isError) {
    return (
      <ErrorMessage
        message="Seasonal theme not found."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <SeasonalThemeForm
      defaultValues={theme}
      mode="edit"
      saving={updateTheme.isPending}
      onSubmit={handleSubmit}
    />
  );
}
