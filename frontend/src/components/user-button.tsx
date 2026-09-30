"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { LogOutIcon, CircleUserRoundIcon, CreditCardIcon, BellIcon } from "lucide-react";
import { ThemeSegmentControl } from "./theme-segment-control";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
} from "~/components/ui/avatar"
import { useDemoRole, DemoRole } from "~/providers/demo-role-provider"

const roleProfiles: Record<DemoRole, { name: string; email: string; initials: string; roleLabel: string }> = {
  admin: {
    name: "Dr. Sarah Vance",
    email: "s.vance@oakridge.edu",
    initials: "SV",
    roleLabel: "Principal Administrator",
  },
  teacher: {
    name: "Ms. Helena Brooks",
    email: "h.brooks@oakridge.edu",
    initials: "HB",
    roleLabel: "Senior Science & Grade 10 Lead",
  },
  parent: {
    name: "Chief Babatunde Adeyemi",
    email: "b.adeyemi@cresta.parent.org",
    initials: "BA",
    roleLabel: "Guardian (Samuel & Michelle)",
  },
}

export function UserButton() {
  const { role, setRole } = useDemoRole()
  const router = useRouter();

  const currentProfile = roleProfiles[role] || roleProfiles.admin

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-lg">
          <Avatar className="size-8 rounded-lg">
            <AvatarFallback className="rounded-lg bg-primary text-white font-semibold text-xs">
              {currentProfile.initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 space-y-1">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-lg">
              <AvatarFallback className="rounded-lg bg-primary text-white font-semibold text-xs">
                {currentProfile.initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold text-xs">{currentProfile.name}</span>
              <span className="truncate text-muted-foreground text-[10px]">
                {currentProfile.roleLabel}
              </span>
              <span className="truncate text-muted-foreground text-[9px]">
                {currentProfile.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="px-2 py-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
            Switch Demo Perspective
          </span>
          <div className="grid grid-cols-3 gap-1">
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`p-1 text-[10px] font-semibold rounded text-center border transition-all ${
                role === "admin" ? "bg-primary text-primary-foreground border-primary" : "bg-muted/30 hover:bg-muted text-muted-foreground"
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setRole("teacher")}
              className={`p-1 text-[10px] font-semibold rounded text-center border transition-all ${
                role === "teacher" ? "bg-emerald-600 text-white border-emerald-600" : "bg-muted/30 hover:bg-muted text-muted-foreground"
              }`}
            >
              Teacher
            </button>
            <button
              type="button"
              onClick={() => setRole("parent")}
              className={`p-1 text-[10px] font-semibold rounded text-center border transition-all ${
                role === "parent" ? "bg-purple-600 text-white border-purple-600" : "bg-muted/30 hover:bg-muted text-muted-foreground"
              }`}
            >
              Parent
            </button>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="font-normal">
          <ThemeSegmentControl />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <CircleUserRoundIcon />
              Institutional Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/finance/fees">
              <CreditCardIcon />
              School Fees &amp; Billing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/communication/notice-board">
              <BellIcon />
              Campus Notices
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/login")}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
