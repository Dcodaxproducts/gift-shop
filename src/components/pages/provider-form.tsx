"use client";

import { useState } from "react";
import { Camera, FileText, IdCard, Mail, UserCircle2 } from "lucide-react";
import PageHeader from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export type ProviderFormMode = "create" | "edit";

export type ProviderFormValues = {
  userName: string;
  email: string;
  contact: string;
  password: string;
  businessName: string;
  businessCategory: string;
  taxId: string;
  businessAddress: string;
  businessBio: string;
};

const emptyValues: ProviderFormValues = {
  userName: "",
  email: "",
  contact: "",
  password: "",
  businessName: "",
  businessCategory: "",
  taxId: "",
  businessAddress: "",
  businessBio: "",
};

const BIO_MAX_LENGTH = 500;

type SectionHeaderProps = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
};

function SectionHeader({ icon: Icon, title, description }: SectionHeaderProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" strokeWidth={2.25} />
      </span>
      <div>
        <h2 className="text-sm font-semibold ">{title}</h2>
        <p className="mt-0.5 text-[11px] text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function CoverUpload() {
  return (
    <button
      type="button"
      className="flex h-[150px] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 transition hover:border-primary/60"
    >
      <span className="flex size-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
        <Camera className="size-5" strokeWidth={2} />
      </span>
      <p className="text-xs font-medium text-slate-700">
        Click to upload or drag cover photo
      </p>
      <p className="text-[10px] text-slate-400">
        Recommended size: 1200x480px
      </p>
    </button>
  );
}

function LogoUpload() {
  return (
    <button
      type="button"
      className="flex h-[150px] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 transition hover:border-primary/60"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-white text-primary shadow-sm">
        <Camera className="size-5" strokeWidth={2} />
      </span>
      <p className="text-xs font-medium text-slate-700">Upload Logo</p>
      <p className="text-[10px] text-slate-400">PNG, JPG up to 5MB</p>
    </button>
  );
}

type ProviderFormPageProps = {
  mode: ProviderFormMode;
  defaultValues?: Partial<ProviderFormValues>;
  onCancel?: () => void;
  onSubmit?: (values: ProviderFormValues) => void;
};

export function ProviderFormPage({
  mode,
  defaultValues,
  onCancel,
  onSubmit,
}: ProviderFormPageProps) {
  const [values, setValues] = useState<ProviderFormValues>({
    ...emptyValues,
    ...defaultValues,
  });

  const updateField = <Key extends keyof ProviderFormValues>(
    key: Key,
    value: ProviderFormValues[Key],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const submitLabel = mode === "create" ? "Add New Provider" : "Save Changes";
  const pageTitle = mode === "create" ? "Add New Provider" : "Edit Provider";

  return (
    <div className="space-y-5">
      <PageHeader title={pageTitle} />

      <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <CardContent className="p-0">
          <div>
            <h2 className="text-sm font-semibold ">
              Provider Branding
            </h2>
            <p className="mt-1 text-[11px] text-slate-400">
              Update the visual identity for your storefront.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div>
              <Label className="mb-2 block text-xs font-medium text-slate-700">
                Cover Image
              </Label>
              <CoverUpload />
            </div>
            <div>
              <Label className="mb-2 block text-xs font-medium text-slate-700">
                Company Logo
              </Label>
              <LogoUpload />
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <CardContent className="space-y-5 p-0">
            <SectionHeader
              icon={UserCircle2}
              title="Business Identity"
              description="Core registration details."
            />

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="userName">User Name</Label>
                <Input
                  id="userName"
                  placeholder="Enter User Name"
                  value={values.userName}
                  onChange={(event) => updateField("userName", event.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email Address"
                  leftIcon={<Mail className="size-4" />}
                  value={values.email}
                  onChange={(event) => updateField("email", event.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  placeholder="Enter Contact Number"
                  value={values.contact}
                  onChange={(event) => updateField("contact", event.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={values.password}
                  onChange={(event) => updateField("password", event.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <CardContent className="space-y-5 p-0">
            <SectionHeader
              icon={IdCard}
              title="Contact Information"
              description="Public communication channels."
            />

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  placeholder="Enter Business Name"
                  value={values.businessName}
                  onChange={(event) =>
                    updateField("businessName", event.target.value)
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="businessCategory">Business Category</Label>
                <Select
                  value={values.businessCategory || undefined}
                  onValueChange={(value) => updateField("businessCategory", value)}
                >
                  <SelectTrigger
                    id="businessCategory"
                    className="h-12 w-full px-4"
                  >
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gift">Gift</SelectItem>
                    <SelectItem value="Floral">Floral</SelectItem>
                    <SelectItem value="Bakery">Bakery</SelectItem>
                    <SelectItem value="Stationery">Stationery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                <Input
                  id="taxId"
                  placeholder="Enter Text"
                  value={values.taxId}
                  onChange={(event) => updateField("taxId", event.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="businessAddress">Business Address</Label>
                <Input
                  id="businessAddress"
                  placeholder="Add Address"
                  value={values.businessAddress}
                  onChange={(event) =>
                    updateField("businessAddress", event.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <CardContent className="space-y-5 p-0">
          <SectionHeader
            icon={FileText}
            title="Business Bio"
            description="Short summary for customer-facing pages."
          />

          <div>
            <Textarea
              value={values.businessBio}
              maxLength={BIO_MAX_LENGTH}
              onChange={(event) => updateField("businessBio", event.target.value)}
              placeholder="Tell customers about this business..."
              className="min-h-[112px] resize-none"
            />
            <p className="mt-2 text-right text-[10px] text-slate-400">
              {values.businessBio.length} / {BIO_MAX_LENGTH} characters
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <CardContent className="flex items-center justify-end gap-3 p-0">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSubmit?.(values)}>{submitLabel}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
