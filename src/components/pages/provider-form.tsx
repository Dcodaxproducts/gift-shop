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
import SectionHeader from "../common/section-header";

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

      <Card>
        <CardContent className="p-0">
          <SectionHeader
            title="Provider Branding"
            description="Update the visual identity for your storefront."
          />
          <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div>
              <Label>
                Cover Image
              </Label>
              <CoverUpload />
            </div>
            <div>
              <Label>
                Company Logo
              </Label>
              <LogoUpload />
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="">
          <CardContent className="space-y-5 p-0">
            <SectionHeader
              icon={UserCircle2}
              title="Business Identity"
              description="Core registration details."
            />

            <div className="space-y-4">
              <div>
                <Label htmlFor="userName">User Name</Label>
                <Input
                  id="userName"
                  placeholder="Enter User Name"
                  value={values.userName}
                  onChange={(event) => updateField("userName", event.target.value)}
                />
              </div>
              <div>
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
              <div>
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  placeholder="Enter Contact Number"
                  value={values.contact}
                  onChange={(event) => updateField("contact", event.target.value)}
                />
              </div>
              <div>
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

        <Card className="">
          <CardContent className="space-y-5 p-0">
            <SectionHeader
              icon={IdCard}
              title="Contact Information"
              description="Public communication channels."
            />

            <div className="space-y-4">
              <div>
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
              <div>
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
              <div>
                <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                <Input
                  id="taxId"
                  placeholder="Enter Text"
                  value={values.taxId}
                  onChange={(event) => updateField("taxId", event.target.value)}
                />
              </div>
              <div >
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

      <Card className="">
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
              className="min-h-28 resize-none"
            />
            <p className="mt-2 text-right text-[10px] text-slate-400">
              {values.businessBio.length} / {BIO_MAX_LENGTH} characters
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-end justify-end gap-3">
          <Button variant="outline" onClick={onCancel} className="my-auto">
            Cancel
          </Button>
          <Button onClick={() => onSubmit?.(values)}>{submitLabel}</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function CoverUpload() {
  return (
    <button
      type="button"
      className="flex h-37.5 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 transition hover:border-primary/60"
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
      className="flex h-37.5 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 transition hover:border-primary/60"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-white text-primary shadow-sm">
        <Camera className="size-5" strokeWidth={2} />
      </span>
      <p className="text-xs font-medium text-slate-700">Upload Logo</p>
      <p className="text-[10px] text-slate-400">PNG, JPG up to 5MB</p>
    </button>
  );
}