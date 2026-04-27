import Link from "next/link";
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="mb-2 inline-flex w-fit rounded-full bg-[#ffe3cc] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#9a4f1b]">
          Welcome back
        </div>
        <CardTitle>Login to Gift Shop</CardTitle>
        <CardDescription>
          Enter your email and password to access your dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="text-sm font-semibold text-[#9a4f1b] transition hover:text-[#2d2118]"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <Button type="submit" className="h-12 w-full">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6d5543]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-bold text-[#2d2118] transition hover:text-[#9a4f1b]"
          >
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
