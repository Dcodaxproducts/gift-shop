"use client";

import { useState } from "react";
import { CalendarCheck, CheckCircle2, Edit3, Gift, ListFilter, Search, Smile, Star, Trash2 } from "lucide-react";
import {
  giftCategoryOptions,
  giftInventoryItems,
  giftInventoryStats,
  giftPagination,
  giftProviderOptions,
  type GiftInventoryItem,
  type GiftStatus,
} from "@/constants/gifts";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableHead } from "@/components/ui/table";
import { getStatusClass } from "@/lib/status";
import { cn } from "@/lib/utils";

const statIconMap = {
  gifts: CalendarCheck,
  active: CheckCircle2,
  pending: Smile,
};

const statToneClass = {
  gifts: "bg-primary/10 text-primary",
  active: "bg-emerald-50 text-emerald-500",
  pending: "bg-amber-50 text-amber-500",
};

const imageToneClass = {
  green: "from-emerald-300 to-emerald-800",
  gray: "from-slate-100 to-slate-300",
  dark: "from-slate-700 to-slate-950",
  orange: "from-orange-200 to-orange-700",
};

function GiftStats() {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      {giftInventoryStats.map((stat) => {
        const Icon = statIconMap[stat.icon];

        return (
          <Card key={stat.title} className="rounded-2xl border border-border bg-white shadow-sm">
            <CardContent className="flex items-start justify-between p-5">
              <div>
                <p className="text-xs font-medium text-slate-500">{stat.title}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                  {stat.value}
                </p>
                <p
                  className={cn(
                    "mt-4 text-[10px] font-semibold",
                    stat.trend === "up" ? "text-emerald-500" : "text-red-500",
                  )}
                >
                  {stat.change}
                </p>
              </div>
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-2xl",
                  statToneClass[stat.icon],
                )}
              >
                <Icon className="size-4" strokeWidth={2.25} />
              </span>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}

function StatusBadge({ status }: { status: GiftStatus }) {
  return (
    <span
      className={getStatusClass(
        status,
        "inline-flex rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase",
      )}
    >
      {status}
    </span>
  );
}

export function GiftsPage() {
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Gift Inventory"
        description="Manage and monitor all gift listings across the platform."
        actions={
          <Button className="h-10 rounded-2xl px-4 text-xs">
            + Add New Gift
          </Button>
        }
      />

      <GiftStats />

      <Card className="rounded-2xl border border-border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="min-w-0 flex-1">
            <Input
              type="search"
              placeholder="Search gifts by name, ID, or provider..."
              leftIcon={<Search className="size-4" />}
              className="h-10! rounded-2xl text-xs"
            />
          </div>
          <div className="flex gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="h-10 w-[135px] rounded-2xl bg-slate-50 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {giftCategoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="h-10 w-[130px] rounded-2xl bg-slate-50 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {giftProviderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              type="button"
              aria-label="Open filters"
              className="flex size-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 transition hover:bg-primary/10 hover:text-primary"
            >
              <ListFilter className="size-4" strokeWidth={3} />
            </button>
          </div>
        </div>
      </Card>

      <DataTable
        data={giftInventoryItems}
        pagination={{ ...giftPagination, page, onPageChange: setPage }}
        headers={
            <>
              <TableHead>Gift Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </>
          }
          row={(item: GiftInventoryItem) => (
            <>
              <TableCell>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-sm",
                      imageToneClass[item.imageTone],
                    )}
                  >
                    <Gift className="size-4" />
                  </span>
                  <span className="max-w-[130px] text-xs font-semibold leading-4 text-slate-950">
                    {item.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-xs text-slate-600">{item.category}</TableCell>
              <TableCell className="text-xs text-slate-400">{item.provider}</TableCell>
              <TableCell className="text-xs font-semibold text-slate-950">{item.price}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  {item.rating}
                </span>
              </TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-primary"
                  >
                    <Edit3 className="size-4" />
                  </button>
                  <button
                    type="button"
                    className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </TableCell>
            </>
          )}
      />
    </div>
  );
}
