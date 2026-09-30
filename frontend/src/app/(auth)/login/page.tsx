"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap, ArrowRight, ShieldCheck, Mail, Lock } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = React.useState("admin@schoolerp.org")
  const [password, setPassword] = React.useState("password123")
  const [role, setRole] = React.useState("administrator")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated authentication for ERP access
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-muted/30">
      <div className="w-full max-w-md space-y-6">
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
          <p className="text-xs text-muted-foreground mt-1">Cresta Institutional Platform &bull; Sign in to access your administrative suite</p>
        </div>

        <Card className="border-border shadow-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">Sign in</CardTitle>
            <CardDescription>
              Enter your credentials to access your administrative dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Institutional Role</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(["administrator", "teacher", "parent"] as const).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRole(r)}
                      className={`text-xs capitalize py-2 px-2 rounded-md border font-medium transition-colors ${
                        role === r
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email or Staff ID</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@school.edu"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <Label htmlFor="password">Password</Label>
                  <a href="#forgot" className="text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
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

              <Button type="submit" className="w-full mt-2 font-medium">
                Sign In to Dashboard
                <ArrowRight className="ml-1 size-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 pt-0 border-t border-border/50 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 mt-3 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="size-4 shrink-0" />
              <span>TLS 256-bit encrypted school data connection</span>
            </div>
            <p className="text-center">
              New institutional campus?{" "}
              <Link href="/signup" className="text-primary font-medium hover:underline">
                Register institution
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
