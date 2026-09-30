"use client"

import * as React from "react"
import { Separator } from "~/components/ui/separator"
import { SidebarTrigger } from "~/components/ui/sidebar"
import { HeaderNotifications } from "~/app/(dashboard)/_components/header-notifications"
import { UserButton } from "~/components/user-button"
import { Button } from "~/components/ui/button"
import { Building2 } from "lucide-react"
import { useDemoRole } from "~/providers/demo-role-provider"
import { CreateInstitutionDialog } from "~/components/create-institution-dialog"

export function DashboardHeader() {
  const { role, setRole } = useDemoRole()
  const [instModalOpen, setInstModalOpen] = React.useState(false)

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-tight text-foreground">Cresta-ERP</span>
          <Separator orientation="vertical" className="h-3.5 hidden md:block" />
          <span className="text-xs text-muted-foreground hidden md:inline">
            Cresta Institutional Platform
          </span>
        </div>

        {/* Quick Role Switcher Buttons */}
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center rounded-lg border p-0.5 bg-muted/40 text-xs">
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                role === "admin" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setRole("teacher")}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                role === "teacher" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Teacher
            </button>
            <button
              type="button"
              onClick={() => setRole("parent")}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                role === "parent" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Parent
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setInstModalOpen(true)}
            className="h-8 text-xs font-semibold gap-1.5 hidden lg:inline-flex border-primary/40 text-primary hover:bg-primary/10"
          >
            <Building2 className="size-3.5" />
            <span>Create Institution</span>
          </Button>

          <HeaderNotifications />
          <UserButton />
        </div>
      </div>

      <CreateInstitutionDialog
        open={instModalOpen}
        onOpenChange={setInstModalOpen}
      />
    </header>
  )
}
