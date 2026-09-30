import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import { TooltipProvider } from "~/components/ui/tooltip";

import "./globals.css";
import { ThemeProvider } from "~/providers/theme-provider";
import { ToasterProvider } from "~/providers/toast-provider";
import ReactQueryProvider from "~/providers/react-query-provider";

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
  title: "SchoolERP — Modern School Management Platform",
  description:
    "SchoolERP unifies academics, finance, HR, and communication on a single platform. Trusted by 500+ schools.",
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
            <TooltipProvider>
              {children}
            </TooltipProvider>
            <ToasterProvider />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
