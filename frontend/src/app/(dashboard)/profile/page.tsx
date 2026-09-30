"use client"

import * as React from "react"
import Link from "next/link"
import {
  User,
  Mail,
  Phone,
  Shield,
  Building2,
  KeyRound,
  CheckCircle2,
  ArrowLeft
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

export default function ProfilePage() {
  const [name, setName] = React.useState("Dr. Sarah Vance")
  const [email, setEmail] = React.useState("s.vance@oakridge.edu")
  const [phone, setPhone] = React.useState("+1 (555) 234-8901")
  const [saved, setSaved] = React.useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm" className="h-8">
          <Link href="/dashboard">
            <ArrowLeft className="size-4 mr-1" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4 border-b pb-6">
        <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl border">
          SV
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
              Principal Administrator
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1">
              <Building2 className="size-3.5" /> Oakridge International Academy
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Shield className="size-3.5" /> Super Admin Access
            </span>
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 border-border shadow-xs">
          <CardHeader>
            <CardTitle className="text-lg">Staff Profile Information</CardTitle>
            <CardDescription className="text-xs">
              Manage personal contact information and institutional records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="fullname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Official Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {saved && (
                <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="size-4 shrink-0" />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              <Button type="submit" size="sm" className="font-medium">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Institutional Credentials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div>
                <span className="text-muted-foreground block">Employee ID</span>
                <span className="font-mono font-medium">EMP-2024-001</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Campus Assignment</span>
                <span className="font-medium">Main High School Campus</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Tenure Start</span>
                <span className="font-medium">August 2021 (5 years)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium block">2-Factor Auth</span>
                  <span className="text-muted-foreground">Enabled via Authenticator</span>
                </div>
                <Badge variant="outline" className="text-emerald-600 border-emerald-300">
                  Active
                </Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs h-8">
                <KeyRound className="size-3.5 mr-1" />
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
