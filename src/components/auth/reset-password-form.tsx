import Link from "next/link";
import { CheckCircle2, Circle, Eye, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const passwordRules = [
  { label: "Minimum 8 characters", complete: true },
  { label: "One number", complete: true },
  { label: "One special character", complete: false },
];

export function ResetPasswordForm() {
  return (
    <Card className="w-full max-w-[400px] border border-border bg-white px-8 py-9 shadow-2xl shadow-slate-200/80">
      <CardHeader className="mb-7">
        <CardTitle className="text-[26px] leading-tight text-slate-950">
          Reset Password
        </CardTitle>
        <CardDescription className="text-[13px] leading-5 text-slate-500">
          Create a new password for your super admin account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2.5">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              name="newPassword"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              leftIcon={<Lock className="size-4" />}
              rightIcon={<Eye className="size-4" />}
              className="h-11 rounded-xl bg-white"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span className="text-slate-500">Password Strength</span>
              <span className="text-primary">Strong (85%)</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[85%] rounded-full bg-primary" />
            </div>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              leftIcon={<Lock className="size-4" />}
              rightIcon={<Eye className="size-4" />}
              className="h-11 rounded-xl bg-white"
              required
            />
          </div>

          <div className="rounded-xl bg-slate-50 px-4 py-4">
            <ul className="space-y-3 text-xs text-slate-500">
              {passwordRules.map((rule) => (
                <li key={rule.label} className="flex items-center gap-2">
                  {rule.complete ? (
                    <CheckCircle2 className="size-4 text-emerald-500" />
                  ) : (
                    <Circle className="size-4 text-slate-300" />
                  )}
                  <span>{rule.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button type="submit" className="h-12 w-full rounded-xl text-[13px]">
            Reset Password
          </Button>
        </form>

        <div className="mt-7 text-center">
          <Link
            href="/auth/login"
            className="text-sm font-semibold text-primary transition hover:text-primary/80"
          >
            Back to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
