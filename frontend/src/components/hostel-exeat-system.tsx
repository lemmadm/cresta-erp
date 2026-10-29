"use client"

import * as React from "react"
import {
  Hotel,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Search,
  Plus,
  DoorOpen,
  Check,
  QrCode,
  Printer,
  Smartphone,
} from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"

export interface ExeatRecord {
  id: string
  student_name: string
  student_id: string
  class_arm: string
  hostel_block: string
  room_number: string
  exeat_type: "weekend" | "medical" | "emergency" | "holiday" | "academic"
  destination: string
  departure_time: string
  expected_return: string
  actual_return?: string
  guardian_name: string
  guardian_phone: string
  guardian_consent: boolean
  housemaster_approval: boolean
  status: "pending" | "approved" | "checked_out" | "returned" | "overdue" | "rejected"
  reason: string
}

export const INITIAL_EXEAT_RECORDS: ExeatRecord[] = [
  {
    id: "EXT-2026-081",
    student_name: "Samuel Adeyemi",
    student_id: "CRST-STU-8821",
    class_arm: "Grade 10-A (SSS 1)",
    hostel_block: "Nelson Mandela Hall",
    room_number: "Room 14B (Bed 2)",
    exeat_type: "weekend",
    destination: "Lekki Phase 1, Lagos",
    departure_time: "2026-10-30 03:30 PM",
    expected_return: "2026-11-01 06:00 PM",
    guardian_name: "Chief Babatunde Adeyemi",
    guardian_phone: "2348031112233",
    guardian_consent: true,
    housemaster_approval: true,
    status: "approved",
    reason: "Monthly family weekend leave approved by Housemaster Mr. Okonkwo.",
  },
  {
    id: "EXT-2026-082",
    student_name: "Aisha Bello",
    student_id: "CRST-STU-8822",
    class_arm: "Grade 10-A (SSS 1)",
    hostel_block: "Queen Amina Hall",
    room_number: "Room 08A (Bed 1)",
    exeat_type: "medical",
    destination: "Reddington Hospital, Victoria Island",
    departure_time: "2026-10-29 09:00 AM",
    expected_return: "2026-10-29 02:00 PM",
    guardian_name: "Mrs. Halima Bello",
    guardian_phone: "2348023334455",
    guardian_consent: true,
    housemaster_approval: true,
    status: "checked_out",
    reason: "Scheduled orthodontist dental checkup and follow-up medical review.",
  },
  {
    id: "EXT-2026-083",
    student_name: "Chinedu Okeke",
    student_id: "CRST-STU-8823",
    class_arm: "Grade 10-A (SSS 1)",
    hostel_block: "Nelson Mandela Hall",
    room_number: "Room 12A (Bed 4)",
    exeat_type: "emergency",
    destination: "Ikeja GRA, Lagos",
    departure_time: "2026-10-29 11:30 AM",
    expected_return: "2026-10-31 05:00 PM",
    guardian_name: "Engr. Patrick Okeke",
    guardian_phone: "2348095556677",
    guardian_consent: true,
    housemaster_approval: false,
    status: "pending",
    reason: "Family wedding event in hometown; awaiting final Vice Principal approval.",
  },
  {
    id: "EXT-2026-084",
    student_name: "David Adeleke",
    student_id: "CRST-STU-8825",
    class_arm: "Grade 10-A (SSS 1)",
    hostel_block: "Nelson Mandela Hall",
    room_number: "Room 10B (Bed 3)",
    exeat_type: "academic",
    destination: "University of Lagos, Akoka (STEM Olympiad)",
    departure_time: "2026-10-27 08:00 AM",
    expected_return: "2026-10-28 05:00 PM",
    actual_return: "2026-10-28 04:30 PM",
    guardian_name: "Chief Adeleke",
    guardian_phone: "2348059990011",
    guardian_consent: true,
    housemaster_approval: true,
    status: "returned",
    reason: "Represented school in the Lagos State All-Secondary Schools Science Quiz.",
  },
  {
    id: "EXT-2026-085",
    student_name: "Zainab Ibrahim",
    student_id: "CRST-STU-8824",
    class_arm: "Grade 10-A (SSS 1)",
    hostel_block: "Queen Amina Hall",
    room_number: "Room 06C (Bed 2)",
    exeat_type: "weekend",
    destination: "Ikoyi, Lagos",
    departure_time: "2026-10-25 04:00 PM",
    expected_return: "2026-10-27 06:00 PM",
    guardian_name: "Alhaji Ibrahim",
    guardian_phone: "2348137778899",
    guardian_consent: true,
    housemaster_approval: true,
    status: "overdue",
    reason: "Medical review extension requested by parent; return delayed by 24 hours.",
  },
]

export function HostelExeatSystem() {
  const [records, setRecords] = React.useState<ExeatRecord[]>(INITIAL_EXEAT_RECORDS)
  const [filterStatus, setFilterStatus] = React.useState<string>("all")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [newExeatOpen, setNewExeatOpen] = React.useState(false)
  const [viewPassModal, setViewPassModal] = React.useState<ExeatRecord | null>(null)

  // Form State for New Exeat Request
  const [formData, setFormData] = React.useState({
    student_name: "Samuel Adeyemi",
    student_id: "CRST-STU-8821",
    class_arm: "Grade 10-A (SSS 1)",
    hostel_block: "Nelson Mandela Hall",
    room_number: "Room 14B (Bed 2)",
    exeat_type: "weekend" as ExeatRecord["exeat_type"],
    destination: "Lekki Phase 1, Lagos",
    departure_time: "2026-10-31 03:00 PM",
    expected_return: "2026-11-02 06:00 PM",
    guardian_name: "Chief Babatunde Adeyemi",
    guardian_phone: "2348031112233",
    reason: "Monthly family weekend visit approved by parents.",
  })

  // Quick action: Approve Exeat
  const handleApprove = (id: string) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "approved", housemaster_approval: true } : r
      )
    )
    toast.success("Exeat Pass Approved!", {
      description: `Housemaster authorization recorded. Digital Gate Pass is now active for ${id}.`,
    })
  }

  // Quick action: Gate Sign-Out (Departing campus)
  const handleSignOut = (id: string) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "checked_out" } : r))
    )
    toast.success("Gate Check-Out Verified!", {
      description: "Student logged as checked out through Main Gate Security.",
    })
  }

  // Quick action: Gate Sign-In (Returning to hostel)
  const handleSignIn = (id: string) => {
    const nowStr = new Date().toLocaleString()
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "returned",
              actual_return: nowStr,
            }
          : r
      )
    )
    toast.success("Student Return Logged!", {
      description: "Student marked safely back on campus. Hostel room muster roll updated.",
    })
  }

  // Submit new exeat
  const handleCreateExeat = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = `EXT-2026-${String(records.length + 81).padStart(3, "0")}`
    const newRecord: ExeatRecord = {
      id: newId,
      ...formData,
      guardian_consent: true,
      housemaster_approval: true,
      status: "approved",
    }
    setRecords([newRecord, ...records])
    setNewExeatOpen(false)
    toast.success("New Exeat Pass Created!", {
      description: `Issued pass ${newId} for ${formData.student_name}. Approved & ready for gate verification.`,
    })
  }

  // WhatsApp Alert Generator
  const handleSendWhatsAppNotice = (rec: ExeatRecord) => {
    const text = encodeURIComponent(
      `Official Exeat Update from Oakridge International Academy: Student ${rec.student_name} (${rec.class_arm}) Exeat Pass #${rec.id} status is now: ${rec.status.toUpperCase()}. Destination: ${rec.destination}. Expected Return: ${rec.expected_return}.`
    )
    window.open(`https://wa.me/${rec.guardian_phone}?text=${text}`, "_blank")
    toast.success(`Opening free WhatsApp notification to ${rec.guardian_name}`)
  }

  // Filtered records
  const filtered = records.filter((r) => {
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "pending" && r.status === "pending") ||
      (filterStatus === "active" && (r.status === "approved" || r.status === "checked_out")) ||
      (filterStatus === "returned" && r.status === "returned") ||
      (filterStatus === "overdue" && r.status === "overdue")

    const matchesSearch =
      r.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.hostel_block.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.destination.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  // Metrics
  const totalBoarders = 342
  const activeExeatCount = records.filter(
    (r) => r.status === "checked_out" || r.status === "approved"
  ).length
  const onCampusCount = totalBoarders - records.filter((r) => r.status === "checked_out").length
  const pendingCount = records.filter((r) => r.status === "pending").length
  const overdueCount = records.filter((r) => r.status === "overdue").length

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-primary/20 bg-linear-to-r from-primary/10 via-card to-secondary/10 p-5 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-semibold text-primary border-primary/40 bg-primary/10">
                <Hotel className="size-3 mr-1" />
                Boarding House Logistics
              </Badge>
              <span className="text-xs font-medium text-muted-foreground">
                Digital Exeat &amp; Gate Pass Clearance System
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Hostel Exeat Pass &amp; Campus Security Manifest
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Oakridge International Academy &bull; Housemaster Office &bull; 342 Enrolled Boarding Pupils
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              onClick={() => setNewExeatOpen(true)}
              className="text-xs gap-1.5 h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>Issue New Exeat Pass</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Logistics KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Total Boarding Students
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
              <Hotel className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBoarders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              4 Halls: Mandela, Amina, Awolowo, Bello
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Boarders on Campus Now
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
              <ShieldCheck className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{onCampusCount}</div>
            <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
              <CheckCircle2 className="size-3" />
              99.4% hostel accountability verified
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Active Authorized Exeats
            </CardTitle>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600">
              <DoorOpen className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{activeExeatCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {pendingCount} pending Housemaster approval
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Overdue Returns / Alerts
            </CardTitle>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
              <AlertTriangle className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{overdueCount}</div>
            <p className="text-xs text-amber-600 mt-1 font-medium">
              Guardian wa.me alert dispatched
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="border-border shadow-xs">
        <CardHeader className="border-b pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-base font-bold">
                Student Exeat Log &amp; Digital Gate Passes
              </CardTitle>
              <CardDescription className="text-xs">
                Real-time tracking of boarding pupils permitted to leave campus with parental consent verification
              </CardDescription>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Filter Tabs */}
              <div className="flex items-center rounded-lg border bg-muted/30 p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setFilterStatus("all")}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    filterStatus === "all" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
                  }`}
                >
                  All ({records.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus("pending")}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    filterStatus === "pending" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus("active")}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    filterStatus === "active" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
                  }`}
                >
                  Active ({activeExeatCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus("overdue")}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    filterStatus === "overdue" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
                  }`}
                >
                  Overdue ({overdueCount})
                </button>
              </div>

              {/* Search */}
              <div className="relative w-48 sm:w-56">
                <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student or hall..."
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
                  <th className="p-2.5">Pass ID</th>
                  <th className="p-2.5">Student &amp; Hostel</th>
                  <th className="p-2.5">Type &amp; Destination</th>
                  <th className="p-2.5">Departure &amp; Expected Return</th>
                  <th className="p-2.5 text-center">Guardian Consent</th>
                  <th className="p-2.5 text-center">Current Status</th>
                  <th className="p-2.5 text-center">Gate Clearance Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((rec) => (
                  <tr key={rec.id} className="hover:bg-muted/20">
                    <td className="p-2.5 font-mono text-[11px] font-semibold text-primary">
                      {rec.id}
                    </td>

                    <td className="p-2.5">
                      <p className="font-bold text-foreground text-xs leading-tight">
                        {rec.student_name}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {rec.hostel_block} &bull; {rec.room_number}
                      </p>
                    </td>

                    <td className="p-2.5">
                      <Badge
                        variant="outline"
                        className={`text-[10px] capitalize font-medium ${
                          rec.exeat_type === "medical"
                            ? "border-red-400 text-red-600 bg-red-500/10"
                            : rec.exeat_type === "weekend"
                            ? "border-blue-400 text-blue-600 bg-blue-500/10"
                            : "border-purple-400 text-purple-600 bg-purple-500/10"
                        }`}
                      >
                        {rec.exeat_type} Exeat
                      </Badge>
                      <p className="text-[11px] text-muted-foreground mt-0.5 truncate max-w-[180px]">
                        {rec.destination}
                      </p>
                    </td>

                    <td className="p-2.5 text-muted-foreground">
                      <p className="text-[11px]">
                        <span className="font-semibold text-foreground">Dep:</span> {rec.departure_time}
                      </p>
                      <p className="text-[11px]">
                        <span className="font-semibold text-foreground">Ret:</span> {rec.expected_return}
                      </p>
                    </td>

                    <td className="p-2.5 text-center">
                      <div className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                        <CheckCircle2 className="size-3" />
                        <span>Verified</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        +{rec.guardian_phone}
                      </p>
                    </td>

                    <td className="p-2.5 text-center">
                      <Badge
                        variant="outline"
                        className={`text-[10px] py-0.5 px-2 font-bold ${
                          rec.status === "approved"
                            ? "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-400"
                            : rec.status === "checked_out"
                            ? "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-400"
                            : rec.status === "returned"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-400"
                            : rec.status === "pending"
                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-400"
                            : "bg-red-500/10 text-destructive border-destructive"
                        }`}
                      >
                        {rec.status === "approved"
                          ? "✓ Pass Approved"
                          : rec.status === "checked_out"
                          ? "🚀 Off Campus"
                          : rec.status === "returned"
                          ? "🏠 Back on Campus"
                          : rec.status === "pending"
                          ? "⏱ Pending Approval"
                          : "⚠️ Overdue Return"}
                      </Badge>
                    </td>

                    <td className="p-2.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {rec.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => handleApprove(rec.id)}
                            className="h-7 text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-2"
                          >
                            <Check className="size-3 mr-1" />
                            Approve
                          </Button>
                        )}

                        {rec.status === "approved" && (
                          <Button
                            size="sm"
                            onClick={() => handleSignOut(rec.id)}
                            className="h-7 text-[11px] bg-purple-600 hover:bg-purple-700 text-white font-semibold px-2"
                          >
                            <DoorOpen className="size-3 mr-1" />
                            Gate Sign-Out
                          </Button>
                        )}

                        {rec.status === "checked_out" && (
                          <Button
                            size="sm"
                            onClick={() => handleSignIn(rec.id)}
                            className="h-7 text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-2"
                          >
                            <Check className="size-3 mr-1" />
                            Gate Sign-In
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setViewPassModal(rec)}
                          className="h-7 text-[11px] px-2 font-medium"
                          title="View official digital gate pass with QR security seal"
                        >
                          <QrCode className="size-3 mr-1 text-primary" />
                          Pass
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleSendWhatsAppNotice(rec)}
                          className="h-7 text-[11px] px-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10"
                          title="Send instant Click-to-WhatsApp update to guardian"
                        >
                          <Smartphone className="size-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* NEW EXEAT REQUEST MODAL */}
      <Dialog open={newExeatOpen} onOpenChange={setNewExeatOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Hotel className="size-4 text-primary" />
              <span>Issue New Boarding Exeat Pass</span>
            </DialogTitle>
            <DialogDescription className="text-xs">
              Authorize student temporary leave with parental verification and gate clearance.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateExeat} className="space-y-3 pt-2 text-xs">
            <div className="space-y-1">
              <Label className="text-[11px] font-semibold">Student Name &amp; ID</Label>
              <Input
                value={formData.student_name}
                onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                required
                className="h-8 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-[11px] font-semibold">Hostel Hall</Label>
                <select
                  value={formData.hostel_block}
                  onChange={(e) => setFormData({ ...formData, hostel_block: e.target.value })}
                  className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs"
                >
                  <option value="Nelson Mandela Hall">Nelson Mandela Hall</option>
                  <option value="Queen Amina Hall">Queen Amina Hall</option>
                  <option value="Obafemi Awolowo Hall">Obafemi Awolowo Hall</option>
                  <option value="Ahmadu Bello Hall">Ahmadu Bello Hall</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label className="text-[11px] font-semibold">Exeat Type</Label>
                <select
                  value={formData.exeat_type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      exeat_type: e.target.value as ExeatRecord["exeat_type"],
                    })
                  }
                  className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs"
                >
                  <option value="weekend">Weekend Home Leave</option>
                  <option value="medical">Medical / Hospital Clinic</option>
                  <option value="emergency">Family Emergency</option>
                  <option value="academic">Academic Competition</option>
                  <option value="holiday">Official Holiday Exeat</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-[11px] font-semibold">Destination Address</Label>
              <Input
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                required
                className="h-8 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-[11px] font-semibold">Departure Time</Label>
                <Input
                  value={formData.departure_time}
                  onChange={(e) => setFormData({ ...formData, departure_time: e.target.value })}
                  className="h-8 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[11px] font-semibold">Expected Return</Label>
                <Input
                  value={formData.expected_return}
                  onChange={(e) => setFormData({ ...formData, expected_return: e.target.value })}
                  className="h-8 text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-[11px] font-semibold">Guardian Name</Label>
                <Input
                  value={formData.guardian_name}
                  onChange={(e) => setFormData({ ...formData, guardian_name: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[11px] font-semibold">Guardian Phone</Label>
                <Input
                  value={formData.guardian_phone}
                  onChange={(e) => setFormData({ ...formData, guardian_phone: e.target.value })}
                  className="h-8 text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-[11px] font-semibold">Reason &amp; Housemaster Remark</Label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows={2}
                className="w-full rounded-md border border-input bg-background p-2 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setNewExeatOpen(false)}
                className="h-8 text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
              >
                Issue &amp; Approve Pass
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* OFFICIAL DIGITAL GATE PASS MODAL (WITH QR CODE) */}
      {viewPassModal && (
        <Dialog open={!!viewPassModal} onOpenChange={(open) => !open && setViewPassModal(null)}>
          <DialogContent className="sm:max-w-md">
            <div className="p-4 rounded-xl border-2 border-dashed border-primary/40 bg-card space-y-4">
              <div className="text-center pb-2 border-b">
                <Badge className="bg-primary text-primary-foreground font-bold text-[10px] uppercase">
                  Official Gate Clearance Pass
                </Badge>
                <h3 className="text-lg font-extrabold text-foreground mt-1">
                  Oakridge International Academy
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Boarding House Administration &bull; Security Gate Manifest
                </p>
                <p className="font-mono text-xs font-bold text-primary mt-1">
                  Pass ID: {viewPassModal.id}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground block font-medium">Student Name:</span>
                  <span className="font-bold text-foreground text-sm">{viewPassModal.student_name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-medium">Class Arm:</span>
                  <span className="font-semibold text-foreground">{viewPassModal.class_arm}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-medium">Hostel &amp; Room:</span>
                  <span className="font-semibold text-foreground">{viewPassModal.hostel_block} ({viewPassModal.room_number})</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-medium">Exeat Type:</span>
                  <span className="font-bold text-primary capitalize">{viewPassModal.exeat_type} Leave</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-muted-foreground block font-medium">Destination:</span>
                  <span className="font-medium text-foreground">{viewPassModal.destination}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-medium">Authorized Departure:</span>
                  <span className="font-mono text-[11px] font-semibold text-foreground">{viewPassModal.departure_time}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block font-medium">Expected Return:</span>
                  <span className="font-mono text-[11px] font-bold text-amber-600">{viewPassModal.expected_return}</span>
                </div>
              </div>

              {/* QR Verification Seal */}
              <div className="p-3 rounded-lg bg-muted/40 border flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="size-3" />
                    Security Seal Verified
                  </span>
                  <p className="text-[10px] text-muted-foreground">
                    Housemaster Signature: <strong>Mr. Chidi Okonkwo</strong>
                  </p>
                  <p className="text-[9px] font-mono text-muted-foreground">
                    Timestamp: {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="size-16 rounded-md bg-white p-1 border shadow-xs flex items-center justify-center">
                  <QrCode className="size-14 text-slate-900" />
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setViewPassModal(null)}
                  className="flex-1 text-xs"
                >
                  Close Pass
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    window.print()
                  }}
                  className="flex-1 text-xs bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5"
                >
                  <Printer className="size-3.5" />
                  <span>Print Gate Slip</span>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
