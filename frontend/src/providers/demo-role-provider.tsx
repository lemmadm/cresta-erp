"use client"

import * as React from "react"

export type DemoRole = "admin" | "teacher" | "parent"

interface DemoRoleContextType {
  role: DemoRole
  setRole: (role: DemoRole) => void
  activeChild: string
  setActiveChild: (child: string) => void
}

const DemoRoleContext = React.createContext<DemoRoleContextType | undefined>(undefined)

export function DemoRoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = React.useState<DemoRole>(() => {
    if (typeof window !== "undefined") {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const roleParam = urlParams.get("role") as DemoRole | null
        if (roleParam && (roleParam === "admin" || roleParam === "teacher" || roleParam === "parent")) {
          return roleParam
        }
        const saved = localStorage.getItem("cresta_demo_role") as DemoRole | null
        if (saved && (saved === "admin" || saved === "teacher" || saved === "parent")) {
          return saved
        }
      } catch {
        // ignore
      }
    }
    return "admin"
  })

  const [activeChild, setActiveChild] = React.useState<string>("Samuel Adeyemi (Grade 10A)")

  const setRole = React.useCallback((newRole: DemoRole) => {
    setRoleState(newRole)
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("cresta_demo_role", newRole)
      } catch {
        // ignore
      }
    }
  }, [])

  return (
    <DemoRoleContext.Provider value={{ role, setRole, activeChild, setActiveChild }}>
      {children}
    </DemoRoleContext.Provider>
  )
}

export function useDemoRole() {
  const context = React.useContext(DemoRoleContext)
  if (!context) {
    throw new Error("useDemoRole must be used within a DemoRoleProvider")
  }
  return context
}
