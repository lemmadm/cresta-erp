"use client"

import * as React from "react"
import {
  Printer,
  Download,
  Smartphone,
  ShieldCheck,
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

export interface ReportCardStudent {
  name: string
  admissionNo: string
  class: string
  term: string
  session: string
  gender: string
  dob: string
  daysOpened: number
  daysPresent: number
  daysAbsent: number
  position: string
  totalStudents: number
  totalMarks: number
  maxPossibleMarks: number
  percentage: number
  gpa: number
  classification: string
  guardianPhone: string
  guardianName: string
  teacherRemark: string
  principalRemark: string
  nextTermResumption: string
  subjects: Array<{
    name: string
    ca1: number
    ca2: number
    midTerm: number
    exam: number
    total: number
    grade: string
    classMin: number
    classMax: number
    classAvg: number
    position: string
    remark: string
  }>
  affective: Record<string, number>
  psychomotor: Record<string, number>
}

const REPORT_CARD_DATABASE: Record<string, ReportCardStudent> = {
  "Samuel Adeyemi": {
    name: "Samuel Adeyemi",
    admissionNo: "OAK-2023-8821",
    class: "Grade 10 - Section A (SSS 1 Science)",
    term: "Second Term",
    session: "2026/2027 Academic Session",
    gender: "Male",
    dob: "14 May 2011",
    daysOpened: 64,
    daysPresent: 63,
    daysAbsent: 1,
    position: "3rd",
    totalStudents: 40,
    totalMarks: 727,
    maxPossibleMarks: 800,
    percentage: 90.9,
    gpa: 3.88,
    classification: "Distinction (Honors)",
    guardianPhone: "2348031112233",
    guardianName: "Chief & Mrs. Babatunde Adeyemi",
    teacherRemark: "Samuel exhibits exceptional theoretical mastery and scientific discipline. Continues to lead peer study sessions in advanced mathematics.",
    principalRemark: "An exemplary performance. Samuel upholds the highest standards of Oakridge International Academy.",
    nextTermResumption: "Monday, 11 January 2027",
    subjects: [
      { name: "Further Mathematics", ca1: 9, ca2: 10, midTerm: 19, exam: 56, total: 94, grade: "A1", classMin: 42, classMax: 96, classAvg: 74, position: "2nd", remark: "Distinction" },
      { name: "Physics", ca1: 9, ca2: 9, midTerm: 18, exam: 54, total: 90, grade: "A1", classMin: 38, classMax: 94, classAvg: 71, position: "3rd", remark: "Distinction" },
      { name: "Biology", ca1: 10, ca2: 9, midTerm: 19, exam: 57, total: 95, grade: "A1", classMin: 45, classMax: 95, classAvg: 76, position: "1st", remark: "Highest in Grade 10" },
      { name: "Chemistry", ca1: 8, ca2: 9, midTerm: 17, exam: 54, total: 88, grade: "A1", classMin: 40, classMax: 95, classAvg: 73, position: "4th", remark: "Excellent" },
      { name: "English Language", ca1: 8, ca2: 8, midTerm: 18, exam: 55, total: 89, grade: "B2", classMin: 50, classMax: 95, classAvg: 78, position: "5th", remark: "Very Good" },
      { name: "Civic Education", ca1: 9, ca2: 9, midTerm: 19, exam: 55, total: 92, grade: "A1", classMin: 52, classMax: 96, classAvg: 80, position: "3rd", remark: "Distinction" },
      { name: "Economics", ca1: 8, ca2: 9, midTerm: 18, exam: 51, total: 86, grade: "A1", classMin: 44, classMax: 91, classAvg: 72, position: "4th", remark: "Distinction" },
      { name: "Technical Drawing", ca1: 9, ca2: 9, midTerm: 19, exam: 56, total: 93, grade: "A1", classMin: 48, classMax: 98, classAvg: 79, position: "3rd", remark: "Distinction" },
    ],
    affective: {
      "Punctuality & Attendance": 5,
      "Neatness & General Bearing": 5,
      "Politeness & Courtesy": 5,
      "Honesty & Reliability": 5,
      "Relationship with Staff & Peers": 5,
      "Leadership & Initiative": 5,
    },
    psychomotor: {
      "Handwriting & Presentation": 4,
      "Athletics & Physical Sports": 5,
      "Laboratory & Experimental Skills": 5,
      "Creative Arts & STEM Construction": 5,
    },
  },
  "Aisha Bello": {
    name: "Aisha Bello",
    admissionNo: "OAK-2023-8822",
    class: "Grade 10 - Section A (SSS 1 Science)",
    term: "Second Term",
    session: "2026/2027 Academic Session",
    gender: "Female",
    dob: "22 August 2011",
    daysOpened: 64,
    daysPresent: 64,
    daysAbsent: 0,
    position: "1st",
    totalStudents: 40,
    totalMarks: 765,
    maxPossibleMarks: 800,
    percentage: 95.6,
    gpa: 3.96,
    classification: "Distinction (First in Class)",
    guardianPhone: "2348023334455",
    guardianName: "Alhaji & Hajia Bello",
    teacherRemark: "Aisha is an extraordinary scholar who consistently tops the broadsheet across mathematics, physics, and chemistry.",
    principalRemark: "Flawless academic and behavioral record. A shining credit to Oakridge Academy.",
    nextTermResumption: "Monday, 11 January 2027",
    subjects: [
      { name: "Mathematics", ca1: 10, ca2: 10, midTerm: 20, exam: 58, total: 98, grade: "A1", classMin: 42, classMax: 98, classAvg: 74, position: "1st", remark: "Distinction" },
      { name: "Chemistry", ca1: 10, ca2: 9, midTerm: 19, exam: 57, total: 95, grade: "A1", classMin: 40, classMax: 95, classAvg: 73, position: "1st", remark: "Distinction" },
      { name: "Physics", ca1: 9, ca2: 10, midTerm: 19, exam: 56, total: 94, grade: "A1", classMin: 38, classMax: 94, classAvg: 71, position: "1st", remark: "Distinction" },
      { name: "Biology", ca1: 9, ca2: 9, midTerm: 19, exam: 55, total: 92, grade: "A1", classMin: 45, classMax: 95, classAvg: 76, position: "2nd", remark: "Distinction" },
      { name: "English Language", ca1: 9, ca2: 10, midTerm: 19, exam: 57, total: 95, grade: "A1", classMin: 50, classMax: 95, classAvg: 78, position: "1st", remark: "Distinction" },
      { name: "Economics", ca1: 9, ca2: 9, midTerm: 18, exam: 55, total: 91, grade: "A1", classMin: 44, classMax: 91, classAvg: 72, position: "1st", remark: "Distinction" },
      { name: "Civic Education", ca1: 10, ca2: 10, midTerm: 20, exam: 58, total: 98, grade: "A1", classMin: 52, classMax: 98, classAvg: 80, position: "1st", remark: "Distinction" },
      { name: "Computer Studies", ca1: 10, ca2: 9, midTerm: 19, exam: 54, total: 92, grade: "A1", classMin: 50, classMax: 96, classAvg: 79, position: "2nd", remark: "Distinction" },
    ],
    affective: {
      "Punctuality & Attendance": 5,
      "Neatness & General Bearing": 5,
      "Politeness & Courtesy": 5,
      "Honesty & Reliability": 5,
      "Relationship with Staff & Peers": 5,
      "Leadership & Initiative": 5,
    },
    psychomotor: {
      "Handwriting & Presentation": 5,
      "Athletics & Physical Sports": 4,
      "Laboratory & Experimental Skills": 5,
      "Creative Arts & STEM Construction": 5,
    },
  },
}

function generateDefaultReportCard(name: string): ReportCardStudent {
  return {
    name,
    admissionNo: `OAK-2023-${Math.floor(1000 + Math.random() * 8000)}`,
    class: "Grade 10 - Section A (SSS 1)",
    term: "Second Term",
    session: "2026/2027 Academic Session",
    gender: "Male",
    dob: "18 October 2011",
    daysOpened: 64,
    daysPresent: 61,
    daysAbsent: 3,
    position: "8th",
    totalStudents: 40,
    totalMarks: 672,
    maxPossibleMarks: 800,
    percentage: 84.0,
    gpa: 3.52,
    classification: "Credit (Upper Division)",
    guardianPhone: "2348031234567",
    guardianName: `Mr. & Mrs. ${name.split(" ")[1] || "Guardian"}`,
    teacherRemark: "Consistent effort shown across all core subjects. Encouraged to participate more actively in classroom discussions.",
    principalRemark: "Good overall term result. Keep striving towards academic distinction.",
    nextTermResumption: "Monday, 11 January 2027",
    subjects: [
      { name: "Mathematics", ca1: 8, ca2: 8, midTerm: 17, exam: 50, total: 83, grade: "B2", classMin: 42, classMax: 98, classAvg: 74, position: "7th", remark: "Very Good" },
      { name: "English Language", ca1: 8, ca2: 9, midTerm: 18, exam: 52, total: 87, grade: "A1", classMin: 50, classMax: 95, classAvg: 78, position: "6th", remark: "Distinction" },
      { name: "Biology", ca1: 8, ca2: 7, midTerm: 16, exam: 49, total: 80, grade: "B2", classMin: 45, classMax: 95, classAvg: 76, position: "8th", remark: "Very Good" },
      { name: "Chemistry", ca1: 7, ca2: 8, midTerm: 15, exam: 48, total: 78, grade: "B2", classMin: 40, classMax: 95, classAvg: 73, position: "9th", remark: "Very Good" },
      { name: "Physics", ca1: 7, ca2: 7, midTerm: 15, exam: 47, total: 76, grade: "B3", classMin: 38, classMax: 94, classAvg: 71, position: "10th", remark: "Good" },
      { name: "Civic Education", ca1: 8, ca2: 8, midTerm: 18, exam: 52, total: 86, grade: "A1", classMin: 52, classMax: 98, classAvg: 80, position: "7th", remark: "Distinction" },
      { name: "Economics", ca1: 8, ca2: 8, midTerm: 17, exam: 50, total: 83, grade: "B2", classMin: 44, classMax: 91, classAvg: 72, position: "8th", remark: "Very Good" },
      { name: "Computer Studies", ca1: 8, ca2: 8, midTerm: 16, exam: 47, total: 79, grade: "B2", classMin: 50, classMax: 96, classAvg: 79, position: "11th", remark: "Very Good" },
    ],
    affective: {
      "Punctuality & Attendance": 4,
      "Neatness & General Bearing": 5,
      "Politeness & Courtesy": 5,
      "Honesty & Reliability": 4,
      "Relationship with Staff & Peers": 4,
      "Leadership & Initiative": 4,
    },
    psychomotor: {
      "Handwriting & Presentation": 4,
      "Athletics & Physical Sports": 4,
      "Laboratory & Experimental Skills": 4,
      "Creative Arts & STEM Construction": 4,
    },
  }
}

interface OfficialReportCardDialogProps {
  studentName: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OfficialReportCardDialog({
  studentName,
  open,
  onOpenChange,
}: OfficialReportCardDialogProps) {
  if (!studentName) return null

  const report = REPORT_CARD_DATABASE[studentName] || generateDefaultReportCard(studentName)

  const handlePrint = () => {
    window.print()
    toast.success("Print Dialog Dispatched", {
      description: "Official report card formatted for A4 print and PDF download.",
    })
  }

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `Dear ${report.guardianName}, official 2nd Term Examination Report Card for ${report.name} (${report.class}) has been published by Oakridge International Academy.\n\nSummary:\n• Term GPA: ${report.gpa} / 4.0\n• Overall Score: ${report.percentage}%\n• Class Position: ${report.position} of ${report.totalStudents}\n• Classification: ${report.classification}\n• Attendance: ${report.daysPresent}/${report.daysOpened} Days (${Math.round((report.daysPresent / report.daysOpened) * 100)}%)\n\nAccess verified cryptographic report card: https://cresta-erp.ng/verify/REP-2026-${report.admissionNo.slice(-4)}\n\nNext Term Resumes: ${report.nextTermResumption}.`
    )
    window.open(`https://wa.me/${report.guardianPhone}?text=${text}`, "_blank")
    toast.success("Report Card Dispatched via Free wa.me", {
      description: `Opened pre-filled WhatsApp link to ${report.guardianName} (${report.guardianPhone}) with zero API fees.`,
    })
  }

  const handleDownloadCSV = () => {
    const headers = "Subject,CA1,CA2,MidTerm,Exam,Total,Grade,ClassMin,ClassMax,ClassAvg,Position,Remark\n"
    const rows = report.subjects
      .map(
        (s) =>
          `"${s.name}",${s.ca1},${s.ca2},${s.midTerm},${s.exam},${s.total},"${s.grade}",${s.classMin},${s.classMax},${s.classAvg},"${s.position}","${s.remark}"`
      )
      .join("\n")
    const blob = new Blob([headers + rows], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${report.admissionNo}_Term2_Broadsheet.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Broadsheet CSV Exported Successfully!")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[94vh] overflow-y-auto p-0 print:m-0 print:p-0 print:max-w-full">
        <DialogHeader className="sr-only">
          <DialogTitle>Official Report Card - {report.name}</DialogTitle>
          <DialogDescription>Continuous Assessment and Terminal Examination Report Sheet</DialogDescription>
        </DialogHeader>

        {/* Top Control Bar (Hidden when printing) */}
        <div className="bg-muted/40 p-4 border-b flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <Badge className="bg-primary text-primary-foreground font-semibold text-xs">
              Official Institutional Report Card
            </Badge>
            <span className="text-xs text-muted-foreground font-medium">
              WAEC &amp; NECO Standard Grading &bull; Ready to Print or Download PDF
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSendWhatsApp}
              className="text-xs text-emerald-600 hover:text-emerald-700 border-emerald-300 gap-1.5 h-8 font-semibold"
            >
              <Smartphone className="size-3.5" />
              <span>Send via WhatsApp (`wa.me`)</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadCSV}
              className="text-xs gap-1.5 h-8 font-semibold"
            >
              <Download className="size-3.5" />
              <span>CSV Broadsheet</span>
            </Button>

            <Button
              size="sm"
              onClick={handlePrint}
              className="text-xs gap-1.5 h-8 font-bold shadow-xs bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Printer className="size-3.5" />
              <span>Print / Save PDF</span>
            </Button>
          </div>
        </div>

        {/* Printable Official Report Card Document */}
        <div className="p-6 sm:p-8 bg-card space-y-6 text-foreground print:p-8 print:text-black print:bg-white">
          {/* Institutional Crest & Letterhead */}
          <div className="border-b-2 border-primary/40 pb-4 text-center space-y-1">
            <div className="flex items-center justify-center gap-3">
              <div className="size-14 rounded-full bg-linear-to-tr from-primary to-secondary flex items-center justify-center text-primary-foreground font-black text-2xl shadow-md border-2 border-primary/30">
                OIA
              </div>
              <div className="text-left">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground uppercase">
                  Oakridge International Academy
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  Plot 12, Admiralty Way, Lekki Phase 1, Lagos, Nigeria &bull; Tel: +234 1 800 2737
                </p>
                <p className="text-[11px] font-semibold text-primary italic">
                  Motto: &ldquo;Excellence, Integrity &amp; Global Leadership&rdquo;
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Badge variant="outline" className="px-4 py-1 text-xs font-bold uppercase tracking-widest border-primary/50 text-foreground bg-primary/5">
                Official Continuous Assessment &amp; Terminal Examination Report Sheet
              </Badge>
            </div>
          </div>

          {/* Student Biodata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-lg border bg-muted/20 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Student Name:</span>
              <span className="font-extrabold text-foreground text-sm">{report.name}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Admission Number:</span>
              <span className="font-mono font-bold text-foreground">{report.admissionNo}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Class &amp; Arm:</span>
              <span className="font-bold text-foreground">{report.class}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Term &amp; Session:</span>
              <span className="font-bold text-foreground">{report.term} &bull; {report.session}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Term Attendance:</span>
              <span className="font-bold text-emerald-600">
                {report.daysPresent} of {report.daysOpened} Days ({Math.round((report.daysPresent / report.daysOpened) * 100)}%)
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Class Position:</span>
              <span className="font-extrabold text-primary text-sm">
                {report.position} <span className="text-xs font-normal text-muted-foreground">out of {report.totalStudents}</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Cumulative GPA:</span>
              <span className="font-extrabold text-foreground text-sm">{report.gpa} / 4.00</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">Next Term Resumes:</span>
              <span className="font-bold text-foreground">{report.nextTermResumption}</span>
            </div>
          </div>

          {/* Academic Continuous Assessment Broadsheet Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Subject-by-Subject Continuous Assessment (CA) &amp; Examination Broadsheet
              </h3>
              <span className="text-[11px] text-muted-foreground font-medium">
                Model: CA 1 (10%) + CA 2 (10%) + Mid-Term (20%) + Exam (60%) = 100%
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/50 border-b text-left text-muted-foreground font-semibold">
                    <th className="p-2">Subject</th>
                    <th className="p-2 text-center">CA 1<br/><span className="text-[9px] font-normal">(10)</span></th>
                    <th className="p-2 text-center">CA 2<br/><span className="text-[9px] font-normal">(10)</span></th>
                    <th className="p-2 text-center">Mid-Term<br/><span className="text-[9px] font-normal">(20)</span></th>
                    <th className="p-2 text-center">Exam<br/><span className="text-[9px] font-normal">(60)</span></th>
                    <th className="p-2 text-center font-bold">Total<br/><span className="text-[9px] font-normal">(100%)</span></th>
                    <th className="p-2 text-center">WAEC<br/>Grade</th>
                    <th className="p-2 text-center">Class<br/>Min</th>
                    <th className="p-2 text-center">Class<br/>Max</th>
                    <th className="p-2 text-center">Class<br/>Avg</th>
                    <th className="p-2 text-center">Pos</th>
                    <th className="p-2">Teacher Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {report.subjects.map((sub) => (
                    <tr key={sub.name} className="hover:bg-muted/20">
                      <td className="p-2 font-bold text-foreground">{sub.name}</td>
                      <td className="p-2 text-center">{sub.ca1}</td>
                      <td className="p-2 text-center">{sub.ca2}</td>
                      <td className="p-2 text-center">{sub.midTerm}</td>
                      <td className="p-2 text-center">{sub.exam}</td>
                      <td className="p-2 text-center font-extrabold text-foreground">{sub.total}%</td>
                      <td className="p-2 text-center font-bold">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[11px] ${
                            sub.grade === "A1"
                              ? "bg-emerald-500/15 text-emerald-700 font-extrabold"
                              : sub.grade.startsWith("B")
                              ? "bg-blue-500/15 text-blue-700 font-bold"
                              : "bg-amber-500/15 text-amber-700 font-bold"
                          }`}
                        >
                          {sub.grade}
                        </span>
                      </td>
                      <td className="p-2 text-center text-muted-foreground">{sub.classMin}</td>
                      <td className="p-2 text-center text-muted-foreground">{sub.classMax}</td>
                      <td className="p-2 text-center text-muted-foreground">{sub.classAvg}</td>
                      <td className="p-2 text-center font-semibold text-primary">{sub.position}</td>
                      <td className="p-2 text-muted-foreground text-[11px]">{sub.remark}</td>
                    </tr>
                  ))}
                  {/* Totals Row */}
                  <tr className="bg-muted/30 font-bold border-t-2 border-border text-foreground">
                    <td className="p-2">Grand Total &amp; Overall Average:</td>
                    <td colSpan={4} className="p-2 text-center text-muted-foreground">
                      Total Obtained: {report.totalMarks} / {report.maxPossibleMarks}
                    </td>
                    <td className="p-2 text-center text-sm font-extrabold text-emerald-600">
                      {report.percentage}%
                    </td>
                    <td className="p-2 text-center text-emerald-600 font-extrabold">A1</td>
                    <td colSpan={4} className="p-2 text-center text-muted-foreground">
                      Class Position: {report.position}
                    </td>
                    <td className="p-2 text-emerald-600 font-bold">{report.classification}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Affective and Psychomotor Tables */}
          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            {/* Affective Traits */}
            <div className="rounded-lg border p-3 space-y-2">
              <h4 className="font-bold text-foreground text-xs uppercase tracking-wider text-muted-foreground border-b pb-1">
                Affective Domain Assessment (Scale 1 - 5)
              </h4>
              <div className="divide-y text-[11px]">
                {Object.entries(report.affective).map(([trait, score]) => (
                  <div key={trait} className="py-1 flex items-center justify-between">
                    <span className="text-muted-foreground">{trait}</span>
                    <span className="font-bold text-foreground">{score} / 5 (Excellent)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Psychomotor Traits */}
            <div className="rounded-lg border p-3 space-y-2">
              <h4 className="font-bold text-foreground text-xs uppercase tracking-wider text-muted-foreground border-b pb-1">
                Psychomotor Domain Assessment (Scale 1 - 5)
              </h4>
              <div className="divide-y text-[11px]">
                {Object.entries(report.psychomotor).map(([trait, score]) => (
                  <div key={trait} className="py-1 flex items-center justify-between">
                    <span className="text-muted-foreground">{trait}</span>
                    <span className="font-bold text-foreground">{score} / 5 (Distinguished)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WAEC Grade Scale Legend Key */}
          <div className="p-2.5 rounded-lg border bg-muted/20 text-[10px] space-y-1">
            <span className="font-bold text-foreground block uppercase">Nigerian WAEC / NECO Grade Reference Key:</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
              <span><strong>A1:</strong> 75% - 100% (Distinction)</span>
              <span><strong>B2:</strong> 70% - 74% (Very Good)</span>
              <span><strong>B3:</strong> 65% - 69% (Good)</span>
              <span><strong>C4 - C6:</strong> 50% - 64% (Credit)</span>
              <span><strong>D7 - E8:</strong> 40% - 49% (Pass)</span>
              <span><strong>F9:</strong> 0% - 39% (Fail)</span>
            </div>
          </div>

          {/* Teacher and Principal Signatures + QR Verification */}
          <div className="grid gap-4 sm:grid-cols-3 border-t pt-4 text-xs">
            {/* Teacher's Endorsement */}
            <div className="space-y-2 border-r pr-3">
              <span className="font-bold text-foreground block text-[11px] uppercase text-muted-foreground">
                Class Teacher&apos;s Remarks:
              </span>
              <p className="text-muted-foreground italic text-[11px] leading-relaxed">
                &ldquo;{report.teacherRemark}&rdquo;
              </p>
              <div className="pt-3">
                <div className="font-serif italic font-bold text-foreground text-sm">Helena Brooks, M.Ed.</div>
                <span className="text-[10px] text-muted-foreground block">Class Teacher, SSS 1 Science</span>
              </div>
            </div>

            {/* Principal's Endorsement */}
            <div className="space-y-2 border-r pr-3">
              <span className="font-bold text-foreground block text-[11px] uppercase text-muted-foreground">
                Principal&apos;s Final Endorsement:
              </span>
              <p className="text-muted-foreground italic text-[11px] leading-relaxed">
                &ldquo;{report.principalRemark}&rdquo;
              </p>
              <div className="pt-3">
                <div className="font-serif italic font-bold text-foreground text-sm">Dr. Sarah Vance, Ph.D.</div>
                <span className="text-[10px] text-muted-foreground block">Principal, Oakridge International Academy</span>
              </div>
            </div>

            {/* Official Stamp & Tamper-Proof QR Code */}
            <div className="space-y-2 text-center flex flex-col items-center justify-between">
              <div className="size-16 rounded-full border-2 border-dashed border-primary/50 flex flex-col items-center justify-center p-1 text-[8px] font-bold text-primary uppercase text-center leading-tight">
                <span>Oakridge Intl</span>
                <span>★ SEAL ★</span>
                <span>Approved</span>
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-muted text-[10px] font-mono">
                  <ShieldCheck className="size-3 text-emerald-600" />
                  <span>Digital Cryptographic QR</span>
                </div>
                <span className="text-[9px] text-muted-foreground block">
                  Verify at: cresta-erp.ng/verify/{report.admissionNo}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
