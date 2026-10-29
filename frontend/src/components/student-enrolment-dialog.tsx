"use client"

import * as React from "react"
import {
  UserPlus,
  CheckCircle2,
  Printer,
  QrCode,
  ShieldCheck,
  Sparkles,
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

export interface StudentEnrolmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onStudentEnrolled?: (newStudent: RegisteredStudent) => void
}

export interface RegisteredStudent {
  admission_number: string
  surname: string
  first_name: string
  other_names?: string
  gender: string
  dob: string
  blood_group: string
  genotype: string
  religion: string
  mother_tongue: string
  state_of_origin: string
  lga: string
  nin?: string
  residential_address: string
  class_arm: string
  enrollment_type: "day" | "boarding"
  academic_session: string
  term: string
  guardian_name: string
  guardian_phone: string
  guardian_email: string
  guardian_relationship: string
  guardian_occupation: string
  allergies?: string
  created_at: string
}

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT Abuja", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
]

export function StudentEnrolmentDialog({
  open,
  onOpenChange,
  onStudentEnrolled,
}: StudentEnrolmentDialogProps) {
  // Form State
  const [surname, setSurname] = React.useState("")
  const [firstName, setFirstName] = React.useState("")
  const [otherNames, setOtherNames] = React.useState("")
  const [gender, setGender] = React.useState("Male")
  const [dob, setDob] = React.useState("2011-05-14")
  const [bloodGroup, setBloodGroup] = React.useState("O+")
  const [genotype, setGenotype] = React.useState("AA")
  const [religion, setReligion] = React.useState("Christianity")
  const [motherTongue, setMotherTongue] = React.useState("Yoruba")
  
  const [stateOfOrigin, setStateOfOrigin] = React.useState("Lagos")
  const [lga, setLga] = React.useState("Ikeja")
  const [nin, setNin] = React.useState("")
  const [residentialAddress, setResidentialAddress] = React.useState("")

  const [classArm, setClassArm] = React.useState("Grade 10-A (SSS 1)")
  const [enrollmentType, setEnrollmentType] = React.useState<"day" | "boarding">("day")
  const [academicSession] = React.useState("2026/2027")
  const [term, setTerm] = React.useState("Term 2")
  const [previousSchool, setPreviousSchool] = React.useState("")

  const [guardianName, setGuardianName] = React.useState("")
  const [guardianPhone, setGuardianPhone] = React.useState("+234 ")
  const [guardianEmail, setGuardianEmail] = React.useState("")
  const [guardianRelationship, setGuardianRelationship] = React.useState("Father")
  const [guardianOccupation, setGuardianOccupation] = React.useState("")

  const [allergies, setAllergies] = React.useState("None")
  const [emergencyContact, setEmergencyContact] = React.useState("")

  const [submittedStudent, setSubmittedStudent] = React.useState<RegisteredStudent | null>(null)
  const [activeTab, setActiveTab] = React.useState<"personal" | "academic" | "guardian" | "medical">("personal")

  // Generate admission number
  const [autoAdmissionNo] = React.useState("CRST-2026-4821")

  // Helper: Autofill sample student data for demonstration
  const handleAutofill = () => {
    setSurname("Adeyemi")
    setFirstName("Oluwatobi")
    setOtherNames("Emmanuel")
    setGender("Male")
    setDob("2011-06-18")
    setBloodGroup("O+")
    setGenotype("AA")
    setReligion("Christianity")
    setMotherTongue("Yoruba")
    setStateOfOrigin("Ogun")
    setLga("Abeokuta South")
    setNin("78912345601")
    setResidentialAddress("Plot 14, Admiralty Way, Lekki Phase 1, Lagos")
    setClassArm("Grade 10-A (SSS 1)")
    setEnrollmentType("day")
    setPreviousSchool("Grange Secondary School, Ikeja")
    setGuardianName("Chief & Mrs. Babatunde Adeyemi")
    setGuardianPhone("+234 803 111 2233")
    setGuardianEmail("b.adeyemi@crestaholdings.ng")
    setGuardianRelationship("Father")
    setGuardianOccupation("Managing Director, Energy Logistics")
    setAllergies("Mild lactose intolerance")
    setEmergencyContact("+234 802 333 4455")
    toast.success("Nigerian Biodata Sample Populated", {
      description: "Sample pupil data ready for official review and registration.",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!surname.trim() || !firstName.trim() || !guardianName.trim() || !guardianPhone.trim()) {
      toast.error("Required Fields Missing", {
        description: "Please fill in student surname, first name, guardian name, and contact phone.",
      })
      return
    }

    const newStudent: RegisteredStudent = {
      admission_number: autoAdmissionNo,
      surname,
      first_name: firstName,
      other_names: otherNames,
      gender,
      dob,
      blood_group: bloodGroup,
      genotype,
      religion,
      mother_tongue: motherTongue,
      state_of_origin: stateOfOrigin,
      lga,
      nin,
      residential_address: residentialAddress,
      class_arm: classArm,
      enrollment_type: enrollmentType,
      academic_session: academicSession,
      term,
      guardian_name: guardianName,
      guardian_phone: guardianPhone,
      guardian_email: guardianEmail,
      guardian_relationship: guardianRelationship,
      guardian_occupation: guardianOccupation,
      allergies,
      created_at: new Date().toISOString(),
    }

    setSubmittedStudent(newStudent)

    if (onStudentEnrolled) {
      onStudentEnrolled(newStudent)
    }

    toast.success("Student Enrolled Successfully!", {
      description: `${firstName} ${surname} registered under Admission #${autoAdmissionNo}. Official admission slip issued.`,
    })
  }

  const handleResetAndClose = () => {
    setSubmittedStudent(null)
    setSurname("")
    setFirstName("")
    setOtherNames("")
    setGuardianName("")
    setGuardianPhone("+234 ")
    setGuardianEmail("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[92vh] overflow-y-auto p-0 gap-0 border-border">
        {/* Header Ribbon */}
        <div className="p-5 border-b bg-muted/20">
          <DialogHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1 text-[11px] font-semibold">
                    <UserPlus className="size-3" />
                    Student Information System (SIS)
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium">
                    NERDC &bull; Ministry of Education Compliant
                  </span>
                </div>
                <DialogTitle className="text-xl font-bold mt-1 text-foreground">
                  New Student Admission &amp; Biodata Registration
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  Complete official Nigerian student enrolment, academic arm placement, and guardian record intake.
                </DialogDescription>
              </div>

              {!submittedStudent && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleAutofill}
                  className="h-8 text-xs gap-1 border-dashed"
                >
                  <Sparkles className="size-3 text-amber-500" />
                  <span>Autofill Sample Bio-Data</span>
                </Button>
              )}
            </div>
          </DialogHeader>
        </div>

        {/* Content Body */}
        <div className="p-5">
          {submittedStudent ? (
            /* OFFICIAL ADMISSION CONFIRMATION & SLIP */
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="size-5 text-emerald-600" />
                  <span>Admission Approved &amp; Enrolment Finalized</span>
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Student <strong>{submittedStudent.first_name} {submittedStudent.surname}</strong> has been assigned Admission Number <strong>{submittedStudent.admission_number}</strong> in <strong>{submittedStudent.class_arm}</strong> ({submittedStudent.enrollment_type.toUpperCase()} STUDENT).
                </p>
              </div>

              {/* Printable Official Admission Slip */}
              <div className="p-5 rounded-xl border-2 border-dashed border-primary/40 bg-card space-y-4 shadow-sm">
                <div className="flex items-start justify-between border-b pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600">
                      Cresta Institutional Platform &bull; Official Registration Slip
                    </span>
                    <h3 className="text-lg font-extrabold text-foreground mt-0.5">
                      Oakridge International Academy
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Plot 14, Victoria Island Extension, Lagos &bull; www.oakridge.edu.ng
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-primary text-primary-foreground font-bold text-xs">
                      {submittedStudent.admission_number}
                    </Badge>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Academic Year 2026/2027
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground block font-medium">Full Pupil Name:</span>
                    <span className="font-bold text-foreground text-sm">
                      {submittedStudent.surname}, {submittedStudent.first_name} {submittedStudent.other_names}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-muted-foreground block font-medium">Class Arm:</span>
                    <span className="font-semibold text-foreground">{submittedStudent.class_arm}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-muted-foreground block font-medium">Enrolment Category:</span>
                    <span className="font-semibold text-primary capitalize">{submittedStudent.enrollment_type} Student</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-muted-foreground block font-medium">Date of Birth &amp; Gender:</span>
                    <span className="font-medium text-foreground">{submittedStudent.dob} ({submittedStudent.gender})</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-muted-foreground block font-medium">Blood Group &amp; Genotype:</span>
                    <span className="font-mono text-foreground font-semibold">
                      {submittedStudent.blood_group} &bull; {submittedStudent.genotype}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-muted-foreground block font-medium">State of Origin &amp; LGA:</span>
                    <span className="font-medium text-foreground">{submittedStudent.state_of_origin} State ({submittedStudent.lga})</span>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-[10px] text-muted-foreground block font-medium">Primary Guardian:</span>
                    <span className="font-semibold text-foreground">
                      {submittedStudent.guardian_name} ({submittedStudent.guardian_phone})
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-muted-foreground block font-medium">Guardian Email:</span>
                    <span className="font-mono text-[11px] text-foreground">{submittedStudent.guardian_email || "N/A"}</span>
                  </div>
                </div>

                {/* QR Code Verification Seal */}
                <div className="pt-3 border-t flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="size-3.5" />
                      Audited Institutional Record
                    </span>
                    <p className="text-[10px] text-muted-foreground">
                      Registrar: <strong>Dr. Sarah Vance</strong> &bull; Oakridge Admissions Board
                    </p>
                  </div>
                  <div className="size-16 rounded bg-white p-1 border shadow-xs flex items-center justify-center">
                    <QrCode className="size-14 text-slate-900" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  className="gap-1.5 h-9 text-xs"
                >
                  <Printer className="size-3.5" />
                  <span>Print Admission Slip</span>
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleResetAndClose}
                  className="h-9 text-xs"
                >
                  Done &bull; Return to Dashboard
                </Button>
              </div>
            </div>
          ) : (
            /* MULTI-SECTION ADMISSION FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Navigation Tabs */}
              <div className="flex border-b text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab("personal")}
                  className={`pb-2 px-3 border-b-2 transition-colors ${
                    activeTab === "personal"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  1. Biodata &amp; Nigerian Origin
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("academic")}
                  className={`pb-2 px-3 border-b-2 transition-colors ${
                    activeTab === "academic"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  2. Academic Placement
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("guardian")}
                  className={`pb-2 px-3 border-b-2 transition-colors ${
                    activeTab === "guardian"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  3. Parent &amp; Guardian Info
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("medical")}
                  className={`pb-2 px-3 border-b-2 transition-colors ${
                    activeTab === "medical"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  4. Medical &amp; Special Needs
                </button>
              </div>

              {/* SECTION 1: PERSONAL BIODATA & NIGERIAN ORIGIN */}
              {activeTab === "personal" && (
                <div className="space-y-3 pt-1 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">
                        Surname <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="e.g. Adeyemi"
                        required
                        className="h-8 text-xs font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">
                        First Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. Samuel"
                        required
                        className="h-8 text-xs font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">Other / Middle Names</Label>
                      <Input
                        value={otherNames}
                        onChange={(e) => setOtherNames(e.target.value)}
                        placeholder="e.g. Oluwatobi"
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">Gender</Label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">Date of Birth</Label>
                      <Input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">Blood Group</Label>
                      <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs font-mono font-medium"
                      >
                        <option value="O+">O+ (Universal Donor)</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="AB+">AB+</option>
                        <option value="O-">O-</option>
                        <option value="A-">A-</option>
                        <option value="B-">B-</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">Genotype</Label>
                      <select
                        value={genotype}
                        onChange={(e) => setGenotype(e.target.value)}
                        className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs font-mono font-medium"
                      >
                        <option value="AA">AA (Normal)</option>
                        <option value="AS">AS (Carrier)</option>
                        <option value="SS">SS (Sickle Cell)</option>
                        <option value="AC">AC (Carrier)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">State of Origin (Nigeria)</Label>
                      <select
                        value={stateOfOrigin}
                        onChange={(e) => setStateOfOrigin(e.target.value)}
                        className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs"
                      >
                        {NIGERIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st} State
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">Local Government Area (LGA)</Label>
                      <Input
                        value={lga}
                        onChange={(e) => setLga(e.target.value)}
                        placeholder="e.g. Ikeja, Eti-Osa, Ibadan North"
                        className="h-8 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">National ID (NIN - 11 Digits)</Label>
                      <Input
                        value={nin}
                        onChange={(e) => setNin(e.target.value)}
                        placeholder="11-digit NIN"
                        maxLength={11}
                        className="h-8 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[11px] font-semibold">Residential Address</Label>
                    <Input
                      value={residentialAddress}
                      onChange={(e) => setResidentialAddress(e.target.value)}
                      placeholder="e.g. Plot 14, Admiralty Way, Lekki Phase 1, Lagos"
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => setActiveTab("academic")}
                      className="text-xs h-8"
                    >
                      Continue to Academic Placement &rarr;
                    </Button>
                  </div>
                </div>
              )}

              {/* SECTION 2: ACADEMIC PLACEMENT */}
              {activeTab === "academic" && (
                <div className="space-y-3 pt-1 text-xs">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">
                        Generated Admission Registration ID
                      </span>
                      <p className="text-base font-mono font-bold text-primary">{autoAdmissionNo}</p>
                    </div>
                    <Badge variant="outline" className="border-primary/40 text-primary text-xs">
                      Academic Year 2026/2027
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">Assigned Class &amp; Arm</Label>
                      <select
                        value={classArm}
                        onChange={(e) => setClassArm(e.target.value)}
                        className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs font-medium"
                      >
                        <option value="JSS 1 Gold">JSS 1 Gold</option>
                        <option value="JSS 1 Diamond">JSS 1 Diamond</option>
                        <option value="JSS 2 Platinum">JSS 2 Platinum</option>
                        <option value="JSS 3 Senior Prep">JSS 3 Senior Prep</option>
                        <option value="Grade 10-A (SSS 1)">Grade 10-A (SSS 1 Science)</option>
                        <option value="Grade 10-B (SSS 1)">Grade 10-B (SSS 1 Arts &amp; Comm)</option>
                        <option value="Grade 11 Science (SSS 2)">Grade 11 Science (SSS 2)</option>
                        <option value="Grade 12 Advanced (SSS 3)">Grade 12 Advanced (SSS 3 WAEC)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">Enrolment Category</Label>
                      <select
                        value={enrollmentType}
                        onChange={(e) => setEnrollmentType(e.target.value as "day" | "boarding")}
                        className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs font-medium"
                      >
                        <option value="day">Day Student</option>
                        <option value="boarding">Boarding House Resident</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">Intake Term</Label>
                      <select
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs font-medium"
                      >
                        <option value="Term 2">Term 2 (Active Session)</option>
                        <option value="Term 1">Term 1</option>
                        <option value="Term 3">Term 3</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[11px] font-semibold">Previous School Attended &amp; Last Class</Label>
                    <Input
                      value={previousSchool}
                      onChange={(e) => setPreviousSchool(e.target.value)}
                      placeholder="e.g. Corona Primary School, Victoria Island"
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("personal")}
                      className="text-xs h-8"
                    >
                      &larr; Back to Biodata
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => setActiveTab("guardian")}
                      className="text-xs h-8"
                    >
                      Continue to Guardian Info &rarr;
                    </Button>
                  </div>
                </div>
              )}

              {/* SECTION 3: PARENT & GUARDIAN DETAILS */}
              {activeTab === "guardian" && (
                <div className="space-y-3 pt-1 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">
                        Guardian Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        value={guardianName}
                        onChange={(e) => setGuardianName(e.target.value)}
                        placeholder="e.g. Chief & Mrs. Babatunde Adeyemi"
                        required
                        className="h-8 text-xs font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">Relationship</Label>
                      <select
                        value={guardianRelationship}
                        onChange={(e) => setGuardianRelationship(e.target.value)}
                        className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs"
                      >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Uncle">Uncle / Aunt</option>
                        <option value="Legal Guardian">Legal Guardian</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">
                        Primary Phone (WhatsApp Enabled) <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        value={guardianPhone}
                        onChange={(e) => setGuardianPhone(e.target.value)}
                        placeholder="+234 803 111 2233"
                        required
                        className="h-8 text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold">Official Email Address</Label>
                      <Input
                        type="email"
                        value={guardianEmail}
                        onChange={(e) => setGuardianEmail(e.target.value)}
                        placeholder="guardian@email.com"
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[11px] font-semibold">Guardian Occupation / Employer</Label>
                    <Input
                      value={guardianOccupation}
                      onChange={(e) => setGuardianOccupation(e.target.value)}
                      placeholder="e.g. Senior Partner, KPMG Nigeria"
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("academic")}
                      className="text-xs h-8"
                    >
                      &larr; Back to Academic
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => setActiveTab("medical")}
                      className="text-xs h-8"
                    >
                      Continue to Medical &rarr;
                    </Button>
                  </div>
                </div>
              )}

              {/* SECTION 4: MEDICAL & HEALTH HISTORY */}
              {activeTab === "medical" && (
                <div className="space-y-3 pt-1 text-xs">
                  <div className="space-y-1">
                    <Label className="text-[11px] font-semibold">Known Allergies / Dietary Constraints</Label>
                    <Input
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                      placeholder="e.g. Penicillin, Peanuts, Lactose, or None"
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[11px] font-semibold">Emergency Contact &amp; Hospital Preference</Label>
                    <Input
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      placeholder="e.g. Dr. K. Adeyemi (+234 802 333 4455) &bull; Reddington Hospital"
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-muted/40 border space-y-1.5 text-muted-foreground">
                    <div className="flex items-center gap-1.5 text-foreground font-semibold">
                      <ShieldCheck className="size-4 text-emerald-600" />
                      <span>Document &amp; Biometric Verification Notice</span>
                    </div>
                    <p className="text-[11px]">
                      Upon submitting this form, the student record will be persisted to the institutional directory with official admission slip generation and instant fee invoice readiness.
                    </p>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("guardian")}
                      className="text-xs h-8"
                    >
                      &larr; Back to Guardian Info
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      className="text-xs h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1.5 shadow-xs"
                    >
                      <UserPlus className="size-3.5" />
                      <span>Complete Student Registration</span>
                    </Button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
