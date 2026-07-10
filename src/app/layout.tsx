import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/site";
import "./globals.css";
import { poppins } from "@/lib/fonts";
import { QueryProvider } from "@/components/providers/query-provider";
import { AuthGuard } from "@/components/auth/auth-guard";
import { Toaster } from "sonner";
import TopLoader from "@/components/ui/top-loader";
import { ServerHealthCheck } from "@/components/server-health-check";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth antialiased"
      suppressHydrationWarning
    >
      <body className={`min-h-full ${poppins.className}`}>
        <QueryProvider>
          <ServerHealthCheck>
            <AuthGuard>{children}</AuthGuard>
          </ServerHealthCheck>
        </QueryProvider>
        <Toaster richColors position="top-right" />
        <TopLoader />
      </body>
    </html>
  );
}
