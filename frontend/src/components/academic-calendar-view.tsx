"use client"

import * as React from "react"
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Award,
  Download,
  CalendarDays,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"

export interface AcademicEvent {
  id: string
  title: string
  date: string // YYYY-MM-DD
  dayNumber: number
  startTime: string
  endTime: string
  category: "exam" | "term" | "event"
  categoryLabel: string
  venue: string
  targetClasses: string
  coordinator: string
  description: string
}

const ACADEMIC_EVENTS_2026: AcademicEvent[] = [
  {
    id: "evt-01",
    title: "1st Continuous Assessment (CA 1) Submission",
    date: "2026-10-02",
    dayNumber: 2,
    startTime: "08:30 AM",
    endTime: "02:00 PM",
    category: "exam",
    categoryLabel: "Examination & CA",
    venue: "All Senior & Junior Classrooms",
    targetClasses: "JSS 1 - SSS 3",
    coordinator: "Ms. Helena Brooks (Exam Officer)",
    description: "Official 10-mark continuous assessment score collation for all secondary subjects.",
  },
  {
    id: "evt-02",
    title: "Nigeria Independence Day Observance (Public Holiday)",
    date: "2026-10-01",
    dayNumber: 1,
    startTime: "All Day",
    endTime: "All Day",
    category: "term",
    categoryLabel: "Term Break & Holiday",
    venue: "Campus Closed",
    targetClasses: "Whole School Community",
    coordinator: "School Registry",
    description: "National Public Holiday. Classes resume on Friday, Oct 2nd.",
  },
  {
    id: "evt-03",
    title: "Annual STEM & Robotics Innovation Fair",
    date: "2026-10-08",
    dayNumber: 8,
    startTime: "09:00 AM",
    endTime: "03:30 PM",
    category: "event",
    categoryLabel: "School Event",
    venue: "Cresta Innovation Hall & Quadrangle",
    targetClasses: "Grade 7 - 12 (All Students)",
    coordinator: "Science & Technology Faculty",
    description: "Inter-school exhibition of clean energy projects, robotics, and coding models.",
  },
  {
    id: "evt-04",
    title: "2nd Continuous Assessment (CA 2) Test Week",
    date: "2026-10-14",
    dayNumber: 14,
    startTime: "08:00 AM",
    endTime: "01:30 PM",
    category: "exam",
    categoryLabel: "Examination & CA",
    venue: "Senior Examination Hall",
    targetClasses: "SSS 1, SSS 2, SSS 3",
    coordinator: "Dr. Sarah Vance (Principal)",
    description: "Standardized 10-mark test in Mathematics, Physics, Chemistry, Biology, and English.",
  },
  {
    id: "evt-05",
    title: "Mid-Term Break (Term 2)",
    date: "2026-10-22",
    dayNumber: 22,
    startTime: "Thu, Oct 22",
    endTime: "Mon, Oct 26",
    category: "term",
    categoryLabel: "Term Break & Holiday",
    venue: "School Wide",
    targetClasses: "All Students & Academic Staff",
    coordinator: "Academic Directorate",
    description: "Half-term recess for students. Classes resume Monday, Oct 26th.",
  },
  {
    id: "evt-06",
    title: "PTA General Consultative Assembly",
    date: "2026-10-24",
    dayNumber: 24,
    startTime: "10:00 AM",
    endTime: "01:00 PM",
    category: "event",
    categoryLabel: "School Event",
    venue: "College Multipurpose Hall & Online Stream",
    targetClasses: "Parents & Guardians",
    coordinator: "PTA Executive Council",
    description: "Presentation of term progress, new campus sports pavilion development, and academic milestones.",
  },
  {
    id: "evt-07",
    title: "WAEC / NECO Senior Practicals Mock Examinations",
    date: "2026-10-28",
    dayNumber: 28,
    startTime: "09:00 AM",
    endTime: "02:00 PM",
    category: "exam",
    categoryLabel: "Examination & CA",
    venue: "Advanced Science Labs #1 & #2",
    targetClasses: "SSS 3 (Senior Hall)",
    coordinator: "Science Dept Heads",
    description: "Full laboratory dry-run in titration, optics, biological dissection, and electrical circuitry.",
  },
  {
    id: "evt-08",
    title: "Inter-House Sports Heats & Athletics Track Trials",
    date: "2026-10-30",
    dayNumber: 30,
    startTime: "01:30 PM",
    endTime: "04:30 PM",
    category: "event",
    categoryLabel: "School Event",
    venue: "Campus Main Sports Complex",
    targetClasses: "Red, Blue, Green & Yellow Houses",
    coordinator: "Head of Physical Education",
    description: "100m, 200m, 4x100m relay heats and long jump selections ahead of final sports day.",
  },
]

export function AcademicCalendarView() {
  const [selectedCategory, setSelectedCategory] = React.useState<"all" | "exam" | "term" | "event">("all")
  const [selectedEvent, setSelectedEvent] = React.useState<AcademicEvent | null>(ACADEMIC_EVENTS_2026[0])
  const [currentMonth, setCurrentMonth] = React.useState("October 2026")

  const filteredEvents = React.useMemo(() => {
    if (selectedCategory === "all") return ACADEMIC_EVENTS_2026
    return ACADEMIC_EVENTS_2026.filter((e) => e.category === selectedCategory)
  }, [selectedCategory])

  const categoryBadges = {
    exam: "bg-red-500/10 text-red-600 border-red-200 dark:border-red-900/50",
    term: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900/50",
    event: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900/50",
  }

  // Days of October 2026 (Starts on Thursday Oct 1)
  // Calendar grid: Sun(0), Mon(1), Tue(2), Wed(3), Thu(4), Fri(5), Sat(6)
  const leadingBlanks = 4 // Oct 1, 2026 is Thursday
  const daysInMonth = 31

  const handleExportCalendar = () => {
    toast.success("Academic Term Calendar Exported (PDF)", {
      description: "Oakridge_Academy_Term2_2026_Academic_Calendar.pdf ready.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header with Category Filters */}
      <Card className="border-border shadow-xs">
        <CardHeader className="border-b pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <CalendarDays className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg font-bold">
                    Official Academic &amp; Examination Calendar
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Academic Year 2026/2027 &bull; Term 2 Schedules, Examinations, Holidays &amp; Campus Events
                  </CardDescription>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center rounded-lg border bg-muted/40 p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    selectedCategory === "all" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All ({ACADEMIC_EVENTS_2026.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("exam")}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    selectedCategory === "exam" ? "bg-background text-red-600 shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Exams &amp; CA (3)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("term")}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    selectedCategory === "term" ? "bg-background text-emerald-600 shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Holidays (2)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("event")}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    selectedCategory === "event" ? "bg-background text-blue-600 shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Events (3)
                </button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCalendar}
                className="h-8 text-xs gap-1.5"
              >
                <Download className="size-3.5" />
                <span>Export Calendar</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-6">
          {/* Month Navigation & Grid */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left: Interactive Monthly Grid */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-foreground">{currentMonth}</h3>
                  <Badge variant="outline" className="text-[10px] text-primary">
                    2nd Term Core Session
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setCurrentMonth(currentMonth === "October 2026" ? "September 2026" : "October 2026")
                      toast.info("Switched to preceding academic month")
                    }}
                    className="size-7"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setCurrentMonth(currentMonth === "October 2026" ? "November 2026" : "October 2026")
                      toast.info("Switched to upcoming academic month")
                    }}
                    className="size-7"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-muted-foreground uppercase tracking-wider py-1 border-b">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Monthly Day Matrix */}
              <div className="grid grid-cols-7 gap-1.5">
                {/* Leading blanks for Thursday start */}
                {Array.from({ length: leadingBlanks }).map((_, idx) => (
                  <div key={`blank-${idx}`} className="h-16 sm:h-20 rounded-lg bg-muted/10 border border-transparent" />
                ))}

                {/* Days 1 to 31 */}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const day = idx + 1
                  const dayEvents = ACADEMIC_EVENTS_2026.filter((e) => e.dayNumber === day)
                  const hasExam = dayEvents.some((e) => e.category === "exam")
                  const hasTerm = dayEvents.some((e) => e.category === "term")
                  const hasEvent = dayEvents.some((e) => e.category === "event")
                  const isSelected = selectedEvent?.dayNumber === day

                  return (
                    <div
                      key={`day-${day}`}
                      onClick={() => {
                        if (dayEvents.length > 0) {
                          setSelectedEvent(dayEvents[0])
                        }
                      }}
                      className={`h-16 sm:h-20 p-1.5 rounded-lg border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? "ring-2 ring-primary border-primary bg-primary/5"
                          : dayEvents.length > 0
                          ? "bg-card hover:border-primary/50 hover:bg-muted/30"
                          : "bg-background/40 hover:bg-muted/20 border-border/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold size-5 flex items-center justify-center rounded-full ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : dayEvents.length > 0
                              ? "font-extrabold text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {day}
                        </span>
                        {dayEvents.length > 0 && (
                          <div className="flex items-center gap-0.5">
                            {hasExam && <span className="size-1.5 rounded-full bg-red-600" />}
                            {hasTerm && <span className="size-1.5 rounded-full bg-emerald-600" />}
                            {hasEvent && <span className="size-1.5 rounded-full bg-blue-600" />}
                          </div>
                        )}
                      </div>

                      {/* Event Snippet on cell */}
                      <div className="space-y-0.5 overflow-hidden">
                        {dayEvents.slice(0, 1).map((ev) => (
                          <div
                            key={ev.id}
                            className={`text-[9px] font-semibold truncate rounded px-1 py-0.5 border ${
                              ev.category === "exam"
                                ? "bg-red-500/15 text-red-700 dark:text-red-300 border-red-200"
                                : ev.category === "term"
                                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-200"
                                : "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-200"
                            }`}
                          >
                            {ev.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-red-600" />
                  <span>Examinations &amp; CA Tests</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-600" />
                  <span>Term Breaks &amp; Public Holidays</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-blue-600" />
                  <span>Competitions &amp; School Events</span>
                </div>
              </div>
            </div>

            {/* Right: Selected Event Spotlight & Agenda Feed */}
            <div className="lg:col-span-4 space-y-4">
              {/* Selected Event Card */}
              {selectedEvent ? (
                <Card className="border-primary/30 shadow-xs bg-linear-to-b from-primary/5 via-card to-background">
                  <CardHeader className="pb-3 border-b">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`text-[10px] ${categoryBadges[selectedEvent.category]}`}>
                        {selectedEvent.categoryLabel}
                      </Badge>
                      <span className="text-xs font-bold text-primary">
                        Day {selectedEvent.dayNumber} of Oct 2026
                      </span>
                    </div>
                    <CardTitle className="text-sm sm:text-base font-bold text-foreground mt-1">
                      {selectedEvent.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3 space-y-3 text-xs">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="size-3.5 text-primary shrink-0" />
                        <span>{selectedEvent.startTime} &ndash; {selectedEvent.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="size-3.5 text-primary shrink-0" />
                        <span>{selectedEvent.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="size-3.5 text-primary shrink-0" />
                        <span>Participating: <strong className="text-foreground">{selectedEvent.targetClasses}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Award className="size-3.5 text-primary shrink-0" />
                        <span>Lead: <strong className="text-foreground">{selectedEvent.coordinator}</strong></span>
                      </div>
                    </div>

                    <p className="text-muted-foreground pt-1 border-t text-[11px] leading-relaxed">
                      {selectedEvent.description}
                    </p>

                    <Button
                      size="sm"
                      onClick={() => {
                        toast.success(`Event added to school calendar: ${selectedEvent.title}`)
                      }}
                      className="w-full text-xs font-semibold h-8 mt-1 gap-1.5"
                    >
                      <CalendarIcon className="size-3.5" />
                      <span>Notify Classes on Calendar</span>
                    </Button>
                  </CardContent>
                </Card>
              ) : null}

              {/* Upcoming Milestones Feed */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Upcoming Term Schedule ({filteredEvents.length})
                </span>
                <div className="divide-y rounded-lg border max-h-72 overflow-y-auto bg-card">
                  {filteredEvents.map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      className={`p-2.5 text-xs space-y-1 cursor-pointer transition-colors ${
                        selectedEvent?.id === ev.id ? "bg-primary/10" : "hover:bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground text-xs">{ev.title}</span>
                        <Badge variant="outline" className={`text-[9px] py-0 ${categoryBadges[ev.category]}`}>
                          Oct {ev.dayNumber}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-1">{ev.venue} &bull; {ev.startTime}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
