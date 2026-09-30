"use client"

import * as React from "react"
import {
  ShieldCheck,
  GraduationCap,
  Users,
  Eye,
  Building2,
  CheckCircle2,
} from "lucide-react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { useDemoRole, DemoRole } from "~/providers/demo-role-provider"
import { CreateInstitutionDialog } from "~/components/create-institution-dialog"

export function DemoRoleBanner() {
  const { role, setRole, activeChild, setActiveChild } = useDemoRole()
  const [institutionModalOpen, setInstitutionModalOpen] = React.useState(false)

  const roles: Array<{
    id: DemoRole
    label: string
    title: string
    sublabel: string
    avatar: string
    icon: typeof ShieldCheck
    badgeColor: string
    activeBorder: string
  }> = [
    {
      id: "admin",
      label: "Administrator",
      title: "Dr. Sarah Vance (Principal Administrator)",
      sublabel: "Campus KPIs • Recharts Fee & Attendance Analytics • Data Export",
      avatar: "SV",
      icon: ShieldCheck,
      badgeColor: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900/50",
      activeBorder: "ring-2 ring-primary bg-primary/5 border-primary/40",
    },
    {
      id: "teacher",
      label: "Teacher",
      title: "Ms. Helena Brooks (Senior Science & Grade 10 Lead)",
      sublabel: "Roll Call Attendance • Grading & Assignments • Timetable",
      avatar: "HB",
      icon: GraduationCap,
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900/50",
      activeBorder: "ring-2 ring-emerald-500 bg-emerald-500/5 border-emerald-500/40",
    },
    {
      id: "parent",
      label: "Parent",
      title: "Chief & Mrs. Babatunde Adeyemi (Guardian)",
      sublabel: "Tuition Invoicing in Naira & USD • Child Attendance Streak • Report Card",
      avatar: "BA",
      icon: Users,
      badgeColor: "bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-900/50",
      activeBorder: "ring-2 ring-purple-500 bg-purple-500/5 border-purple-500/40",
    },
  ]

  return (
    <div className="rounded-xl border border-primary/25 bg-card p-3 sm:p-4 shadow-xs space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Eye className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Multi-Perspective Demo Mode
              </span>
              <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-primary/30">
                Interactive Switcher
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Experience Cresta-ERP from every institutional viewpoint: <strong>Administrator</strong>, <strong>Teacher</strong>, and <strong>Parent</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            onClick={() => setInstitutionModalOpen(true)}
            className="h-8 text-xs font-semibold gap-1.5 shadow-xs"
          >
            <Building2 className="size-3.5" />
            <span>+ Create Institution (Database)</span>
          </Button>
        </div>
      </div>

      {/* Role Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {roles.map((r) => {
          const Icon = r.icon
          const isActive = role === r.id
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`p-2.5 rounded-lg border text-left transition-all relative ${
                isActive
                  ? r.activeBorder
                  : "border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-border"
              }`}
            >
              {isActive && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold text-primary">
                  <CheckCircle2 className="size-3.5" />
                  <span className="hidden lg:inline">Active View</span>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <div
                  className={`size-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {r.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-foreground">{r.label} View</span>
                    <Badge variant="outline" className={`text-[9px] py-0 px-1 ${r.badgeColor}`}>
                      <Icon className="size-2.5 mr-0.5" />
                      {r.id.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-foreground/80 truncate font-medium mt-0.5">
                    {r.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                    {r.sublabel}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Role specific quick context ribbon */}
      {role === "parent" && (
        <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-200 dark:border-purple-900/50 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-purple-700 dark:text-purple-300">
              Viewing Children Profiles:
            </span>
            <div className="flex items-center gap-1.5">
              {["Samuel Adeyemi (Grade 10A)", "Michelle Adeyemi (Grade 7B)"].map((child) => (
                <Button
                  key={child}
                  variant={activeChild === child ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveChild(child)}
                  className={`h-6 text-[11px] px-2.5 ${activeChild === child ? "bg-purple-600 text-white" : ""}`}
                >
                  {child}
                </Button>
              ))}
            </div>
          </div>
          <span className="text-[11px] text-purple-700 dark:text-purple-300 font-medium">
            Term 2 Fees: ₦120,000 (~$80 USD) Paid &bull; Bus: ₦35,000 Due
          </span>
        </div>
      )}

      {role === "teacher" && (
        <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-200 dark:border-emerald-900/50 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-700 dark:text-emerald-300">
              Active Class Roster:
            </span>
            <Badge variant="outline" className="border-emerald-400 bg-background text-emerald-700 dark:text-emerald-300 text-[11px]">
              Grade 10 - Section A (40 Students)
            </Badge>
            <span className="text-muted-foreground text-[11px]">Next Period: 10:15 AM - Biology Lab</span>
          </div>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
            Quick Attendance &amp; Gradebook Mode Active
          </span>
        </div>
      )}

      <CreateInstitutionDialog
        open={institutionModalOpen}
        onOpenChange={setInstitutionModalOpen}
      />
    </div>
  )
}
