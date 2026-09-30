"use client"

import * as React from "react"
import {
  Building2,
  CheckCircle2,
  Loader2,
  Database,
  ArrowRight,
  Mail,
  User,
  Phone,
  RefreshCw,
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
import { Card, CardContent } from "~/components/ui/card"

interface CreateInstitutionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultPlan?: string
}

export function CreateInstitutionDialog({
  open,
  onOpenChange,
  defaultPlan = "Growth Plan (₦120,000/mo)",
}: CreateInstitutionDialogProps) {
  const [schoolName, setSchoolName] = React.useState("")
  const [adminName, setAdminName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [studentCount, setStudentCount] = React.useState("300 - 1,500 students")
  const [planSelected, setPlanSelected] = React.useState(defaultPlan)
  const [currency, setCurrency] = React.useState("NGN")
  const [notes, setNotes] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [submittedData, setSubmittedData] = React.useState<{
    record: { id?: string | number; school_name: string; plan_selected?: string; created_at?: string }
    storage_source: string
    message: string
  } | null>(null)

  // View existing database requests
  const [viewRequests, setViewRequests] = React.useState(false)
  const [existingRequests, setExistingRequests] = React.useState<Array<{
    id?: string | number
    school_name: string
    admin_name: string
    email: string
    plan_selected?: string
    currency?: string
    status?: string
    created_at?: string
  }>>([])
  const [loadingRequests, setLoadingRequests] = React.useState(false)
  const [dbStatus, setDbStatus] = React.useState<{ connected: boolean; provider: string; message: string } | null>(null)

  const fetchExisting = React.useCallback(async () => {
    setLoadingRequests(true)
    try {
      const res = await fetch("/api/institutions")
      const data = await res.json()
      if (data.success) {
        setExistingRequests(data.requests || [])
        setDbStatus(data.database)
      }
    } catch {
      toast.error("Could not fetch database records")
    } finally {
      setLoadingRequests(false)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!schoolName || !adminName || !email) {
      toast.error("Please fill in all required fields (School, Administrator, and Email)")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/institutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school_name: schoolName,
          admin_name: adminName,
          email,
          phone,
          student_count: studentCount,
          plan_selected: planSelected,
          currency,
          country: "Nigeria",
          notes,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setSubmittedData({
          record: data.record,
          storage_source: data.storage_source,
          message: data.message,
        })
        toast.success("Institution registration submitted to database!", {
          description: data.message,
        })
        fetchExisting()
      } else {
        toast.error("Submission failed: " + (data.error || "Unknown error"))
      }
    } catch (err: unknown) {
      const e = err as Error
      toast.error("Network error submitting request: " + e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setSubmittedData(null)
    setSchoolName("")
    setAdminName("")
    setEmail("")
    setPhone("")
    setNotes("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Building2 className="size-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">
                  Register New Institution
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Cresta Institutional Platform &bull; Database Collection &amp; Setup Request
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const nextView = !viewRequests
                setViewRequests(nextView)
                if (nextView) fetchExisting()
              }}
              className="text-xs gap-1.5 h-8"
            >
              <Database className="size-3.5 text-primary" />
              <span>{viewRequests ? "Back to Form" : "View Database Submissions"}</span>
            </Button>
          </div>
        </DialogHeader>

        {viewRequests ? (
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-muted/40 border text-xs">
              <div className="flex items-center gap-2">
                <div className={`size-2.5 rounded-full ${dbStatus?.connected ? "bg-emerald-500" : "bg-amber-500"}`} />
                <span className="font-semibold">Database Connection:</span>
                <span className="text-muted-foreground">{dbStatus?.message || "Checking Neon / storage..."}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={fetchExisting}
                disabled={loadingRequests}
                className="size-7"
                title="Refresh database entries"
              >
                <RefreshCw className={`size-3.5 ${loadingRequests ? "animate-spin" : ""}`} />
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Collected Institution Requests ({existingRequests.length})
              </h4>
              {loadingRequests ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  <Loader2 className="size-5 animate-spin mx-auto mb-2 text-primary" />
                  Loading database records...
                </div>
              ) : existingRequests.length === 0 ? (
                <p className="text-xs text-muted-foreground py-6 text-center">
                  No institution requests in database yet. Submit the form to record one!
                </p>
              ) : (
                <div className="divide-y rounded-lg border max-h-72 overflow-y-auto">
                  {existingRequests.map((req, idx) => (
                    <div key={req.id || idx} className="p-3 text-xs space-y-1 hover:bg-muted/30">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-foreground text-sm">{req.school_name}</span>
                        <Badge variant="outline" className="text-[10px] py-0">
                          {req.status || "Pending"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
                        <span>Admin: <strong className="text-foreground">{req.admin_name}</strong></span>
                        <span>Email: {req.email}</span>
                        <span>Plan: <strong className="text-primary">{req.plan_selected}</strong></span>
                      </div>
                      <div className="text-[10px] text-muted-foreground pt-0.5">
                        Submitted: {req.created_at ? new Date(req.created_at).toLocaleString() : "Recently"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="default"
              className="w-full text-xs"
              onClick={() => setViewRequests(false)}
            >
              Submit Another Institution Request
            </Button>
          </div>
        ) : submittedData ? (
          <Card className="border-emerald-200 bg-emerald-500/5 dark:border-emerald-900/50 my-2">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground">
                    Institution Request Recorded Successfully!
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Your institutional record has been saved and queued in the database.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-4 space-y-2 text-xs">
                <div className="flex justify-between border-b pb-1.5">
                  <span className="text-muted-foreground">Institution Name:</span>
                  <span className="font-bold text-foreground">{submittedData.record.school_name}</span>
                </div>
                <div className="flex justify-between border-b pb-1.5">
                  <span className="text-muted-foreground">Selected Plan:</span>
                  <span className="font-bold text-primary">{submittedData.record.plan_selected}</span>
                </div>
                <div className="flex justify-between border-b pb-1.5">
                  <span className="text-muted-foreground">Storage Destination:</span>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold text-emerald-600">
                    {submittedData.storage_source === "neon" ? "Neon PostgreSQL Database" : "Database Store (Ready for Neon Sync)"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold text-emerald-600">Active / Pending Review</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="flex-1 text-xs"
                >
                  Register Another Campus
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    onOpenChange(false)
                    handleReset()
                  }}
                  className="flex-1 text-xs"
                >
                  Continue to Cresta Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="inst-schoolName" className="text-xs font-semibold">
                  School / Institution Name <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="inst-schoolName"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="e.g. Corona Secondary School Victoria Island"
                    className="pl-9 text-xs h-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="inst-adminName" className="text-xs font-semibold">
                  Principal / Administrator Name <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="inst-adminName"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="e.g. Dr. Sarah Vance"
                    className="pl-9 text-xs h-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="inst-email" className="text-xs font-semibold">
                  Administrative Email <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="inst-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin@coronaschools.edu.ng"
                    className="pl-9 text-xs h-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="inst-phone" className="text-xs font-semibold">
                  Contact Phone / WhatsApp
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="inst-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +234 803 123 4567"
                    className="pl-9 text-xs h-9"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="inst-students" className="text-xs font-semibold">
                  Estimated Student Body
                </Label>
                <select
                  id="inst-students"
                  value={studentCount}
                  onChange={(e) => setStudentCount(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs"
                >
                  <option value="Under 300 students">Under 300 students (Starter - ₦50k/mo)</option>
                  <option value="300 - 1,500 students">300 - 1,500 students (Growth - ₦120k/mo)</option>
                  <option value="1,500+ students">1,500+ students (Enterprise Custom)</option>
                  <option value="Multi-Campus Network">Multi-Campus Chain (Custom SLA)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="inst-plan" className="text-xs font-semibold">
                  Subscription Tier (Naira &amp; Dollars)
                </Label>
                <select
                  id="inst-plan"
                  value={planSelected}
                  onChange={(e) => setPlanSelected(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-medium text-primary"
                >
                  <option value="Starter Plan (₦50,000/mo)">Starter Plan — ₦50,000 / month (~$35 USD)</option>
                  <option value="Growth Plan (₦120,000/mo)">Growth Plan — ₦120,000 / month (~$80 USD) [Popular]</option>
                  <option value="Enterprise Tier (Custom — Discuss with Sales Rep)">Enterprise Tier — Custom (Discuss with Sales Rep)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="inst-currency" className="text-xs font-semibold">
                  Billing Currency
                </Label>
                <select
                  id="inst-currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs"
                >
                  <option value="NGN">Nigerian Naira (₦ NGN)</option>
                  <option value="USD">US Dollars ($ USD)</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="inst-notes" className="text-xs font-semibold">
                  Specific Requirements / Campus Branches
                </Label>
                <textarea
                  id="inst-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. Need parent portal with fee invoicing, online gradebook, and biometric attendance sync."
                  className="w-full rounded-md border border-input bg-background p-2 text-xs"
                />
              </div>
            </div>

            <div className="rounded-lg bg-muted/40 p-3 text-xs flex items-start gap-2.5 text-muted-foreground border">
              <Database className="size-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-foreground">Neon PostgreSQL Database Integration:</span>
                <p className="text-[11px] mt-0.5">
                  Submissions are automatically routed and saved to your PostgreSQL Neon database. If Neon URL is pending, submissions are safely stored and synchronized once connected.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={submitting}
                className="text-xs font-semibold gap-1.5 shadow-xs"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Saving to Database...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Institution to Database</span>
                    <ArrowRight className="size-3.5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
