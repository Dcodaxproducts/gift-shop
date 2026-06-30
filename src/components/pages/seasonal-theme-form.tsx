"use client";

import { useEffect, useState } from "react";
import { ImageIcon, Loader2, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/common/page-header";
import { S3ImageUploader } from "@/components/common/s3-image-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UPLOAD_FOLDERS } from "@/utils/file";
import type {
  CreateSeasonalThemePayload,
  SeasonalTheme,
} from "@/types/themes";

type SeasonalThemeFormProps = {
  defaultValues?: SeasonalTheme;
  mode: "create" | "edit";
  saving?: boolean;
  onSubmit: (payload: CreateSeasonalThemePayload) => void;
};

type FormErrors = Partial<Record<"name" | "imageUrl" | "startsAt" | "endsAt", string>>;

const toDateInput = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 10);
};

const toIsoDate = (value: string, boundary: "start" | "end") => {
  if (!value) return "";
  const time = boundary === "start" ? "T00:00:00" : "T23:59:59.999";
  const date = new Date(`${value}${time}`);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
};

export function SeasonalThemeForm({
  defaultValues,
  mode,
  saving = false,
  onSubmit,
}: SeasonalThemeFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!defaultValues) return;

    setName(defaultValues.name ?? "");
    setImageUrl(defaultValues.imageUrl ?? "");
    setStartsAt(toDateInput(defaultValues.startsAt));
    setEndsAt(toDateInput(defaultValues.endsAt));
    setIsActive(Boolean(defaultValues.isActive));
  }, [defaultValues]);

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const startIso = toIsoDate(startsAt, "start");
    const endIso = toIsoDate(endsAt, "end");
    const nextErrors: FormErrors = {};

    if (!trimmedName) nextErrors.name = "Theme name is required.";
    if (!imageUrl) nextErrors.imageUrl = "Mobile artwork is required.";
    if (!startsAt || !startIso) nextErrors.startsAt = "Start date is required.";
    if (!endsAt || !endIso) nextErrors.endsAt = "End date is required.";

    if (startIso && endIso && new Date(startIso).getTime() > new Date(endIso).getTime()) {
      nextErrors.endsAt = "End date must be the same as or after the start date.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({
      name: trimmedName,
      imageUrl,
      startsAt: startIso,
      endsAt: endIso,
      isActive,
    });
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title={mode === "create" ? "Create Seasonal Theme" : "Edit Seasonal Theme"}
        description="Upload a mobile-sized theme image and schedule when it should appear."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
        <Card>
          <CardContent className="space-y-6 p-0">
            <div className="flex items-start gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ImageIcon className="size-5" />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Theme Details</h2>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Keep the artwork vertical so it looks clean on mobile screens.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Input
                  id="theme-name"
                  label="Theme Name"
                  placeholder="e.g. Summer Gifts"
                  required
                  value={name}
                  errorMessage={errors.name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setErrors((current) => ({ ...current, name: undefined }));
                  }}
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <DatePicker
                  id="theme-starts-at"
                  label="Starts At"
                  required
                  value={startsAt}
                  errorMessage={errors.startsAt}
                  onChange={(value) => {
                    setStartsAt(value);
                    setErrors((current) => ({ ...current, startsAt: undefined }));
                  }}
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <DatePicker
                  id="theme-ends-at"
                  label="Ends At"
                  required
                  align="right"
                  value={endsAt}
                  errorMessage={errors.endsAt}
                  onChange={(value) => {
                    setEndsAt(value);
                    setErrors((current) => ({ ...current, endsAt: undefined }));
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div>
                <p className="text-xs font-semibold text-slate-800">Active Theme</p>
                <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                  Inactive themes stay saved but will not be shown.
                </p>
              </div>
              <Switch checked={isActive} onClick={() => setIsActive((current) => !current)} />
            </div>
          </CardContent>
        </Card>

        <Card className="p-5">
          <CardContent className="p-0">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Smartphone className="size-5" />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Mobile Artwork</h2>
                <p className="mt-1 text-[11px] text-slate-500">Recommended 1080 x 1920px.</p>
              </div>
            </div>

            <S3ImageUploader
              value={imageUrl}
              folder={UPLOAD_FOLDERS.SEASONAL_THEME_IMAGES}
              alt="Seasonal theme mobile artwork"
              label="Upload mobile theme"
              description="Vertical image, 9:16 ratio recommended"
              placeholderClassName="aspect-[9/16] min-h-100"
              errorMessage={errors.imageUrl}
              onChange={(url) => {
                setImageUrl(url);
                setErrors((current) => ({ ...current, imageUrl: undefined }));
              }}
              disabled={saving}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-3 p-0 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            className="h-10"
            disabled={saving}
            onClick={() => router.push("/seasonal-themes")}
          >
            Cancel
          </Button>
          <Button className="h-10" disabled={saving} onClick={handleSubmit}>
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving
              </>
            ) : mode === "create" ? (
              "Create Theme"
            ) : (
              "Update Theme"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
