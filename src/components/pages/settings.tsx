import { Bell, CreditCard, Database, FileImage, Shield, Upload } from "lucide-react";
import {
  notificationSettings,
  paymentSettings,
  platformSettings,
  securitySettings,
} from "@/constants/settings";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

function SectionTitle({ icon: Icon, title }: { icon: typeof Shield; title: string }) {
  return (
    <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-950">
      <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-3.5" strokeWidth={2.25} />
      </span>
      {title}
    </CardTitle>
  );
}

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="System Settings"
        description="Configure global platform settings and system behavior"
      />

      <section className="grid gap-5 xl:grid-cols-2">
        <Card className="rounded-2xl border border-border bg-white shadow-sm">
          <CardHeader className="p-5 pb-4">
            <SectionTitle icon={Shield} title="Platform Info" />
          </CardHeader>
          <CardContent className="space-y-4 px-5 pb-5">
            <div className="space-y-2">
              <Label htmlFor="app-name" className="text-[10px] uppercase tracking-wide text-slate-500">
                Application Name
              </Label>
              <Input
                id="app-name"
                defaultValue={platformSettings.appName}
                className="h-10! rounded-2xl bg-white text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-email" className="text-[10px] uppercase tracking-wide text-slate-500">
                Support Email
              </Label>
              <Input
                id="support-email"
                type="email"
                defaultValue={platformSettings.supportEmail}
                className="h-10! rounded-2xl bg-white text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-wide text-slate-500">
                Platform Logo
              </Label>
              <button
                type="button"
                className="flex min-h-20 w-full items-center justify-center gap-4 rounded-2xl border border-dashed border-primary/20 bg-slate-50 px-4 text-left transition hover:bg-primary/5"
              >
                <span className="flex size-9 items-center justify-center rounded-xl border border-border bg-white text-slate-400">
                  <FileImage className="size-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-slate-700">
                    Click to upload logo
                  </span>
                  <span className="mt-1 block text-[10px] text-slate-400">
                    {platformSettings.logoHint}
                  </span>
                </span>
                <Upload className="ml-2 size-4 text-primary" />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-white shadow-sm">
          <CardHeader className="p-5 pb-4">
            <SectionTitle icon={Shield} title="Security" />
          </CardHeader>
          <CardContent className="space-y-4 px-5 pb-5">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-wide text-slate-500">
                Session Timeout
              </Label>
              <Select defaultValue={securitySettings.sessionTimeout}>
                <SelectTrigger className="h-10 w-full rounded-2xl bg-white text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {securitySettings.timeoutOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-4 py-1">
              <div>
                <p className="text-xs font-semibold text-slate-700">2-Factor Authentication</p>
                <p className="mt-1 text-[10px] text-slate-400">
                  Require MFA for all admin accounts
                </p>
              </div>
              <Switch checked />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-wide text-slate-500">
                Password Policy
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {securitySettings.passwordPolicies.map((policy) => (
                  <div
                    key={policy}
                    className="flex h-9 items-center gap-2 rounded-2xl bg-slate-50 px-3 text-[11px] font-medium text-slate-500"
                  >
                    <span className="size-1.5 rounded-full bg-primary" />
                    {policy}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-white shadow-sm">
          <CardHeader className="p-5 pb-4">
            <SectionTitle icon={CreditCard} title="Payments" />
          </CardHeader>
          <CardContent className="space-y-4 px-5 pb-5">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-wide text-slate-500">
                Default Currency
              </Label>
              <Select defaultValue={paymentSettings.defaultCurrency}>
                <SelectTrigger className="h-10 w-full rounded-2xl bg-white border border-slate-200 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentSettings.currencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transaction-fee" className="text-[10px] uppercase tracking-wide text-slate-500">
                Transaction Fee %
              </Label>
              <div className="relative">
                <Input
                  id="transaction-fee"
                  defaultValue={paymentSettings.transactionFee}
                  className="h-10! rounded-2xl bg-white pr-9 text-xs"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                  %
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Applied to all outgoing pay-to-peer transfers</p>
            </div>
            <Button variant="outline" className="h-10 w-full rounded-2xl text-xs">
              <Database className="mr-2 size-3.5" />
              View Billing History
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-border bg-white shadow-sm">
          <CardHeader className="p-5 pb-4">
            <SectionTitle icon={Bell} title="Notifications" />
          </CardHeader>
          <CardContent className="space-y-5 px-5 pb-5">
            {notificationSettings.map((setting) => (
              <div key={setting.title} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-700">{setting.title}</p>
                  <p className="mt-1 text-[10px] text-slate-400">{setting.description}</p>
                </div>
                <Switch checked={setting.enabled} />
              </div>
            ))}
            <div className="pt-1">
              <Label className="text-[11px] uppercase tracking-wide text-slate-500!">
                Server Configuration
              </Label>
              <Button className="h-10 mt-2 w-full rounded-2xl bg-secondary text-xs hover:bg-secondary/90">
                Configure SMTP Server
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="flex justify-end gap-3 pt-1">
        <Button variant="outline" className="h-10 rounded-2xl px-5 text-xs">
          Cancel Changes
        </Button>
        <Button className="h-10 rounded-2xl px-6 text-xs">Save System Settings</Button>
      </div>
    </div>
  );
}
