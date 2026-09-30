"use client"

import * as React from "react"
import Link from "next/link"

import { NavMain } from "~/app/(dashboard)/_components/nav-main"
import { NavSecondary } from "~/app/(dashboard)/_components/nav-secondary"
import {
  sidebarNavCategories,
  sidebarSecondaryNav,
} from "~/app/(dashboard)/_components/sidebar-nav"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { FaBookOpenReader } from "react-icons/fa6"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard" className="flex items-center gap-2.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <FaBookOpenReader className="size-4" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold tracking-tight">Cresta-ERP</span>
                  <span className="text-[10px] text-muted-foreground font-medium tracking-tight mt-0.5">
                    Institutions of Excellence
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain categories={sidebarNavCategories} />
        <NavSecondary items={sidebarSecondaryNav} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  )
}
