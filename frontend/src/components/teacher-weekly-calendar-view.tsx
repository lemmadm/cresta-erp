"use client"

import * as React from "react"
import {
  Calendar,
  Clock,
  BookOpen,
  Users,
  MapPin,
  CheckCircle2,
  CalendarCheck,
  FileSpreadsheet,
  Printer,
  Compass,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"

export interface TeachingPeriod {
  id: string
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday"
  periodIndex: number // 1 to 7
  timeSlot: string
  subject: string
  classArm: string
  room: string
  topic: string
  status: "completed" | "live" | "next" | "upcoming" | "prep"
  studentCount: number
  colorTheme: "emerald" | "blue" | "violet" | "amber" | "teal" | "slate"
  lessonObjectives?: string
  materialsNeeded?: string
}

export const TEACHER_WEEKLY_SCHEDULE: TeachingPeriod[] = [
  // --- MONDAY ---
  {
    id: "MON-P1",
    day: "Monday",
    periodIndex: 1,
    timeSlot: "08:00 - 08:50 AM",
    subject: "Biology Theory",
    classArm: "Grade 10-A (SSS 1)",
    room: "Room 204",
    topic: "Introduction to Cell Theory & Ultrastructure",
    status: "completed",
    studentCount: 40,
    colorTheme: "emerald",
    lessonObjectives: "Identify differences between prokaryotic and eukaryotic organelles.",
    materialsNeeded: "High-res organelle charts, interactive smartboard slide deck.",
  },
  {
    id: "MON-P3",
    day: "Monday",
    periodIndex: 3,
    timeSlot: "09:50 - 10:40 AM",
    subject: "General Science",
    classArm: "Grade 10-B (SSS 1)",
    room: "Room 208",
    topic: "Scientific Method & Measurement Accuracy",
    status: "completed",
    studentCount: 39,
    colorTheme: "blue",
    lessonObjectives: "Master vernier calipers and micrometer screw gauge precision.",
    materialsNeeded: "Calipers, measurement logs, standard metallic cylinders.",
  },
  {
    id: "MON-P5",
    day: "Monday",
    periodIndex: 5,
    timeSlot: "12:10 - 01:00 PM",
    subject: "Chemistry Prep",
    classArm: "Grade 11 Science (SSS 2)",
    room: "Lab #2 (Chemistry)",
    topic: "Acid-Base Titration Standardization",
    status: "completed",
    studentCount: 35,
    colorTheme: "violet",
    lessonObjectives: "Prepare standard 0.1M Na2CO3 primary standard solution.",
    materialsNeeded: "Volumetric flasks, analytical balance, weighing boats.",
  },
  {
    id: "MON-P7",
    day: "Monday",
    periodIndex: 7,
    timeSlot: "02:45 - 03:30 PM",
    subject: "Faculty Meeting",
    classArm: "Science Department",
    room: "Staff Conference Hall",
    topic: "Term 2 Continuous Assessment & Lab Safety Review",
    status: "completed",
    studentCount: 14,
    colorTheme: "slate",
    lessonObjectives: "Harmonize WAEC practical specimen orders across Senior Secondary.",
    materialsNeeded: "Departmental agenda, reagent inventory balance sheets.",
  },

  // --- TUESDAY ---
  {
    id: "TUE-P2",
    day: "Tuesday",
    periodIndex: 2,
    timeSlot: "08:55 - 09:45 AM",
    subject: "Biology Practical",
    classArm: "Grade 10-A (SSS 1)",
    room: "Biology Lab",
    topic: "Microscopic Observation of Onion Epidermal Cells",
    status: "completed",
    studentCount: 40,
    colorTheme: "emerald",
    lessonObjectives: "Prepare wet-mount slides stained with iodine solution.",
    materialsNeeded: "Compound light microscopes, glass slides, cover slips, iodine.",
  },
  {
    id: "TUE-P4",
    day: "Tuesday",
    periodIndex: 4,
    timeSlot: "11:15 - 12:05 PM",
    subject: "Advanced Chemistry",
    classArm: "Grade 11 Science (SSS 2)",
    room: "Lab #2 (Chemistry)",
    topic: "Redox Kinetics & Half-Equations",
    status: "completed",
    studentCount: 35,
    colorTheme: "violet",
    lessonObjectives: "Balance redox equations in acidic and alkaline media.",
    materialsNeeded: "Electrode kits, KMnO4 solutions, standard reduction tables.",
  },
  {
    id: "TUE-P6",
    day: "Tuesday",
    periodIndex: 6,
    timeSlot: "01:50 - 02:40 PM",
    subject: "STEM Mentorship",
    classArm: "Science Club",
    room: "Innovation Hall",
    topic: "National Junior Olympiad Robotics & Ecology Project",
    status: "completed",
    studentCount: 22,
    colorTheme: "amber",
    lessonObjectives: "Test automated solar hydroponics moisture sensors.",
    materialsNeeded: "Arduino microcontrollers, moisture sensors, breadboards.",
  },

  // --- WEDNESDAY (TODAY) ---
  {
    id: "WED-P1",
    day: "Wednesday",
    periodIndex: 1,
    timeSlot: "08:00 - 08:50 AM",
    subject: "Biology",
    classArm: "Grade 10-A (SSS 1)",
    room: "Room 204",
    topic: "Cellular Genetics & Mendelian Inheritance",
    status: "completed",
    studentCount: 40,
    colorTheme: "emerald",
    lessonObjectives: "Construct monohybrid Punnett squares and calculate genotypic ratios.",
    materialsNeeded: "Genetic trait allele tokens, student activity worksheets.",
  },
  {
    id: "WED-P3",
    day: "Wednesday",
    periodIndex: 3,
    timeSlot: "09:50 - 10:40 AM",
    subject: "Chemistry Lab",
    classArm: "Grade 11 Science (SSS 2)",
    room: "Lab #2 (Chemistry)",
    topic: "Volumetric Analysis & Unknown Acid Concentration",
    status: "next",
    studentCount: 35,
    colorTheme: "violet",
    lessonObjectives: "Execute 3 concordant titration runs within +/-0.10 cm3 accuracy.",
    materialsNeeded: "50mL burettes, methyl orange indicator, 0.1M HCl.",
  },
  {
    id: "WED-P5",
    day: "Wednesday",
    periodIndex: 5,
    timeSlot: "12:10 - 01:00 PM",
    subject: "Physics Tutorial",
    classArm: "Grade 10-B (SSS 1)",
    room: "Room 208",
    topic: "Wave Motion & Optics Refraction Index",
    status: "upcoming",
    studentCount: 39,
    colorTheme: "blue",
    lessonObjectives: "Apply Snell's Law to rectangular glass prism experiments.",
    materialsNeeded: "Optical ray boxes, glass blocks, protractors, optical pins.",
  },
  {
    id: "WED-P7",
    day: "Wednesday",
    periodIndex: 7,
    timeSlot: "02:45 - 03:30 PM",
    subject: "STEM Mentorship",
    classArm: "Science Club",
    room: "Innovation Hall",
    topic: "Clean Water Filtration Column Build",
    status: "upcoming",
    studentCount: 24,
    colorTheme: "amber",
    lessonObjectives: "Assemble activated charcoal, silica sand, and gravel filter columns.",
    materialsNeeded: "Acrylic filter columns, activated carbon, turbidity meters.",
  },

  // --- THURSDAY ---
  {
    id: "THU-P2",
    day: "Thursday",
    periodIndex: 2,
    timeSlot: "08:55 - 09:45 AM",
    subject: "Chemistry",
    classArm: "Grade 11 Science (SSS 2)",
    room: "Lab #2 (Chemistry)",
    topic: "Stoichiometry & Mole Concept Problem Solving",
    status: "upcoming",
    studentCount: 35,
    colorTheme: "violet",
    lessonObjectives: "Compute theoretical and percentage yields from limiting reagents.",
    materialsNeeded: "Broadsheet workbook, periodic tables, scientific calculators.",
  },
  {
    id: "THU-P4",
    day: "Thursday",
    periodIndex: 4,
    timeSlot: "11:15 - 12:05 PM",
    subject: "Biology",
    classArm: "Grade 10-A (SSS 1)",
    room: "Biology Garden / Field",
    topic: "Ecosystem Sampling & Quadrats Method",
    status: "upcoming",
    studentCount: 40,
    colorTheme: "emerald",
    lessonObjectives: "Estimate population density using 1m² quadrat sampling.",
    materialsNeeded: "Quadrat frames, specimen collection jars, field clipboards.",
  },
  {
    id: "THU-P6",
    day: "Thursday",
    periodIndex: 6,
    timeSlot: "01:50 - 02:40 PM",
    subject: "Teacher Prep",
    classArm: "Helena Brooks Prep",
    room: "Science Faculty Office",
    topic: "Grading Chemistry Lab Reports & Continuous Assessments",
    status: "prep",
    studentCount: 0,
    colorTheme: "slate",
    lessonObjectives: "Complete WAEC broadsheet score collation for Grade 10-A.",
    materialsNeeded: "Cresta Teacher Portal, lab report dossiers.",
  },

  // --- FRIDAY ---
  {
    id: "FRI-P1",
    day: "Friday",
    periodIndex: 1,
    timeSlot: "08:00 - 08:50 AM",
    subject: "Biology Test",
    classArm: "Grade 10-A (SSS 1)",
    room: "Room 204",
    topic: "Term 2 Mid-Assessment Continuous Test",
    status: "upcoming",
    studentCount: 40,
    colorTheme: "emerald",
    lessonObjectives: "Formal 45-minute timed test covering Genetics and Ecology.",
    materialsNeeded: "Printed test question papers, optical mark answer sheets.",
  },
  {
    id: "FRI-P3",
    day: "Friday",
    periodIndex: 3,
    timeSlot: "09:50 - 10:40 AM",
    subject: "Chemistry Quiz",
    classArm: "Grade 11 Science (SSS 2)",
    room: "Lab #2 (Chemistry)",
    topic: "Volumetric Titration Calculations Speed Drill",
    status: "upcoming",
    studentCount: 35,
    colorTheme: "violet",
    lessonObjectives: "Timed calculation drills on molarity and dilution equations.",
    materialsNeeded: "Rapid response whiteboards, dry-erase markers.",
  },
  {
    id: "FRI-P5",
    day: "Friday",
    periodIndex: 5,
    timeSlot: "12:10 - 01:00 PM",
    subject: "Academic Assembly",
    classArm: "Senior Secondary School",
    room: "Main Assembly Hall",
    topic: "Weekly Academic Excellence Recognition & House Points",
    status: "upcoming",
    studentCount: 180,
    colorTheme: "teal",
    lessonObjectives: "Commend high CA 1 achievers and review discipline guidelines.",
    materialsNeeded: "Merit award certificates, school hymnal projection.",
  },
  {
    id: "FRI-P7",
    day: "Friday",
    periodIndex: 7,
    timeSlot: "02:45 - 03:30 PM",
    subject: "Weekly Wrap-up",
    classArm: "Science Department",
    room: "Prep Room",
    topic: "Next Week Laboratory Reagent Prep & Lesson Plans",
    status: "prep",
    studentCount: 0,
    colorTheme: "slate",
    lessonObjectives: "Set up microscope slides and reagents for Week 6 practicals.",
    materialsNeeded: "Chemical inventory lockbox, specimen tanks.",
  },
]

const PERIOD_SLOTS = [
  { index: 1, time: "08:00 - 08:50 AM", label: "Period 1" },
  { index: 2, time: "08:55 - 09:45 AM", label: "Period 2" },
  { index: 3, time: "09:50 - 10:40 AM", label: "Period 3" },
  { index: -1, time: "10:40 - 11:10 AM", label: "Morning Recess / Break", isBreak: true },
  { index: 4, time: "11:15 - 12:05 PM", label: "Period 4" },
  { index: 5, time: "12:10 - 01:00 PM", label: "Period 5" },
  { index: -2, time: "01:00 - 01:45 PM", label: "Lunch & Midday Devotion", isBreak: true },
  { index: 6, time: "01:50 - 02:40 PM", label: "Period 6" },
  { index: 7, time: "02:45 - 03:30 PM", label: "Period 7" },
]

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const

interface TeacherWeeklyCalendarViewProps {
  onOpenNewGradeEntry?: (subject?: string, classArm?: string) => void
}

export function TeacherWeeklyCalendarView({ onOpenNewGradeEntry }: TeacherWeeklyCalendarViewProps) {
  const [selectedDayFilter, setSelectedDayFilter] = React.useState<string>("all")
  const [selectedSubjectFilter, setSelectedSubjectFilter] = React.useState<string>("all")
  const [activePeriodDetail, setActivePeriodDetail] = React.useState<TeachingPeriod | null>(null)

  // Current day is Wednesday in this simulation
  const CURRENT_DAY = "Wednesday"

  // Filtered periods
  const filteredSchedule = React.useMemo(() => {
    return TEACHER_WEEKLY_SCHEDULE.filter((period) => {
      if (selectedDayFilter !== "all" && period.day !== selectedDayFilter) return false
      if (selectedSubjectFilter !== "all" && !period.subject.toLowerCase().includes(selectedSubjectFilter.toLowerCase())) {
        return false
      }
      return true
    })
  }, [selectedDayFilter, selectedSubjectFilter])

  // Get period for day & slot
  const getPeriodForSlot = (day: string, slotIndex: number): TeachingPeriod | undefined => {
    return filteredSchedule.find((p) => p.day === day && p.periodIndex === slotIndex)
  }

  // Handle Printable PDF Export
  const handlePrintTimetable = () => {
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
        toast.error("Unable to initialize timetable print preview")
        return
      }

      const tableRows = PERIOD_SLOTS.map((slot) => {
        if (slot.isBreak) {
          return `
            <tr style="background: #f1f5f9; text-align: center; font-weight: 700; color: #64748b; font-size: 11px;">
              <td style="padding: 6px; border: 1px solid #cbd5e1;">${slot.time}</td>
              <td colspan="5" style="padding: 6px; border: 1px solid #cbd5e1; text-transform: uppercase; letter-spacing: 1px;">
                ☕ ${slot.label}
              </td>
            </tr>
          `
        }

        const dayCells = DAYS_OF_WEEK.map((d) => {
          const match = TEACHER_WEEKLY_SCHEDULE.find((p) => p.day === d && p.periodIndex === slot.index)
          if (!match) {
            return `<td style="padding: 8px; border: 1px solid #cbd5e1; background: #fafafa; color: #94a3b8; font-size: 11px; text-align: center;">— Free / Prep —</td>`
          }
          return `
            <td style="padding: 8px; border: 1px solid #cbd5e1; font-size: 11px; vertical-align: top;">
              <div style="font-weight: 700; color: #0f172a;">${match.subject}</div>
              <div style="color: #0284c7; font-weight: 600; font-size: 10px;">${match.classArm}</div>
              <div style="color: #64748b; font-size: 10px;">${match.room}</div>
              <div style="color: #475569; font-size: 10px; margin-top: 3px; font-style: italic;">${match.topic}</div>
            </td>
          `
        }).join("")

        return `
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: 700; font-size: 11px; background: #f8fafc; color: #334155;">
              <div>${slot.label}</div>
              <div style="font-size: 10px; color: #64748b; font-weight: normal;">${slot.time}</div>
            </td>
            ${dayCells}
          </tr>
        `
      }).join("")

      iframeDoc.open()
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Helena_Brooks_Weekly_Timetable</title>
          <style>
            @page { size: A4 landscape; margin: 12mm; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #0f172a; margin: 0; padding: 16px; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px; }
            .title { font-size: 20px; font-weight: 800; color: #0f172a; }
            .sub { font-size: 12px; color: #64748b; margin-top: 4px; }
            table { width: 100%; border-collapse: collapse; }
            th { background: #0f172a; color: #ffffff; padding: 10px; font-size: 12px; text-transform: uppercase; border: 1px solid #0f172a; }
            .footer { font-size: 10px; color: #94a3b8; text-align: center; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 8px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="title">Oakridge International Academy &bull; Faculty Weekly Timetable</div>
              <div class="sub">Faculty Member: <strong>Ms. Helena Brooks</strong> &bull; Department of Sciences &bull; Academic Year 2026/2027 (Term 2)</div>
            </div>
            <div style="text-align: right; font-size: 11px; color: #64748b;">
              <span style="background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; font-weight: 700;">OFFICIAL MASTER TIMETABLE</span>
              <p style="margin: 4px 0 0;">18 Scheduled Instructional Periods / Week</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th style="width: 13%;">Time Slot</th>
                <th style="width: 17.4%;">Monday</th>
                <th style="width: 17.4%;">Tuesday</th>
                <th style="width: 17.4%;">Wednesday</th>
                <th style="width: 17.4%;">Thursday</th>
                <th style="width: 17.4%;">Friday</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          <div class="footer">
            Generated via Cresta-ERP Institutional Academic Management System &bull; Timetable Schedule Version 2.4
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

      toast.success("Preparing printable weekly timetable", {
        description: "Standard A4 Landscape view ready for printing or saving to PDF.",
      })
    } catch {
      toast.error("Failed to generate timetable print document")
    }
  }

  // Handle Quick Attendance for Period
  const handleQuickLogAttendance = (period: TeachingPeriod) => {
    toast.success(`Period Roll Call Logged for ${period.classArm}`, {
      description: `${period.studentCount} students marked present for ${period.subject} (${period.timeSlot}).`,
    })
    setActivePeriodDetail(null)
  }

  // Helper color map
  const getThemeClasses = (theme: TeachingPeriod["colorTheme"], status: TeachingPeriod["status"]) => {
    switch (theme) {
      case "emerald":
        return {
          border: status === "next" ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-emerald-300/80 dark:border-emerald-800",
          bg: "bg-emerald-500/5 hover:bg-emerald-500/10",
          badge: "bg-emerald-600 text-white",
          text: "text-emerald-700 dark:text-emerald-300",
        }
      case "blue":
        return {
          border: status === "next" ? "border-blue-500 ring-2 ring-blue-500/20" : "border-blue-300/80 dark:border-blue-800",
          bg: "bg-blue-500/5 hover:bg-blue-500/10",
          badge: "bg-blue-600 text-white",
          text: "text-blue-700 dark:text-blue-300",
        }
      case "violet":
        return {
          border: status === "next" ? "border-violet-500 ring-2 ring-violet-500/20" : "border-violet-300/80 dark:border-violet-800",
          bg: "bg-violet-500/5 hover:bg-violet-500/10",
          badge: "bg-violet-600 text-white",
          text: "text-violet-700 dark:text-violet-300",
        }
      case "amber":
        return {
          border: status === "next" ? "border-amber-500 ring-2 ring-amber-500/20" : "border-amber-300/80 dark:border-amber-800",
          bg: "bg-amber-500/5 hover:bg-amber-500/10",
          badge: "bg-amber-600 text-white",
          text: "text-amber-700 dark:text-amber-300",
        }
      case "teal":
        return {
          border: status === "next" ? "border-teal-500 ring-2 ring-teal-500/20" : "border-teal-300/80 dark:border-teal-800",
          bg: "bg-teal-500/5 hover:bg-teal-500/10",
          badge: "bg-teal-600 text-white",
          text: "text-teal-700 dark:text-teal-300",
        }
      default:
        return {
          border: "border-border",
          bg: "bg-muted/30 hover:bg-muted/50",
          badge: "bg-slate-600 text-white",
          text: "text-muted-foreground",
        }
    }
  }

  return (
    <Card className="border-border shadow-xs">
      <CardHeader className="pb-3 border-b">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                <Calendar className="size-4 text-primary" />
                Teacher Weekly Instructional Calendar &bull; Period Grid
              </CardTitle>
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary text-[11px] font-semibold">
                Ms. Helena Brooks &bull; 18 Periods / Wk
              </Badge>
              <Badge className="bg-emerald-600 text-white text-[10px] font-semibold">
                ● Live: Wednesday (4 Classes)
              </Badge>
            </div>
            <CardDescription className="text-xs mt-1">
              Interactive 5-day teaching schedule. Click any period slot to inspect lesson objectives, log period attendance, or launch new grade entries.
            </CardDescription>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Subject Filter */}
            <select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              className="h-8 text-xs rounded-md border border-input bg-background px-2.5 font-medium"
            >
              <option value="all">All Subjects (All 18)</option>
              <option value="biology">Biology (Theory &amp; Labs)</option>
              <option value="chemistry">Chemistry (Labs &amp; Quizzes)</option>
              <option value="physics">Physics Tutorials</option>
              <option value="stem">STEM Mentorship</option>
            </select>

            {/* Day Filter */}
            <div className="flex items-center rounded-md border border-input p-0.5 bg-muted/40">
              <button
                type="button"
                onClick={() => setSelectedDayFilter("all")}
                className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                  selectedDayFilter === "all" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All 5 Days
              </button>
              {DAYS_OF_WEEK.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDayFilter(d)}
                  className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                    selectedDayFilter === d ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground hover:text-foreground"
                  } ${d === CURRENT_DAY ? "text-primary font-semibold" : ""}`}
                >
                  {d.slice(0, 3)}
                  {d === CURRENT_DAY && " •"}
                </button>
              ))}
            </div>

            {/* Print Timetable */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePrintTimetable}
              className="h-8 text-xs gap-1.5 font-medium"
              title="Print standard A4 landscape weekly timetable"
            >
              <Printer className="size-3.5 text-muted-foreground" />
              <span className="hidden sm:inline">Print Schedule</span>
            </Button>
          </div>
        </div>

        {/* Schedule Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-border/60">
          <div className="p-2 rounded-md bg-muted/20 border flex items-center justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Total Teaching Load</p>
              <p className="text-sm font-bold text-foreground">18 Periods / Wk</p>
            </div>
            <BookOpen className="size-4 text-primary" />
          </div>

          <div className="p-2 rounded-md bg-emerald-500/10 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-emerald-800 dark:text-emerald-300 uppercase font-bold">Today (Wednesday)</p>
              <p className="text-sm font-bold text-emerald-700 dark:text-emerald-200">4 Scheduled Classes</p>
            </div>
            <Clock className="size-4 text-emerald-600" />
          </div>

          <div className="p-2 rounded-md bg-violet-500/10 border border-violet-300 dark:border-violet-800 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-violet-800 dark:text-violet-300 uppercase font-bold">Lab Practicals</p>
              <p className="text-sm font-bold text-violet-700 dark:text-violet-200">3 Wet Labs / Wk</p>
            </div>
            <Compass className="size-4 text-violet-600" />
          </div>

          <div className="p-2 rounded-md bg-muted/20 border flex items-center justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Class Headcount</p>
              <p className="text-sm font-bold text-foreground">115 Enrolled</p>
            </div>
            <Users className="size-4 text-primary" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* Full Weekly Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[850px]">
            {/* Days Header */}
            <div className="grid grid-cols-6 gap-2 mb-2 text-xs font-bold text-center">
              <div className="p-2 rounded bg-muted/50 text-muted-foreground flex items-center justify-center gap-1">
                <Clock className="size-3.5" />
                <span>Time Period</span>
              </div>
              {DAYS_OF_WEEK.map((day) => {
                const isCurrent = day === CURRENT_DAY
                const isVisible = selectedDayFilter === "all" || selectedDayFilter === day
                if (!isVisible) return null

                return (
                  <div
                    key={day}
                    className={`p-2 rounded transition-all flex flex-col items-center justify-center ${
                      isCurrent
                        ? "bg-primary text-primary-foreground font-extrabold shadow-xs ring-1 ring-primary/40"
                        : "bg-muted/40 text-foreground"
                    }`}
                  >
                    <span className="text-xs uppercase tracking-wide">{day}</span>
                    {isCurrent && (
                      <span className="text-[10px] bg-background/20 px-1.5 py-0.2 rounded font-semibold mt-0.5">
                        Today &bull; Active
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Time Slot Rows */}
            <div className="space-y-2">
              {PERIOD_SLOTS.map((slot) => {
                // Render Break Row
                if (slot.isBreak) {
                  return (
                    <div
                      key={slot.label}
                      className="grid grid-cols-6 gap-2 py-1.5 px-2 rounded-md bg-muted/30 border border-dashed border-border text-center text-xs font-semibold text-muted-foreground items-center"
                    >
                      <div className="font-mono text-[11px] text-muted-foreground">
                        {slot.time}
                      </div>
                      <div className="col-span-5 flex items-center justify-center gap-2 text-xs font-medium text-foreground">
                        <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span>☕ {slot.label} &bull; Student Relaxation &amp; Campus Devotion</span>
                      </div>
                    </div>
                  )
                }

                // Render Regular Period Row with Day Columns
                return (
                  <div key={slot.label} className="grid grid-cols-6 gap-2 items-stretch">
                    {/* Time Slot Label */}
                    <div className="p-2 rounded-lg border bg-muted/20 flex flex-col justify-center text-center">
                      <span className="text-xs font-bold text-foreground">{slot.label}</span>
                      <span className="text-[10px] font-mono text-muted-foreground mt-0.5">{slot.time}</span>
                    </div>

                    {/* Columns for Days */}
                    {DAYS_OF_WEEK.map((day) => {
                      const isVisible = selectedDayFilter === "all" || selectedDayFilter === day
                      if (!isVisible) return null

                      const period = getPeriodForSlot(day, slot.index)
                      const isCurrentDay = day === CURRENT_DAY

                      if (!period) {
                        return (
                          <div
                            key={`${day}-${slot.index}`}
                            className={`p-2.5 rounded-lg border border-dashed border-border/70 flex flex-col items-center justify-center text-center text-muted-foreground text-[11px] min-h-[90px] transition-colors ${
                              isCurrentDay ? "bg-primary/5" : "bg-background/40 hover:bg-muted/20"
                            }`}
                          >
                            <span className="text-muted-foreground/70 font-medium">— Free / Prep —</span>
                            <span className="text-[10px] text-muted-foreground/50 mt-1">Lesson Planning &amp; Marking</span>
                          </div>
                        )
                      }

                      const theme = getThemeClasses(period.colorTheme, period.status)

                      return (
                        <div
                          key={period.id}
                          onClick={() => setActivePeriodDetail(period)}
                          role="button"
                          tabIndex={0}
                          className={`group p-2.5 rounded-lg border ${theme.border} ${theme.bg} cursor-pointer transition-all duration-150 shadow-2xs hover:shadow-sm hover:scale-[1.01] flex flex-col justify-between min-h-[90px] text-left relative`}
                          title={`Click to view lesson plan and grading for ${period.subject}`}
                        >
                          <div>
                            {/* Card Top: Subject & Status */}
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <Badge className={`${theme.badge} text-[10px] py-0 px-1.5 font-bold line-clamp-1`}>
                                {period.subject}
                              </Badge>

                              {period.status === "completed" && (
                                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                                  <CheckCircle2 className="size-2.5" />
                                  Done
                                </span>
                              )}
                              {period.status === "next" && (
                                <span className="text-[10px] text-primary font-bold flex items-center gap-0.5 animate-pulse">
                                  ● Next
                                </span>
                              )}
                              {period.status === "live" && (
                                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 animate-pulse">
                                  ● Live Now
                                </span>
                              )}
                            </div>

                            {/* Class & Topic */}
                            <p className="text-xs font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                              {period.classArm}
                            </p>
                            <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5 leading-snug">
                              {period.topic}
                            </p>
                          </div>

                          {/* Card Bottom: Venue & Students */}
                          <div className="pt-2 mt-1 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                            <span className="flex items-center gap-1 font-medium truncate">
                              <MapPin className="size-2.5 shrink-0" />
                              {period.room}
                            </span>
                            {period.studentCount > 0 && (
                              <span className="font-semibold text-foreground/80">
                                {period.studentCount} stu.
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>

      {/* Period Detail Dialog */}
      {activePeriodDetail && (
        <Dialog open={!!activePeriodDetail} onOpenChange={(open) => !open && setActivePeriodDetail(null)}>
          <DialogContent className="sm:max-w-lg border-border">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Badge className={getThemeClasses(activePeriodDetail.colorTheme, activePeriodDetail.status).badge}>
                  {activePeriodDetail.subject}
                </Badge>
                <Badge variant="outline" className="text-xs font-semibold">
                  {activePeriodDetail.day} &bull; {activePeriodDetail.timeSlot}
                </Badge>
              </div>
              <DialogTitle className="text-lg font-bold text-foreground mt-2">
                {activePeriodDetail.classArm} &bull; Period Details
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Venue: <strong>{activePeriodDetail.room}</strong> &bull; Enrolled: <strong>{activePeriodDetail.studentCount} Students</strong>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              {/* Topic Box */}
              <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-muted-foreground">Curriculum Unit &amp; Topic</span>
                <p className="text-sm font-bold text-foreground">{activePeriodDetail.topic}</p>
              </div>

              {/* Lesson Objectives */}
              {activePeriodDetail.lessonObjectives && (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                    <CheckCircle2 className="size-3 text-primary" />
                    Key Instructional Objective:
                  </span>
                  <p className="p-2.5 rounded-md border bg-background font-medium text-foreground">
                    {activePeriodDetail.lessonObjectives}
                  </p>
                </div>
              )}

              {/* Materials Needed */}
              {activePeriodDetail.materialsNeeded && (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                    <Compass className="size-3 text-amber-500" />
                    Required Lab Apparatus &amp; Materials:
                  </span>
                  <p className="p-2.5 rounded-md border bg-background font-medium text-foreground">
                    {activePeriodDetail.materialsNeeded}
                  </p>
                </div>
              )}

              {/* Period Actions */}
              <div className="pt-3 border-t grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    const sub = activePeriodDetail.subject.includes("Chemistry") ? "Chemistry" : "Biology"
                    const cls = activePeriodDetail.classArm
                    setActivePeriodDetail(null)
                    if (onOpenNewGradeEntry) {
                      onOpenNewGradeEntry(sub, cls)
                    } else {
                      toast.info(`Opening Grade Entry for ${cls} - ${sub}`)
                    }
                  }}
                  className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-9"
                >
                  <FileSpreadsheet className="size-3.5" />
                  <span>Enter Marks for this Class</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleQuickLogAttendance(activePeriodDetail)}
                  className="gap-1.5 text-xs font-semibold h-9"
                >
                  <CalendarCheck className="size-3.5 text-primary" />
                  <span>Log Period Attendance</span>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
