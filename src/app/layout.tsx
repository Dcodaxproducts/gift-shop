import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/site";
import "./globals.css";
import { poppins } from "@/lib/fonts";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/providers/query-provider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
      className={cn("h-full scroll-smooth antialiased", "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className={`min-h-full ${poppins.className}`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
