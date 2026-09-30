import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import { TooltipProvider } from "~/components/ui/tooltip";

import "./globals.css";
import { ThemeProvider } from "~/providers/theme-provider";
import { ToasterProvider } from "~/providers/toast-provider";
import ReactQueryProvider from "~/providers/react-query-provider";
import { DemoRoleProvider } from "~/providers/demo-role-provider";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cresta-ERP — Cresta Institutional Platform — CRESTA — Powering Institutions of Excellence",
  description:
    "Cresta-ERP: The Cresta Institutional Platform powering institutions of excellence. Unifying academics, finance, administration, and campus operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geistSans.className,
          geistMono.variable,
          inter.variable,
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <DemoRoleProvider>
              <TooltipProvider>
                {children}
              </TooltipProvider>
              <ToasterProvider />
            </DemoRoleProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
