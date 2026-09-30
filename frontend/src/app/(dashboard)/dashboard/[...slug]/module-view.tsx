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
  Check,
  ExternalLink,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Input } from "~/components/ui/input"
import { CreateInstitutionDialog } from "~/components/create-institution-dialog"
import { AcademicCalendarView } from "~/components/academic-calendar-view"
import { StudentProfileDialog } from "~/components/student-profile-dialog"

interface ModuleViewProps {
  slug: string[]
}

export function ModuleView({ slug }: ModuleViewProps) {
  const fullPath = slug.join("/")
  const section = slug[0] || "overview"

  const [searchQuery, setSearchQuery] = React.useState("")
  const [instModalOpen, setInstModalOpen] = React.useState(false)
  const [selectedStudentForModal, setSelectedStudentForModal] = React.useState<string | null>(null)

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
              variant="outline"
              size="sm"
              onClick={() => setInstModalOpen(true)}
              className="text-xs gap-1.5 h-9"
            >
              <Building2 className="size-3.5 text-primary" />
              <span>Create Institution</span>
            </Button>
            <Button asChild size="sm" className="text-xs gap-1.5 h-9">
              <Link href="/dashboard">
                <ArrowRight className="size-3.5" />
                <span>Return to Overview</span>
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
                <div className="flex items-center gap-2">
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
                            <Button
                              size="sm"
                              onClick={() => handleVerifyBankSlip(inv.id)}
                              className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1 px-2"
                            >
                              <Check className="size-3" />
                              <span>Verify Slip</span>
                            </Button>
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
                <div className="flex items-center gap-2">
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
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. STUDENT & PARENT DIRECTORY (WITH 1-CLICK FREE WHATSAPP)     */}
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
    </div>
  )
}
