"use client"

import * as React from "react"
import {
  GraduationCap,
  CalendarCheck,
  Award,
  CreditCard,
  User,
  Phone,
  MapPin,
  HeartPulse,
  Smartphone,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  BookOpen,
} from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

export interface StudentProfileData {
  id: string
  name: string
  admissionNo: string
  gender: string
  dob: string
  class: string
  stateOfOrigin: string
  bloodGroup: string
  genotype: string
  guardianName: string
  guardianPhone: string
  guardianEmail: string
  guardianAddress: string
  attendanceRate: number
  presentDays: number
  absentDays: number
  lateDays: number
  gpa: number
  classRank: string
  feeStatus: "Paid" | "Pending" | "Overdue" | "Partially Paid"
  tuitionPaid: string
  ancillaryDue: string
  termHistory: Array<{
    term: string
    gpa: number
    rank: string
    attendance: number
  }>
  subjects: Array<{
    name: string
    ca1: number
    ca2: number
    midTerm: number
    exam: number
    total: number
    grade: string
    remark: string
  }>
  extracurriculars: string[]
  teacherRemarks: string
  principalRemarks: string
}

// Pre-configured mock student repository
const STUDENT_DATABASE: Record<string, StudentProfileData> = {
  "Samuel Adeyemi": {
    id: "STU-001",
    name: "Samuel Adeyemi",
    admissionNo: "OAK-2023-8821",
    gender: "Male",
    dob: "14 May 2011 (Age 15)",
    class: "Grade 10 - Section A (SSS 1 Science)",
    stateOfOrigin: "Lagos State (Ikeja LGA)",
    bloodGroup: "O+",
    genotype: "AA",
    guardianName: "Chief & Mrs. Babatunde Adeyemi",
    guardianPhone: "2348031112233",
    guardianEmail: "b.adeyemi@cresta.parent.org",
    guardianAddress: "Plot 12, Admiralty Way, Lekki Phase 1, Lagos",
    attendanceRate: 98.4,
    presentDays: 61,
    absentDays: 1,
    lateDays: 1,
    gpa: 3.88,
    classRank: "3rd of 40",
    feeStatus: "Partially Paid",
    tuitionPaid: "₦120,000 (PAID)",
    ancillaryDue: "₦35,000 (Route #4 Bus Due)",
    termHistory: [
      { term: "2025/2026 Term 3", gpa: 3.75, rank: "5th", attendance: 97.2 },
      { term: "2026/2027 Term 1", gpa: 3.82, rank: "4th", attendance: 98.0 },
      { term: "2026/2027 Term 2 (Current)", gpa: 3.88, rank: "3rd", attendance: 98.4 },
    ],
    subjects: [
      { name: "Further Mathematics", ca1: 9, ca2: 10, midTerm: 19, exam: 56, total: 94, grade: "A1", remark: "Distinction" },
      { name: "Physics", ca1: 9, ca2: 9, midTerm: 18, exam: 54, total: 90, grade: "A1", remark: "Distinction" },
      { name: "Biology", ca1: 10, ca2: 9, midTerm: 19, exam: 57, total: 95, grade: "A1", remark: "Highest in Grade 10" },
      { name: "Chemistry", ca1: 8, ca2: 9, midTerm: 17, exam: 54, total: 88, grade: "B2", remark: "Very Good" },
      { name: "English Language", ca1: 8, ca2: 8, midTerm: 18, exam: 55, total: 89, grade: "B2", remark: "Very Good" },
      { name: "Civic Education", ca1: 9, ca2: 9, midTerm: 19, exam: 55, total: 92, grade: "A1", remark: "Distinction" },
    ],
    extracurriculars: ["STEM Robotics Club President", "Inter-House Athletics (400m Gold)", "Debate Society"],
    teacherRemarks: "Samuel exhibits exceptional focus in theoretical sciences and maintains an impeccable attendance streak.",
    principalRemarks: "An outstanding ambassador for Oakridge International Academy with strong leadership traits.",
  },
  "Aisha Bello": {
    id: "STU-002",
    name: "Aisha Bello",
    admissionNo: "OAK-2023-8822",
    gender: "Female",
    dob: "22 Aug 2011 (Age 15)",
    class: "Grade 10 - Section A (SSS 1 Science)",
    stateOfOrigin: "Kano State (Nasarawa LGA)",
    bloodGroup: "A+",
    genotype: "AA",
    guardianName: "Alhaji & Hajia Bello",
    guardianPhone: "2348023334455",
    guardianEmail: "abello.family@yahoo.com",
    guardianAddress: "No. 4 Banana Island Close, Ikoyi, Lagos",
    attendanceRate: 100.0,
    presentDays: 63,
    absentDays: 0,
    lateDays: 0,
    gpa: 3.96,
    classRank: "1st of 40",
    feeStatus: "Paid",
    tuitionPaid: "₦120,000 (PAID)",
    ancillaryDue: "₦0.00 (Fully Cleared)",
    termHistory: [
      { term: "2025/2026 Term 3", gpa: 3.90, rank: "2nd", attendance: 99.0 },
      { term: "2026/2027 Term 1", gpa: 3.94, rank: "1st", attendance: 100.0 },
      { term: "2026/2027 Term 2 (Current)", gpa: 3.96, rank: "1st", attendance: 100.0 },
    ],
    subjects: [
      { name: "Mathematics", ca1: 10, ca2: 10, midTerm: 20, exam: 58, total: 98, grade: "A1", remark: "Distinction" },
      { name: "Chemistry", ca1: 10, ca2: 9, midTerm: 19, exam: 57, total: 95, grade: "A1", remark: "Distinction" },
      { name: "Physics", ca1: 9, ca2: 10, midTerm: 19, exam: 56, total: 94, grade: "A1", remark: "Distinction" },
      { name: "Biology", ca1: 9, ca2: 9, midTerm: 19, exam: 55, total: 92, grade: "A1", remark: "Distinction" },
      { name: "English Language", ca1: 9, ca2: 10, midTerm: 19, exam: 57, total: 95, grade: "A1", remark: "Distinction" },
      { name: "Economics", ca1: 9, ca2: 9, midTerm: 18, exam: 55, total: 91, grade: "A1", remark: "Distinction" },
    ],
    extracurriculars: ["Science Olympiad Gold Medalist", "Head Girl Aspirant", "Chess Champion"],
    teacherRemarks: "Remarkable dedication to academics. Sets a benchmark of excellence for the class.",
    principalRemarks: "Consistently tops the broadsheet across senior secondary.",
  },
  "Chinedu Okeke": {
    id: "STU-003",
    name: "Chinedu Okeke",
    admissionNo: "OAK-2023-8823",
    gender: "Male",
    dob: "05 Nov 2011 (Age 14)",
    class: "Grade 10 - Section A (SSS 1 Science)",
    stateOfOrigin: "Anambra State (Onitsha North)",
    bloodGroup: "B+",
    genotype: "AS",
    guardianName: "Engr. & Dr. Emeka Okeke",
    guardianPhone: "2348095556677",
    guardianEmail: "emeka.okeke@engr.ng",
    guardianAddress: "18 Victoria Garden City (VGC), Lekki, Lagos",
    attendanceRate: 96.8,
    presentDays: 60,
    absentDays: 2,
    lateDays: 1,
    gpa: 3.65,
    classRank: "6th of 40",
    feeStatus: "Paid",
    tuitionPaid: "₦120,000 (PAID)",
    ancillaryDue: "₦0.00 (Fully Cleared)",
    termHistory: [
      { term: "2025/2026 Term 3", gpa: 3.55, rank: "8th", attendance: 95.0 },
      { term: "2026/2027 Term 1", gpa: 3.60, rank: "7th", attendance: 96.0 },
      { term: "2026/2027 Term 2 (Current)", gpa: 3.65, rank: "6th", attendance: 96.8 },
    ],
    subjects: [
      { name: "Mathematics", ca1: 8, ca2: 9, midTerm: 17, exam: 51, total: 85, grade: "A1", remark: "Distinction" },
      { name: "Technical Drawing", ca1: 10, ca2: 10, midTerm: 20, exam: 58, total: 98, grade: "A1", remark: "Best Technical Student" },
      { name: "Physics", ca1: 8, ca2: 8, midTerm: 17, exam: 52, total: 85, grade: "A1", remark: "Distinction" },
      { name: "Chemistry", ca1: 7, ca2: 8, midTerm: 16, exam: 50, total: 81, grade: "B2", remark: "Very Good" },
      { name: "English Language", ca1: 8, ca2: 7, midTerm: 16, exam: 48, total: 79, grade: "B2", remark: "Very Good" },
    ],
    extracurriculars: ["Makerspace Lab Lead", "Junior Football Team Captain"],
    teacherRemarks: "Very sharp spatial intellect and engineering prowess. Continues to improve in languages.",
    principalRemarks: "Promising future engineer with keen practical abilities.",
  },
}

function generateDefaultProfile(name: string): StudentProfileData {
  return {
    id: `STU-00${Math.floor(Math.random() * 80 + 10)}`,
    name,
    admissionNo: `OAK-2023-${Math.floor(Math.random() * 8000 + 1000)}`,
    gender: name.includes("Blessing") || name.includes("Zainab") ? "Female" : "Male",
    dob: "12 Oct 2011 (Age 15)",
    class: "Grade 10 - Section A (SSS 1)",
    stateOfOrigin: "Ogun State (Abeokuta South)",
    bloodGroup: "O+",
    genotype: "AA",
    guardianName: `Mr. & Mrs. ${name.split(" ")[1] || "Guardian"}`,
    guardianPhone: "2348031234567",
    guardianEmail: "guardian@cresta.parent.org",
    guardianAddress: "Victoria Island, Lagos, Nigeria",
    attendanceRate: 95.4,
    presentDays: 59,
    absentDays: 3,
    lateDays: 1,
    gpa: 3.52,
    classRank: "8th of 40",
    feeStatus: "Paid",
    tuitionPaid: "₦120,000 (PAID)",
    ancillaryDue: "₦0.00",
    termHistory: [
      { term: "2025/2026 Term 3", gpa: 3.45, rank: "10th", attendance: 94.0 },
      { term: "2026/2027 Term 1", gpa: 3.50, rank: "9th", attendance: 95.0 },
      { term: "2026/2027 Term 2 (Current)", gpa: 3.52, rank: "8th", attendance: 95.4 },
    ],
    subjects: [
      { name: "Mathematics", ca1: 8, ca2: 8, midTerm: 17, exam: 50, total: 83, grade: "B2", remark: "Very Good" },
      { name: "English Language", ca1: 8, ca2: 9, midTerm: 18, exam: 52, total: 87, grade: "A1", remark: "Distinction" },
      { name: "Biology", ca1: 8, ca2: 7, midTerm: 16, exam: 49, total: 80, grade: "B2", remark: "Very Good" },
      { name: "Chemistry", ca1: 7, ca2: 8, midTerm: 15, exam: 48, total: 78, grade: "B2", remark: "Very Good" },
      { name: "Physics", ca1: 7, ca2: 7, midTerm: 15, exam: 47, total: 76, grade: "B3", remark: "Good" },
    ],
    extracurriculars: ["Literary & Debating Society", "Music Choir"],
    teacherRemarks: "Good academic discipline, respectful, and well-behaved.",
    principalRemarks: "Maintains steady academic progress.",
  }
}

interface StudentProfileDialogProps {
  studentName: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StudentProfileDialog({
  studentName,
  open,
  onOpenChange,
}: StudentProfileDialogProps) {
  if (!studentName) return null

  const student = STUDENT_DATABASE[studentName] || generateDefaultProfile(studentName)

  const handleOpenFreeWhatsApp = () => {
    const text = encodeURIComponent(
      `Dear ${student.guardianName}, this is Oakridge International Academy regarding ${student.name} (${student.class}). Attendance: ${student.attendanceRate}% & Term GPA: ${student.gpa}/4.0. For inquiries, please reply to this chat.`
    )
    window.open(`https://wa.me/${student.guardianPhone}?text=${text}`, "_blank")
    toast.success("Opening WhatsApp Chat (`wa.me`)", {
      description: `Dispatched to ${student.guardianName} (${student.guardianPhone}) at ₦0.00 cost.`,
    })
  }

  const handleDownloadTranscript = () => {
    toast.success(`Transcript downloaded: ${student.admissionNo}_Transcript.pdf`, {
      description: "Official verified transcript with QR verification seal.",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {/* Banner Header */}
        <div className="bg-linear-to-r from-primary/15 via-background to-secondary/15 p-6 border-b">
          <DialogHeader className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="size-14 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center shadow-md">
                  {student.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-xl font-bold text-foreground">
                      {student.name}
                    </DialogTitle>
                    <Badge variant="outline" className="border-primary/40 text-primary text-[11px] font-semibold">
                      {student.admissionNo}
                    </Badge>
                  </div>
                  <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                    {student.class} &bull; {student.gender} &bull; {student.dob}
                  </DialogDescription>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleOpenFreeWhatsApp}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs h-8 gap-1.5 shadow-xs"
                >
                  <Smartphone className="size-3.5" />
                  <span>Chat Parent (`wa.me`)</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadTranscript}
                  className="text-xs h-8 gap-1.5"
                >
                  <Download className="size-3.5" />
                  <span className="hidden sm:inline">Export PDF</span>
                </Button>
              </div>
            </div>

            {/* Quick KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3">
              <div className="p-2.5 rounded-lg border bg-card/80 text-center">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">Cumulative GPA</span>
                <span className="text-lg font-extrabold text-foreground">{student.gpa} / 4.0</span>
                <span className="text-[10px] text-emerald-600 font-semibold block">Rank: {student.classRank}</span>
              </div>
              <div className="p-2.5 rounded-lg border bg-card/80 text-center">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">Term Attendance</span>
                <span className="text-lg font-extrabold text-emerald-600">{student.attendanceRate}%</span>
                <span className="text-[10px] text-muted-foreground block">{student.presentDays} of {student.presentDays + student.absentDays} Days</span>
              </div>
              <div className="p-2.5 rounded-lg border bg-card/80 text-center">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">Tuition Status</span>
                <span className="text-sm font-bold text-foreground mt-1 block">₦120,000</span>
                <Badge className="bg-emerald-600 text-white text-[9px] py-0">PAID</Badge>
              </div>
              <div className="p-2.5 rounded-lg border bg-card/80 text-center">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">Genotype / Blood</span>
                <span className="text-sm font-bold text-foreground mt-1 block">{student.genotype} &bull; {student.bloodGroup}</span>
                <span className="text-[10px] text-muted-foreground block">{student.stateOfOrigin.split(" ")[0]} State</span>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Tabbed Profile Views */}
        <div className="p-6 pt-4">
          <Tabs defaultValue="academics" className="w-full space-y-4">
            <TabsList className="grid grid-cols-3 w-full h-9">
              <TabsTrigger value="academics" className="text-xs font-semibold gap-1.5">
                <GraduationCap className="size-3.5" />
                <span>Academics &amp; CA</span>
              </TabsTrigger>
              <TabsTrigger value="attendance" className="text-xs font-semibold gap-1.5">
                <CalendarCheck className="size-3.5" />
                <span>Attendance &amp; Conduct</span>
              </TabsTrigger>
              <TabsTrigger value="guardian" className="text-xs font-semibold gap-1.5">
                <User className="size-3.5" />
                <span>Guardian &amp; Bio</span>
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: ACADEMICS & CA GRADES */}
            <TabsContent value="academics" className="space-y-4 pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Continuous Assessment (CA) &amp; Exam Performance
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Term 2 Broadsheet: CA 1 (10%), CA 2 (10%), Mid-Term (20%), Exam (60%) = 100%
                  </p>
                </div>
                <Badge variant="outline" className="text-xs border-primary/30 text-primary font-bold">
                  Class Rank: {student.classRank}
                </Badge>
              </div>

              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/40 border-b text-left text-muted-foreground font-semibold">
                      <th className="p-2.5">Subject</th>
                      <th className="p-2.5 text-center">CA 1 (10)</th>
                      <th className="p-2.5 text-center">CA 2 (10)</th>
                      <th className="p-2.5 text-center">Mid-Term (20)</th>
                      <th className="p-2.5 text-center">Exam (60)</th>
                      <th className="p-2.5 text-center font-bold">Total (100)</th>
                      <th className="p-2.5 text-center">WAEC Grade</th>
                      <th className="p-2.5">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {student.subjects.map((sub) => (
                      <tr key={sub.name} className="hover:bg-muted/20">
                        <td className="p-2.5 font-bold text-foreground">{sub.name}</td>
                        <td className="p-2.5 text-center">{sub.ca1}</td>
                        <td className="p-2.5 text-center">{sub.ca2}</td>
                        <td className="p-2.5 text-center">{sub.midTerm}</td>
                        <td className="p-2.5 text-center">{sub.exam}</td>
                        <td className="p-2.5 text-center font-bold text-foreground text-sm">{sub.total}%</td>
                        <td className="p-2.5 text-center">
                          <Badge variant="outline" className="font-bold text-emerald-600 border-emerald-300 text-xs">
                            {sub.grade}
                          </Badge>
                        </td>
                        <td className="p-2.5 text-muted-foreground">{sub.remark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Term-over-Term GPA Progression */}
              <div className="p-3.5 rounded-lg border bg-muted/20 space-y-2">
                <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Award className="size-3.5 text-primary" />
                  <span>Term-over-Term Academic Progression</span>
                </h5>
                <div className="grid grid-cols-3 gap-3">
                  {student.termHistory.map((th) => (
                    <div key={th.term} className="p-2.5 rounded-md border bg-background text-center">
                      <span className="text-[10px] text-muted-foreground font-semibold block">{th.term}</span>
                      <span className="text-base font-extrabold text-foreground mt-0.5 block">GPA {th.gpa}</span>
                      <span className="text-[10px] text-primary font-medium block">Ranked {th.rank} ({th.attendance}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Remarks */}
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="p-3 rounded-lg border bg-muted/20">
                  <span className="font-bold text-foreground block mb-1">Class Teacher&apos;s Remark:</span>
                  <p className="text-muted-foreground italic">&ldquo;{student.teacherRemarks}&rdquo;</p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/20">
                  <span className="font-bold text-foreground block mb-1">Principal&apos;s Endorsement:</span>
                  <p className="text-muted-foreground italic">&ldquo;{student.principalRemarks}&rdquo;</p>
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: ATTENDANCE & CONDUCT */}
            <TabsContent value="attendance" className="space-y-4 pt-1">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="p-3.5 rounded-lg border bg-emerald-500/5 border-emerald-200 dark:border-emerald-900/50">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 block">Present Days</span>
                  <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{student.presentDays} Days</span>
                  <p className="text-[11px] text-muted-foreground mt-1">98.4% attendance reliability</p>
                </div>
                <div className="p-3.5 rounded-lg border bg-amber-500/5 border-amber-200">
                  <span className="text-xs font-semibold text-amber-700 block">Punctuality (Late)</span>
                  <span className="text-2xl font-bold text-amber-700">{student.lateDays} Day</span>
                  <p className="text-[11px] text-muted-foreground mt-1">Traffic delay excused</p>
                </div>
                <div className="p-3.5 rounded-lg border bg-red-500/5 border-red-200">
                  <span className="text-xs font-semibold text-destructive block">Unexcused Absences</span>
                  <span className="text-2xl font-bold text-destructive">{student.absentDays} Day</span>
                  <p className="text-[11px] text-muted-foreground mt-1">Medical note on file</p>
                </div>
              </div>

              {/* Affective & Psychomotor Domain Evaluation */}
              <div className="rounded-lg border p-4 space-y-3">
                <h5 className="text-xs font-bold text-foreground">Nigerian Standard Affective &amp; Psychomotor Evaluation (1 - 5)</h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2 border rounded-md">
                    <span className="text-muted-foreground block text-[10px]">Punctuality:</span>
                    <span className="font-bold text-foreground">5 / 5 (Excellent)</span>
                  </div>
                  <div className="p-2 border rounded-md">
                    <span className="text-muted-foreground block text-[10px]">Neatness &amp; Uniform:</span>
                    <span className="font-bold text-foreground">5 / 5 (Impeccable)</span>
                  </div>
                  <div className="p-2 border rounded-md">
                    <span className="text-muted-foreground block text-[10px]">Honesty &amp; Politeness:</span>
                    <span className="font-bold text-foreground">5 / 5 (Exemplary)</span>
                  </div>
                  <div className="p-2 border rounded-md">
                    <span className="text-muted-foreground block text-[10px]">Sports &amp; Crafts:</span>
                    <span className="font-bold text-foreground">5 / 5 (Athletics Lead)</span>
                  </div>
                </div>
              </div>

              {/* Extracurriculars */}
              <div className="p-3.5 rounded-lg border bg-muted/20 space-y-1.5">
                <span className="text-xs font-bold text-foreground block">Extracurricular Activities &amp; Clubs:</span>
                <div className="flex flex-wrap gap-2">
                  {student.extracurriculars.map((ec) => (
                    <Badge key={ec} variant="secondary" className="text-xs font-medium">
                      <Sparkles className="size-3 mr-1 text-primary" />
                      {ec}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* TAB 3: GUARDIAN & BIODATA */}
            <TabsContent value="guardian" className="space-y-4 pt-1">
              <div className="grid gap-4 sm:grid-cols-2 text-xs">
                <div className="p-4 rounded-lg border space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-foreground border-b pb-2">
                    <User className="size-4 text-primary" />
                    <span>Parent / Guardian Profile</span>
                  </div>
                  <div className="space-y-1.5">
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Primary Guardian:</span>
                      <span className="font-bold text-foreground">{student.guardianName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Official Phone / WhatsApp:</span>
                      <span className="font-mono font-semibold text-foreground">+{student.guardianPhone}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Guardian Email:</span>
                      <span className="text-foreground">{student.guardianEmail}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Home Address:</span>
                      <span className="text-foreground">{student.guardianAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-foreground border-b pb-2">
                    <HeartPulse className="size-4 text-primary" />
                    <span>Medical &amp; Regional Demographics</span>
                  </div>
                  <div className="space-y-1.5">
                    <div>
                      <span className="text-muted-foreground block text-[11px]">State of Origin &amp; LGA:</span>
                      <span className="font-bold text-foreground">{student.stateOfOrigin}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Genotype &amp; Blood Group:</span>
                      <span className="font-semibold text-emerald-600">{student.genotype} &bull; Blood Group {student.bloodGroup}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Emergency School Contact:</span>
                      <span className="text-foreground">Mother (+234 803 111 2234)</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Allergies / Special Dietary:</span>
                      <span className="text-muted-foreground">None on official medical record</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fee Invoicing Summary */}
              <div className="p-4 rounded-lg border bg-muted/20 space-y-2 text-xs">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="font-bold text-foreground flex items-center gap-1.5">
                    <CreditCard className="size-3.5 text-primary" />
                    <span>Term Fee Financial Standing (Naira ₦)</span>
                  </span>
                  <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-300">
                    ₦35,000 Bus Due
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-muted-foreground text-[11px] block">2nd Term Senior Tuition:</span>
                    <span className="font-bold text-emerald-600">{student.tuitionPaid}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[11px] block">Ancillary &amp; Shuttle:</span>
                    <span className="font-bold text-amber-600">{student.ancillaryDue}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
