"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Edit2, ImageIcon, Plus, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/common/page-header";
import MyImage from "@/components/common/MyImage";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useDeleteSeasonalTheme, useSeasonalThemes } from "@/hooks/useThemes";
import { cn } from "@/lib/utils";
import type { SeasonalTheme } from "@/types/themes";
import { formatDate } from "@/utils/formatDate";

function getThemeState(theme: SeasonalTheme) {
  const now = Date.now();
  const startsAt = new Date(theme.startsAt).getTime();
  const endsAt = new Date(theme.endsAt).getTime();

  if (!theme.isActive) {
    return { label: "Inactive", className: "bg-slate-100 text-slate-500" };
  }
  if (Number.isFinite(startsAt) && now < startsAt) {
    return { label: "Scheduled", className: "bg-amber-50 text-amber-600" };
  }
  if (Number.isFinite(endsAt) && now > endsAt) {
    return { label: "Expired", className: "bg-rose-50 text-rose-600" };
  }

  return { label: "Live", className: "bg-emerald-50 text-emerald-600" };
}

function ThemeCard({
  theme,
  onDelete,
  onEdit,
}: {
  theme: SeasonalTheme;
  onDelete: (theme: SeasonalTheme) => void;
  onEdit: (theme: SeasonalTheme) => void;
}) {
  const state = getThemeState(theme);

  return (
    <Card className="overflow-hidden p-0 transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-0">
        <div className="relative aspect-4/5 overflow-hidden bg-slate-100">
          <MyImage
            src={theme.imageUrl}
            alt={theme.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
          <span className={cn("absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-sm", state.className)}>
            {state.label}
          </span>
        </div>

        <div className="space-y-4 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-slate-900 capitalize">{theme.name}</h2>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <Button
                variant="ghost"
                aria-label={`Edit ${theme.name}`}
                className="size-8 rounded-full p-0 text-slate-400 hover:bg-primary/10 hover:text-primary"
                onClick={() => onEdit(theme)}
              >
                <Edit2 className="size-4" />
              </Button>
              <Button
                variant="ghost"
                aria-label={`Delete ${theme.name}`}
                className="size-8 rounded-full p-0 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                onClick={() => onDelete(theme)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
            <div>
              <p className="text-[10px] font-semibold uppercase text-slate-400">Starts</p>
              <p className="mt-1 truncate text-xs font-semibold text-slate-700">{formatDate(theme.startsAt)}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase text-slate-400">Ends</p>
              <p className="mt-1 truncate text-xs font-semibold text-slate-700">{formatDate(theme.endsAt)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ThemeCardSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="p-0">
        <div className="aspect-4/5 animate-pulse bg-slate-100" />
        <div className="space-y-4 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded-full bg-slate-100" />
              <div className="h-3 w-24 animate-pulse rounded-full bg-slate-100" />
            </div>
            <div className="h-8 w-16 animate-pulse rounded-full bg-slate-100" />
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
            <div className="h-9 animate-pulse rounded-lg bg-slate-100" />
            <div className="h-9 animate-pulse rounded-lg bg-slate-100" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SeasonalThemesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<SeasonalTheme | null>(null);
  const debouncedSearch = useDebounce(search, 400);
  const { data: themes = [], isLoading } = useSeasonalThemes({
    limit: 20,
    search: debouncedSearch || undefined,
  });
  const { mutate: deleteTheme, isPending: isDeleting } = useDeleteSeasonalTheme();

  const stats = useMemo(() => {
    return themes.reduce(
      (acc, theme) => {
        const state = getThemeState(theme).label;
        acc.total += 1;
        if (state === "Live") acc.live += 1;
        if (state === "Scheduled") acc.scheduled += 1;
        return acc;
      },
      { total: 0, live: 0, scheduled: 0 },
    );
  }, [themes]);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Seasonal Themes"
        description="Manage mobile seasonal artwork for gifting campaigns."
        actions={
          <Button onClick={() => router.push("/seasonal-themes/create")}>
            <Plus className="size-3.5" />
            Add Theme
          </Button>
        }
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete Seasonal Theme"
        description="Are you sure you want to delete this seasonal theme? This action cannot be undone."
        confirmLabel="Delete"
        loading={isDeleting}
        onConfirm={() => {
          if (!deleteTarget) return;

          deleteTheme(deleteTarget.id, {
            onSuccess: () => setDeleteTarget(null),
          });
        }}
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <CardContent className="flex items-center gap-3 p-0">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ImageIcon className="size-5" />
            </span>
            <div>
              <p className="text-xl font-semibold text-slate-900">{stats.total}</p>
              <p className="text-[11px] font-medium text-slate-400">Total themes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardContent className="flex items-center gap-3 p-0">
            <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CalendarDays className="size-5" />
            </span>
            <div>
              <p className="text-xl font-semibold text-slate-900">{stats.live}</p>
              <p className="text-[11px] font-medium text-slate-400">Live now</p>
            </div>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardContent className="flex items-center gap-3 p-0">
            <span className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <CalendarDays className="size-5" />
            </span>
            <div>
              <p className="text-xl font-semibold text-slate-900">{stats.scheduled}</p>
              <p className="text-[11px] font-medium text-slate-400">Scheduled</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Theme Library</p>
          <p className="mt-1 text-xs text-slate-500">Artwork is shown in a mobile 9:16 preview.</p>
        </div>
        <Input
          type="search"
          placeholder="Search themes..."
          leftIcon={<Search className="size-4" />}
          className="h-10! rounded-2xl bg-white text-xs"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <ThemeCardSkeleton key={`seasonal-theme-skeleton-${index}`} />
          ))
        ) : themes.length > 0 ? (
          themes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              onEdit={(item) => router.push(`/seasonal-themes/${item.id}`)}
              onDelete={setDeleteTarget}
            />
          ))
        ) : (
          <div className="xl:col-span-2 rounded-2xl border border-border bg-white py-20 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-700">No seasonal themes found.</p>
            <p className="mt-1 text-xs text-slate-400">Create one to start scheduling mobile artwork.</p>
          </div>
        )}
      </section>
    </div>
  );
}
