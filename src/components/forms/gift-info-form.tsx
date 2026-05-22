"use client";

import { Info } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
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
import type { GiftCategory } from "@/types/gift-categories";
import type { CreateGiftFormValues } from "@/validations/gifts";
import { Textarea } from "../ui/textarea";

type GiftInfoFormProps = {
  categories: GiftCategory[];
  categoriesLoading: boolean;
  categoryId: string;
  errors: FieldErrors<CreateGiftFormValues>;
  onCategoryChange: (value: string) => void;
  register: UseFormRegister<CreateGiftFormValues>;
};

export function GiftInfoForm({
  categories,
  categoriesLoading,
  categoryId,
  errors,
  onCategoryChange,
  register,
}: GiftInfoFormProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Info className="size-4" strokeWidth={2.25} />
            </span>
            <h2 className="text-sm font-semibold">Gift Information</h2>
          </div>
        </div>
        <div className="mt-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gift-name">Gift Name</Label>
              <Input
                id="gift-name"
                placeholder="e.g. Premium Spa Day Voucher"
                errorMessage={errors.name?.message}
                {...register("name")}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={categoryId} onValueChange={onCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder={categoriesLoading ? "Loading categories..." : "Select category"} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId?.message ? (
                <p className="px-1 text-xs font-medium leading-5 text-destructive">{errors.categoryId.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gift-price">Price ($)</Label>
              <div className="relative">
                <Input
                  id="gift-price"
                  type="number"
                  min="1"
                  placeholder="0"
                  errorMessage={errors.price?.message}
                  {...register("price", { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gift-description">Description</Label>
              <Textarea
                id="gift-description"
                placeholder="Describe the gift experience in detail..."
                aria-invalid={errors.description ? true : undefined}
                {...register("description")}
              />
              {errors.description?.message ? (
                <p className="px-1 text-xs font-medium leading-5 text-destructive">{errors.description.message}</p>
              ) : null}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
