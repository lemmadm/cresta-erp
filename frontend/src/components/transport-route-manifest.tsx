"use client"

import * as React from "react"
import {
  Bus,
  Phone,
  Users,
  CheckCircle2,
  Smartphone,
  Printer,
  Search,
  ShieldCheck,
  Navigation,
} from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export interface Passenger {
  id: string
  student_name: string
  class_arm: string
  stop_name: string
  scheduled_time: string
  guardian_name: string
  guardian_phone: string
  morning_status: "boarded" | "pending" | "absent" | "parent_drop"
  afternoon_status: "pending" | "boarded" | "dropped_off"
  fee_status: "paid" | "due"
}

export interface TransportRoute {
  id: string
  name: string
  bus_number: string
  plate_number: string
  driver_name: string
  driver_phone: string
  chaperone_name: string
  capacity: number
  stops: Array<{ name: string; time: string; student_count: number }>
  passengers: Passenger[]
}

export const TRANSPORT_ROUTES: TransportRoute[] = [
  {
    id: "RT-01",
    name: "Route 1: Lekki – Ajah – Sangotedo Express",
    bus_number: "Bus #04",
    plate_number: "LSR-492-AA",
    driver_name: "Mr. Aliyu Bello",
    driver_phone: "2348039988112",
    chaperone_name: "Mrs. Ngozi Eze",
    capacity: 32,
    stops: [
      { name: "Sangotedo Shoprite Junction", time: "06:30 AM", student_count: 6 },
      { name: "Ajah Jubilee Bridge", time: "06:45 AM", student_count: 8 },
      { name: "Chevron Drive Toll Stop", time: "07:05 AM", student_count: 9 },
      { name: "Lekki Phase 1 Gate", time: "07:25 AM", student_count: 7 },
      { name: "Oakridge Academy Campus", time: "07:45 AM", student_count: 0 },
    ],
    passengers: [
      {
        id: "CRST-STU-8821",
        student_name: "Samuel Adeyemi",
        class_arm: "Grade 10-A (SSS 1)",
        stop_name: "Chevron Drive Toll Stop",
        scheduled_time: "07:05 AM",
        guardian_name: "Chief Babatunde Adeyemi",
        guardian_phone: "2348031112233",
        morning_status: "boarded",
        afternoon_status: "pending",
        fee_status: "due",
      },
      {
        id: "CRST-STU-8822",
        student_name: "Aisha Bello",
        class_arm: "Grade 10-A (SSS 1)",
        stop_name: "Ajah Jubilee Bridge",
        scheduled_time: "06:45 AM",
        guardian_name: "Mrs. Halima Bello",
        guardian_phone: "2348023334455",
        morning_status: "boarded",
        afternoon_status: "pending",
        fee_status: "paid",
      },
      {
        id: "CRST-STU-8823",
        student_name: "Chinedu Okeke",
        class_arm: "Grade 10-A (SSS 1)",
        stop_name: "Lekki Phase 1 Gate",
        scheduled_time: "07:25 AM",
        guardian_name: "Engr. Patrick Okeke",
        guardian_phone: "2348095556677",
        morning_status: "boarded",
        afternoon_status: "pending",
        fee_status: "paid",
      },
      {
        id: "CRST-STU-8824",
        student_name: "Zainab Ibrahim",
        class_arm: "Grade 10-A (SSS 1)",
        stop_name: "Sangotedo Shoprite Junction",
        scheduled_time: "06:30 AM",
        guardian_name: "Alhaji Ibrahim",
        guardian_phone: "2348137778899",
        morning_status: "boarded",
        afternoon_status: "pending",
        fee_status: "paid",
      },
      {
        id: "CRST-STU-8825",
        student_name: "David Adeleke",
        class_arm: "Grade 10-A (SSS 1)",
        stop_name: "Chevron Drive Toll Stop",
        scheduled_time: "07:05 AM",
        guardian_name: "Chief Adeleke",
        guardian_phone: "2348059990011",
        morning_status: "parent_drop",
        afternoon_status: "pending",
        fee_status: "paid",
      },
      {
        id: "CRST-STU-8826",
        student_name: "Blessing Eze",
        class_arm: "Grade 10-A (SSS 1)",
        stop_name: "Ajah Jubilee Bridge",
        scheduled_time: "06:45 AM",
        guardian_name: "Dr. K. Eze",
        guardian_phone: "2348072223344",
        morning_status: "boarded",
        afternoon_status: "pending",
        fee_status: "paid",
      },
    ],
  },
  {
    id: "RT-02",
    name: "Route 2: Ikeja – Maryland – Surulere",
    bus_number: "Bus #07",
    plate_number: "KJA-881-XY",
    driver_name: "Mr. Chukwuma Obi",
    driver_phone: "2348028877665",
    chaperone_name: "Ms. Folake Adams",
    capacity: 30,
    stops: [
      { name: "Surulere National Stadium", time: "06:20 AM", student_count: 8 },
      { name: "Maryland Mall Express", time: "06:45 AM", student_count: 10 },
      { name: "Ikeja GRA Allen Roundabout", time: "07:10 AM", student_count: 9 },
      { name: "Oakridge Academy Campus", time: "07:45 AM", student_count: 0 },
    ],
    passengers: [
      {
        id: "CRST-STU-7711",
        student_name: "Kelechi Nwachukwu",
        class_arm: "Grade 11 Science (SSS 2)",
        stop_name: "Maryland Mall Express",
        scheduled_time: "06:45 AM",
        guardian_name: "Barr. Nwachukwu",
        guardian_phone: "2348037771122",
        morning_status: "boarded",
        afternoon_status: "pending",
        fee_status: "paid",
      },
      {
        id: "CRST-STU-7712",
        student_name: "Zainab Al-Hassan",
        class_arm: "Grade 11 Science (SSS 2)",
        stop_name: "Ikeja GRA Allen Roundabout",
        scheduled_time: "07:10 AM",
        guardian_name: "Mallam Al-Hassan",
        guardian_phone: "2348098882233",
        morning_status: "boarded",
        afternoon_status: "pending",
        fee_status: "paid",
      },
    ],
  },
  {
    id: "RT-03",
    name: "Route 3: Victoria Island – Ikoyi – Onikan",
    bus_number: "Bus #02",
    plate_number: "APP-312-BD",
    driver_name: "Mr. Babatunde Lawal",
    driver_phone: "2348056644332",
    chaperone_name: "Mrs. Janet Oladipo",
    capacity: 28,
    stops: [
      { name: "Onikan TBS Terminal", time: "06:40 AM", student_count: 7 },
      { name: "Ikoyi Bourne Road Stop", time: "07:00 AM", student_count: 11 },
      { name: "Victoria Island Adetokunbo", time: "07:20 AM", student_count: 8 },
      { name: "Oakridge Academy Campus", time: "07:45 AM", student_count: 0 },
    ],
    passengers: [],
  },
  {
    id: "RT-04",
    name: "Route 4: Magodo – Omole – Gbagada",
    bus_number: "Bus #09",
    plate_number: "EKY-774-MN",
    driver_name: "Mr. Segun Adeleke",
    driver_phone: "2348071122334",
    chaperone_name: "Mr. Festus Briggs",
    capacity: 32,
    stops: [
      { name: "Gbagada Phase 2 Gate", time: "06:30 AM", student_count: 9 },
      { name: "Omole Phase 1 Estate", time: "06:55 AM", student_count: 12 },
      { name: "Magodo Shangisha Gate", time: "07:15 AM", student_count: 8 },
      { name: "Oakridge Academy Campus", time: "07:50 AM", student_count: 0 },
    ],
    passengers: [],
  },
]

export function TransportRouteManifest() {
  const [routes, setRoutes] = React.useState<TransportRoute[]>(TRANSPORT_ROUTES)
  const [selectedRouteId, setSelectedRouteId] = React.useState<string>("RT-01")
  const [searchQuery, setSearchQuery] = React.useState("")

  const activeRoute = routes.find((r) => r.id === selectedRouteId) || routes[0]

  // Toggle passenger status
  const handleToggleMorningStatus = (studentId: string) => {
    setRoutes((prevRoutes) =>
      prevRoutes.map((route) => {
        if (route.id === selectedRouteId) {
          const updatedPassengers = route.passengers.map((p) => {
            if (p.id === studentId) {
              const nextStatus: Passenger["morning_status"] =
                p.morning_status === "boarded"
                  ? "absent"
                  : p.morning_status === "absent"
                  ? "parent_drop"
                  : "boarded"
              return { ...p, morning_status: nextStatus }
            }
            return p
          })
          return { ...route, passengers: updatedPassengers }
        }
        return route
      })
    )
  }

  // Send WhatsApp Arrival Alert
  const handleSendPickupWhatsApp = (passenger: Passenger) => {
    const text = encodeURIComponent(
      `Transportation Notice from Oakridge International Academy: Your child ${passenger.student_name} (${passenger.class_arm}) has boarded ${activeRoute.bus_number} safely at stop '${passenger.stop_name}' at ${passenger.scheduled_time}. Bus ETA at school: 07:45 AM. Driver: ${activeRoute.driver_name}.`
    )
    window.open(`https://wa.me/${passenger.guardian_phone}?text=${text}`, "_blank")
    toast.success(`Dispatched WhatsApp Boarding Alert to ${passenger.guardian_name}`)
  }

  // Filter passengers
  const filteredPassengers = (activeRoute.passengers || []).filter(
    (p) =>
      p.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stop_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const boardedCount = activeRoute.passengers.filter((p) => p.morning_status === "boarded").length

  return (
    <div className="space-y-6">
      {/* Route Header Banner */}
      <div className="rounded-xl border border-primary/20 bg-linear-to-r from-primary/10 via-card to-secondary/10 p-5 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-semibold text-primary border-primary/40 bg-primary/10">
                <Bus className="size-3 mr-1" />
                Fleet Logistics &amp; Transport
              </Badge>
              <span className="text-xs font-medium text-muted-foreground">
                School Shuttle Fleet Management
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Campus Transport Routes &amp; Daily Passenger Manifest
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Oakridge International Academy &bull; 4 Shuttle Routes &bull; 118 Pupils Enrolled &bull; Zero SMS Communication via wa.me
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                window.print()
              }}
              className="text-xs gap-1.5 h-9"
            >
              <Printer className="size-3.5" />
              <span>Print Route Manifest</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Fleet KPI Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Active Shuttle Routes</CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
              <Navigation className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 Buses Active</div>
            <p className="text-xs text-muted-foreground mt-1">Lekki, Ikeja, Ikoyi, Magodo</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Total Transport Pupils</CardTitle>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600">
              <Users className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">118 Pupils</div>
            <p className="text-xs text-muted-foreground mt-1">100% capacity managed</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Morning Roll Check-in</CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">95.8%</div>
            <p className="text-xs text-emerald-600 mt-1 font-medium">{boardedCount} boarded on this route</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Term 2 Transport Fees</CardTitle>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
              <ShieldCheck className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₦4,130,000</div>
            <p className="text-xs text-muted-foreground mt-1">₦35,000 / student per term</p>
          </CardContent>
        </Card>
      </div>

      {/* Route Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {routes.map((rt) => (
          <button
            key={rt.id}
            type="button"
            onClick={() => setSelectedRouteId(rt.id)}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedRouteId === rt.id
                ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary"
                : "border-border bg-card hover:bg-muted/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-foreground">{rt.bus_number}</span>
              <Badge variant="outline" className="text-[10px] font-mono">
                {rt.plate_number}
              </Badge>
            </div>
            <p className="text-xs font-medium text-foreground mt-1 line-clamp-1">{rt.name}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Driver: {rt.driver_name} &bull; {rt.capacity} Seats
            </p>
          </button>
        ))}
      </div>

      {/* Selected Route Inspector & Manifest */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Route Stops & Driver Info */}
        <Card className="lg:col-span-4 border-border shadow-xs">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Bus className="size-4 text-primary" />
              <span>{activeRoute.bus_number} &bull; Route Itinerary</span>
            </CardTitle>
            <CardDescription className="text-xs">
              Vehicle Plate: {activeRoute.plate_number} &bull; Capacity: {activeRoute.capacity} Passengers
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {/* Driver & Chaperone Info Box */}
            <div className="p-3 rounded-lg bg-muted/40 border text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Assigned Driver</span>
                  <p className="font-bold text-foreground text-sm">{activeRoute.driver_name}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const text = encodeURIComponent(
                      `Hello ${activeRoute.driver_name}, this is Oakridge Transport Dispatch with morning schedule update.`
                    )
                    window.open(`https://wa.me/${activeRoute.driver_phone}?text=${text}`, "_blank")
                  }}
                  className="h-7 text-xs text-emerald-600 border-emerald-400 gap-1 font-semibold"
                >
                  <Phone className="size-3" />
                  <span>Call / Chat</span>
                </Button>
              </div>
              <div className="pt-1 border-t text-[11px] text-muted-foreground">
                <span>Bus Chaperone: <strong>{activeRoute.chaperone_name}</strong></span>
              </div>
            </div>

            {/* Stops Timeline */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-foreground block">Designated Bus Stops &amp; Schedule</span>
              <div className="space-y-2.5">
                {activeRoute.stops.map((stop, i) => (
                  <div key={stop.name} className="flex items-start gap-2.5 text-xs">
                    <div className="size-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-foreground text-xs">{stop.name}</span>
                        <span className="font-mono text-[11px] font-bold text-primary">{stop.time}</span>
                      </div>
                      {stop.student_count > 0 && (
                        <p className="text-[11px] text-muted-foreground">
                          {stop.student_count} student(s) scheduled for boarding
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Passenger Manifest Table */}
        <Card className="lg:col-span-8 border-border shadow-xs">
          <CardHeader className="pb-3 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold">
                  Morning Roll Call: {activeRoute.name}
                </CardTitle>
                <CardDescription className="text-xs">
                  Click status to mark Boarded / Absent / Parent Dropoff. Click wa.me to alert parents instantly for free.
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-48 sm:w-56">
                  <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search passenger..."
                    className="pl-8 text-xs h-8"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-3">
            {filteredPassengers.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted-foreground">
                No students enrolled on this route currently. Select another bus route above.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b bg-muted/40 text-left font-semibold text-muted-foreground">
                      <th className="p-2.5">Student Name</th>
                      <th className="p-2.5">Class</th>
                      <th className="p-2.5">Pickup Stop &amp; ETA</th>
                      <th className="p-2.5 text-center">Fee Status</th>
                      <th className="p-2.5 text-center">Morning Boarding</th>
                      <th className="p-2.5 text-center">Guardian Alert</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredPassengers.map((p) => (
                      <tr key={p.id} className="hover:bg-muted/20">
                        <td className="p-2.5">
                          <p className="font-bold text-foreground text-xs leading-tight">
                            {p.student_name}
                          </p>
                          <span className="font-mono text-[10px] text-muted-foreground">{p.id}</span>
                        </td>

                        <td className="p-2.5 text-muted-foreground">{p.class_arm}</td>

                        <td className="p-2.5">
                          <p className="font-medium text-foreground">{p.stop_name}</p>
                          <span className="font-mono text-[10px] text-primary">{p.scheduled_time}</span>
                        </td>

                        <td className="p-2.5 text-center">
                          <Badge
                            variant="outline"
                            className={`text-[10px] uppercase font-bold ${
                              p.fee_status === "paid"
                                ? "border-emerald-400 text-emerald-700 dark:text-emerald-300 bg-emerald-500/10"
                                : "border-amber-400 text-amber-700 dark:text-amber-300 bg-amber-500/10"
                            }`}
                          >
                            {p.fee_status === "paid" ? "Paid" : "Due (₦35k)"}
                          </Badge>
                        </td>

                        <td className="p-2.5 text-center">
                          <Button
                            size="sm"
                            variant={p.morning_status === "boarded" ? "default" : "outline"}
                            onClick={() => handleToggleMorningStatus(p.id)}
                            className={`h-6 text-[10px] px-2 font-semibold ${
                              p.morning_status === "boarded"
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                : p.morning_status === "absent"
                                ? "border-destructive text-destructive bg-destructive/10"
                                : "border-blue-400 text-blue-600 bg-blue-500/10"
                            }`}
                          >
                            {p.morning_status === "boarded"
                              ? "✓ Boarded"
                              : p.morning_status === "absent"
                              ? "✕ Absent"
                              : "🚗 Parent Drop"}
                          </Button>
                        </td>

                        <td className="p-2.5 text-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSendPickupWhatsApp(p)}
                            className="h-7 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10 gap-1 px-2 font-medium"
                            title="Send instant free WhatsApp boarding notification to guardian"
                          >
                            <Smartphone className="size-3.5" />
                            <span>wa.me Alert</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
