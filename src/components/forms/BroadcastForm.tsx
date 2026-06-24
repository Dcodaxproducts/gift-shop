"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { audienceOptions, notificationIcons } from "@/constants/broadcast";
import { useBroadcast } from "@/hooks/useBroadcast";
import { cn } from "@/lib/utils";
import type { BroadcastAudience, CreateBroadcastPayload } from "@/types/broadcast";
import {
  broadcastSchema,
  type BroadcastFormValues,
} from "@/validations/broadcast";

type BroadcastFormProps = {
  onSent: () => void;
};

export function BroadcastForm({ onSent }: BroadcastFormProps) {
  const broadcast = useBroadcast();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<BroadcastFormValues>({
    resolver: zodResolver(broadcastSchema),
    defaultValues: { title: "", message: "", audience: "ALL_USERS" },
  });

  const [audience, setAudience] = useState<BroadcastAudience>("ALL_USERS");
  const UsersIcon = notificationIcons.users;

  const submitBroadcast = (values: BroadcastFormValues) => {
    const payload: CreateBroadcastPayload = {
      title: values.title,
      message: values.message,
      audience: values.audience,
    };

    broadcast.mutate(payload, { onSuccess: onSent });
  };

  return (
    <form onSubmit={handleSubmit(submitBroadcast)}>
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold">Notification Content</h2>
          <div className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="notification-title">Notification Title</Label>
              <Input
                id="notification-title"
                placeholder="e.g., Maintenance Notice"
                className="h-12! rounded-xl bg-primary/5 text-xs"
                errorMessage={errors.title?.message}
                {...register("title")}
              />
              {!errors.title ? (
                <p className="text-[10px] font-medium text-slate-400">Limit to 50 characters for optimal display.</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message-body">Message Body</Label>
              <Textarea
                id="message-body"
                placeholder="Type your message here..."
                className="min-h-35 w-full resize-none rounded-xl border border-transparent bg-primary/5 px-4 py-3 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                errorMessage={errors.message?.message}
                {...register("message")}
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <UsersIcon className="size-4" strokeWidth={2.5} />
              </span>
              <h2 className="text-sm font-semibold">Select Audience</h2>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {audienceOptions.map((option) => {
                const Icon = option.icon;

                return (
                  <button
                    key={option.title}
                    type="button"
                    onClick={() => {
                      setAudience(option.value);
                      setValue("audience", option.value, { shouldValidate: true });
                    }}
                    className={cn(
                      "relative rounded-2xl border p-4 text-left transition hover:border-primary hover:bg-primary/5",
                      audience === option.value ? "border-primary bg-primary/5" : "border-slate-200 bg-slate-50",
                    )}
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-4" strokeWidth={2.5} />
                    </span>
                    <span className="mt-3 block text-xs font-semibold">{option.title}</span>
                    <span className="mt-1 block text-[10px] font-medium leading-4 text-slate-500">{option.description}</span>
                    <span className={cn("absolute right-4 top-4 size-4 rounded-full border", audience === option.value ? "border-primary bg-primary" : "border-slate-300")}>
                      {audience === option.value ? <Check className="size-3 text-white" strokeWidth={3} /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.audience ? (
              <p className="mt-2 text-[10px] font-medium text-red-500">{errors.audience.message}</p>
            ) : null}
          </div>

          <div className="mt-9 flex items-center justify-end">
            <Button type="submit" disabled={broadcast.isPending}>
              {broadcast.isPending ? "Sending..." : "Send Broadcast"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
