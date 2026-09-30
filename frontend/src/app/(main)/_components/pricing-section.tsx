"use client"

import * as React from "react"
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { CheckCircle2, ChevronRight, Building2, Sparkles, MessageCircle } from "lucide-react";
import { CreateInstitutionDialog } from "~/components/create-institution-dialog";

export function PricingSection() {
  const [selectedPlanForModal, setSelectedPlanForModal] = React.useState<string>("Growth Plan (₦120,000/mo)")
  const [modalOpen, setModalOpen] = React.useState(false)

  const plans = [
    {
      name: "Starter",
      planId: "Starter Plan (₦50,000/mo)",
      isCustom: false,
      price: "₦50,000",
      period: "/month",
      secondaryPrice: "~$35 USD / month",
      description: "For primary schools and academies up to 300 students",
      features: [
        "Up to 300 enrolled students",
        "Academics & Daily Attendance tracking",
        "Fee Management & Invoicing in Naira & USD",
        "Parent SMS & WhatsApp Notification Alerts",
        "Standard Cresta Institutional Support",
      ],
      cta: "Create Institution",
      highlighted: false,
    },
    {
      name: "Growth",
      planId: "Growth Plan (₦120,000/mo)",
      isCustom: false,
      price: "₦120,000",
      period: "/month",
      secondaryPrice: "~$80 USD / month",
      description: "For growing secondary schools and colleges up to 1,500 students",
      features: [
        "Up to 1,500 enrolled students",
        "All Starter features included",
        "Staff HR & Faculty Payroll module",
        "Interactive Parent & Student Portals",
        "Recharts Attendance & Financial Analytics",
        "Gradebook, Report Card Generator & Transcripts",
        "Priority 24/7 Dedicated Support",
      ],
      cta: "Create Institution",
      highlighted: true,
    },
    {
      name: "Enterprise",
      planId: "Enterprise Tier (Custom — Discuss with Sales Rep)",
      isCustom: true,
      price: "Custom",
      period: "",
      secondaryPrice: "Based on discussion with our sales rep",
      description: "For large institutions, colleges, and multi-campus school chains",
      features: [
        "Unlimited enrolled students",
        "All Growth features included",
        "Multi-branch & Campus network management",
        "Dedicated Neon PostgreSQL Database Provisioning",
        "Custom Payment Gateway & WhatsApp API Integrations",
        "Dedicated Institutional Account Executive & Custom SLA",
      ],
      cta: "Discuss with Sales Rep",
      highlighted: false,
    },
  ];

  const handleOpenPlan = (planId: string) => {
    setSelectedPlanForModal(planId)
    setModalOpen(true)
  }

  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center space-y-3">
          <Badge variant="secondary" className="mb-2">
            Institutional Pricing
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Predictable Institutional Pricing for Nigerian Schools
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Transparent Naira monthly tiers for emerging and established institutions. Flexible campus scaling with full database persistence.
          </p>

          <div className="inline-flex items-center rounded-lg border border-border p-1 bg-muted/40 mt-4">
            <span className="rounded-md px-3.5 py-1.5 text-xs font-semibold bg-background text-foreground shadow-xs">
              Nigerian Naira (₦ NGN) &bull; USD Equivalent Shown
            </span>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 items-stretch gap-8 sm:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "h-full flex flex-col justify-between",
                plan.highlighted &&
                  "relative z-10 overflow-visible shadow-lg ring-2 ring-primary border-primary/50"
              )}
            >
              {plan.highlighted && (
                <div className="pointer-events-none absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                  <Badge className="px-3 py-0.5 text-xs shadow-sm bg-primary text-primary-foreground font-semibold">
                    <Sparkles className="size-3 mr-1" />
                    Most Popular Tier
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-xs min-h-[32px]">{plan.description}</CardDescription>
                <div className="mt-3 flex flex-col">
                  {plan.isCustom ? (
                    <div>
                      <span className="text-3xl font-extrabold tracking-tight text-foreground">
                        Custom
                      </span>
                      <p className="text-xs font-semibold text-primary mt-1">
                        Based on discussion with our sales rep
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold tracking-tight text-foreground">
                          {plan.price}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">{plan.period}</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground mt-0.5 font-medium">
                        {plan.secondaryPrice}
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-6 pt-0">
                <ul className="min-h-0 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 pt-2 border-t border-border/50">
                  <Button
                    variant={plan.highlighted ? "default" : "outline"}
                    className="w-full text-xs font-semibold gap-1.5 shadow-xs"
                    onClick={() => handleOpenPlan(plan.planId)}
                  >
                    {plan.isCustom ? (
                      <>
                        <MessageCircle className="size-3.5 text-primary" />
                        <span>Discuss with Sales Rep</span>
                        <ChevronRight className="size-3.5" />
                      </>
                    ) : (
                      <>
                        <Building2 className="size-3.5" />
                        <span>Create Institution</span>
                        <ChevronRight className="size-3.5" />
                      </>
                    )}
                  </Button>
                  <p className="text-[10px] text-center text-muted-foreground">
                    {plan.isCustom 
                      ? "Custom pricing & dedicated onboarding consultation"
                      : "Direct submission to Neon database • Instant trial"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground">
            Starter (₦50k/mo) &bull; Growth (₦120k/mo) &bull; Enterprise is <strong>Custom (based on discussion with our sales rep)</strong>.
          </p>
        </div>
      </div>

      <CreateInstitutionDialog
        open={modalOpen}
        onOpenChange={setModalOpen}
        defaultPlan={selectedPlanForModal}
      />
    </section>
  );
}
