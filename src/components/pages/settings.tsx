"use client";

import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react";
import { Camera, Cloud, CreditCard, Database, Loader2, Mail, Shield, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  emailSettings,
  firebaseServiceAccountSetting,
  paymentSettings,
  platformSettings,
  storageSettings,
} from "@/constants/settings";
import MyImage from "@/components/common/MyImage";
import PageHeader from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { useStorage } from "@/hooks/useStorage";
import type { UpdateSystemSettingsPayload } from "@/types/settings";
import { UPLOAD_FOLDERS } from "@/utils/file";
import SectionHeader from "../common/section-header";

type SettingsField = {
  id: string;
  label: string;
  type: string;
};

type SettingsIcon = React.ComponentType<{ className?: string; strokeWidth?: number }>;

type SettingsFormState = {
  platformInfo: {
    applicationName: string;
    supportEmail: string;
    platformLogoUrl: string;
  };
  payments: Record<string, string>;
  firebaseServiceAccountJson: string;
  storage: Record<string, string>;
  email: Record<string, string>;
};

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

const emptyForm: SettingsFormState = {
  platformInfo: {
    applicationName: platformSettings.appName,
    supportEmail: platformSettings.supportEmail,
    platformLogoUrl: "",
  },
  payments: {
    stripePublishableKey: "",
    stripeSecretKey: "",
    stripeWebhookSecret: "",
  },
  firebaseServiceAccountJson: "",
  storage: {
    awsS3BucketName: "",
    awsRegion: "",
    awsAccessKey: "",
    awsSecretKey: "",
  },
  email: {
    smtpHost: "",
    smtpPort: "",
    smtpUsername: "",
    smtpPassword: "",
    senderEmail: "",
    senderName: "",
  },
};

const isMaskedValue = (value: string) => /^\*+$/.test(value.trim());

const normalizeOptionalValue = (value: string) => {
  if (!value.trim()) return null;
  if (isMaskedValue(value)) return undefined;

  return value;
};

function SettingsFieldsCard({
  icon,
  title,
  fields,
  values,
  onChange,
}: {
  icon: SettingsIcon;
  title: string;
  fields: SettingsField[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
}) {
  return (
    <Card className="space-y-5">
      <SectionHeader icon={icon} title={title} />

      <CardContent className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              type={field.type}
              value={values[field.id] ?? ""}
              onChange={(event) => onChange(field.id, event.target.value)}
              placeholder={field.type === "password" ? "************" : field.label}
              className="h-10! rounded-2xl bg-white text-xs"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function PlatformLogoUpload({
  imageUrl,
  isUploading,
  isUploadDisabled,
  onClick,
  onRemove,
}: {
  imageUrl?: string;
  isUploading?: boolean;
  isUploadDisabled?: boolean;
  onClick: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-37.5 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 transition hover:border-primary/60 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isUploadDisabled || Boolean(imageUrl)}
        onClick={onClick}
      >
        {imageUrl ? (
          <MyImage
            src={imageUrl}
            alt="Platform logo"
            width={96}
            height={96}
            className="size-24 rounded-full object-cover"
          />
        ) : (
          <>
            <span className="flex size-12 items-center justify-center rounded-full bg-white text-primary shadow-sm">
              {isUploading ? (
                <Loader2 className="size-5 animate-spin" strokeWidth={2} />
              ) : (
                <Camera className="size-5" strokeWidth={2} />
              )}
            </span>
            <p className="text-xs font-medium text-slate-700">
              {isUploading ? "Uploading logo..." : "Upload Logo"}
            </p>
            <p className="text-[10px] text-slate-400">
              PNG, JPG, SVG, or WebP up to 5MB
            </p>
          </>
        )}
      </button>
      {imageUrl ? (
        <button
          type="button"
          aria-label="Remove platform logo"
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/95 text-rose-500 shadow-sm transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isUploadDisabled}
          onClick={onRemove}
        >
          <Trash2 className="size-4" strokeWidth={2.25} />
        </button>
      ) : null}
    </div>
  );
}

export function SettingsPage() {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [platformLogoUploadId, setPlatformLogoUploadId] = useState<string | null>(null);
  const [form, setForm] = useState<SettingsFormState>(emptyForm);
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const { upload, remove: deleteUpload, isUploading } = useStorage();

  useEffect(() => {
    if (!settings) return;

    setForm({
      platformInfo: {
        applicationName: settings.platformInfo.applicationName ?? "",
        supportEmail: settings.platformInfo.supportEmail ?? "",
        platformLogoUrl: settings.platformInfo.platformLogoUrl ?? "",
      },
      payments: {
        stripePublishableKey: settings.payments.stripePublishableKey ?? "",
        stripeSecretKey: settings.payments.stripeSecretKey ?? "",
        stripeWebhookSecret: settings.payments.stripeWebhookSecret ?? "",
      },
      firebaseServiceAccountJson: settings.firebase.firebaseServiceAccountJson ?? "",
      storage: {
        awsS3BucketName: settings.storage.awsS3BucketName ?? "",
        awsRegion: settings.storage.awsRegion ?? "",
        awsAccessKey: settings.storage.awsAccessKey ?? "",
        awsSecretKey: settings.storage.awsSecretKey ?? "",
      },
      email: {
        smtpHost: settings.email.smtpHost ?? "",
        smtpPort: settings.email.smtpPort?.toString() ?? "",
        smtpUsername: settings.email.smtpUsername ?? "",
        smtpPassword: settings.email.smtpPassword ?? "",
        senderEmail: settings.email.senderEmail ?? "",
        senderName: settings.email.senderName ?? "",
      },
    });
  }, [settings]);

  const updateFormSection = (
    section: "payments" | "storage" | "email",
    id: string,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [id]: value,
      },
    }));
  };

  const handleLogoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please upload PNG, JPG, SVG, or WebP images only.");
      return;
    }

    const result = await upload(file, UPLOAD_FOLDERS.PLATFORM_LOGOS);
    if (!result?.fileUrl) return;

    setPlatformLogoUploadId(result.uploadId);
    setForm((current) => ({
      ...current,
      platformInfo: {
        ...current.platformInfo,
        platformLogoUrl: result.fileUrl,
      },
    }));
  };

  const handleLogoRemove = async () => {
    if (platformLogoUploadId) {
      const deleted = await deleteUpload(platformLogoUploadId);
      if (!deleted) return;
      setPlatformLogoUploadId(null);
    }

    setForm((current) => ({
      ...current,
      platformInfo: {
        ...current.platformInfo,
        platformLogoUrl: "",
      },
    }));
  };

  const buildPayload = (): UpdateSystemSettingsPayload | null => {
    let firebaseServiceAccountJson: string | null | undefined = undefined;
    const firebaseValue = form.firebaseServiceAccountJson.trim();

    if (firebaseValue && !isMaskedValue(firebaseValue)) {
      try {
        JSON.parse(firebaseValue);
        firebaseServiceAccountJson = firebaseValue;
      } catch {
        toast.error("FIREBASE_SERVICE_ACCOUNT must be valid JSON.");
        return null;
      }
    } else if (!firebaseValue) {
      firebaseServiceAccountJson = null;
    }

    return {
      platformInfo: {
        applicationName: form.platformInfo.applicationName,
        supportEmail: form.platformInfo.supportEmail,
        platformLogoUrl: form.platformInfo.platformLogoUrl || null,
      },
      payments: {
        stripePublishableKey: normalizeOptionalValue(form.payments.stripePublishableKey),
        stripeSecretKey: normalizeOptionalValue(form.payments.stripeSecretKey),
        stripeWebhookSecret: normalizeOptionalValue(form.payments.stripeWebhookSecret),
      },
      firebase: {
        firebaseServiceAccountJson,
      },
      storage: {
        awsS3BucketName: normalizeOptionalValue(form.storage.awsS3BucketName),
        awsRegion: normalizeOptionalValue(form.storage.awsRegion),
        awsAccessKey: normalizeOptionalValue(form.storage.awsAccessKey),
        awsSecretKey: normalizeOptionalValue(form.storage.awsSecretKey),
      },
      email: {
        smtpHost: normalizeOptionalValue(form.email.smtpHost),
        smtpPort: form.email.smtpPort.trim() ? Number(form.email.smtpPort) : null,
        smtpUsername: normalizeOptionalValue(form.email.smtpUsername),
        smtpPassword: normalizeOptionalValue(form.email.smtpPassword),
        senderEmail: normalizeOptionalValue(form.email.senderEmail),
        senderName: normalizeOptionalValue(form.email.senderName),
      },
    };
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = buildPayload();
    if (!payload) return;

    updateSettings.mutate(payload);
  };

  const isSaving = updateSettings.isPending || isUploading;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <PageHeader
        title="System Settings"
        description="Configure global platform settings and system behavior"
      />

      <section className="grid gap-5 xl:grid-cols-2">
        <Card className="space-y-5">
          <SectionHeader icon={Shield} title="Platform Info" />

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="app-name" >
                Application Name
              </Label>
              <Input
                id="app-name"
                value={form.platformInfo.applicationName}
                disabled={isLoading}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    platformInfo: {
                      ...current.platformInfo,
                      applicationName: event.target.value,
                    },
                  }))
                }
                className="h-10! rounded-2xl bg-white text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-email" >
                Support Email
              </Label>
              <Input
                id="support-email"
                type="email"
                value={form.platformInfo.supportEmail}
                disabled={isLoading}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    platformInfo: {
                      ...current.platformInfo,
                      supportEmail: event.target.value,
                    },
                  }))
                }
                className="h-10! rounded-2xl bg-white text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label >
                Platform Logo
              </Label>
              <input
                ref={logoInputRef}
                type="file"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                className="hidden"
                onChange={handleLogoUpload}
              />
              <PlatformLogoUpload
                imageUrl={form.platformInfo.platformLogoUrl}
                isUploading={isUploading}
                isUploadDisabled={isSaving}
                onClick={() => logoInputRef.current?.click()}
                onRemove={handleLogoRemove}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="space-y-5">
          <SectionHeader icon={CreditCard} title="Payments" />

          <CardContent className="space-y-4">
            {paymentSettings.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  type={field.type}
                  value={form.payments[field.id] ?? ""}
                  disabled={isLoading}
                  onChange={(event) =>
                    updateFormSection("payments", field.id, event.target.value)
                  }
                  placeholder={field.type === "password" ? "************" : field.label}
                  className="h-10! rounded-2xl bg-white text-xs"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="space-y-5">
          <SectionHeader icon={Database} title="Firebase" />

          <CardContent className="space-y-2">
            <Label htmlFor={firebaseServiceAccountSetting.id}>
              {firebaseServiceAccountSetting.label}
            </Label>
            <Textarea
              id={firebaseServiceAccountSetting.id}
              value={form.firebaseServiceAccountJson}
              disabled={isLoading}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  firebaseServiceAccountJson: event.target.value,
                }))
              }
              placeholder={firebaseServiceAccountSetting.placeholder}
              className="min-h-48 bg-white font-mono text-xs"
            />
          </CardContent>
        </Card>

        <SettingsFieldsCard
          icon={Cloud}
          title="Storage"
          fields={storageSettings}
          values={form.storage}
          onChange={(id, value) => updateFormSection("storage", id, value)}
        />

        <SettingsFieldsCard
          icon={Mail}
          title="Email"
          fields={emailSettings}
          values={form.email}
          onChange={(id, value) => updateFormSection("email", id, value)}
        />
      </section>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="" disabled={isSaving}>
          Cancel Changes
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save System Settings"}
        </Button>
      </div>
    </form>
  );
}
