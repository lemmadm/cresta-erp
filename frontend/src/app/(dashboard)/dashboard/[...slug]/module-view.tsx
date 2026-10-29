"use client"

import * as React from "react"
import Link from "next/link"
import {
  MessageSquare,
  Smartphone,
  Building2,
  Send,
  Download,
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  UploadCloud,
  FileCheck,
  ExternalLink,
  FileText,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Input } from "~/components/ui/input"
import { CreateInstitutionDialog } from "~/components/create-institution-dialog"
import { AcademicCalendarView } from "~/components/academic-calendar-view"
import { StudentProfileDialog } from "~/components/student-profile-dialog"
import {
  BankTransferUploaderDialog,
  BankTransferSubmission,
} from "~/components/bank-transfer-uploader-dialog"
import {
  BursarApprovalQueueDialog,
  INITIAL_BURSAR_SUBMISSIONS,
} from "~/components/bursar-approval-queue-dialog"
import { OfficialReportCardDialog } from "~/components/official-report-card-dialog"
import { NewGradeEntryDialog } from "~/components/new-grade-entry-dialog"
import { TeacherWeeklyCalendarView } from "~/components/teacher-weekly-calendar-view"
import { HostelExeatSystem } from "~/components/hostel-exeat-system"
import { TransportRouteManifest } from "~/components/transport-route-manifest"
import { StudentEnrolmentDialog } from "~/components/student-enrolment-dialog"
import { Award, Hotel, Bus, UserPlus } from "lucide-react"

interface ModuleViewProps {
  slug: string[]
}

export function ModuleView({ slug }: ModuleViewProps) {
  const fullPath = slug.join("/")
  const section = slug[0] || "overview"

  const [searchQuery, setSearchQuery] = React.useState("")
  const [instModalOpen, setInstModalOpen] = React.useState(false)
  const [selectedStudentForModal, setSelectedStudentForModal] = React.useState<string | null>(null)
  const [bursarQueueOpen, setBursarQueueOpen] = React.useState(false)
  const [bankTransferOpen, setBankTransferOpen] = React.useState(false)
  const [reportCardStudent, setReportCardStudent] = React.useState<string | null>(null)
  const [bursarSubmissions, setBursarSubmissions] = React.useState<BankTransferSubmission[]>(INITIAL_BURSAR_SUBMISSIONS)
  const [gradeEntryOpen, setGradeEntryOpen] = React.useState(false)
  const [gradeEntrySubject, setGradeEntrySubject] = React.useState("Biology")
  const [gradeEntryClass, setGradeEntryClass] = React.useState("Grade 10-A (SSS 1)")
  const [enrolmentDialogOpen, setEnrolmentDialogOpen] = React.useState(false)

  const handleOpenGradeEntry = (subject?: string, classArm?: string) => {
    if (subject) setGradeEntrySubject(subject)
    if (classArm) setGradeEntryClass(classArm)
    setGradeEntryOpen(true)
  }

  const handleApproveTransfer = (id: string) => {
    setBursarSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "verified_paid" } : s))
    )
    setFeeInvoices((prev) =>
      prev.map((inv) =>
        inv.id === "INV-2026-083" || inv.id === "INV-2026-085"
          ? { ...inv, status: "Paid", verified: true }
          : inv
      )
    )
  }

  const handleRejectTransfer = (id: string, reason: string) => {
    setBursarSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "rejected", rejectionReason: reason } : s))
    )
  }

  const handleNewTransferSubmission = (newSub: BankTransferSubmission) => {
    setBursarSubmissions((prev) => [newSub, ...prev])
  }

  // Zero-Cost Click-to-WhatsApp (wa.me) State
  const [whatsAppRecipientPhone, setWhatsAppRecipientPhone] = React.useState("2348031112233")
  const [whatsAppRecipientName, setWhatsAppRecipientName] = React.useState("Mr. & Mrs. Adeyemi (Samuel's Guardian)")
  const [whatsAppTemplate, setWhatsAppTemplate] = React.useState("fee_reminder")
  const [whatsAppCustomText, setWhatsAppCustomText] = React.useState(
    "Dear Parent/Guardian, this is an official update from Oakridge International Academy. Please be reminded that 2nd Term ancillary fees (₦35,000) for Samuel Adeyemi are due. Payment can be transferred directly to GTBank: 0123456789. Thank you."
  )

  // Direct Click-to-WhatsApp generator (Zero Meta API cost, Zero SMS fee)
  const handleOpenFreeWhatsApp = () => {
    const cleanPhone = whatsAppRecipientPhone.replace(/[^0-9]/g, "")
    const encoded = encodeURIComponent(whatsAppCustomText)
    const waUrl = `https://wa.me/${cleanPhone}?text=${encoded}`
    
    // Open WhatsApp Web / Mobile app with pre-filled message
    window.open(waUrl, "_blank")
    toast.success("Opening Free WhatsApp Chat (Zero API Cost)", {
      description: `Dispatched via wa.me protocol to ${whatsAppRecipientName} (${cleanPhone}).`,
    })
  }

  // Attendance quick mark state
  const [attendanceRecords, setAttendanceRecords] = React.useState([
    { id: "STU-001", name: "Samuel Adeyemi", class: "Grade 10A (SSS 1)", status: "present", time: "07:42 AM", phone: "2348031112233" },
    { id: "STU-002", name: "Aisha Bello", class: "Grade 10A (SSS 1)", status: "present", time: "07:45 AM", phone: "2348023334455" },
    { id: "STU-003", name: "Chinedu Okeke", class: "Grade 10A (SSS 1)", status: "present", time: "07:48 AM", phone: "2348095556677" },
    { id: "STU-004", name: "Zainab Ibrahim", class: "Grade 10A (SSS 1)", status: "late", time: "08:15 AM", phone: "2348137778899" },
    { id: "STU-005", name: "David Adeleke", class: "Grade 10A (SSS 1)", status: "absent", time: "—", phone: "2348059990011" },
    { id: "STU-006", name: "Blessing Eze", class: "Grade 10A (SSS 1)", status: "present", time: "07:50 AM", phone: "2348072223344" },
  ])

  const toggleAttendance = (id: string) => {
    setAttendanceRecords((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const next = r.status === "present" ? "absent" : r.status === "absent" ? "late" : "present"
          return { ...r, status: next }
        }
        return r
      })
    )
  }

  // Fees / Invoices Mock Data (with Bank Slip Upload Verification)
  const [feeInvoices, setFeeInvoices] = React.useState([
    { id: "INV-2026-081", student: "Samuel Adeyemi", class: "Grade 10A", feeType: "2nd Term Senior Tuition", amountNGN: "₦120,000", amountUSD: "$80", status: "Paid", channel: "Direct Transfer (GTBank)", verified: true },
    { id: "INV-2026-082", student: "Aisha Bello", class: "Grade 10A", feeType: "2nd Term Senior Tuition", amountNGN: "₦120,000", amountUSD: "$80", status: "Paid", channel: "Bank Teller (Zenith Bank)", verified: true },
    { id: "INV-2026-083", student: "Chinedu Okeke", class: "Grade 10A", feeType: "2nd Term Senior Tuition", amountNGN: "₦120,000", amountUSD: "$80", status: "Pending Verification", channel: "Uploaded Bank Slip", verified: false },
    { id: "INV-2026-084", student: "Zainab Ibrahim", class: "Grade 10A", feeType: "2nd Term Senior Tuition", amountNGN: "₦120,000", amountUSD: "$80", status: "Pending", channel: "Awaiting Transfer", verified: false },
    { id: "INV-2026-085", student: "David Adeleke", class: "Grade 10A", feeType: "School Bus Route #4", amountNGN: "₦35,000", amountUSD: "$25", status: "Overdue", channel: "wa.me Notice Sent", verified: false },
  ])

  const handleVerifyBankSlip = (id: string) => {
    setFeeInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "Paid", verified: true } : inv))
    )
    toast.success("Bank Transfer Slip Verified!", {
      description: `Invoice ${id} marked as Paid. Official receipt generated.`,
    })
  }

  // Nigerian Grading CA BroadSheet Data
  const [examRecords] = React.useState([
    { id: "1", student: "Samuel Adeyemi", subject: "Further Mathematics", ca1: 9, ca2: 10, midTerm: 19, exam: 56, total: 94, grade: "A1", remark: "Distinction" },
    { id: "2", student: "Aisha Bello", subject: "Chemistry & STEM", ca1: 8, ca2: 9, midTerm: 18, exam: 54, total: 89, grade: "A1", remark: "Distinction" },
    { id: "3", student: "Chinedu Okeke", subject: "Physics", ca1: 8, ca2: 8, midTerm: 17, exam: 52, total: 85, grade: "A1", remark: "Distinction" },
    { id: "4", student: "Zainab Ibrahim", subject: "English Language", ca1: 7, ca2: 8, midTerm: 16, exam: 48, total: 79, grade: "B2", remark: "Very Good" },
    { id: "5", student: "David Adeleke", subject: "Biology", ca1: 7, ca2: 7, midTerm: 15, exam: 45, total: 74, grade: "B3", remark: "Good" },
  ])

  const filteredAttendance = attendanceRecords.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.class.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isCommunicationModule = fullPath.includes("communication") || fullPath.includes("outreach") || fullPath.includes("messages")
  const isFinanceModule = fullPath.includes("finance") || fullPath.includes("fees") || fullPath.includes("payments") || fullPath.includes("invoices")
  const isAcademicsModule = fullPath.includes("academics") || fullPath.includes("attendance") || fullPath.includes("exams") || fullPath.includes("classes")
  const isHostelModule = fullPath.includes("hostel") || fullPath.includes("boarding") || fullPath.includes("exeat")
  const isTransportModule = fullPath.includes("transport") || fullPath.includes("vehicles") || fullPath.includes("routes") || fullPath.includes("stops") || fullPath.includes("manifest")
  const isAdmissionModule = fullPath.includes("admission") || fullPath.includes("enrollment") || fullPath.includes("inquiries") || fullPath.includes("registration")

  const title = slug
    .map((s) => s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "))
    .join(" · ")

  return (
    <div className="space-y-6">
      {/* Module Header Ribbon */}
      <div className="rounded-xl border border-primary/20 bg-linear-to-r from-primary/10 via-card to-background p-5 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-semibold text-primary border-primary/40">
                Cresta-ERP &bull; {section.toUpperCase()}
              </Badge>
              <span className="text-xs text-muted-foreground font-medium">
                Cost-Saving Implementation &bull; Zero Recurring Telecom Fees
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Campus: Oakridge International Academy &bull; Academic Term: 2nd Term 2026/2027 &bull; Neon DB Synced
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              onClick={() => setEnrolmentDialogOpen(true)}
              className="text-xs gap-1.5 h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              <UserPlus className="size-3.5" />
              <span>New Admission</span>
            </Button>
            <Button
              asChild
              variant={isHostelModule ? "default" : "outline"}
              size="sm"
              className="text-xs gap-1.5 h-9"
            >
              <Link href="/dashboard/operations/campus/hostel/exeat">
                <Hotel className="size-3.5 text-primary" />
                <span>Hostel Exeats</span>
              </Link>
            </Button>
            <Button
              asChild
              variant={isTransportModule ? "default" : "outline"}
              size="sm"
              className="text-xs gap-1.5 h-9"
            >
              <Link href="/dashboard/operations/campus/transport/manifest">
                <Bus className="size-3.5 text-primary" />
                <span>Transport Routes</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInstModalOpen(true)}
              className="text-xs gap-1.5 h-9"
            >
              <Building2 className="size-3.5 text-primary" />
              <span>Create Institution</span>
            </Button>
            <Button asChild size="sm" variant="ghost" className="text-xs gap-1.5 h-9">
              <Link href="/dashboard">
                <ArrowRight className="size-3.5" />
                <span>Overview</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. COST-SAVING CLICK-TO-WHATSAPP (wa.me) PROTOCOL HUB         */}
      {/* ------------------------------------------------------------- */}
      {isCommunicationModule && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-emerald-200 dark:border-emerald-900/50 bg-emerald-500/5 shadow-xs">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    Free Click-to-WhatsApp (wa.me)
                  </span>
                  <Smartphone className="size-4 text-emerald-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">₦0.00 Cost</div>
                <p className="text-xs text-muted-foreground mt-1">Zero Meta API subscription or per-message fees</p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">Parent Web Portal (PWA)</span>
                  <MessageSquare className="size-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100% In-App</div>
                <p className="text-xs text-muted-foreground mt-1">Free push notifications without telecom SMS deductions</p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">Tamper-Proof QR Code</span>
                  <ShieldCheck className="size-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Offline Verify</div>
                <p className="text-xs text-muted-foreground mt-1">Zero third-party paper verification charges</p>
              </CardContent>
            </Card>
          </div>

          {/* Cost-Saving Click-to-WhatsApp Dispatcher Studio */}
          <Card className="border-border shadow-xs">
            <CardHeader className="border-b pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <Smartphone className="size-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold">
                      Zero-Cost Click-to-WhatsApp Dispatcher (`wa.me` Protocol)
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Dispatches direct 1-click personalized messages via standard WhatsApp web/app intent links. No API fees, no subscriptions.
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-emerald-600 text-white text-[10px]">
                  100% Free wa.me Protocol
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Parent / Guardian Contact</label>
                  <select
                    value={whatsAppRecipientPhone}
                    onChange={(e) => {
                      setWhatsAppRecipientPhone(e.target.value)
                      const found = attendanceRecords.find((s) => s.phone === e.target.value)
                      if (found) {
                        setWhatsAppRecipientName(`${found.name}'s Guardian`)
                      }
                    }}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs"
                  >
                    <option value="2348031112233">Mr. Babatunde Adeyemi (+234 803 111 2233)</option>
                    <option value="2348023334455">Mrs. Aisha Bello Guardian (+234 802 333 4455)</option>
                    <option value="2348095556677">Mr. Chinedu Okeke Guardian (+234 809 555 6677)</option>
                    <option value="2348137778899">Alhaji Ibrahim (+234 813 777 8899)</option>
                    <option value="2348059990011">Chief Adeleke (+234 805 999 0011)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Message Type Template</label>
                  <select
                    value={whatsAppTemplate}
                    onChange={(e) => {
                      setWhatsAppTemplate(e.target.value)
                      if (e.target.value === "fee_reminder") {
                        setWhatsAppCustomText(
                          `Dear Parent/Guardian, this is an official fee reminder from Oakridge International Academy. Please be reminded that 2nd Term ancillary fees (₦35,000) for your ward are due. Direct transfer to GTBank: 0123456789. Thank you.`
                        )
                      } else if (e.target.value === "gate_arrival") {
                        setWhatsAppCustomText(
                          `Gate Attendance Notice: Your child arrived safely at Oakridge International Academy at 07:42 AM today (Wednesday). Morning roll call verified.`
                        )
                      } else if (e.target.value === "exam_result") {
                        setWhatsAppCustomText(
                          `Dear Parent, Continuous Assessment (CA) and Term 2 examination results are now published. View the official verified report card online on the Cresta portal.`
                        )
                      }
                    }}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs"
                  >
                    <option value="fee_reminder">Fee Due Notice with Bank Details (₦)</option>
                    <option value="gate_arrival">Morning Roll Call / Gate Check-in Alert</option>
                    <option value="exam_result">Report Card &amp; Results Release Notice</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Estimated Telecom Cost</label>
                  <div className="h-9 flex items-center px-3 rounded-md bg-muted/40 border text-xs font-bold text-emerald-600">
                    ₦0.00 (No API, No SMS Deductions)
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Pre-Formatted WhatsApp Message Preview</label>
                <textarea
                  value={whatsAppCustomText}
                  onChange={(e) => setWhatsAppCustomText(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-input bg-background p-2.5 text-xs font-mono"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>Opens WhatsApp Web or mobile app with text pre-typed ready to send</span>
                </div>
                <Button
                  onClick={handleOpenFreeWhatsApp}
                  className="text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 h-9"
                >
                  <Send className="size-3.5" />
                  <span>Open Free WhatsApp Chat (`wa.me`)</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. COST-SAVING BANK SLIP UPLOAD & FEE COLLECTION WORKSPACE     */}
      {/* ------------------------------------------------------------- */}
      {isFinanceModule && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-4">
            <Card className="border-border shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Term Target (Naira)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦650.0M</div>
                <p className="text-xs text-muted-foreground mt-0.5">Budgeted 2nd Term</p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Collected (Naira)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">₦576.3M</div>
                <p className="text-xs text-emerald-600 mt-0.5 font-medium">88.6% Realization</p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Direct Bank Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">₦492.0M</div>
                <p className="text-xs text-muted-foreground mt-0.5">0% merchant processing fees</p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Bank Slips to Audit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">1 Pending</div>
                <p className="text-xs text-amber-600 mt-0.5 font-medium">1-Click Bursar Approval</p>
              </CardContent>
            </Card>
          </div>

          {/* Student Invoices & Bank Proof Reconciliation Table */}
          <Card className="border-border shadow-xs">
            <CardHeader className="border-b pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold">
                    Student Fee Ledger &amp; Bank Slip Reconciliation
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Supports direct bank deposits (GTB, Zenith, First Bank) with receipt upload verification to avoid online payment processor fees
                  </CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setBursarQueueOpen(true)}
                    className="h-8 text-xs gap-1.5 border-emerald-400 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold hover:bg-emerald-500/20"
                  >
                    <FileCheck className="size-3.5 text-emerald-600" />
                    <span>
                      Bursar Approvals ({bursarSubmissions.filter((s) => s.status === "pending_verification").length})
                    </span>
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => setBankTransferOpen(true)}
                    className="h-8 text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  >
                    <UploadCloud className="size-3.5" />
                    <span>Upload Bank Slip</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast.success("Bank teller reconciliation sheet exported to CSV!")
                    }}
                    className="h-8 text-xs gap-1.5"
                  >
                    <Download className="size-3.5" />
                    <span>Export Ledger</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b bg-muted/40 text-left font-semibold text-muted-foreground">
                      <th className="p-2.5">Invoice #</th>
                      <th className="p-2.5">Student Name</th>
                      <th className="p-2.5">Class / Arm</th>
                      <th className="p-2.5">Fee Category</th>
                      <th className="p-2.5 text-right">Amount (₦ / $)</th>
                      <th className="p-2.5">Payment Method</th>
                      <th className="p-2.5 text-center">Status</th>
                      <th className="p-2.5 text-center">Bursar Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {feeInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-muted/20">
                        <td className="p-2.5 font-mono text-[11px] font-semibold">{inv.id}</td>
                        <td className="p-2.5">
                          <button
                            type="button"
                            onClick={() => setSelectedStudentForModal(inv.student)}
                            className="text-left font-bold text-foreground hover:text-primary hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>{inv.student}</span>
                            <ExternalLink className="size-2.5 text-muted-foreground" />
                          </button>
                        </td>
                        <td className="p-2.5 text-muted-foreground">{inv.class}</td>
                        <td className="p-2.5">{inv.feeType}</td>
                        <td className="p-2.5 text-right font-bold">
                          {inv.amountNGN} <span className="text-[10px] text-muted-foreground">({inv.amountUSD})</span>
                        </td>
                        <td className="p-2.5 text-muted-foreground flex items-center gap-1.5">
                          {inv.channel.includes("Slip") ? (
                            <UploadCloud className="size-3.5 text-amber-600" />
                          ) : (
                            <FileCheck className="size-3.5 text-emerald-600" />
                          )}
                          <span>{inv.channel}</span>
                        </td>
                        <td className="p-2.5 text-center">
                          <Badge
                            variant="outline"
                            className={`text-[10px] py-0 ${
                              inv.status === "Paid"
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-300"
                                : inv.status === "Pending Verification"
                                ? "bg-amber-500/10 text-amber-600 border-amber-300"
                                : "bg-red-500/10 text-destructive border-red-300"
                            }`}
                          >
                            {inv.status}
                          </Badge>
                        </td>
                        <td className="p-2.5 text-center">
                          {inv.status === "Pending Verification" ? (
                            <div className="flex items-center justify-center gap-1.5">
                              <Button
                                size="sm"
                                onClick={() => setBursarQueueOpen(true)}
                                className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1 px-2 font-semibold"
                              >
                                <FileCheck className="size-3" />
                                <span>Audit</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleVerifyBankSlip(inv.id)}
                                className="h-7 text-xs border-emerald-400 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 px-2 font-semibold"
                                title="Instant 1-Click Verification"
                              >
                                Approve
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toast.success(`Official receipt for ${inv.id} with QR verification downloaded.`)}
                              className="h-7 text-xs text-primary font-semibold px-2"
                            >
                              QR Receipt
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. ACADEMICS & NIGERIAN CA GRADING WORKSPACE                  */}
      {/* ------------------------------------------------------------- */}
      {isAcademicsModule && (
        <div className="space-y-6">
          {/* Interactive Academic Calendar Component (Replaces basic list view) */}
          <AcademicCalendarView />

          <Card className="border-border shadow-xs">
            <CardHeader className="border-b pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-bold">
                      Continuous Assessment &amp; WAEC/NECO Broad Sheet
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px] border-primary/40 text-primary">
                      Grade 10A (SSS 1)
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Nigerian 4-tier assessment model (CA 1: 10%, CA 2: 10%, Mid-Term: 20%, Terminal Exam: 60% = 100%). Automated broadsheet calculations eliminate weeks of manual teacher grading.
                  </CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleOpenGradeEntry("Biology", "Grade 10-A (SSS 1)")}
                    className="h-8 text-xs gap-1.5 font-bold shadow-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Award className="size-3.5" />
                    <span>New Grade Entry</span>
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => setReportCardStudent("Samuel Adeyemi")}
                    className="h-8 text-xs gap-1.5 font-bold shadow-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <FileText className="size-3.5" />
                    <span>Official Report Card (PDF)</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success("Broad Sheet exported to official PDF report card template!")}
                    className="h-8 text-xs gap-1.5"
                  >
                    <Download className="size-3.5" />
                    <span>Export Broad Sheet</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b bg-muted/40 text-left font-semibold text-muted-foreground">
                      <th className="p-2.5">Student Name</th>
                      <th className="p-2.5">Subject</th>
                      <th className="p-2.5 text-center">CA 1 (10)</th>
                      <th className="p-2.5 text-center">CA 2 (10)</th>
                      <th className="p-2.5 text-center">Mid-Term (20)</th>
                      <th className="p-2.5 text-center">Exam (60)</th>
                      <th className="p-2.5 text-center font-bold">Total (100)</th>
                      <th className="p-2.5 text-center">WAEC Grade</th>
                      <th className="p-2.5">Remark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {examRecords.map((r) => (
                      <tr key={r.id} className="hover:bg-muted/20">
                        <td className="p-2.5">
                          <button
                            type="button"
                            onClick={() => setSelectedStudentForModal(r.student)}
                            className="text-left font-bold text-foreground hover:text-primary hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>{r.student}</span>
                            <ExternalLink className="size-2.5 text-muted-foreground" />
                          </button>
                        </td>
                        <td className="p-2.5 text-muted-foreground">{r.subject}</td>
                        <td className="p-2.5 text-center">{r.ca1}</td>
                        <td className="p-2.5 text-center">{r.ca2}</td>
                        <td className="p-2.5 text-center">{r.midTerm}</td>
                        <td className="p-2.5 text-center">{r.exam}</td>
                        <td className="p-2.5 text-center font-bold text-foreground text-sm">{r.total}%</td>
                        <td className="p-2.5 text-center">
                          <Badge variant="outline" className="text-[11px] font-bold text-emerald-600 border-emerald-300">
                            {r.grade}
                          </Badge>
                        </td>
                        <td className="p-2.5 text-emerald-600 font-semibold">{r.remark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Weekly Teaching Schedule & Period Grid */}
          <TeacherWeeklyCalendarView onOpenNewGradeEntry={handleOpenGradeEntry} />
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. DEDICATED LOGISTICS MODULE: HOSTEL EXEAT SYSTEM            */}
      {/* ------------------------------------------------------------- */}
      {isHostelModule && (
        <div className="space-y-6">
          <HostelExeatSystem />
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. DEDICATED LOGISTICS MODULE: TRANSPORT ROUTE MANIFEST       */}
      {/* ------------------------------------------------------------- */}
      {isTransportModule && (
        <div className="space-y-6">
          <TransportRouteManifest />
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 6. NIGERIAN ADMISSION & STUDENT ENROLMENT WORKSPACE          */}
      {/* ------------------------------------------------------------- */}
      {isAdmissionModule && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-4">
            <Card className="border-border shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Applications Received</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-emerald-600 mt-0.5 font-medium">+18 this week</p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Officially Enrolled</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">98 Students</div>
                <p className="text-xs text-muted-foreground mt-0.5">NERDC Bio-data Verified</p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Hostel Boarders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">41 Boarders</div>
                <p className="text-xs text-muted-foreground mt-0.5">Allocated Rooms</p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Day Bus Transit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">57 Commuters</div>
                <p className="text-xs text-muted-foreground mt-0.5">Assigned to Shuttle Routes</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border shadow-xs">
            <CardHeader className="border-b pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-bold">
                      Institutional Admissions &amp; Enrolment Register
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px] border-emerald-400 text-emerald-600 bg-emerald-500/10 font-bold">
                      NERDC / UBEC Compliant
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Comprehensive Nigerian bio-data verification (NIN, State/LGA of origin, genotype, blood group, boarding allocation)
                  </CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setEnrolmentDialogOpen(true)}
                    className="h-8 text-xs gap-1.5 font-bold shadow-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <UserPlus className="size-3.5" />
                    <span>New Admission / Registration</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success("Batch admission slips sent to official school laser printer queue.")}
                    className="h-8 text-xs gap-1.5"
                  >
                    <Download className="size-3.5" />
                    <span>Print Batch Slips</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b bg-muted/40 text-left font-semibold text-muted-foreground">
                      <th className="p-2.5">Admission ID</th>
                      <th className="p-2.5">Student Full Name</th>
                      <th className="p-2.5">Target Class</th>
                      <th className="p-2.5">State &amp; LGA</th>
                      <th className="p-2.5 text-center">Genotype / Blood</th>
                      <th className="p-2.5 text-center">Type</th>
                      <th className="p-2.5">Guardian Contact</th>
                      <th className="p-2.5 text-center">Status</th>
                      <th className="p-2.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      { id: "CRST-2026-0042", name: "Samuel Babatunde Adeyemi", classArm: "Grade 10-A (SSS 1)", state: "Lagos / Ikeja", blood: "AA / O+", type: "Boarding", guardian: "Chief B. Adeyemi (08031112233)", status: "Admitted" },
                      { id: "CRST-2026-0043", name: "Aisha Fatima Bello", classArm: "Grade 10-A (SSS 1)", state: "Kano / Fagge", blood: "AA / A+", type: "Day Student", guardian: "Mrs. K. Bello (08023334455)", status: "Admitted" },
                      { id: "CRST-2026-0044", name: "Chinedu Emmanuel Okeke", classArm: "Grade 10-A (SSS 1)", state: "Anambra / Idemili", blood: "AS / O+", type: "Day Student", guardian: "Mr. O. Okeke (08095556677)", status: "Verified" },
                      { id: "CRST-2026-0045", name: "Zainab Maryam Ibrahim", classArm: "Grade 10-A (SSS 1)", state: "Kaduna / Zaria", blood: "AA / B+", type: "Boarding", guardian: "Alhaji Ibrahim (08137778899)", status: "Admitted" },
                      { id: "CRST-2026-0046", name: "David Segun Adeleke", classArm: "Grade 10-A (SSS 1)", state: "Osun / Ede North", blood: "AA / O+", type: "Day Student", guardian: "Chief Adeleke (08059990011)", status: "Pending Interview" },
                      { id: "CRST-2026-0047", name: "Blessing Chioma Eze", classArm: "Grade 10-A (SSS 1)", state: "Enugu / Nsukka", blood: "AA / O+", type: "Day Student", guardian: "Dr. K. Eze (08072223344)", status: "Admitted" },
                    ].map((stu) => (
                      <tr key={stu.id} className="hover:bg-muted/20">
                        <td className="p-2.5 font-mono text-[11px] font-bold text-primary">{stu.id}</td>
                        <td className="p-2.5 font-bold text-foreground">
                          <button
                            type="button"
                            onClick={() => setSelectedStudentForModal(stu.name)}
                            className="hover:underline hover:text-primary text-left cursor-pointer flex items-center gap-1"
                          >
                            <span>{stu.name}</span>
                            <ExternalLink className="size-2.5 text-muted-foreground" />
                          </button>
                        </td>
                        <td className="p-2.5 text-muted-foreground">{stu.classArm}</td>
                        <td className="p-2.5 text-muted-foreground">{stu.state}</td>
                        <td className="p-2.5 text-center font-mono text-[11px]">{stu.blood}</td>
                        <td className="p-2.5 text-center">
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${
                              stu.type === "Boarding"
                                ? "border-purple-300 text-purple-700 bg-purple-500/10"
                                : "border-blue-300 text-blue-700 bg-blue-500/10"
                            }`}
                          >
                            {stu.type}
                          </Badge>
                        </td>
                        <td className="p-2.5 text-muted-foreground text-[11px]">{stu.guardian}</td>
                        <td className="p-2.5 text-center">
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${
                              stu.status === "Admitted"
                                ? "border-emerald-300 text-emerald-700 bg-emerald-500/10 font-bold"
                                : stu.status === "Verified"
                                ? "border-blue-300 text-blue-700 bg-blue-500/10 font-medium"
                                : "border-amber-300 text-amber-700 bg-amber-500/10 font-medium"
                            }`}
                          >
                            {stu.status}
                          </Badge>
                        </td>
                        <td className="p-2.5 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEnrolmentDialogOpen(true)}
                            className="h-6 text-[10px] text-primary hover:bg-primary/10 font-semibold px-2"
                          >
                            Enrolment Slip
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 7. STUDENT & PARENT DIRECTORY (WITH 1-CLICK FREE WHATSAPP)     */}
      {/* ------------------------------------------------------------- */}
      <Card className="border-border shadow-xs">
        <CardHeader className="border-b pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-base font-bold">
                Student &amp; Guardian Institutional Directory
              </CardTitle>
              <CardDescription className="text-xs">
                Active students, roll call status, and 1-click free WhatsApp (`wa.me`) direct communication
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-48 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student or class..."
                  className="pl-8 text-xs h-8"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/40 text-left font-semibold text-muted-foreground">
                  <th className="p-2.5">Student ID</th>
                  <th className="p-2.5">Full Name</th>
                  <th className="p-2.5">Class &amp; Arm</th>
                  <th className="p-2.5">Morning Check-in</th>
                  <th className="p-2.5 text-center">Roll Call Status</th>
                  <th className="p-2.5">Guardian Phone</th>
                  <th className="p-2.5 text-center">Cost-Free Outreach</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredAttendance.map((student) => (
                  <tr key={student.id} className="hover:bg-muted/20">
                    <td className="p-2.5 font-mono text-[11px] font-semibold">{student.id}</td>
                    <td className="p-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedStudentForModal(student.name)}
                        className="text-left font-bold text-foreground hover:text-primary hover:underline flex items-center gap-1 cursor-pointer"
                        title="Click to view academic profile and recent performance"
                      >
                        <span>{student.name}</span>
                        <ExternalLink className="size-2.5 text-muted-foreground" />
                      </button>
                    </td>
                    <td className="p-2.5 text-muted-foreground">{student.class}</td>
                    <td className="p-2.5 text-muted-foreground">{student.time}</td>
                    <td className="p-2.5 text-center">
                      <Button
                        variant={student.status === "present" ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleAttendance(student.id)}
                        className={`h-6 text-[10px] px-2 ${
                          student.status === "present"
                            ? "bg-emerald-600 text-white"
                            : student.status === "absent"
                            ? "border-destructive text-destructive bg-destructive/10"
                            : "border-amber-500 text-amber-600 bg-amber-500/10"
                        }`}
                      >
                        {student.status === "present" ? "✓ Present" : student.status === "absent" ? "✕ Absent" : "⏱ Late"}
                      </Button>
                    </td>
                    <td className="p-2.5 font-mono text-[11px] text-muted-foreground">+{student.phone}</td>
                    <td className="p-2.5 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const text = encodeURIComponent(
                            `Hello, this is Oakridge International Academy regarding your child ${student.name} (${student.class}). Attendance Status today: ${student.status.toUpperCase()}.`
                          )
                          window.open(`https://wa.me/${student.phone}?text=${text}`, "_blank")
                          toast.success(`Opening free WhatsApp chat with ${student.name}'s guardian`)
                        }}
                        className="h-7 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10 gap-1 px-2"
                      >
                        <Smartphone className="size-3" />
                        <span>Chat (`wa.me`)</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <CreateInstitutionDialog
        open={instModalOpen}
        onOpenChange={setInstModalOpen}
      />

      <StudentProfileDialog
        studentName={selectedStudentForModal}
        open={!!selectedStudentForModal}
        onOpenChange={(open) => !open && setSelectedStudentForModal(null)}
      />

      <BankTransferUploaderDialog
        open={bankTransferOpen}
        onOpenChange={setBankTransferOpen}
        defaultStudent="Samuel Adeyemi"
        defaultInvoiceId="INV-2026-085"
        defaultAmount="₦35,000"
        defaultFeeType="School Bus Shuttle (Route #4)"
        onSubmitted={handleNewTransferSubmission}
      />

      <BursarApprovalQueueDialog
        open={bursarQueueOpen}
        onOpenChange={setBursarQueueOpen}
        submissions={bursarSubmissions}
        onApprove={handleApproveTransfer}
        onReject={handleRejectTransfer}
      />

      <OfficialReportCardDialog
        studentName={reportCardStudent}
        open={!!reportCardStudent}
        onOpenChange={(open) => !open && setReportCardStudent(null)}
      />

      {/* NEW GRADE ENTRY CONTINUOUS ASSESSMENT MODAL */}
      <NewGradeEntryDialog
        open={gradeEntryOpen}
        onOpenChange={setGradeEntryOpen}
        initialSubject={gradeEntrySubject}
        initialClass={gradeEntryClass}
        onGradesSaved={() => {
          toast.success("Continuous assessment marks persisted & updated in broadsheet.")
        }}
      />

      {/* NIGERIAN SIS ADMISSION & ENROLMENT REGISTRATION FORM */}
      <StudentEnrolmentDialog
        open={enrolmentDialogOpen}
        onOpenChange={setEnrolmentDialogOpen}
        onStudentEnrolled={(newStudent) => {
          toast.success("Official Admission Enrolment Complete!", {
            description: `${newStudent.first_name} ${newStudent.surname} registered under ${newStudent.admission_number}.`,
          })
        }}
      />
    </div>
  )
}
