"use client";

import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Eye, EyeOff, FileText, IdCard, Loader2, Mail, UserCircle2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
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
import { useProviderBusinessCategories } from "@/hooks/useProviderBusinessCategories";
import { useCreateProvider, useProvider, useUpdateProvider } from "@/hooks/useProviders";
import { useStorage } from "@/hooks/useStorage";
import { cn } from "@/lib/utils";
import { UPLOAD_FOLDERS } from "@/utils/file";
import { providerSchema, type ProviderFormValues } from "@/validations/providers";
import SectionHeader from "../common/section-header";
import MyImage from "../common/MyImage";

export type ProviderFormMode = "create" | "edit";

const emptyValues: ProviderFormValues = {
  name: "",
  email: "",
  contact: "",
  password: "",
  businessName: "",
  businessCategoryId: "",
  taxId: "",
  businessAddress: "",
  businessBio: "",
  companyLogoUrl: "",
  coverImageUrl: "",
  location: {
    lat: undefined,
    lng: undefined,
  },
};

const BIO_MAX_LENGTH = 500;
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

type ProviderFormPageProps = {
  mode: ProviderFormMode;
  onCancel?: () => void;
};

export function ProviderFormPage({
  mode,
  onCancel,
}: ProviderFormPageProps) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const providerId = params?.id ?? "";
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const createProviderMutation = useCreateProvider();
  const updateProviderMutation = useUpdateProvider();

  const { upload, isUploading } = useStorage();
  const { data: provider, isLoading: isProviderLoading } = useProvider(mode === "edit" ? providerId : "");
  const { data: categories = [], isLoading: categoriesLoading } = useProviderBusinessCategories({
    limit: 100,
    isActive: true,
  });
  
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
    control,
  } = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (mode !== "edit" || !provider) return;

    reset({
      name: provider.name ?? provider.businessName ?? "",
      email: provider.email ?? "",
      contact: provider.contact ?? provider.phone ?? "",
      password: "",
      businessName: provider.businessName ?? "",
      businessCategoryId: provider.businessCategoryId ?? "",
      taxId: provider.taxId ?? "",
      businessAddress: provider.businessAddress ?? "",
      businessBio: provider.businessBio ?? "",
      companyLogoUrl: provider.companyLogoUrl ?? provider.avatarUrl ?? "",
      coverImageUrl: provider.coverImageUrl ?? "",
      location: {
        lat: provider.location?.lat ?? undefined,
        lng: provider.location?.lng ?? undefined,
      },
    });
  }, [mode, provider, reset]);

  const businessCategoryId = useWatch({ control, name: "businessCategoryId" });
  const businessBio = useWatch({ control, name: "businessBio" }) ?? "";
  const companyLogoUrl = useWatch({ control, name: "companyLogoUrl" }) ?? "";
  const coverImageUrl = useWatch({ control, name: "coverImageUrl" }) ?? "";

  const submitLabel = mode === "create" ? "Add New Provider" : "Save Changes";
  const pageTitle = mode === "create" ? "Add New Provider" : "Edit Provider";
  const isSaving = createProviderMutation.isPending || updateProviderMutation.isPending;
  const isBusy = isSaving || isUploading || isProviderLoading;

  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    field: "companyLogoUrl" | "coverImageUrl",
    folder: string,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please upload PNG, JPG, or WebP images only.");
      return;
    }

    const result = await upload(file, folder);

    if (result?.fileUrl) {
      setValue(field, result.fileUrl, { shouldDirty: true, shouldValidate: true });
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    router.push("/providers");
  };

  const handleBusinessLocationSelect = ({ lat, lng }: { lat: number; lng: number }) => {
    const locationText = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

    setValue("location.lat", lat, { shouldDirty: true, shouldValidate: true });
    setValue("location.lng", lng, { shouldDirty: true, shouldValidate: true });
    setValue("businessAddress", locationText, { shouldDirty: true, shouldValidate: true });
  };

  const handleBusinessAddressChange = (value: string) => {
    const match = value.match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);

    if (!match) return;

    setValue("location.lat", Number(match[1]), { shouldDirty: true, shouldValidate: true });
    setValue("location.lng", Number(match[2]), { shouldDirty: true, shouldValidate: true });
  };

  const onSubmit = (values: ProviderFormValues) => {
    const payload = {
      ...values,
      taxId: values.taxId || undefined,
      businessBio: values.businessBio || undefined,
      companyLogoUrl: values.companyLogoUrl || undefined,
      coverImageUrl: values.coverImageUrl || undefined,
      location:
        values.location?.lat === undefined && values.location?.lng === undefined
          ? undefined
          : values.location,
    };

    if (mode === "edit") {
      updateProviderMutation.mutate(
        { id: providerId, payload },
        { onSuccess: () => router.push(`/providers/${providerId}`) },
      );
      return;
    }

    createProviderMutation.mutate(payload, {
      onSuccess: () => router.push("/providers"),
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <PageHeader title={pageTitle} />

      <Card>
        <CardContent className="p-0">
          <SectionHeader
            title="Provider Branding"
            description="Update the visual identity for your storefront."
          />
          <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div>
              <Label>Cover Image</Label>
              <input
                ref={coverInputRef}
                type="file"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                className="hidden"
                onChange={(event) => handleImageUpload(event, "coverImageUrl", UPLOAD_FOLDERS.PROVIDER_COVERS)}
              />
              <CoverUpload
                imageUrl={coverImageUrl}
                isUploading={isUploading}
                onClick={() => coverInputRef.current?.click()}
              />
            </div>
            <div>
              <Label>Company Logo</Label>
              <input
                ref={logoInputRef}
                type="file"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                className="hidden"
                onChange={(event) => handleImageUpload(event, "companyLogoUrl", UPLOAD_FOLDERS.PROVIDER_LOGOS)}
              />
              <LogoUpload
                imageUrl={companyLogoUrl}
                isUploading={isUploading}
                onClick={() => logoInputRef.current?.click()}
              />
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
                <Input
                  id="name"
                  label="Name"
                  placeholder="Enter Name"
                  required
                  errorMessage={errors.name?.message}
                  {...register("name")}
                />
              </div>
              <div>
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="Enter Email Address"
                  leftIcon={<Mail className="size-4" />}
                  required
                  errorMessage={errors.email?.message}
                  {...register("email")}
                />
              </div>
              <div>
                <Input
                  id="contact"
                  label="Contact"
                  placeholder="Enter Contact Number"
                  required
                  errorMessage={errors.contact?.message}
                  {...register("contact")}
                />
              </div>
              <div>
                <Input
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  required
                  errorMessage={errors.password?.message}
                  rightIcon={
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="text-slate-400 transition hover:text-slate-700"
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  }
                  {...register("password")}
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
                <Input
                  id="businessName"
                  label="Business Name"
                  placeholder="Enter Business Name"
                  required
                  errorMessage={errors.businessName?.message}
                  {...register("businessName")}
                />
              </div>
              <div>
                <Label htmlFor="businessCategoryId">
                  Business Category<span className="ml-0.5 text-red-500">*</span>
                </Label>
                <Select
                  value={businessCategoryId || undefined}
                  onValueChange={(value) => setValue("businessCategoryId", value, { shouldDirty: true, shouldValidate: true })}
                >
                  <SelectTrigger
                    id="businessCategoryId"
                    className="h-12 w-full px-4"
                  >
                    <SelectValue placeholder={categoriesLoading ? "Loading categories..." : "Select Category"} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.businessCategoryId?.message && (
                  <p className="mt-1 px-1 text-xs font-medium leading-5 text-destructive">
                    {errors.businessCategoryId.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  id="taxId"
                  label="Tax ID / VAT Number"
                  placeholder="Enter Text"
                  errorMessage={errors.taxId?.message}
                  {...register("taxId")}
                />
              </div>
              <div>
                <Input
                  id="businessAddress"
                  label="Business Address"
                  type="location"
                  placeholder="Add Address"
                  required
                  errorMessage={errors.businessAddress?.message}
                  onLocationError={(message) => toast.error(message)}
                  onLocationSelect={handleBusinessLocationSelect}
                  {...register("businessAddress", {
                    onChange: (event) => handleBusinessAddressChange(event.target.value),
                  })}
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
              maxLength={BIO_MAX_LENGTH}
              placeholder="Tell customers about this business..."
              className="min-h-28 resize-none"
              errorMessage={errors.businessBio?.message}
              {...register("businessBio")}
            />
            <p className="mt-2 text-right text-[10px] text-slate-400">
              {businessBio.length} / {BIO_MAX_LENGTH} characters
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-end justify-end gap-3">
          <Button type="button" variant="outline" onClick={handleCancel} className="my-auto" disabled={isBusy}>
            Cancel
          </Button>
          <Button type="submit" disabled={isBusy}>
            {isSaving ? "Saving..." : submitLabel}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}

function CoverUpload({
  imageUrl,
  isUploading,
  onClick,
}: {
  imageUrl?: string;
  isUploading?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="flex h-37.5 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 transition hover:border-primary/60"
      onClick={onClick}
      disabled={isUploading}
    >
      {imageUrl ? (
        <MyImage src={imageUrl} alt="Provider cover" width={1200} height={480} className="h-full w-full object-cover" />
      ) : (
        <>
          <UploadIcon isUploading={isUploading} rounded="rounded-xl" />
          <p className="text-xs font-medium text-slate-700">
            Click to upload or drag cover photo
          </p>
          <p className="text-[10px] text-slate-400">
            Recommended size: 1200x480px
          </p>
        </>
      )}
    </button>
  );
}

function LogoUpload({
  imageUrl,
  isUploading,
  onClick,
}: {
  imageUrl?: string;
  isUploading?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="flex h-37.5 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 transition hover:border-primary/60"
      onClick={onClick}
      disabled={isUploading}
    >
      {imageUrl ? (
        <MyImage src={imageUrl} alt="Provider logo" width={96} height={96} className="size-24 rounded-full object-cover" />
      ) : (
        <>
          <UploadIcon isUploading={isUploading} rounded="rounded-full" large />
          <p className="text-xs font-medium text-slate-700">Upload Logo</p>
          <p className="text-[10px] text-slate-400">PNG, JPG up to 5MB</p>
        </>
      )}
    </button>
  );
}

function UploadIcon({
  isUploading,
  rounded,
  large,
}: {
  isUploading?: boolean;
  rounded: string;
  large?: boolean;
}) {
  const Icon = isUploading ? Loader2 : Camera;

  return (
    <span className={cn("flex items-center justify-center bg-white text-primary shadow-sm", rounded, large ? "size-12" : "size-10")}>
      <Icon className={cn("size-5", isUploading && "animate-spin")} strokeWidth={2} />
    </span>
  );
}
