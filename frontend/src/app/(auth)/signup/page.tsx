"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap, ArrowRight, School, Mail, Lock, User, Phone, Loader2, Database } from "lucide-react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"

export default function SignupPage() {
  const router = useRouter()
  const [schoolName, setSchoolName] = React.useState("Oakridge International Academy")
  const [adminName, setAdminName] = React.useState("Dr. Sarah Vance")
  const [email, setEmail] = React.useState("s.vance@oakridge.edu")
  const [phone, setPhone] = React.useState("+234 803 123 4567")
  const [password, setPassword] = React.useState("securepass123")
  const [planSelected, setPlanSelected] = React.useState("Growth Plan (₦120,000/mo)")
  const [currency, setCurrency] = React.useState("NGN")
  const [submitting, setSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
          plan_selected: planSelected,
          currency,
          country: "Nigeria",
          notes: "Created via Institutional Signup Form",
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Institutional Request submitted to Database!", {
          description: data.message,
        })
        setTimeout(() => {
          router.push("/dashboard")
        }, 1200)
      } else {
        toast.error("Registration note: " + (data.error || "Failed to submit"))
        router.push("/dashboard")
      }
    } catch (err: unknown) {
      const e = err as Error
      toast.error("Database connection note: " + e.message)
      router.push("/dashboard")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-muted/30">
      <div className="w-full max-w-xl space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-xl tracking-tight">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <GraduationCap className="size-6" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold tracking-tight">Cresta-ERP</span>
              <span className="text-[10px] text-muted-foreground font-medium">CRESTA — Powering Institutions of Excellence</span>
            </div>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">
            Cresta Institutional Platform &bull; Deploy your campus management suite to Neon Database
          </p>
        </div>

        <Card className="border-border shadow-sm">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Create Institutional Account</CardTitle>
              <Badge variant="outline" className="text-[10px] font-semibold text-primary">
                Database Synced
              </Badge>
            </div>
            <CardDescription className="text-xs">
              Deploys full academic management, student SIS, attendance tracking, and fee management in Naira &amp; USD
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="schoolName" className="text-xs font-semibold">
                  Institution / Campus Name <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <School className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="schoolName"
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="e.g. Oakridge International Academy"
                    className="pl-9 text-xs h-9"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="adminName" className="text-xs font-semibold">
                    Principal / Admin Name <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <Input
                      id="adminName"
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      placeholder="e.g. Dr. Sarah Vance"
                      className="pl-9 text-xs h-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-semibold">
                    Official Phone / WhatsApp
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +234 803 123 4567"
                      className="pl-9 text-xs h-9"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold">
                    Administrative Email <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@oakridge.edu"
                      className="pl-9 text-xs h-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-semibold">
                    Master Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 text-xs h-9"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="plan" className="text-xs font-semibold">
                    Selected Pricing Tier
                  </Label>
                  <select
                    id="plan"
                    value={planSelected}
                    onChange={(e) => setPlanSelected(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-medium text-primary"
                  >
                    <option value="Starter Plan (₦50,000/mo)">Starter — ₦50,000 / mo (~$35 USD)</option>
                    <option value="Growth Plan (₦120,000/mo)">Growth — ₦120,000 / mo (~$80 USD)</option>
                    <option value="Enterprise Tier (Custom — Discuss with Sales Rep)">Enterprise — Custom (Discuss with Sales Rep)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="currency" className="text-xs font-semibold">
                    Currency Preference
                  </Label>
                  <select
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs"
                  >
                    <option value="NGN">Nigerian Naira (₦ NGN)</option>
                    <option value="USD">US Dollars ($ USD)</option>
                  </select>
                </div>
              </div>

              <div className="rounded-lg bg-muted/60 p-3 text-xs space-y-1.5 text-muted-foreground border">
                <div className="flex items-center gap-1.5 text-foreground font-medium">
                  <Database className="size-4 text-primary" />
                  <span>Submits institution setup directly to Neon Database</span>
                </div>
                <p className="text-[11px]">
                  All institutional records are stored with full database persistence. Demo access enables instant exploration across Administrator, Teacher, and Parent roles.
                </p>
              </div>

              <Button type="submit" disabled={submitting} className="w-full mt-2 font-medium text-xs h-10 gap-1.5">
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Submitting Request to Database...</span>
                  </>
                ) : (
                  <>
                    <span>Create Institution &amp; Launch Portal</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 pt-0 border-t border-border/50 text-xs text-muted-foreground">
            <p className="text-center mt-3">
              Already have an institutional campus?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Sign in here
              </Link>
              {" "}&bull;{" "}
              <Link href="/dashboard" className="text-primary font-medium hover:underline">
                Open Demo Dashboard
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
