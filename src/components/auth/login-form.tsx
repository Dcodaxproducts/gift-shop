import Link from "next/link";
import { Eye, Lock, Mail, RotateCw } from "lucide-react";
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

export function LoginForm() {
  return (
    <Card className="w-full max-w-[355px]">
      <CardHeader className="mb-8">
        <CardTitle className="text-[26px] leading-tight">
          Super Admin Login
        </CardTitle>
        <CardDescription className="text-[13px]">
          Access the system management dashboard
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2.5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@fintech-gifting.com"
              autoComplete="email"
              leftIcon={<Mail className="size-4" />}
              required
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              leftIcon={<Lock className="size-4" />}
              rightIcon={<Eye className="size-4" />}
              required
            />
            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-[11px] font-semibold text-primary transition hover:text-primary/80"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full gap-2">
            Login to Dashboard
            <RotateCw className="size-4 animate-spin" />
          </Button>
        </form>

        <p className="mt-9 flex items-center justify-center gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-300">
          <Lock className="size-4" /> Secure access for authorized administrators only
        </p>
      </CardContent>
    </Card>
  );
}
