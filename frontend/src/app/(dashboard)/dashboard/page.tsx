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
  Download,
  FileText,
  DollarSign,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Award,
  Send,
  Building2,
  Database,
  BarChart3,
  Check,
  ExternalLink,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ReferenceLine,
} from "recharts"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Input } from "~/components/ui/input"
import { useDemoRole } from "~/providers/demo-role-provider"
import { DemoRoleBanner } from "~/components/demo-role-banner"
import { CreateInstitutionDialog } from "~/components/create-institution-dialog"
import { StudentProfileDialog } from "~/components/student-profile-dialog"

// --- DATA STRUCTURES ---

// Administrator Financial Data (in Naira & Dollars)
const monthlyFeeTrends = [
  { month: "May 2026", target: 330000, collected: 318500, targetNGN: 495000000, collectedNGN: 477750000, rate: 96.5 },
  { month: "Jun 2026", target: 350000, collected: 342000, targetNGN: 525000000, collectedNGN: 513000000, rate: 97.7 },
  { month: "Jul 2026", target: 340000, collected: 325800, targetNGN: 510000000, collectedNGN: 488700000, rate: 95.8 },
  { month: "Aug 2026", target: 390000, collected: 374200, targetNGN: 585000000, collectedNGN: 561300000, rate: 95.9 },
  { month: "Sep 2026", target: 420000, collected: 408500, targetNGN: 630000000, collectedNGN: 612750000, rate: 97.3 },
  { month: "Oct 2026", target: 450000, collected: 426000, targetNGN: 675000000, collectedNGN: 639000000, rate: 94.7 },
]

// RECHARTS DAILY ATTENDANCE RATES OVER THE PAST WEEK
const pastWeekAttendance = [
  { day: "Monday", shortDay: "Mon", present: 1385, absent: 43, rate: 97.0, target: 95 },
  { day: "Tuesday", shortDay: "Tue", present: 1392, absent: 36, rate: 97.5, target: 95 },
  { day: "Wednesday", shortDay: "Wed", present: 1376, absent: 52, rate: 96.4, target: 95 },
  { day: "Thursday", shortDay: "Thu", present: 1401, absent: 27, rate: 98.1, target: 95 },
  { day: "Friday", shortDay: "Fri", present: 1362, absent: 66, rate: 95.4, target: 95 },
]

// Teacher Grade 10-A Weekly Attendance
const teacherClassAttendance = [
  { day: "Mon", present: 39, absent: 1, rate: 97.5 },
  { day: "Tue", present: 40, absent: 0, rate: 100.0 },
  { day: "Wed", present: 38, absent: 2, rate: 95.0 },
  { day: "Thu", present: 39, absent: 1, rate: 97.5 },
  { day: "Fri", present: 38, absent: 2, rate: 95.0 },
]

// Today's Class Attendance Summary
const classAttendanceSummary = [
  { grade: "Grade 10 - Section A", present: 38, total: 40, teacher: "Ms. Helena Brooks" },
  { grade: "Grade 10 - Section B", present: 39, total: 40, teacher: "Mr. David Miller" },
  { grade: "Grade 11 - Science", present: 34, total: 35, teacher: "Dr. Robert Vance" },
  { grade: "Grade 11 - Commerce", present: 41, total: 42, teacher: "Mrs. Ananya Patel" },
  { grade: "Grade 12 - Senior Hall", present: 45, total: 48, teacher: "Mr. Samuel Wright" },
]

// Quick Actions Launchpad
const adminQuickActions = [
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
    color: "bg-red-500/10 text-red-600 border-red-200 dark:border-red-900/50",
  },
  {
    id: 2,
    title: "Annual Science & STEM Exhibition Registrations Open",
    date: "Yesterday",
    category: "Events",
    color: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900/50",
  },
  {
    id: 3,
    title: "Transportation Route #4 Schedule Adjustment",
    date: "2 days ago",
    category: "Transport",
    color: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900/50",
  },
]

// --- CUSTOM TOOLTIPS FOR CHARTS ---

interface AttendanceDataPoint {
  day?: string
  shortDay?: string
  present: number
  absent: number
  rate: number
  target?: number
  note?: string
  val?: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    name: string
    color: string
    payload?: AttendanceDataPoint
  }>
  label?: string
}

function CustomFeeTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const collected = payload.find((p) => p.name === "Collected Fees")?.value || 0
    const target = payload.find((p) => p.name === "Target Fees")?.value || 0
    const rate = target > 0 ? ((collected / target) * 100).toFixed(1) : "0"

    return (
      <div className="rounded-lg border border-border bg-popover/95 p-3 shadow-md backdrop-blur-sm text-xs space-y-1.5">
        <p className="font-semibold text-foreground border-b pb-1">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-primary" />
              Collected Fees:
            </span>
            <span className="font-bold text-foreground">${collected.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-amber-500" />
              Target Fees:
            </span>
            <span className="font-medium text-muted-foreground">${target.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between gap-4 pt-1 border-t text-[11px]">
            <span className="text-muted-foreground">In Naira (₦):</span>
            <span className="font-semibold text-emerald-600">₦{(collected * 1500).toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-[11px]">
            <span className="text-muted-foreground">Collection Rate:</span>
            <span className="font-semibold text-primary">{rate}%</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

function CustomAttendanceTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload
    if (!data) return null

    return (
      <div className="rounded-lg border border-border bg-popover/95 p-3 shadow-md backdrop-blur-sm text-xs space-y-1.5 min-w-[180px]">
        <div className="flex items-center justify-between border-b pb-1">
          <span className="font-bold text-foreground">{data.day || label}</span>
          <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
            {data.rate}% Rate
          </Badge>
        </div>
        <div className="space-y-1 pt-0.5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-primary" />
              Present:
            </span>
            <span className="font-bold text-foreground">{data.present.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-muted-foreground/50" />
              Absent:
            </span>
            <span className="font-medium text-destructive">{data.absent}</span>
          </div>
          <div className="flex items-center justify-between gap-3 pt-1 border-t text-[11px]">
            <span className="text-muted-foreground">Enrolled Total:</span>
            <span className="font-semibold text-foreground">{(data.present + data.absent).toLocaleString()}</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  const { role, activeChild } = useDemoRole()
  const [institutionModalOpen, setInstitutionModalOpen] = React.useState(false)
  const [selectedStudentForModal, setSelectedStudentForModal] = React.useState<string | null>(null)

  // Teacher interactive attendance state
  const [teacherRoll, setTeacherRoll] = React.useState([
    { id: 1, name: "Samuel Adeyemi", status: "present", note: "On time" },
    { id: 2, name: "Aisha Bello", status: "present", note: "On time" },
    { id: 3, name: "Chinedu Okeke", status: "present", note: "On time" },
    { id: 4, name: "Zainab Ibrahim", status: "late", note: "Bus delay (15 min)" },
    { id: 5, name: "David Adeleke", status: "absent", note: "Excused - Flu" },
    { id: 6, name: "Blessing Eze", status: "present", note: "On time" },
    { id: 7, name: "Tunde Ojo", status: "present", note: "On time" },
  ])

  // Parent Payment Modal
  const [parentPaymentOpen, setParentPaymentOpen] = React.useState(false)
  const [parentMessageText, setParentMessageText] = React.useState("")

  const toggleStudentStatus = (id: number) => {
    setTeacherRoll((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === "present" ? "absent" : s.status === "absent" ? "late" : "present"
          return { ...s, status: nextStatus }
        }
        return s
      })
    )
  }

  const saveRollCall = () => {
    toast.success("Grade 10-A Roll Call Saved!", {
      description: "Attendance records synchronized to Cresta Institutional Platform.",
    })
  }

  const handleExportCSV = () => {
    try {
      const headers = [
        "Class / Grade Level",
        "Class Teacher",
        "Present Students",
        "Total Enrolled",
        "Attendance Rate (%)",
        "Recorded Date",
        "Platform",
      ]

      const rows = classAttendanceSummary.map((item) => {
        const rate = Math.round((item.present / item.total) * 100)
        return [
          `"${item.grade}"`,
          `"${item.teacher}"`,
          item.present,
          item.total,
          `${rate}%`,
          `"2026-09-30 08:30 AM"`,
          `"Cresta-ERP — Cresta Institutional Platform"`,
        ]
      })

      const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n")
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const downloadAnchor = document.createElement("a")
      downloadAnchor.setAttribute("href", url)
      downloadAnchor.setAttribute("download", `cresta_class_attendance_report_2026_09_30.csv`)
      document.body.appendChild(downloadAnchor)
      downloadAnchor.click()
      document.body.removeChild(downloadAnchor)
      URL.revokeObjectURL(url)

      toast.success("Attendance report exported to CSV", {
        description: "cresta_class_attendance_report_2026_09_30.csv downloaded successfully.",
      })
    } catch {
      toast.error("Failed to export attendance report to CSV")
    }
  }

  const handleExportPDF = () => {
    try {
      const printIframe = document.createElement("iframe")
      printIframe.style.position = "fixed"
      printIframe.style.right = "0"
      printIframe.style.bottom = "0"
      printIframe.style.width = "0"
      printIframe.style.height = "0"
      printIframe.style.border = "0"
      document.body.appendChild(printIframe)

      const iframeDoc = printIframe.contentWindow?.document
      if (!iframeDoc) {
        toast.error("Unable to initialize PDF printing system")
        return
      }

      const rowsHtml = classAttendanceSummary
        .map(
          (row) => `
            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">${row.grade}</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0;">${row.teacher}</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 500;">${row.present}</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: right;">${row.total}</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 700; color: #0284c7;">
                ${Math.round((row.present / row.total) * 100)}%
              </td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: 600;">
                &#10003; Roll Verified
              </td>
            </tr>
          `
        )
        .join("")

      iframeDoc.open()
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Cresta-ERP Attendance Report</title>
          <style>
            @page { size: A4 portrait; margin: 20mm; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 24px; }
            .header-banner { border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
            .brand-title { font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
            .tagline { font-size: 11px; font-weight: 700; color: #ea580c; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
            .inst-name { font-size: 13px; color: #475569; margin-top: 6px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
            th { background: #f1f5f9; padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 700; color: #334155; text-transform: uppercase; border-bottom: 2px solid #cbd5e1; }
            .footer-note { font-size: 10px; color: #94a3b8; text-align: center; margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 12px; }
          </style>
        </head>
        <body>
          <div class="header-banner">
            <div>
              <div class="brand-title">Cresta-ERP</div>
              <div class="tagline">CRESTA — Powering Institutions of Excellence</div>
              <div class="inst-name">Cresta Institutional Platform &bull; Oakridge International Academy</div>
            </div>
            <div style="text-align: right; font-size: 11px; color: #64748b;">
              <span style="background: #dcfce7; color: #15803d; padding: 3px 8px; border-radius: 4px; font-weight: 700;">&#10003; AUDITED RECORD</span>
              <p style="margin: 6px 0 0;"><strong>Date:</strong> September 30, 2026</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Class / Grade Level</th>
                <th>Class Teacher</th>
                <th style="text-align: right;">Present</th>
                <th style="text-align: right;">Enrolled</th>
                <th style="text-align: right;">Attendance Rate</th>
                <th style="text-align: center;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
          <div class="footer-note">
            Generated via Cresta-ERP &bull; Cresta Institutional Platform &bull; Security Certificate: CRESTA-20260930-DOC
          </div>
        </body>
        </html>
      `)
      iframeDoc.close()

      setTimeout(() => {
        printIframe.contentWindow?.focus()
        printIframe.contentWindow?.print()
        setTimeout(() => {
          if (document.body.contains(printIframe)) {
            document.body.removeChild(printIframe)
          }
        }, 1500)
      }, 500)

      toast.success("Preparing PDF document", {
        description: "Select 'Save as PDF' to download.",
      })
    } catch {
      toast.error("Failed to generate PDF document")
    }
  }

  const handleSendTeacherMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!parentMessageText.trim()) return
    toast.success("Message dispatched to Ms. Helena Brooks (Class Teacher)", {
      description: "Teacher will receive notice on their portal and WhatsApp/Email.",
    })
    setParentMessageText("")
  }

  return (
    <div className="space-y-6">
      {/* MULTI-PERSPECTIVE DEMO BANNER */}
      <DemoRoleBanner />

      {/* ========================================================= */}
      {/* 1. ADMINISTRATOR PERSPECTIVE */}
      {/* ========================================================= */}
      {role === "admin" && (
        <div className="space-y-6">
          {/* Institutional Branding Banner */}
          <div className="rounded-xl border border-primary/20 bg-linear-to-r from-primary/10 via-card to-secondary/10 p-5 shadow-xs">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary font-semibold text-xs">
                    <Sparkles className="size-3 mr-1" />
                    Cresta-ERP &bull; Administrator Suite
                  </Badge>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Cresta Institutional Platform
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  CRESTA — Powering Institutions of Excellence
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm flex flex-wrap items-center gap-2">
                  <span>Oakridge International Academy</span>
                  <span>&bull;</span>
                  <span>Principal: Dr. Sarah Vance</span>
                  <span>&bull;</span>
                  <span>Academic Year 2026&ndash;2027 &bull; Term 2</span>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setInstitutionModalOpen(true)}
                  className="h-9 gap-1.5 text-xs font-semibold"
                >
                  <Building2 className="size-4 text-primary" />
                  <span>Register Institution</span>
                </Button>
                <Button asChild size="sm" className="h-9 shadow-xs text-xs font-semibold">
                  <Link href="/dashboard/academics/attendance">
                    <CalendarCheck className="mr-1.5 size-4" />
                    Take Attendance
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Admin KPI Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Total Enrolled Students
                </CardTitle>
                <div className="p-2 rounded-lg text-blue-600 bg-blue-500/10">
                  <GraduationCap className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">1,428</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="size-3 text-emerald-600 inline" />
                  +4.2% from last academic term
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Faculty &amp; Staff Members
                </CardTitle>
                <div className="p-2 rounded-lg text-emerald-600 bg-emerald-500/10">
                  <Users className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">96</div>
                <p className="text-xs text-muted-foreground mt-1">
                  100% active academic departments
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Today&apos;s Attendance Rate
                </CardTitle>
                <div className="p-2 rounded-lg text-amber-600 bg-amber-500/10">
                  <CalendarCheck className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">96.4%</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 text-emerald-600">
                  <TrendingUp className="size-3 inline" />
                  1,376 students present in morning roll
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Term Fee Collection (₦ &amp; $)
                </CardTitle>
                <div className="p-2 rounded-lg text-purple-600 bg-purple-500/10">
                  <CreditCard className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">₦576.3M</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Approx. <strong>$384,200 USD</strong> (88% of target)
                </p>
              </CardContent>
            </Card>
          </div>

          {/* ATTENDANCE TRENDS BARCHART (COMPARING DAILY ATTENDANCE OVER PAST WEEK) */}
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                      <BarChart3 className="size-4" />
                    </div>
                    <CardTitle className="text-base sm:text-lg font-bold">
                      Class Attendance Trends: Daily Rates Over Past Week
                    </CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    Comparing daily attendance percentages and headcounts from Monday to Friday across all grades
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-emerald-300 text-emerald-600 bg-emerald-500/10 text-xs font-semibold">
                    96.9% Weekly Average
                  </Badge>
                  <Badge variant="outline" className="text-xs text-muted-foreground">
                    Peak: Thursday (98.1%)
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {/* Daily attendance summary badges */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {pastWeekAttendance.map((d) => (
                  <div key={d.day} className="p-2.5 rounded-lg border border-border/60 bg-muted/20 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      {d.day}
                    </span>
                    <span className="text-lg font-bold text-foreground block mt-0.5">
                      {d.rate}%
                    </span>
                    <span className="text-[10px] text-muted-foreground block">
                      {d.present} / {d.present + d.absent}
                    </span>
                  </div>
                ))}
              </div>

              {/* RECHARTS BARCHART */}
              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={pastWeekAttendance}
                    margin={{ top: 15, right: 15, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" vertical={false} />
                    <XAxis
                      dataKey="shortDay"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={[90, 100]}
                      tickFormatter={(val) => `${val}%`}
                    />
                    <Tooltip content={<CustomAttendanceTooltip />} />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{ paddingBottom: "10px", fontSize: "12px" }}
                    />
                    <ReferenceLine
                      y={95}
                      stroke="#10b981"
                      strokeDasharray="4 4"
                      label={{ value: "Target 95%", position: "right", fill: "#10b981", fontSize: 10 }}
                    />
                    <Bar
                      dataKey="rate"
                      name="Daily Attendance Rate (%)"
                      fill="var(--color-primary, #ea580c)"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={55}
                    >
                      {pastWeekAttendance.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.rate >= 97 ? "var(--color-primary, #ea580c)" : "#f97316"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* RECHARTS FINANCIAL OVERSIGHT: Monthly Fee Collection Trends */}
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                      <DollarSign className="size-4" />
                    </div>
                    <CardTitle className="text-base sm:text-lg font-bold">
                      Monthly Fee Collection Trends (Last 6 Months)
                    </CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    Financial oversight: Actual fee collections vs. targeted institutional budgets across terms
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-emerald-300 text-emerald-600 bg-emerald-500/10 text-xs font-semibold">
                    ₦576M / $384k Collected
                  </Badge>
                  <Badge variant="outline" className="text-xs text-muted-foreground">
                    Term 1 &ndash; Term 2
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyFeeTrends}
                    margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
                    <XAxis
                      dataKey="month"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(val) => `$${val / 1000}k`}
                      domain={[280000, 480000]}
                    />
                    <Tooltip content={<CustomFeeTooltip />} />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{ paddingBottom: "12px", fontSize: "12px" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="collected"
                      name="Collected Fees"
                      stroke="var(--color-primary, #ea580c)"
                      strokeWidth={3}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                      dot={{ r: 4, fill: "var(--color-primary, #ea580c)", strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      name="Target Fees"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      activeDot={{ r: 5 }}
                      dot={{ r: 3, fill: "#f59e0b" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Operational Quick Actions Launchpad */}
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Cresta Administrative Quick Actions</CardTitle>
              <CardDescription className="text-xs">
                Direct shortcuts to daily campus management modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {adminQuickActions.map((action) => {
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

          {/* Class Attendance with Export to PDF & CSV */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 border-border shadow-xs">
              <CardHeader className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-semibold">Today&apos;s Class Attendance</CardTitle>
                    <Badge variant="outline" className="text-xs font-normal">
                      1,376 / 1,428 present
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Real-time morning roll call status &bull; Official daily institutional record
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportCSV}
                    className="h-8 text-xs gap-1.5 hover:bg-primary/5 hover:text-primary"
                    title="Download class attendance report as CSV spreadsheet"
                  >
                    <Download className="size-3.5" />
                    <span>Export to CSV</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportPDF}
                    className="h-8 text-xs gap-1.5 hover:bg-primary/5 hover:text-primary"
                    title="Download or print official class attendance report as PDF"
                  >
                    <FileText className="size-3.5" />
                    <span>Export to PDF</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="divide-y divide-border/60">
                  {classAttendanceSummary.map((item) => {
                    const percent = Math.round((item.present / item.total) * 100)
                    return (
                      <div key={item.grade} className="py-2.5 flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <p className="text-xs font-semibold leading-none text-foreground">{item.grade}</p>
                          <p className="text-xs text-muted-foreground">Class Teacher: {item.teacher}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium w-14 text-right">
                            {item.present}/{item.total} <span className="text-[10px] text-muted-foreground">({percent}%)</span>
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Campus Bulletins & Database Link */}
            <Card className="lg:col-span-3 border-border shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base font-semibold">Campus Bulletins</CardTitle>
                  <CardDescription className="text-xs">Cresta communication dispatch &amp; notices</CardDescription>
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
                  <Database className="size-4 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-foreground">Neon PostgreSQL Database Collection</p>
                    <p className="text-[11px] text-muted-foreground">
                      All new institution requests are persisted and ready to sync to your Neon Database instance.
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => setInstitutionModalOpen(true)}
                      className="p-0 h-auto text-xs text-primary font-bold inline-flex items-center gap-1"
                    >
                      <span>View database requests</span>
                      <ArrowUpRight className="size-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. TEACHER PERSPECTIVE */}
      {/* ========================================================= */}
      {role === "teacher" && (
        <div className="space-y-6">
          {/* Teacher Welcome Banner */}
          <div className="rounded-xl border border-emerald-500/30 bg-linear-to-r from-emerald-500/10 via-card to-background p-5 shadow-xs">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-emerald-400 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold text-xs">
                    <GraduationCap className="size-3 mr-1" />
                    Teacher Faculty Workspace
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium">Grade 10 Lead &bull; Science Department</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Welcome back, Ms. Helena Brooks
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Today is Wednesday, Sep 30 &bull; 4 Teaching Periods Scheduled &bull; Next Class: Biology Lab (10:15 AM)
                </p>
              </div>
              <Button onClick={saveRollCall} className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs h-9">
                <Check className="size-4" />
                <span>Save Today&apos;s Class Attendance</span>
              </Button>
            </div>
          </div>

          {/* Teacher KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Today&apos;s Class Attendance</CardTitle>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
                  <CalendarCheck className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">38 / 40 (95%)</div>
                <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="size-3" /> Roll call in progress
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Scheduled Periods</CardTitle>
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                  <Clock className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">4 Classes</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Biology, Chemistry Lab, Physics
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Assignments to Grade</CardTitle>
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
                  <BookOpen className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">18 Pending</div>
                <p className="text-xs text-amber-600 mt-1 font-medium">
                  Term 2 Chemistry Lab Reports
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Parent Messages</CardTitle>
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600">
                  <MessageSquare className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">2 Inquiries</div>
                <p className="text-xs text-purple-600 mt-1">
                  Mrs. Adeyemi &bull; Mr. Okeke
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Teacher Interactive Attendance Roll Call & Weekly Trend BarChart */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Interactive Class Roll Call */}
            <Card className="lg:col-span-7 border-border shadow-xs">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold">Grade 10-A: Quick Attendance Roll</CardTitle>
                    <CardDescription className="text-xs">
                      Click status button to toggle Present / Absent / Late for each student
                    </CardDescription>
                  </div>
                  <Button size="sm" onClick={saveRollCall} className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700">
                    Save Roll
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="divide-y">
                  {teacherRoll.map((student) => (
                    <div key={student.id} className="py-2.5 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedStudentForModal(student.name)}
                        className="text-left group cursor-pointer transition-colors"
                        title={`Click to view ${student.name}'s comprehensive academic profile`}
                      >
                        <span className="font-bold text-foreground text-sm group-hover:text-primary group-hover:underline flex items-center gap-1.5">
                          {student.name}
                          <ExternalLink className="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
                        </span>
                        <p className="text-[11px] text-muted-foreground">
                          {student.note} &bull; <span className="text-primary font-medium hover:underline">View Academic Profile</span>
                        </p>
                      </button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={student.status === "present" ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleStudentStatus(student.id)}
                          className={`h-7 text-[11px] px-2.5 ${
                            student.status === "present"
                              ? "bg-emerald-600 text-white hover:bg-emerald-700"
                              : student.status === "absent"
                              ? "border-destructive text-destructive bg-destructive/10"
                              : "border-amber-500 text-amber-600 bg-amber-500/10"
                          }`}
                        >
                          {student.status === "present" ? "✓ Present" : student.status === "absent" ? "✕ Absent" : "⏱ Late"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Grade 10-A Attendance Rates BarChart */}
            <Card className="lg:col-span-5 border-border shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold">Grade 10-A Weekly Attendance Rate</CardTitle>
                <CardDescription className="text-xs">
                  Daily attendance comparison over the past 5 school days
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={teacherClassAttendance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" vertical={false} />
                      <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} domain={[90, 100]} />
                      <Tooltip content={<CustomAttendanceTooltip />} />
                      <Bar dataKey="rate" name="Grade 10-A Rate (%)" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-300 text-xs flex justify-between">
                  <span className="text-emerald-800 dark:text-emerald-300 font-medium">Weekly Class Average:</span>
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">97.0%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Teacher Daily Timetable */}
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Today&apos;s Class Timetable</CardTitle>
              <CardDescription className="text-xs">Daily instructional periods and lab rotations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-4">
                <div className="p-3 rounded-lg border border-emerald-400 bg-emerald-500/5">
                  <Badge className="bg-emerald-600 text-white text-[10px]">08:30 - 09:30 AM</Badge>
                  <p className="font-bold text-sm text-foreground mt-2">Grade 10-A Biology</p>
                  <p className="text-xs text-muted-foreground">Cellular Genetics &bull; Room 204</p>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">✓ Completed</span>
                </div>
                <div className="p-3 rounded-lg border border-primary bg-primary/5">
                  <Badge className="bg-primary text-primary-foreground text-[10px]">10:15 - 11:45 AM</Badge>
                  <p className="font-bold text-sm text-foreground mt-2">Chemistry Practical Lab</p>
                  <p className="text-xs text-muted-foreground">Grade 11 Science &bull; Lab #2</p>
                  <span className="text-[10px] text-primary font-semibold mt-1 inline-block">● Next Class</span>
                </div>
                <div className="p-3 rounded-lg border bg-muted/20">
                  <Badge variant="outline" className="text-[10px]">01:00 - 02:00 PM</Badge>
                  <p className="font-bold text-sm text-foreground mt-2">Physics Tutorial</p>
                  <p className="text-xs text-muted-foreground">Grade 10-B &bull; Room 208</p>
                  <span className="text-[10px] text-muted-foreground mt-1 inline-block">Upcoming</span>
                </div>
                <div className="p-3 rounded-lg border bg-muted/20">
                  <Badge variant="outline" className="text-[10px]">02:30 - 03:30 PM</Badge>
                  <p className="font-bold text-sm text-foreground mt-2">STEM Mentorship</p>
                  <p className="text-xs text-muted-foreground">Science Club &bull; Innovation Hall</p>
                  <span className="text-[10px] text-muted-foreground mt-1 inline-block">Upcoming</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. PARENT PERSPECTIVE */}
      {/* ========================================================= */}
      {role === "parent" && (
        <div className="space-y-6">
          {/* Parent Welcome Banner */}
          <div className="rounded-xl border border-purple-500/30 bg-linear-to-r from-purple-500/10 via-card to-background p-5 shadow-xs">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-purple-400 bg-purple-500/10 text-purple-700 dark:text-purple-300 font-semibold text-xs">
                    <Users className="size-3 mr-1" />
                    Cresta Parent &amp; Guardian Portal
                  </Badge>
                  <span className="text-xs text-muted-foreground">Guardian: Chief &amp; Mrs. Babatunde Adeyemi</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {activeChild} &bull; Academic Progress
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Oakridge International Academy &bull; Student ID: CRST-STU-8821 &bull; Class Teacher: Ms. Helena Brooks
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => setParentPaymentOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs h-9 gap-1.5 shadow-xs"
                >
                  <CreditCard className="size-3.5" />
                  <span>Pay School Fees (₦ / $)</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Child Quick Metrics */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Child Attendance Rate</CardTitle>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
                  <CalendarCheck className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight text-emerald-600">98.4%</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <CheckCircle2 className="size-3 text-emerald-600" />
                  Only 1 excused absence this term
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Cumulative Grade / GPA</CardTitle>
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                  <Award className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">3.88 / 4.0 (A)</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Ranked 3rd in Grade 10-A
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Tuition Fee (Naira / USD)</CardTitle>
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600">
                  <CreditCard className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight text-emerald-600">₦120,000</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Paid &bull; Receipt #OAK-2026-8812
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Pending Ancillary Fee</CardTitle>
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
                  <AlertCircle className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight text-amber-600">₦35,000</div>
                <p className="text-xs text-amber-600 mt-1 font-medium">
                  Bus Route #4 Due in 5 days
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Child Weekly Attendance BarChart & Term Fee Invoicing in Naira & Dollars */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Child Weekly Attendance BarChart */}
            <Card className="lg:col-span-6 border-border shadow-xs">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold">Past Week Attendance Record</CardTitle>
                    <CardDescription className="text-xs">
                      Daily morning roll call and punctuality for {activeChild}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-300 bg-emerald-500/10">
                    Perfect Streak (98.4%)
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { day: "Mon", status: "Present", val: 100, note: "On time (07:45 AM)" },
                        { day: "Tue", status: "Present", val: 100, note: "On time (07:50 AM)" },
                        { day: "Wed", status: "Present", val: 100, note: "On time (07:40 AM)" },
                        { day: "Thu", status: "Present", val: 100, note: "On time (07:52 AM)" },
                        { day: "Fri", status: "Present", val: 100, note: "On time (07:45 AM)" },
                      ]}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" vertical={false} />
                      <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis domain={[0, 100]} stroke="#888888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                      <Tooltip />
                      <Bar dataKey="val" name="Daily Attendance" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={45} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="divide-y text-xs">
                  <div className="py-2 flex justify-between">
                    <span className="text-muted-foreground">Today (Wednesday):</span>
                    <span className="font-semibold text-emerald-600">✓ Present &bull; Roll Verified by Ms. Brooks</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-muted-foreground">Arrival Time:</span>
                    <span className="font-medium text-foreground">07:42 AM (School gate biometric sync)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* School Fee Invoices (Naira & Dollars) */}
            <Card className="lg:col-span-6 border-border shadow-xs">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold">Term Fee Billing (Naira &amp; Dollars)</CardTitle>
                    <CardDescription className="text-xs">
                      Official student invoices, tuition, and payments
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs font-semibold">
                    Term 2 &bull; 2026/2027
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="divide-y rounded-lg border p-3 bg-muted/20">
                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-sm text-foreground">2nd Term Senior Tuition</span>
                      <p className="text-xs text-muted-foreground">Includes STEM lab &amp; digital textbook access</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-sm block">₦120,000 (~$80 USD)</span>
                      <Badge className="bg-emerald-600 text-white text-[10px] mt-0.5">PAID</Badge>
                    </div>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-sm text-foreground">School Bus Shuttle (Route #4)</span>
                      <p className="text-xs text-muted-foreground">Victoria Island &bull; Term 2 Transportation</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-sm block text-amber-600">₦35,000 (~$25 USD)</span>
                      <Badge variant="outline" className="border-amber-400 text-amber-600 text-[10px] mt-0.5">DUE</Badge>
                    </div>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-sm text-foreground">Annual PTA Development Levy</span>
                      <p className="text-xs text-muted-foreground">Campus sports complex &amp; solar backup</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-sm block">₦15,000 (~$10 USD)</span>
                      <Badge className="bg-emerald-600 text-white text-[10px] mt-0.5">PAID</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => {
                      toast.success("Receipt downloaded: REC-OAK-2026-8812.pdf", {
                        description: "Tuition payment of ₦120,000 verified.",
                      })
                    }}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs gap-1.5"
                  >
                    <Download className="size-3.5" />
                    <span>Download Receipts</span>
                  </Button>
                  <Button
                    onClick={() => setParentPaymentOpen(true)}
                    size="sm"
                    className="flex-1 text-xs bg-purple-600 hover:bg-purple-700 text-white gap-1.5"
                  >
                    <CreditCard className="size-3.5" />
                    <span>Pay Pending ₦35,000</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Academic Report Card & Direct Communication with Teacher */}
          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-7 border-border shadow-xs">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base font-bold">Academic Performance &amp; Subject Grades</CardTitle>
                <CardDescription className="text-xs">
                  Mid-term continuous assessment scores &bull; Grade 10-A
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {[
                    { subject: "Mathematics", score: 94, grade: "A+", remarks: "Outstanding problem solving" },
                    { subject: "Physics", score: 92, grade: "A", remarks: "Excellent lab experimental work" },
                    { subject: "Biology", score: 95, grade: "A+", remarks: "Highest score in Grade 10-A" },
                    { subject: "Chemistry", score: 88, grade: "B+", remarks: "Strong conceptual grasp" },
                    { subject: "English Language", score: 90, grade: "A", remarks: "Great essay composition" },
                  ].map((sub) => (
                    <div key={sub.subject} className="flex items-center justify-between text-xs py-1.5 border-b border-border/40">
                      <div>
                        <span className="font-semibold text-foreground text-sm">{sub.subject}</span>
                        <p className="text-[11px] text-muted-foreground">{sub.remarks}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-muted rounded-full h-2 overflow-hidden hidden sm:block">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${sub.score}%` }} />
                        </div>
                        <span className="font-bold text-foreground text-sm">{sub.score}%</span>
                        <Badge variant="outline" className="border-purple-300 text-purple-700 dark:text-purple-300 text-xs w-8 justify-center">
                          {sub.grade}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-5 border-border shadow-xs">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base font-bold">Message Class Teacher</CardTitle>
                <CardDescription className="text-xs">
                  Direct message to Ms. Helena Brooks (Senior Science)
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="p-3 rounded-lg bg-muted/40 border text-xs space-y-1">
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>Ms. Helena Brooks (Teacher)</span>
                    <span className="text-[10px] text-muted-foreground">Yesterday, 4:15 PM</span>
                  </div>
                  <p className="text-muted-foreground">
                    &ldquo;Samuel performed exceptionally well in today&apos;s Genetics quiz. Please ensure he prepares for the upcoming Science Exhibition.&rdquo;
                  </p>
                </div>

                <form onSubmit={handleSendTeacherMessage} className="space-y-2 pt-2">
                  <Input
                    value={parentMessageText}
                    onChange={(e) => setParentMessageText(e.target.value)}
                    placeholder="Write a message to Ms. Brooks..."
                    className="text-xs h-9"
                  />
                  <Button type="submit" size="sm" className="w-full text-xs gap-1.5 bg-purple-600 hover:bg-purple-700 text-white">
                    <Send className="size-3.5" />
                    <span>Send Message to Teacher</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* PARENT PAYMENT MODAL */}
      {parentPaymentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <Card className="max-w-md w-full border-border shadow-xl">
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-base font-bold">School Fee Payment Portal</CardTitle>
              <CardDescription className="text-xs">
                Cresta Instant Payment Gateway &bull; Card / Bank Transfer / USSD
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-300 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student:</span>
                  <span className="font-bold text-foreground">{activeChild}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Item:</span>
                  <span className="font-semibold text-foreground">School Bus Shuttle (Route #4)</span>
                </div>
                <div className="flex justify-between pt-1 border-t text-sm">
                  <span className="font-bold text-foreground">Amount:</span>
                  <span className="font-extrabold text-purple-700 dark:text-purple-300">
                    ₦35,000 (~$25 USD)
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-semibold text-muted-foreground">Select Payment Method:</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 border rounded-md text-center bg-card font-semibold cursor-pointer hover:border-primary">
                    Paystack / Card
                  </div>
                  <div className="p-2 border rounded-md text-center bg-card font-semibold cursor-pointer hover:border-primary">
                    Bank Transfer
                  </div>
                  <div className="p-2 border rounded-md text-center bg-card font-semibold cursor-pointer hover:border-primary">
                    USD Card ($)
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setParentPaymentOpen(false)}
                  className="flex-1 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setParentPaymentOpen(false)
                    toast.success("Payment of ₦35,000 Successful!", {
                      description: "Receipt REC-BUS-2026-902 generated & sent to guardian email.",
                    })
                  }}
                  className="flex-1 text-xs bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                >
                  Authorize ₦35,000
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CREATE INSTITUTION MODAL */}
      <CreateInstitutionDialog
        open={institutionModalOpen}
        onOpenChange={setInstitutionModalOpen}
      />

      {/* INTERACTIVE STUDENT PROFILE MODAL */}
      <StudentProfileDialog
        studentName={selectedStudentForModal}
        open={!!selectedStudentForModal}
        onOpenChange={(open) => !open && setSelectedStudentForModal(null)}
      />
    </div>
  )
}
