"use client"

import * as React from "react"
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ThemeToggleButton } from "~/components/theme-toggle-button";
import { GraduationCap, ArrowRight, Menu, Building2 } from "lucide-react";
import { CreateInstitutionDialog } from "~/components/create-institution-dialog";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary shadow-xs">
            <GraduationCap className="size-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight">Cresta-ERP</span>
            <span className="text-[10px] text-muted-foreground font-medium hidden sm:inline">
              Cresta Institutional Platform
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-primary transition-colors hover:underline"
          >
            Live Demo
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggleButton />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setModalOpen(true)}
            className="hidden sm:inline-flex text-xs font-semibold gap-1.5 h-8 border-primary/40 text-primary hover:bg-primary/10"
          >
            <Building2 className="size-3.5" />
            <span>Create Institution</span>
          </Button>
          <Button variant="ghost" size="sm" asChild className="h-8 text-xs">
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" asChild className="h-8 text-xs font-semibold shadow-xs">
            <Link href="/dashboard">
              Explore Demo <ArrowRight className="size-3.5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon-sm" className="md:hidden">
            <Menu />
          </Button>
        </div>
      </div>

      <CreateInstitutionDialog
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </header>
  );
}
