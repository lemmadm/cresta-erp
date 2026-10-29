"use client"

import * as React from "react"
import {
  CheckCircle2,
  Database,
  FileSpreadsheet,
  Loader2,
  Sparkles,
  History,
  Calculator,
  UploadCloud,
  FileUp,
  Download,
  X,
  TrendingUp,
  Award,
  BarChart3,
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
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Badge } from "~/components/ui/badge"
import { StudentGradeRecord } from "~/lib/db"

export interface GradeEntryRow {
  student_id: string
  student_name: string
  ca1: number
  ca2: number
  midterm: number
  exam: number
  total: number
  letter_grade: string
  remarks: string
  rank?: number
}

export interface CumulativeMetrics {
  meanTotal: number
  meanCa1: number
  meanCa2: number
  meanMidterm: number
  meanExam: number
  highestScore: number
  highestStudent: string
  lowestScore: number
  lowestStudent: string
  passRate: number
  passCount: number
  distinctionCount: number
  creditCount: number
  passTierCount: number
  failCount: number
  topStudents: Array<{ rank: number; name: string; total: number; grade: string }>
}

const DEFAULT_STUDENTS_GRADE10A: GradeEntryRow[] = [
  {
    student_id: "CRST-STU-8821",
    student_name: "Samuel Adeyemi",
    ca1: 9.5,
    ca2: 9.0,
    midterm: 19.0,
    exam: 56.5,
    total: 94.0,
    letter_grade: "A1",
    remarks: "Exceptional analytical precision in genetic Punnett squares.",
  },
  {
    student_id: "CRST-STU-8822",
    student_name: "Chioma Okonkwo",
    ca1: 8.5,
    ca2: 8.5,
    midterm: 18.0,
    exam: 52.0,
    total: 87.0,
    letter_grade: "A1",
    remarks: "Diligent laboratory reports and high specimen classification skills.",
  },
  {
    student_id: "CRST-STU-8823",
    student_name: "Tunde Bakare",
    ca1: 8.0,
    ca2: 7.5,
    midterm: 16.5,
    exam: 48.0,
    total: 80.0,
    letter_grade: "A1",
    remarks: "Very diligent lab reports, shows strong aptitude in physiology.",
  },
  {
    student_id: "CRST-STU-8824",
    student_name: "Amina Bello",
    ca1: 7.5,
    ca2: 8.0,
    midterm: 15.0,
    exam: 46.5,
    total: 77.0,
    letter_grade: "A1",
    remarks: "Strong theoretical understanding; microscope handling has improved.",
  },
  {
    student_id: "CRST-STU-8825",
    student_name: "David Adeleke",
    ca1: 7.0,
    ca2: 7.0,
    midterm: 14.0,
    exam: 44.0,
    total: 72.0,
    letter_grade: "B2",
    remarks: "Great progress; maintain consistency in continuous assessments.",
  },
  {
    student_id: "CRST-STU-8826",
    student_name: "Fatima Mohammed",
    ca1: 8.0,
    ca2: 8.0,
    midterm: 16.0,
    exam: 49.0,
    total: 81.0,
    letter_grade: "A1",
    remarks: "Sharp critical reasoning in cell organelle functions.",
  },
  {
    student_id: "CRST-STU-8827",
    student_name: "Victor Obi",
    ca1: 6.5,
    ca2: 7.0,
    midterm: 13.0,
    exam: 41.5,
    total: 68.0,
    letter_grade: "B3",
    remarks: "Capable student, needs more practice with experimental calculations.",
  },
  {
    student_id: "CRST-STU-8828",
    student_name: "Grace Danjuma",
    ca1: 7.0,
    ca2: 6.5,
    midterm: 12.5,
    exam: 38.0,
    total: 64.0,
    letter_grade: "C4",
    remarks: "Pass credit achieved. Recommended for Wednesday tutorial sessions.",
  },
]

const DEFAULT_STUDENTS_GRADE11: GradeEntryRow[] = [
  {
    student_id: "CRST-STU-7711",
    student_name: "Kelechi Nwachukwu",
    ca1: 9.0,
    ca2: 8.5,
    midterm: 18.5,
    exam: 54.0,
    total: 90.0,
    letter_grade: "A1",
    remarks: "Mastery of acid-base titration and organic nomenclature.",
  },
  {
    student_id: "CRST-STU-7712",
    student_name: "Zainab Al-Hassan",
    ca1: 8.5,
    ca2: 9.0,
    midterm: 17.0,
    exam: 51.5,
    total: 86.0,
    letter_grade: "A1",
    remarks: "Excellent laboratory etiquette and quantitative analysis.",
  },
  {
    student_id: "CRST-STU-7713",
    student_name: "Emeka Ojukwu",
    ca1: 7.5,
    ca2: 8.0,
    midterm: 15.0,
    exam: 44.5,
    total: 75.0,
    letter_grade: "A1",
    remarks: "Solid performance in electrochemical cell redox equations.",
  },
]

function getWaecGrade(score: number): { grade: string; color: string; badgeVariant: "default" | "outline" | "secondary" | "destructive" } {
  if (score >= 75) return { grade: "A1", color: "text-emerald-700 bg-emerald-500/10 border-emerald-400 dark:text-emerald-300", badgeVariant: "outline" }
  if (score >= 70) return { grade: "B2", color: "text-blue-700 bg-blue-500/10 border-blue-400 dark:text-blue-300", badgeVariant: "outline" }
  if (score >= 65) return { grade: "B3", color: "text-cyan-700 bg-cyan-500/10 border-cyan-400 dark:text-cyan-300", badgeVariant: "outline" }
  if (score >= 60) return { grade: "C4", color: "text-teal-700 bg-teal-500/10 border-teal-400 dark:text-teal-300", badgeVariant: "outline" }
  if (score >= 55) return { grade: "C5", color: "text-amber-700 bg-amber-500/10 border-amber-400 dark:text-amber-300", badgeVariant: "outline" }
  if (score >= 50) return { grade: "C6", color: "text-yellow-700 bg-yellow-500/10 border-yellow-400 dark:text-yellow-300", badgeVariant: "outline" }
  if (score >= 45) return { grade: "D7", color: "text-orange-700 bg-orange-500/10 border-orange-400 dark:text-orange-300", badgeVariant: "outline" }
  if (score >= 40) return { grade: "E8", color: "text-purple-700 bg-purple-500/10 border-purple-400 dark:text-purple-300", badgeVariant: "outline" }
  return { grade: "F9", color: "text-destructive bg-destructive/10 border-destructive", badgeVariant: "destructive" }
}

interface NewGradeEntryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialSubject?: string
  initialClass?: string
  onGradesSaved?: () => void
}

interface NewGradeEntryDialogInnerProps {
  initialSubject: string
  initialClass: string
  onClose: () => void
  onGradesSaved?: () => void
}

function NewGradeEntryDialogInner({
  initialSubject,
  initialClass,
  onClose,
  onGradesSaved,
}: NewGradeEntryDialogInnerProps) {
  const [selectedClass, setSelectedClass] = React.useState(initialClass)
  const [selectedSubject, setSelectedSubject] = React.useState(initialSubject)
  const [academicTerm, setAcademicTerm] = React.useState("Term 2 - 2026/2027")
  const [teacherName, setTeacherName] = React.useState("Ms. Helena Brooks")
  
  // Grade sheet rows initialized based on initial class
  const [rows, setRows] = React.useState<GradeEntryRow[]>(
    initialClass.includes("11") ? DEFAULT_STUDENTS_GRADE11 : DEFAULT_STUDENTS_GRADE10A
  )
  const [saving, setSaving] = React.useState(false)
  const [viewHistory, setViewHistory] = React.useState(false)
  const [persistedHistory, setPersistedHistory] = React.useState<StudentGradeRecord[]>([])
  const [dbSource, setDbSource] = React.useState<string>("ready")
  const [saveSuccessDetails, setSaveSuccessDetails] = React.useState<{ count: number; source: string } | null>(null)

  // Drag-and-drop Broad Sheet CSV / Excel Import State
  const [showImportZone, setShowImportZone] = React.useState(false)
  const [isDragging, setIsDragging] = React.useState(false)
  const [importSummary, setImportSummary] = React.useState<{
    fileName: string
    rowCount: number
    replaced: boolean
  } | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

// Pure helper to calculate cumulative metrics without side effects
function calculateMetricsHelper(inputRows: GradeEntryRow[]): CumulativeMetrics {
  if (inputRows.length === 0) {
    return {
      meanTotal: 0,
      meanCa1: 0,
      meanCa2: 0,
      meanMidterm: 0,
      meanExam: 0,
      highestScore: 0,
      highestStudent: "N/A",
      lowestScore: 0,
      lowestStudent: "N/A",
      passRate: 0,
      passCount: 0,
      distinctionCount: 0,
      creditCount: 0,
      passTierCount: 0,
      failCount: 0,
      topStudents: [],
    }
  }

  const n = inputRows.length
  const sumTotal = inputRows.reduce((acc, r) => acc + r.total, 0)
  const sumCa1 = inputRows.reduce((acc, r) => acc + r.ca1, 0)
  const sumCa2 = inputRows.reduce((acc, r) => acc + r.ca2, 0)
  const sumMidterm = inputRows.reduce((acc, r) => acc + r.midterm, 0)
  const sumExam = inputRows.reduce((acc, r) => acc + r.exam, 0)

  const meanTotal = Math.round((sumTotal / n) * 10) / 10
  const meanCa1 = Math.round((sumCa1 / n) * 10) / 10
  const meanCa2 = Math.round((sumCa2 / n) * 10) / 10
  const meanMidterm = Math.round((sumMidterm / n) * 10) / 10
  const meanExam = Math.round((sumExam / n) * 10) / 10

  const sorted = [...inputRows].sort((a, b) => b.total - a.total)
  const highest = sorted[0] || { total: 0, student_name: "N/A" }
  const lowest = sorted[sorted.length - 1] || { total: 0, student_name: "N/A" }

  const passCount = inputRows.filter((r) => r.total >= 50).length
  const passRate = Math.round((passCount / n) * 100)

  const distinctionCount = inputRows.filter((r) => r.total >= 75).length
  const creditCount = inputRows.filter((r) => r.total >= 50 && r.total < 75).length
  const passTierCount = inputRows.filter((r) => r.total >= 40 && r.total < 50).length
  const failCount = inputRows.filter((r) => r.total < 40).length

  const topStudents = sorted.slice(0, 3).map((r, i) => ({
    rank: i + 1,
    name: r.student_name,
    total: r.total,
    grade: r.letter_grade,
  }))

  return {
    meanTotal,
    meanCa1,
    meanCa2,
    meanMidterm,
    meanExam,
    highestScore: highest.total,
    highestStudent: highest.student_name,
    lowestScore: lowest.total,
    lowestStudent: lowest.student_name,
    passRate,
    passCount,
    distinctionCount,
    creditCount,
    passTierCount,
    failCount,
    topStudents,
  }
}

  // Cumulative Term Averages & Performance Analytics State
  const [cumulativeMetrics, setCumulativeMetrics] = React.useState<CumulativeMetrics | null>(() =>
    calculateMetricsHelper(DEFAULT_STUDENTS_GRADE10A)
  )
  const [showAveragesPanel, setShowAveragesPanel] = React.useState(true)

  // Compute cumulative term averages and student rankings
  const computeCumulativeAverages = React.useCallback(
    (inputRows: GradeEntryRow[], notify = false): CumulativeMetrics => {
      const sorted = [...inputRows].sort((a, b) => b.total - a.total)
      const rankMap = new Map<string, number>()
      sorted.forEach((r, idx) => {
        rankMap.set(r.student_id, idx + 1)
      })

      const rankedRows = inputRows.map((r) => ({
        ...r,
        rank: rankMap.get(r.student_id) || 1,
      }))
      setRows(rankedRows)

      const metrics = calculateMetricsHelper(inputRows)
      setCumulativeMetrics(metrics)

      if (notify) {
        toast.success("Cumulative Term Averages Computed!", {
          description: `Class Mean: ${metrics.meanTotal}% • Exam Average: ${metrics.meanExam}/60 • Pass Rate: ${metrics.passRate}% across ${inputRows.length} students.`,
        })
      }

      return metrics
    },
    []
  )

  // Split line respecting quotes
  const splitLine = (line: string, delimiter: string): string[] => {
    const result: string[] = []
    let current = ""
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"' || char === "'") {
        inQuotes = !inQuotes
      } else if (char === delimiter && !inQuotes) {
        result.push(current.trim().replace(/^["']|["']$/g, ""))
        current = ""
      } else {
        current += char
      }
    }
    result.push(current.trim().replace(/^["']|["']$/g, ""))
    return result
  }

  // Parse CSV / TSV text from Excel or Google Sheets
  const parseBroadsheetText = (text: string): GradeEntryRow[] => {
    const rawLines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
    if (rawLines.length === 0) return []

    // Detect delimiter: tab, comma, or semicolon
    const firstLine = rawLines[0].toLowerCase()
    const delimiter = firstLine.includes("\t") ? "\t" : firstLine.includes(";") ? ";" : ","

    // Detect if first line is a header
    const hasHeader =
      firstLine.includes("name") ||
      firstLine.includes("ca") ||
      firstLine.includes("exam") ||
      firstLine.includes("student") ||
      firstLine.includes("id")

    const dataLines = hasHeader ? rawLines.slice(1) : rawLines
    const parsedRows: GradeEntryRow[] = []

    let idIdx = 0
    let nameIdx = 1
    let ca1Idx = 2
    let ca2Idx = 3
    let midtermIdx = 4
    let examIdx = 5
    let remarksIdx = 6

    if (hasHeader) {
      const headers = splitLine(rawLines[0], delimiter).map((h) =>
        h.toLowerCase().trim().replace(/['"]/g, "")
      )
      headers.forEach((h, idx) => {
        if (h.includes("student_id") || h.includes("reg_no") || h.includes("matric") || h === "id") idIdx = idx
        else if (h.includes("student_name") || h.includes("full_name") || h.includes("name") || h === "student") nameIdx = idx
        else if (h === "ca1" || h.includes("ca 1") || h.includes("test 1") || h.includes("ca_1")) ca1Idx = idx
        else if (h === "ca2" || h.includes("ca 2") || h.includes("test 2") || h.includes("ca_2")) ca2Idx = idx
        else if (h.includes("mid") || h.includes("project")) midtermIdx = idx
        else if (h.includes("exam") || h.includes("terminal")) examIdx = idx
        else if (h.includes("remark") || h.includes("comment")) remarksIdx = idx
      })
    }

    for (let i = 0; i < dataLines.length; i++) {
      const line = dataLines[i]
      if (!line) continue
      const cols = splitLine(line, delimiter)
      if (cols.length < 2) continue

      const student_id = cols[idIdx]?.trim() || `CRST-IMP-${String(i + 1).padStart(3, "0")}`
      const student_name = cols[nameIdx]?.trim() || `Student ${i + 1}`

      const rawCa1 = parseFloat(cols[ca1Idx]?.replace(/[^0-9.]/g, "")) || 0
      const rawCa2 = parseFloat(cols[ca2Idx]?.replace(/[^0-9.]/g, "")) || 0
      const rawMidterm = parseFloat(cols[midtermIdx]?.replace(/[^0-9.]/g, "")) || 0
      const rawExam = parseFloat(cols[examIdx]?.replace(/[^0-9.]/g, "")) || 0

      const ca1 = Math.min(10, Math.max(0, Math.round(rawCa1 * 10) / 10))
      const ca2 = Math.min(10, Math.max(0, Math.round(rawCa2 * 10) / 10))
      const midterm = Math.min(20, Math.max(0, Math.round(rawMidterm * 10) / 10))
      const exam = Math.min(60, Math.max(0, Math.round(rawExam * 10) / 10))
      const total = Math.min(100, Math.round((ca1 + ca2 + midterm + exam) * 10) / 10)
      const letter_grade = getWaecGrade(total).grade
      const remarks =
        cols[remarksIdx]?.trim() ||
        (total >= 75
          ? "Distinction / Excellent academic performance"
          : total >= 50
          ? "Credit pass achieved"
          : "Remedial tutorial recommended")

      parsedRows.push({
        student_id,
        student_name,
        ca1,
        ca2,
        midterm,
        exam,
        total,
        letter_grade,
        remarks,
      })
    }

    return parsedRows
  }

  // File processing trigger
  const processFile = (file: File) => {
    if (!file.name.match(/\.(csv|tsv|txt)$/i)) {
      toast.error("Unsupported file format", {
        description: "Please upload a .csv, .tsv, or text file exported from Excel.",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string
        if (!content || !content.trim()) {
          toast.error("Uploaded file is empty")
          return
        }

        const parsed = parseBroadsheetText(content)
        if (parsed.length === 0) {
          toast.error("No valid student score rows detected in file", {
            description: "Please check that columns include student name, CA1, CA2, Mid-Term, and Exam marks.",
          })
          return
        }

        setImportSummary({
          fileName: file.name,
          rowCount: parsed.length,
          replaced: true,
        })

        // Automatically compute cumulative term grades and student rankings from uploaded CSV data as soon as the file is ingested!
        const computed = computeCumulativeAverages(parsed, false)

        toast.success("Broad Sheet Ingested & Cumulative Averages Computed!", {
          description: `Imported ${parsed.length} student scores from ${file.name}. Class Cumulative Mean: ${computed.meanTotal}% • Exam Average: ${computed.meanExam}/60 • Pass Rate: ${computed.passRate}%.`,
        })
      } catch (err: unknown) {
        const error = err as Error
        toast.error("Error parsing broadsheet file", {
          description: error.message,
        })
      }
    }
    reader.readAsText(file)
  }

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  // Download official sample template CSV
  const handleDownloadSampleTemplate = () => {
    const sampleCsv = `student_id,student_name,ca1,ca2,midterm,exam,remarks
CRST-STU-8831,Ibrahim Babangida,9.0,8.5,18.0,54.0,Excellent analytical problem solving
CRST-STU-8832,Ngozi Okonjo,9.5,9.0,19.0,57.0,Outstanding laboratory mastery
CRST-STU-8833,Oluwaseun Adeleke,7.5,8.0,16.0,46.0,Good comprehension of principles
CRST-STU-8834,Hadiza Usman,8.0,7.5,15.5,44.5,Very consistent work in tutorial exercises
CRST-STU-8835,Emeka Okafor,6.5,7.0,13.0,39.0,Pass credit; recommended for weekend clinic
CRST-STU-8836,Amina Damilola,8.5,8.0,17.5,50.0,Strong conceptual understanding`

    const blob = new Blob([sampleCsv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `cresta_broadsheet_sample_template_${selectedSubject.toLowerCase().replace(/\s+/g, "_")}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success("Sample Broadsheet Template Downloaded", {
      description: "You can edit this CSV in Microsoft Excel or Google Sheets and import it here.",
    })
  }

  // Export current active sheet as CSV
  const handleExportCurrentSheet = () => {
    const headers = [
      "student_id",
      "student_name",
      "ca1",
      "ca2",
      "midterm",
      "exam",
      "total",
      "letter_grade",
      "remarks",
    ]
    const lines = [
      headers.join(","),
      ...rows.map(
        (r) =>
          `"${r.student_id}","${r.student_name}",${r.ca1},${r.ca2},${r.midterm},${r.exam},${r.total},"${r.letter_grade}","${(r.remarks || "").replace(/"/g, '""')}"`
      ),
    ]
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${selectedClass.replace(/[^a-zA-Z0-9]/g, "_")}_${selectedSubject.toLowerCase().replace(/\s+/g, "_")}_broadsheet.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success("Broadsheet Exported to CSV", {
      description: `Downloaded ${rows.length} student scores as CSV.`,
    })
  }

  // Handle class change
  const handleClassChange = (newClass: string) => {
    setSelectedClass(newClass)
    if (newClass.includes("11")) {
      setRows(DEFAULT_STUDENTS_GRADE11)
    } else {
      setRows(DEFAULT_STUDENTS_GRADE10A)
    }
  }

  // Update a single mark
  const handleScoreChange = (
    index: number,
    field: "ca1" | "ca2" | "midterm" | "exam",
    valueStr: string
  ) => {
    const parsed = parseFloat(valueStr) || 0
    let clamped = Math.max(0, parsed)
    if (field === "ca1" || field === "ca2") clamped = Math.min(10, clamped)
    if (field === "midterm") clamped = Math.min(20, clamped)
    if (field === "exam") clamped = Math.min(60, clamped)

    setRows((prev) => {
      const updated = [...prev]
      const current = { ...updated[index] }
      current[field] = clamped
      const total = Math.min(100, Math.round((current.ca1 + current.ca2 + current.midterm + current.exam) * 10) / 10)
      current.total = total
      current.letter_grade = getWaecGrade(total).grade
      updated[index] = current
      return updated
    })
  }

  const handleRemarkChange = (index: number, val: string) => {
    setRows((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], remarks: val }
      return updated
    })
  }

  // Quick helper: Autofill sample marks
  const handleAutofillSample = () => {
    setRows((prev) =>
      prev.map((r, i) => {
        const ca1 = Math.min(10, 7 + ((i * 3) % 4))
        const ca2 = Math.min(10, 6.5 + ((i * 2) % 4))
        const midterm = Math.min(20, 14 + ((i * 4) % 7))
        const exam = Math.min(60, 42 + ((i * 7) % 19))
        const total = Math.min(100, Math.round((ca1 + ca2 + midterm + exam) * 10) / 10)
        return {
          ...r,
          ca1,
          ca2,
          midterm,
          exam,
          total,
          letter_grade: getWaecGrade(total).grade,
        }
      })
    )
    toast.success("Sample continuous assessment marks populated", {
      description: "Scores calculated using standard WAEC 4-tier weighting.",
    })
  }

  // Fetch past persisted grades
  const loadGradeHistory = async () => {
    try {
      setViewHistory(true)
      const res = await fetch(`/api/grades?class_name=${encodeURIComponent(selectedClass)}&subject=${encodeURIComponent(selectedSubject)}`)
      const data = await res.json()
      if (data.records) {
        setPersistedHistory(data.records)
        setDbSource(data.source || "neon")
      }
    } catch {
      toast.error("Failed to load grade records from database")
    }
  }

  // Summary statistics
  const totalScoreSum = rows.reduce((acc, r) => acc + r.total, 0)
  const classAverage = rows.length > 0 ? (totalScoreSum / rows.length).toFixed(1) : "0"
  const highestRow = rows.reduce((prev, curr) => (curr.total > prev.total ? curr : prev), rows[0] || { total: 0, student_name: "N/A" })
  const lowestRow = rows.reduce((prev, curr) => (curr.total < prev.total ? curr : prev), rows[0] || { total: 0, student_name: "N/A" })
  const passCount = rows.filter((r) => r.total >= 50).length
  const passRate = rows.length > 0 ? Math.round((passCount / rows.length) * 100) : 0

  // Save to database
  const handleSaveToDatabase = async () => {
    setSaving(true)
    setSaveSuccessDetails(null)
    try {
      const payload = {
        grades: rows.map((r) => ({
          student_id: r.student_id,
          student_name: r.student_name,
          class_name: selectedClass,
          subject: selectedSubject,
          term: academicTerm,
          ca1: r.ca1,
          ca2: r.ca2,
          midterm: r.midterm,
          exam: r.exam,
          total: r.total,
          letter_grade: r.letter_grade,
          remarks: r.remarks,
          teacher_name: teacherName,
        })),
      }

      const res = await fetch("/api/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to persist grades to database")
      }

      setSaveSuccessDetails({
        count: data.savedCount || rows.length,
        source: data.source,
      })

      toast.success("Marks Persisted to Database!", {
        description: data.message || `Recorded ${rows.length} student scores in the official institutional broadsheet.`,
      })

      if (onGradesSaved) {
        onGradesSaved()
      }
    } catch (err: unknown) {
      const error = err as Error
      toast.error("Failed to persist grades", {
        description: error.message,
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <DialogContent className="sm:max-w-4xl max-h-[92vh] overflow-y-auto p-0 gap-0 border-border">
        {/* Modal Header */}
        <div className="p-5 border-b bg-muted/20">
          <DialogHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1 text-[11px] font-semibold">
                    <FileSpreadsheet className="size-3" />
                    Teacher Continuous Assessment
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium">
                    WAEC / NECO 4-Tier Assessment Model
                  </span>
                </div>
                <DialogTitle className="text-xl font-bold mt-1 text-foreground">
                  New Grade Entry &bull; Broadsheet Score Input
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  Input student continuous assessments and exam marks for instant automatic grade calculation and database persistence.
                </DialogDescription>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={viewHistory ? () => setViewHistory(false) : loadGradeHistory}
                  className="h-8 text-xs gap-1.5 font-medium border-border"
                >
                  <History className="size-3.5 text-primary" />
                  <span>{viewHistory ? "Back to Entry Sheet" : "View Database Records"}</span>
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Configuration Selector Toolbar */}
          {!viewHistory && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-border/60">
              <div className="space-y-1">
                <Label className="text-[11px] font-semibold text-muted-foreground">Class &amp; Arm</Label>
                <select
                  value={selectedClass}
                  onChange={(e) => handleClassChange(e.target.value)}
                  className="w-full h-8 text-xs rounded-md border border-input bg-background px-2 font-medium"
                >
                  <option value="Grade 10-A (SSS 1)">Grade 10-A (SSS 1)</option>
                  <option value="Grade 10-B (SSS 1)">Grade 10-B (SSS 1)</option>
                  <option value="Grade 11 Science (SSS 2)">Grade 11 Science (SSS 2)</option>
                  <option value="Grade 12 Advanced (SSS 3)">Grade 12 Advanced (SSS 3)</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label className="text-[11px] font-semibold text-muted-foreground">Subject</Label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full h-8 text-xs rounded-md border border-input bg-background px-2 font-medium"
                >
                  <option value="Biology">Biology (Science Dept)</option>
                  <option value="Chemistry">Chemistry Practical Lab</option>
                  <option value="Physics">Physics Tutorial</option>
                  <option value="Further Mathematics">Further Mathematics</option>
                  <option value="English Language">English Language</option>
                  <option value="Agricultural Science">Agricultural Science</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label className="text-[11px] font-semibold text-muted-foreground">Academic Term</Label>
                <select
                  value={academicTerm}
                  onChange={(e) => setAcademicTerm(e.target.value)}
                  className="w-full h-8 text-xs rounded-md border border-input bg-background px-2 font-medium"
                >
                  <option value="Term 2 - 2026/2027">Term 2 &bull; 2026/2027 (Active)</option>
                  <option value="Term 1 - 2026/2027">Term 1 &bull; 2026/2027</option>
                  <option value="Term 3 - 2026/2027">Term 3 &bull; 2026/2027</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label className="text-[11px] font-semibold text-muted-foreground">Class Teacher</Label>
                <Input
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="h-8 text-xs font-medium"
                />
              </div>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {viewHistory ? (
            /* Database History View */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Database className="size-4 text-primary" />
                    Persisted Database Grade Records
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Stored in Neon PostgreSQL database / local fallback ledger
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  Source: {dbSource === "neon" ? "Neon Cloud PostgreSQL" : "Local Database"}
                </Badge>
              </div>

              <div className="border rounded-lg overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/40 border-b text-left font-semibold text-muted-foreground">
                      <th className="p-2.5">Student ID</th>
                      <th className="p-2.5">Student Name</th>
                      <th className="p-2.5">Class</th>
                      <th className="p-2.5">Subject</th>
                      <th className="p-2.5 text-center">CA1 (10)</th>
                      <th className="p-2.5 text-center">CA2 (10)</th>
                      <th className="p-2.5 text-center">Mid (20)</th>
                      <th className="p-2.5 text-center">Exam (60)</th>
                      <th className="p-2.5 text-center font-bold">Total</th>
                      <th className="p-2.5 text-center">Grade</th>
                      <th className="p-2.5">Teacher Remark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {persistedHistory.length === 0 ? (
                      <tr>
                        <td colSpan={11} className="p-6 text-center text-muted-foreground text-xs">
                          No past grade entries found for this class and subject. Enter marks in the sheet to persist them.
                        </td>
                      </tr>
                    ) : (
                      persistedHistory.map((rec, i) => {
                        const gradeInfo = getWaecGrade(Number(rec.total))
                        return (
                          <tr key={rec.id || i} className="hover:bg-muted/20">
                            <td className="p-2.5 font-mono text-[11px] text-muted-foreground">{rec.student_id}</td>
                            <td className="p-2.5 font-semibold text-foreground">{rec.student_name}</td>
                            <td className="p-2.5 text-muted-foreground">{rec.class_name}</td>
                            <td className="p-2.5 font-medium">{rec.subject}</td>
                            <td className="p-2.5 text-center">{rec.ca1}</td>
                            <td className="p-2.5 text-center">{rec.ca2}</td>
                            <td className="p-2.5 text-center">{rec.midterm}</td>
                            <td className="p-2.5 text-center">{rec.exam}</td>
                            <td className="p-2.5 text-center font-bold text-foreground">{rec.total}</td>
                            <td className="p-2.5 text-center">
                              <Badge variant="outline" className={`text-[10px] py-0 px-1.5 font-bold ${gradeInfo.color}`}>
                                {rec.letter_grade || gradeInfo.grade}
                              </Badge>
                            </td>
                            <td className="p-2.5 text-muted-foreground max-w-[200px] truncate" title={rec.remarks}>
                              {rec.remarks || "—"}
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Active Continuous Assessment Grade Sheet */
            <div className="space-y-4">
              {/* Success confirmation banner if just saved */}
              {saveSuccessDetails && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-300 dark:border-emerald-800 text-xs flex items-center justify-between text-emerald-800 dark:text-emerald-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>
                      Successfully persisted <strong>{saveSuccessDetails.count}</strong> student mark(s) into database ({saveSuccessDetails.source === "neon" ? "Neon PostgreSQL" : "Local Database Storage"}).
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={loadGradeHistory}
                    className="h-6 text-xs text-emerald-700 dark:text-emerald-300 font-bold hover:underline p-0"
                  >
                    View audit ledger &rarr;
                  </Button>
                </div>
              )}

              {/* Live Metric Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 rounded-lg border bg-muted/20">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Class Average</p>
                  <p className="text-lg font-bold text-foreground">{classAverage}%</p>
                  <p className="text-[10px] text-emerald-600 font-medium">B2 / Good Standard</p>
                </div>
                <div className="p-2.5 rounded-lg border bg-muted/20">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Highest Mark</p>
                  <p className="text-lg font-bold text-foreground">{highestRow.total}%</p>
                  <p className="text-[10px] text-muted-foreground truncate">{highestRow.student_name}</p>
                </div>
                <div className="p-2.5 rounded-lg border bg-muted/20">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Lowest Mark</p>
                  <p className="text-lg font-bold text-foreground">{lowestRow.total}%</p>
                  <p className="text-[10px] text-muted-foreground truncate">{lowestRow.student_name}</p>
                </div>
                <div className="p-2.5 rounded-lg border bg-muted/20">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Pass Rate (&ge;50%)</p>
                  <p className="text-lg font-bold text-emerald-600">{passRate}%</p>
                  <p className="text-[10px] text-muted-foreground">{passCount} of {rows.length} students</p>
                </div>
              </div>

              {/* Table Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calculator className="size-3.5 text-primary" />
                  <span>Weighting: <strong>CA 1 (10%)</strong> + <strong>CA 2 (10%)</strong> + <strong>Mid-Term (20%)</strong> + <strong>Exam (60%)</strong> = <strong>100%</strong></span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => computeCumulativeAverages(rows, true)}
                    className="h-7 text-xs gap-1.5 font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                    title="Calculate cumulative term averages and student ranking positions"
                  >
                    <Calculator className="size-3.5" />
                    <span>Calculate Averages</span>
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant={showImportZone ? "default" : "outline"}
                    onClick={() => setShowImportZone((v) => !v)}
                    className="h-7 text-xs gap-1.5 font-semibold border-emerald-400 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20"
                  >
                    <UploadCloud className="size-3.5 text-emerald-600" />
                    <span>{showImportZone ? "Hide Import Zone" : "Import Broadsheet (CSV / Excel)"}</span>
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleExportCurrentSheet}
                    className="h-7 text-xs gap-1 hover:bg-muted"
                    title="Download active sheet as CSV"
                  >
                    <Download className="size-3 text-muted-foreground" />
                    <span>Export CSV</span>
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleAutofillSample}
                    className="h-7 text-xs gap-1 border-dashed"
                  >
                    <Sparkles className="size-3 text-amber-500" />
                    <span>Autofill Sample Marks</span>
                  </Button>
                </div>
              </div>

              {/* Cumulative Term Averages & Performance Analytics Card */}
              {cumulativeMetrics && showAveragesPanel && (
                <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 space-y-3 transition-all animate-in fade-in-50 duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                        <BarChart3 className="size-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
                          <span>Cumulative Term Averages &amp; Weighted Analytics</span>
                          <Badge variant="outline" className="text-[10px] text-blue-700 dark:text-blue-300 bg-blue-500/10 border-blue-400">
                            Auto-Computed from Broadsheet
                          </Badge>
                        </h4>
                        <p className="text-[11px] text-muted-foreground">
                          Official WAEC 4-tier cumulative weighting across <strong>{rows.length} students</strong>. Positions and grade boundaries are synchronized.
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => setShowAveragesPanel(false)}
                      className="size-7 text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>

                  {/* Component Weighted Breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-background border text-center">
                      <span className="text-[10px] text-muted-foreground block font-medium">CA 1 Mean (10%)</span>
                      <span className="text-base font-bold text-foreground block mt-0.5">{cumulativeMetrics.meanCa1} / 10</span>
                      <span className="text-[10px] text-muted-foreground">{Math.round((cumulativeMetrics.meanCa1 / 10) * 100)}% realization</span>
                    </div>

                    <div className="p-2 rounded-lg bg-background border text-center">
                      <span className="text-[10px] text-muted-foreground block font-medium">CA 2 Mean (10%)</span>
                      <span className="text-base font-bold text-foreground block mt-0.5">{cumulativeMetrics.meanCa2} / 10</span>
                      <span className="text-[10px] text-muted-foreground">{Math.round((cumulativeMetrics.meanCa2 / 10) * 100)}% realization</span>
                    </div>

                    <div className="p-2 rounded-lg bg-background border text-center">
                      <span className="text-[10px] text-muted-foreground block font-medium">Mid-Term Mean (20%)</span>
                      <span className="text-base font-bold text-foreground block mt-0.5">{cumulativeMetrics.meanMidterm} / 20</span>
                      <span className="text-[10px] text-muted-foreground">{Math.round((cumulativeMetrics.meanMidterm / 20) * 100)}% realization</span>
                    </div>

                    <div className="p-2 rounded-lg bg-background border text-center">
                      <span className="text-[10px] text-muted-foreground block font-medium">Terminal Exam (60%)</span>
                      <span className="text-base font-bold text-foreground block mt-0.5">{cumulativeMetrics.meanExam} / 60</span>
                      <span className="text-[10px] text-muted-foreground">{Math.round((cumulativeMetrics.meanExam / 60) * 100)}% realization</span>
                    </div>

                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-300 dark:border-blue-800 text-center col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-bold uppercase">Class Cumulative Mean</span>
                      <span className="text-lg font-extrabold text-blue-700 dark:text-blue-300 block mt-0.5">{cumulativeMetrics.meanTotal}%</span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">WAEC Grade B2/B3</span>
                    </div>
                  </div>

                  {/* Grade Distribution & Top Leaderboard */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-border/50 text-xs">
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-foreground flex items-center gap-1.5">
                        <TrendingUp className="size-3 text-primary" />
                        <span>WAEC Grade Distribution ({rows.length} Total)</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant="outline" className="border-emerald-400 text-emerald-700 dark:text-emerald-300 text-[10px] bg-emerald-500/10 font-semibold">
                          Distinction (A1): {cumulativeMetrics.distinctionCount}
                        </Badge>
                        <Badge variant="outline" className="border-blue-400 text-blue-700 dark:text-blue-300 text-[10px] bg-blue-500/10 font-semibold">
                          Credit (B2–C6): {cumulativeMetrics.creditCount}
                        </Badge>
                        <Badge variant="outline" className="border-amber-400 text-amber-700 dark:text-amber-300 text-[10px] bg-amber-500/10 font-semibold">
                          Pass (D7–E8): {cumulativeMetrics.passTierCount}
                        </Badge>
                        <Badge variant="outline" className="border-red-400 text-destructive text-[10px] bg-destructive/10 font-semibold">
                          Remedial (F9): {cumulativeMetrics.failCount}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-foreground flex items-center gap-1.5">
                        <Award className="size-3 text-amber-500" />
                        <span>Top Class Rankings</span>
                      </span>
                      <div className="flex items-center gap-2">
                        {cumulativeMetrics.topStudents.map((st) => (
                          <div key={st.name} className="px-2 py-1 rounded bg-background border flex items-center gap-1 text-[11px]">
                            <span className="font-bold text-amber-600">
                              {st.rank === 1 ? "🥇 1st" : st.rank === 2 ? "🥈 2nd" : "🥉 3rd"}
                            </span>
                            <span className="font-medium text-foreground truncate max-w-[80px]">{st.name.split(" ")[0]}</span>
                            <span className="font-bold text-emerald-600">{st.total}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Drag-and-Drop Broadsheet Ingestion Zone */}
              {showImportZone && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3 transition-all animate-in fade-in-50 duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                        <FileSpreadsheet className="size-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
                          <span>Broad Sheet CSV / Excel Bulk Ingestion</span>
                          <Badge variant="outline" className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border-emerald-400">
                            Drag &amp; Drop Ready
                          </Badge>
                        </h4>
                        <p className="text-[11px] text-muted-foreground">
                          Drop your class broadsheet CSV/TSV file exported from Microsoft Excel or Google Sheets. All student rows, CA scores, and WAEC grades will be imported in bulk.
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => setShowImportZone(false)}
                      className="size-7 text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>

                  {/* Drag Area */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-all ${
                      isDragging
                        ? "border-emerald-500 bg-emerald-500/20 ring-2 ring-emerald-500/30 scale-[0.99]"
                        : "border-primary/40 bg-card hover:bg-muted/40 hover:border-primary"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.tsv,.txt"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="size-11 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                        <FileUp className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">
                          {isDragging ? "Drop your class broadsheet file here..." : "Drag & drop class broadsheet CSV/Excel file here, or click to browse"}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Supports <strong>.csv</strong>, <strong>.tsv</strong> (columns: Student ID, Full Name, CA 1, CA 2, Mid-Term, Exam, Remarks)
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                        <Button
                          type="button"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            fileInputRef.current?.click()
                          }}
                          className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1.5"
                        >
                          <UploadCloud className="size-3.5" />
                          <span>Select Broadsheet File</span>
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownloadSampleTemplate()
                          }}
                          className="h-7 text-xs gap-1.5 border-dashed"
                        >
                          <Download className="size-3.5" />
                          <span>Download Sample Template (.CSV)</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Import Status Alert */}
                  {importSummary && (
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-300 dark:border-emerald-800 text-xs">
                      <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
                        <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                        <span>
                          Ingested <strong>{importSummary.rowCount} students</strong> from <code>{importSummary.fileName}</code>.
                          WAEC letter grades and totals computed automatically. Review the table below, then click <strong>Save &amp; Persist Grades to Database</strong>.
                        </span>
                      </div>
                      <Badge variant="outline" className="border-emerald-400 text-emerald-700 dark:text-emerald-300 text-[10px] shrink-0 font-semibold">
                        Populated
                      </Badge>
                    </div>
                  )}
                </div>
              )}

              {/* Grade Entry Table */}
              <div className="border rounded-lg overflow-x-auto shadow-xs">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/50 border-b text-left font-semibold text-muted-foreground">
                      <th className="p-2 w-8 text-center">#</th>
                      <th className="p-2 w-14 text-center">Rank</th>
                      <th className="p-2 min-w-[160px]">Student Name</th>
                      <th className="p-2 text-center w-20">CA 1<br/><span className="text-[10px] font-normal text-muted-foreground">(Max 10)</span></th>
                      <th className="p-2 text-center w-20">CA 2<br/><span className="text-[10px] font-normal text-muted-foreground">(Max 10)</span></th>
                      <th className="p-2 text-center w-20">Mid-Term<br/><span className="text-[10px] font-normal text-muted-foreground">(Max 20)</span></th>
                      <th className="p-2 text-center w-20">Terminal Exam<br/><span className="text-[10px] font-normal text-muted-foreground">(Max 60)</span></th>
                      <th className="p-2 text-center w-20 font-bold text-foreground">Total<br/><span className="text-[10px] font-normal">(100%)</span></th>
                      <th className="p-2 text-center w-16">Grade</th>
                      <th className="p-2 min-w-[220px]">Teacher Academic Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {rows.map((row, index) => {
                      const grade = getWaecGrade(row.total)
                      return (
                        <tr key={row.student_id} className="hover:bg-muted/15 transition-colors">
                          <td className="p-2 text-center text-muted-foreground font-mono text-[11px]">
                            {index + 1}
                          </td>
                          <td className="p-2 text-center">
                            {row.rank === 1 ? (
                              <Badge className="bg-amber-500 text-white font-bold text-[10px] px-1.5 shadow-xs">1st 🥇</Badge>
                            ) : row.rank === 2 ? (
                              <Badge className="bg-slate-400 text-white font-bold text-[10px] px-1.5 shadow-xs">2nd 🥈</Badge>
                            ) : row.rank === 3 ? (
                              <Badge className="bg-amber-700 text-white font-bold text-[10px] px-1.5 shadow-xs">3rd 🥉</Badge>
                            ) : (
                              <span className="font-mono text-muted-foreground text-[11px] font-medium">{row.rank ? `${row.rank}th` : `${index + 1}`}</span>
                            )}
                          </td>
                          <td className="p-2">
                            <p className="font-bold text-foreground leading-tight">{row.student_name}</p>
                            <span className="text-[10px] font-mono text-muted-foreground">{row.student_id}</span>
                          </td>

                          {/* CA 1 */}
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              min={0}
                              max={10}
                              step={0.5}
                              value={row.ca1}
                              onChange={(e) => handleScoreChange(index, "ca1", e.target.value)}
                              className="w-16 h-7 text-center rounded border border-input bg-background font-mono text-xs focus:ring-1 focus:ring-primary focus:border-primary font-medium"
                            />
                          </td>

                          {/* CA 2 */}
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              min={0}
                              max={10}
                              step={0.5}
                              value={row.ca2}
                              onChange={(e) => handleScoreChange(index, "ca2", e.target.value)}
                              className="w-16 h-7 text-center rounded border border-input bg-background font-mono text-xs focus:ring-1 focus:ring-primary focus:border-primary font-medium"
                            />
                          </td>

                          {/* Mid-Term */}
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              min={0}
                              max={20}
                              step={0.5}
                              value={row.midterm}
                              onChange={(e) => handleScoreChange(index, "midterm", e.target.value)}
                              className="w-16 h-7 text-center rounded border border-input bg-background font-mono text-xs focus:ring-1 focus:ring-primary focus:border-primary font-medium"
                            />
                          </td>

                          {/* Exam */}
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              min={0}
                              max={60}
                              step={0.5}
                              value={row.exam}
                              onChange={(e) => handleScoreChange(index, "exam", e.target.value)}
                              className="w-16 h-7 text-center rounded border border-input bg-background font-mono text-xs focus:ring-1 focus:ring-primary focus:border-primary font-semibold"
                            />
                          </td>

                          {/* Auto Total */}
                          <td className="p-2 text-center font-bold font-mono text-foreground text-sm">
                            {row.total}
                          </td>

                          {/* Auto Grade Badge */}
                          <td className="p-2 text-center">
                            <Badge variant="outline" className={`text-[11px] font-bold py-0.5 px-2 border ${grade.color}`}>
                              {grade.grade}
                            </Badge>
                          </td>

                          {/* Teacher Remarks */}
                          <td className="p-2">
                            <Input
                              value={row.remarks}
                              onChange={(e) => handleRemarkChange(index, e.target.value)}
                              placeholder="Academic evaluation remark..."
                              className="h-7 text-xs"
                            />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t bg-muted/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Database className="size-3.5 text-primary shrink-0" />
            <span>Persisting directly to PostgreSQL tables &amp; audited academic archive.</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="h-9 text-xs"
            >
              Close
            </Button>

            {!viewHistory && (
              <Button
                type="button"
                size="sm"
                onClick={handleSaveToDatabase}
                disabled={saving}
                className="h-9 text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
              >
                {saving ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Persisting to Database...</span>
                  </>
                ) : (
                  <>
                    <Database className="size-3.5" />
                    <span>Save &amp; Persist Grades to Database</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
  )
}

export function NewGradeEntryDialog({
  open,
  onOpenChange,
  initialSubject = "Biology",
  initialClass = "Grade 10-A (SSS 1)",
  onGradesSaved,
}: NewGradeEntryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && (
        <NewGradeEntryDialogInner
          initialSubject={initialSubject}
          initialClass={initialClass}
          onClose={() => onOpenChange(false)}
          onGradesSaved={onGradesSaved}
        />
      )}
    </Dialog>
  )
}
