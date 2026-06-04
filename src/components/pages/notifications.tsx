"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock3, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  audienceOptions,
  audienceRoles,
  broadcastSteps,
  campaignSummary,
  channelMetrics,
  deliverySummary,
  finalPreviewDetails,
  notificationIcons,
  type BroadcastStepId,
} from "@/constants/notifications";
import { cn } from "@/lib/utils";
import PageHeader from "../common/page-header";

type FlowStep = BroadcastStepId;

type SelectableCardProps = {
  active?: boolean;
  icon: React.ElementType;
  title: string;
  description: string;
};

function BroadcastShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-295 space-y-8">
      <PageHeader
        title="Create New Broadcast"
        className="sm:justify-center"
      />
      {children}
    </div>
  );
}

function Stepper({ activeStep, completed = false }: { activeStep: FlowStep; completed?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      {broadcastSteps.map((step, index) => {
        const isActive = step.id === activeStep;
        const isDone = completed || step.id < activeStep;

        return (
          <div key={step.id} className="flex items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full text-sm font-semibold transition",
                  isActive || isDone ? "bg-primary text-white" : "bg-slate-100 text-slate-300",
                )}
              >
                {step.id}
              </span>
              <span className={cn("text-xs font-semibold", isActive || isDone ? "text-primary" : "text-slate-400")}>
                {step.label}
              </span>
            </div>
            {index < broadcastSteps.length - 1 ? (
              <span className={cn("hidden h-0.5 w-16 sm:block", step.id < activeStep || completed ? "bg-primary" : "bg-slate-200")} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function FormCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Card className={cn("rounded-2xl border border-slate-200 bg-white shadow-sm", className)}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function SectionHeading({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-4" strokeWidth={2.5} />
      </span>
      <h2 className="text-sm font-semibold ">{title}</h2>
    </div>
  );
}

function SelectableCard({ active, icon: Icon, title, description }: SelectableCardProps) {
  return (
    <button
      type="button"
      className={cn(
        "relative rounded-2xl border p-4 text-left transition hover:border-primary hover:bg-primary/5",
        active ? "border-primary bg-primary/5" : "border-slate-200 bg-slate-50",
      )}
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-4" strokeWidth={2.5} />
      </span>
      <span className="mt-3 block text-xs font-semibold ">{title}</span>
      <span className="mt-1 block text-[10px] font-medium leading-4 text-slate-500">{description}</span>
      <span className={cn("absolute right-4 top-4 size-4 rounded-full border", active ? "border-primary bg-primary" : "border-slate-300")}>
        {active ? <Check className="size-3 text-white" strokeWidth={3} /> : null}
      </span>
    </button>
  );
}

function ActionTile({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button
      type="button"
      className="flex h-26.25 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
    >
      <Icon className="size-5 text-slate-400" strokeWidth={2.4} />
      {label}
    </button>
  );
}

function MobilePreview() {
  const PhoneIcon = notificationIcons.phone;
  const DesktopIcon = notificationIcons.desktop;
  const MegaphoneIcon = notificationIcons.megaphone;

  return (
    <FormCard className="bg-primary/5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold ">Live Preview</h2>
        <div className="flex items-center gap-3">
          <PhoneIcon className="size-5 text-primary" />
          <DesktopIcon className="size-5 text-slate-300" />
        </div>
      </div>
      <div className="mt-7 flex justify-center">
        <div className="relative w-61.25 overflow-hidden rounded-[2.5rem] border-8 border-slate-900 shadow-2xl">
          <Image
            src="/mobile.png"
            alt="Mobile notification preview"
            width={490}
            height={640}
            priority
            className="block w-full"
          />
          <div className="absolute left-3 right-3 top-20 rounded-xl bg-white/95 p-3 shadow-xl">
            <div className="flex items-start gap-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-white">
                <MegaphoneIcon className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[8px] font-semibold uppercase tracking-wide text-slate-500">
                    Broadcast Engine
                  </p>
                  <span className="text-[8px] font-medium text-slate-400">Now</span>
                </div>
                <p className="mt-1 text-[10px] font-semibold ">
                  Maintenance Notice
                </p>
                <p className="mt-0.5 line-clamp-2 text-[8px] font-medium leading-3 text-slate-500">
                  The system will be undergoing scheduled maintenance this Sunday between 2:00...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-5 text-center text-[10px] font-medium text-slate-500">Preview updates in real-time as you type</p>
    </FormCard>
  );
}

function ContentStep({ onNext }: { onNext: () => void }) {
  const ImageIcon = notificationIcons.image;
  const LinkIcon = notificationIcons.link;

  return (
    <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_400px]">
      <FormCard>
        <h2 className="text-lg font-semibold ">Notification Content</h2>
        <div className="mt-6 space-y-5">
          <div className="space-y-2">
            <label htmlFor="notification-title" className="text-xs font-semibold text-slate-700">Notification Title</label>
            <Input id="notification-title" placeholder="e.g., Maintenance Notice" className="h-12! rounded-xl bg-primary/5 text-xs" />
            <p className="text-[10px] font-medium text-slate-400">Limit to 50 characters for optimal display.</p>
          </div>
          <div className="space-y-2">
            <label htmlFor="message-body" className="text-xs font-semibold text-slate-700">Message Body</label>
            <textarea
              id="message-body"
              placeholder="Type your message here..."
              className="min-h-35 w-full resize-none rounded-xl border border-transparent bg-primary/5 px-4 py-3 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ActionTile icon={ImageIcon} label="Upload Image" />
            <ActionTile icon={LinkIcon} label="Add CTA Link" />
          </div>
        </div>
        <div className="mt-9 flex items-center justify-between">
          <Button variant="ghost" className="text-slate-700 hover:">Save Draft</Button>
          <Button onClick={onNext}>
            Next: Targeting
          </Button>
        </div>
      </FormCard>
      <MobilePreview />
    </div>
  );
}

function EstimatedReachCard() {
  return (
    <Card className="overflow-hidden rounded-2xl border-0 bg-linear-to-br from-primary to-primary/70 text-white shadow-lg shadow-primary/20">
      <CardContent className="p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Estimated Reach</p>
        <p className="mt-5 text-[42px] font-semibold leading-none tracking-tight">124,430</p>
        <p className="mt-2 text-xs font-medium text-white/65">Qualified recipients found</p>
        <div className="mt-9 space-y-5">
          {channelMetrics.map((metric) => (
            <div key={metric.label} className="flex items-center justify-between text-xs font-semibold">
              <span className="text-white/50">{metric.label}</span>
              <span>{metric.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white/10 p-4">
          <span className="flex size-10 items-center justify-center rounded-full bg-white/10">
            <Sparkles className="size-5" />
          </span>
          <p className="text-[11px] font-medium leading-4 text-white/70">This selection is +12% higher than your last broadcast.</p>
        </div>
      </CardContent>
    </Card>
  );
}

function TargetingStep({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_350px]">
      <FormCard>
        <SectionHeading icon={UsersRoundIcon} title="Select Audience" />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {audienceOptions.map((option, index) => (
            <SelectableCard key={option.title} active={index === 0} {...option} />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-5">
          {audienceRoles.map((role, index) => (
            <label key={role} className="flex items-center gap-2 text-xs font-medium text-slate-700">
              <span className={cn("flex size-4 items-center justify-center rounded border", index < 2 ? "border-primary bg-primary" : "border-slate-300 bg-white")}>
                {index < 2 ? <Check className="size-3 text-white" strokeWidth={3} /> : null}
              </span>
              {role}
            </label>
          ))}
        </div>
        <div className="mt-8 rounded-2xl bg-primary/5 p-6">
          <h3 className="text-base font-semibold text-primary">Targeting Filters</h3>
          <div className="mt-6 max-w-70 space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Location</p>
            <button type="button" className="flex h-10 w-full items-center justify-between rounded-xl bg-white px-4 text-xs font-medium text-slate-500">
              All Countries
              <span className="text-slate-300">⌄</span>
            </button>
          </div>
        </div>
        <StepFooter onBack={onBack} nextLabel="Next: Schedule" onNext={onNext} />
      </FormCard>
      <div className="space-y-5">
        <EstimatedReachCard />
        <FormCard className="bg-primary/5">
          <h3 className="text-sm font-semibold ">Targeting Logic</h3>
          <ul className="mt-4 space-y-3 text-[11px] font-medium text-slate-500">
            <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-primary" /> Excluding unsubscribed users</li>
            <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-primary" /> Only verified email addresses</li>
          </ul>
        </FormCard>
      </div>
    </div>
  );
}

function UsersRoundIcon(props: React.ComponentProps<typeof notificationIcons.users>) {
  const Icon = notificationIcons.users;
  return <Icon {...props} />;
}

function ScheduleOption({ active, icon: Icon, title, description }: SelectableCardProps) {
  return <SelectableCard active={active} icon={Icon} title={title} description={description} />;
}

function FinalSummary() {
  return (
    <FormCard className="bg-primary/5">
      <h2 className="text-sm font-semibold ">Final Summary</h2>
      <div className="mt-5 rounded-2xl bg-white p-4">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">Content Preview</p>
        <div className="mt-3 h-30 rounded-xl bg-linear-to-br from-primary/20 via-primary/10 to-primary" />
        <h3 className="mt-3 text-xs font-semibold ">Summer Sale Launch Event</h3>
        <p className="mt-1 line-clamp-2 text-[10px] font-medium leading-4 text-slate-500">Get ready for the biggest event of the season. Exclusive discounts inside f...</p>
      </div>
      <div className="mt-6 space-y-5">
        <SummaryMetric icon={UsersRoundIcon} label="Target Audience" value={finalPreviewDetails.audience} badge="VIP Tier · North America" />
        <SummaryMetric icon={Sparkles} label="Estimated Reach" value={finalPreviewDetails.reach} helper="Users matching current criteria" />
      </div>
      <div className="mt-7 rounded-2xl bg-white p-4">
        <div className="mb-2 flex items-center justify-between text-[10px] font-semibold text-slate-500">
          <span>Network Status</span><span className="size-2 rounded-full bg-emerald-400" />
        </div>
        <div className="h-2 rounded-full bg-slate-100"><div className="h-full w-[92%] rounded-full bg-primary" /></div>
        <p className="mt-2 text-[9px] font-medium leading-4 text-slate-400">{finalPreviewDetails.networkStatus}</p>
      </div>
    </FormCard>
  );
}

function SummaryMetric({ icon: Icon, label, value, badge, helper }: { icon: React.ElementType; label: string; value: string; badge?: string; helper?: string }) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.4} />
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-1 text-xs font-semibold ">{value}</p>
        {badge ? <span className="mt-2 inline-flex rounded-full bg-primary/10 px-2 py-1 text-[9px] font-semibold text-primary">{badge}</span> : null}
        {helper ? <p className="mt-1 text-[9px] font-medium text-slate-400">{helper}</p> : null}
      </div>
    </div>
  );
}

function ScheduleStep({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const SendIcon = notificationIcons.send;
  const RepeatIcon = notificationIcons.repeat;

  return (
    <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_350px]">
      <FormCard>
        <SectionHeading icon={Clock3} title="Schedule Settings" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ScheduleOption active icon={SendIcon} title="Send Now" description="Broadcast will be processed immediately upon submission." />
          <ScheduleOption icon={CalendarIcon} title="Schedule for later" description="Pick a specific date and time for automated delivery." />
        </div>
        <div className="mt-7 grid gap-5 rounded-2xl bg-primary/5 p-5 sm:grid-cols-2">
          <DateField label="Select Date" value="Nov 24, 2024" />
          <DateField label="Select Time (UTC)" value="09:00 AM" />
        </div>
        <div className="mt-7 rounded-2xl bg-primary/5 p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-white text-primary">
                <RepeatIcon className="size-5" strokeWidth={2.4} />
              </span>
              <div>
                <p className="text-sm font-semibold ">Recurring Broadcast</p>
                <p className="mt-1 text-[11px] font-medium text-slate-500">Automate this broadcast on a repeat cycle.</p>
              </div>
            </div>
            <Switch checked />
          </div>
          <div className="mt-5 flex gap-3">
            {['Daily', 'Weekly', 'Monthly'].map((item, index) => (
              <button key={item} type="button" className={cn("h-9 rounded-xl px-5 text-xs font-semibold", index === 0 ? "bg-primary text-white" : "bg-white text-slate-600")}>{item}</button>
            ))}
          </div>
        </div>
        <StepFooter onBack={onBack} nextLabel="Send Broadcast" onNext={onNext} />
      </FormCard>
      <FinalSummary />
    </div>
  );
}

function CalendarIcon(props: React.ComponentProps<typeof notificationIcons.calendar>) {
  const Icon = notificationIcons.calendar;
  return <Icon {...props} />;
}

function DateField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <div className="mt-2 flex h-11 items-center gap-2 rounded-xl bg-white px-4 text-xs font-medium text-slate-700">
        <Clock3 className="size-4 text-slate-400" />
        {value}
      </div>
    </div>
  );
}

function StepFooter({ onBack, onNext, nextLabel }: { onBack: () => void; onNext: () => void; nextLabel: string }) {
  return (
    <div className="mt-9 flex items-center justify-between">
      <Button variant="ghost" className="text-slate-700 hover:" onClick={onBack}>
        <ArrowLeft className="size-4" />
        Back
      </Button>
      <Button onClick={onNext}>
        {nextLabel}
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}

function ConfirmationPage({ onBack }: { onBack: () => void }) {
  const SuccessIcon = notificationIcons.success;

  return (
    <BroadcastShell>
      <Stepper activeStep={3} completed />
      <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_445px]">
        <FormCard className="text-center">
          <div className="mx-auto flex size-24 rotate-12 items-center justify-center rounded-3xl bg-primary text-white shadow-xl shadow-primary/25">
            <SuccessIcon className="size-12 -rotate-12" strokeWidth={2.8} />
          </div>
          <h2 className="mx-auto mt-8 max-w-107.5 text-[30px] font-semibold leading-tight tracking-tight ">Broadcast Successfully Scheduled!</h2>
          <p className="mx-auto mt-5 max-w-105 text-sm font-medium leading-6 text-slate-500">
            Your campaign has been verified and added to the processing queue. We&apos;ll handle the delivery while you track the progress in real-time.
          </p>
          <div className="mt-8 space-y-4">
            <Button className="h-13 w-full">View Delivery Report</Button>
            <Button variant="ghost" className="h-13 w-full bg-primary/10 text-slate-700 hover:bg-primary/15" onClick={onBack}>Back to Overview</Button>
          </div>
        </FormCard>
        <div className="space-y-5">
          <FormCard className="bg-primary/5">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">Campaign Summary</h3>
            <div className="mt-5 space-y-4">
              {campaignSummary.map((item) => {
                const Icon = item.icon;
                return <SummaryMetric key={item.label} icon={Icon} label={item.label} value={item.value} />;
              })}
            </div>
          </FormCard>
          <div className="grid gap-5 sm:grid-cols-2">
            {deliverySummary.map((item) => {
              const Icon = item.icon;
              return (
                <FormCard key={item.label}>
                  <div className="text-center">
                    <Icon className="mx-auto size-5 text-primary" />
                    <p className="mt-3 text-[10px] font-medium text-slate-400">{item.label}</p>
                    <p className="mt-1 text-xs font-semibold ">{item.value}</p>
                  </div>
                </FormCard>
              );
            })}
          </div>
          <FormCard className="bg-primary/5">
            <div className="flex gap-3">
              <Info className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-[11px] font-semibold leading-5 text-primary">Note: You can edit the schedule or cancel this broadcast up to 30 minutes before the scheduled time via the broadcasts list.</p>
            </div>
          </FormCard>
        </div>
      </div>
    </BroadcastShell>
  );
}

export default function NotificationsPage() {
  const [step, setStep] = useState<FlowStep | 4>(1);
  const activeStep = useMemo<FlowStep>(() => (step === 4 ? 3 : step), [step]);

  if (step === 4) {
    return <ConfirmationPage onBack={() => setStep(1)} />;
  }

  return (
    <BroadcastShell>
      <Stepper activeStep={activeStep} />
      {step === 1 ? <ContentStep onNext={() => setStep(2)} /> : null}
      {step === 2 ? <TargetingStep onBack={() => setStep(1)} onNext={() => setStep(3)} /> : null}
      {step === 3 ? <ScheduleStep onBack={() => setStep(2)} onNext={() => setStep(4)} /> : null}
    </BroadcastShell>
  );
}