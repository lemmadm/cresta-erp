"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap, ArrowRight, School, Mail, Lock, User, CheckCircle2 } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"

export default function SignupPage() {
  const router = useRouter()
  const [schoolName, setSchoolName] = React.useState("Oakridge International Academy")
  const [adminName, setAdminName] = React.useState("Dr. Sarah Vance")
  const [email, setEmail] = React.useState("s.vance@oakridge.edu")
  const [password, setPassword] = React.useState("securepass123")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated registration
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-muted/30">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <GraduationCap className="size-5" />
            </div>
            <span>SchoolERP</span>
          </Link>
          <p className="text-sm text-muted-foreground">Register your institution on SchoolERP</p>
        </div>

        <Card className="border-border shadow-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">Create Institutional Account</CardTitle>
            <CardDescription>
              Deploy full academic management, SIS, attendance, and fee tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schoolName">Institution / Campus Name</Label>
                <div className="relative">
                  <School className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="schoolName"
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="e.g. St. Jude High School"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminName">Principal / Administrator Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="adminName"
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Official Administrative Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@school.org"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Master Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="rounded-lg bg-muted/60 p-3 text-xs space-y-1.5 text-muted-foreground">
                <div className="flex items-center gap-1.5 text-foreground font-medium">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>Includes all 14 core school management modules</span>
                </div>
                <p>Role-based access control, gradebook, attendance sheets, and fee invoicing pre-configured.</p>
              </div>

              <Button type="submit" className="w-full mt-2 font-medium">
                Create Institution & Launch Portal
                <ArrowRight className="ml-1 size-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 pt-0 border-t border-border/50 text-xs text-muted-foreground">
            <p className="text-center mt-3">
              Already have an institutional campus?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
