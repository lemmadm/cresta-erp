import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cresta-ERP — Cresta Institutional Platform",
  description: "Secure institutional sign-in for Cresta-ERP: CRESTA — Powering Institutions of Excellence.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}
