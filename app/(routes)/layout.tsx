import type { Metadata } from "next";
import "@/globals.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export const metadata: Metadata = {
  title: "Weather Maldives",
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: process.env.NEXT_PUBLIC_SITE_TITLE,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    images: [
      {
        url: process.env.NEXT_PUBLIC_SITE_IMAGE as string,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: process.env.NEXT_PUBLIC_SITE_TITLE,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    images: [process.env.NEXT_PUBLIC_SITE_IMAGE as string],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
