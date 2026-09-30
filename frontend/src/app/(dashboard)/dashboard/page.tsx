"use client"

import * as React from "react"
import Link from "next/link"
import {
  Users,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Plus,
  BookOpen,
  Bell,
  Calendar,
} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"

const stats = [
  {
    title: "Total Enrolled Students",
    value: "1,428",
    change: "+4.2% from last term",
    trend: "up",
    icon: GraduationCap,
    accent: "text-blue-600 bg-blue-500/10",
  },
  {
    title: "Faculty & Staff",
    value: "96",
    change: "100% active departments",
    trend: "neutral",
    icon: Users,
    accent: "text-emerald-600 bg-emerald-500/10",
  },
  {
    title: "Today's Attendance",
    value: "96.4%",
    change: "1,376 students present",
    trend: "up",
    icon: CalendarCheck,
    accent: "text-amber-600 bg-amber-500/10",
  },
  {
    title: "Term Fee Collection",
    value: "$384,200",
    change: "88% collected of target",
    trend: "up",
    icon: CreditCard,
    accent: "text-purple-600 bg-purple-500/10",
  },
]

const quickActions = [
  { label: "Take Attendance", href: "/dashboard/academics/attendance", icon: CalendarCheck },
  { label: "New Admission", href: "/dashboard/students/admission", icon: Plus },
  { label: "Fee Collection", href: "/dashboard/finance/fees", icon: CreditCard },
  { label: "Class Timetable", href: "/dashboard/academics/timetable", icon: Clock },
  { label: "Publish Notice", href: "/dashboard/communication/notice-board", icon: Bell },
  { label: "Exam Schedules", href: "/dashboard/examination/schedules", icon: BookOpen },
]

const recentAnnouncements = [
  {
    id: 1,
    title: "Mid-Term Examination Timetable Released",
    date: "Today, 09:30 AM",
    category: "Academic",
    badge: "Important",
    color: "bg-red-500/10 text-red-600 border-red-200 dark:border-red-900/50",
  },
  {
    id: 2,
    title: "Annual Science Exhibition Registrations Open",
    date: "Yesterday",
    category: "Events",
    badge: "Activity",
    color: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900/50",
  },
  {
    id: 3,
    title: "Transportation Route #4 Schedule Adjustment",
    date: "2 days ago",
    category: "Transport",
    badge: "Logistics",
    color: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900/50",
  },
]

const classAttendanceSummary = [
  { grade: "Grade 10 - Section A", present: 38, total: 40, teacher: "Ms. Helena Brooks" },
  { grade: "Grade 10 - Section B", present: 39, total: 40, teacher: "Mr. David Miller" },
  { grade: "Grade 11 - Science", present: 34, total: 35, teacher: "Dr. Robert Vance" },
  { grade: "Grade 11 - Commerce", present: 41, total: 42, teacher: "Mrs. Ananya Patel" },
  { grade: "Grade 12 - Senior Hall", present: 45, total: 48, teacher: "Mr. Samuel Wright" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header greeting & quick action buttons */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Institutional Overview</h1>
          <p className="text-muted-foreground text-sm">
            Oakridge International Academy &bull; Academic Year 2026&ndash;2027 &bull; Term 2
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild size="sm" variant="outline" className="h-8">
            <Link href="/dashboard/students/admission">
              <Plus className="mr-1.5 size-3.5" />
              New Student
            </Link>
          </Button>
          <Button asChild size="sm" className="h-8">
            <Link href="/dashboard/academics/attendance">
              <CalendarCheck className="mr-1.5 size-3.5" />
              Mark Attendance
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-border shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.accent}`}>
                  <Icon className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="size-3 text-emerald-600 inline" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Launchpad */}
      <Card className="border-border shadow-xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Operational Quick Actions</CardTitle>
          <CardDescription className="text-xs">
            Direct shortcuts to key school modules and workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-border/70 bg-card hover:bg-accent/60 transition-colors text-center group"
                >
                  <div className="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Icon className="size-4" />
                  </div>
                  <span className="text-xs font-medium line-clamp-1">{action.label}</span>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Grid: Class Attendance & Campus Announcements */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Attendance by Class */}
        <Card className="lg:col-span-4 border-border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-semibold">Today&apos;s Class Attendance</CardTitle>
              <CardDescription className="text-xs">Real-time morning roll call status</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs font-normal">
              1,376 / 1,428 present
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="divide-y divide-border/60">
              {classAttendanceSummary.map((item) => {
                const percent = Math.round((item.present / item.total) * 100)
                return (
                  <div key={item.grade} className="py-2.5 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <p className="text-xs font-medium leading-none">{item.grade}</p>
                      <p className="text-xs text-muted-foreground">{item.teacher}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium w-12 text-right">
                        {item.present}/{item.total}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="pt-2">
              <Button asChild variant="ghost" size="sm" className="w-full text-xs text-primary">
                <Link href="/dashboard/academics/attendance">
                  View Full School Attendance Sheet
                  <ArrowUpRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notices & Academic Calendar */}
        <Card className="lg:col-span-3 border-border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-semibold">Campus Bulletins</CardTitle>
              <CardDescription className="text-xs">Latest staff &amp; student notifications</CardDescription>
            </div>
            <Link
              href="/dashboard/communication/notice-board"
              className="text-xs text-primary hover:underline"
            >
              All notices
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAnnouncements.map((notice) => (
              <div
                key={notice.id}
                className="p-3 rounded-lg border border-border/60 bg-muted/20 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className={`text-[10px] py-0 px-1.5 border ${notice.color}`}>
                    {notice.category}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">{notice.date}</span>
                </div>
                <p className="text-xs font-medium text-foreground">{notice.title}</p>
              </div>
            ))}

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 mt-4 flex items-start gap-3">
              <Calendar className="size-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">Upcoming Parent-Teacher Meet</p>
                <p className="text-[11px] text-muted-foreground">
                  Scheduled for Friday, 3:00 PM in Main Auditorium &amp; Virtual Rooms.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
