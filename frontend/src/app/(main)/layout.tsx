import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cresta-ERP — Cresta Institutional Platform — CRESTA — Powering Institutions of Excellence",
  description: "Cresta-ERP unifies academics, finance, HR, and campus communication for institutions of excellence.",
};

export default function MainLayout({
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
