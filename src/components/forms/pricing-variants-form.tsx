"use client";

import { Plus, Tag, Trash2 } from "lucide-react";
import type {
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CreateGiftFormValues } from "@/validations/gifts";

type PricingVariantsFormProps = {
  errors: FieldErrors<CreateGiftFormValues>;
  fields: FieldArrayWithId<CreateGiftFormValues, "variants", "fieldId">[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  register: UseFormRegister<CreateGiftFormValues>;
};

export function PricingVariantsForm({
  errors,
  fields,
  onAdd,
  onRemove,
  register,
}: PricingVariantsFormProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Tag className="size-4" strokeWidth={2.25} />
            </span>
            <h2 className="text-sm font-semibold">Pricing & Variants</h2>
          </div>
          <span className="text-[10px] font-semibold text-primary">
            Multiple variants
          </span>
        </div>
        <div className="mt-5">
          <div className="space-y-3">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100">
                  <TableHead className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Variant Name
                  </TableHead>
                  {/* <TableHead className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    SKU/ID Code
                  </TableHead> */}
                  <TableHead className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Price ($)
                  </TableHead>
                  <TableHead className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.fieldId} className="border-slate-100">
                    <TableCell className="py-2.5">
                      <Input
                        placeholder="e.g. Solo Experience"
                        className="h-8 rounded-lg bg-slate-50 text-xs"
                        errorMessage={errors.variants?.[index]?.name?.message}
                        {...register(`variants.${index}.name`)}
                      />
                    </TableCell>
                    {/* <TableCell className="py-2.5">
                      <Input
                        placeholder="SPA-001-S"
                        className="h-8 rounded-lg bg-slate-50 text-xs font-mono"
                        errorMessage={errors.variants?.[index]?.sku?.message}
                        {...register(`variants.${index}.sku`)}
                      />
                    </TableCell> */}
                    <TableCell className="py-2.5">
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary">
                          $
                        </span>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          className="h-8 rounded-lg bg-slate-50 pl-6 text-xs font-semibold text-primary"
                          errorMessage={errors.variants?.[index]?.price?.message}
                          {...register(`variants.${index}.price`, { valueAsNumber: true })}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="py-2.5">
                      <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="flex size-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <button
              type="button"
              onClick={onAdd}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-primary transition hover:opacity-75"
            >
              <Plus className="size-3.5" />
              Add Another Variant
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
