"use client"

import * as React from "react"
import {
  UploadCloud,
  CheckCircle2,
  Building,
  CreditCard,
  FileCheck,
  Copy,
  Check,
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
import { Badge } from "~/components/ui/badge"
import { Input } from "~/components/ui/input"

export interface BankTransferSubmission {
  id: string
  invoiceId: string
  studentName: string
  studentClass: string
  feeCategory: string
  amountNGN: string
  amountNumber: number
  payerBank: string
  payerAccountName: string
  receivingBank: string
  receivingAccount: string
  sessionReference: string
  transferDate: string
  receiptImageUrl?: string
  receiptType: "mobile_app" | "ussd_slip" | "bank_teller" | "pos_receipt"
  status: "pending_verification" | "verified_paid" | "rejected"
  rejectionReason?: string
  submittedAt: string
}

interface BankTransferUploaderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultStudent?: string
  defaultInvoiceId?: string
  defaultAmount?: string
  defaultFeeType?: string
  onSubmitted?: (submission: BankTransferSubmission) => void
}

export function BankTransferUploaderDialog({
  open,
  onOpenChange,
  defaultStudent = "Samuel Adeyemi",
  defaultInvoiceId = "INV-2026-085",
  defaultAmount = "₦35,000",
  defaultFeeType = "School Bus Route #4",
  onSubmitted,
}: BankTransferUploaderDialogProps) {
  const [studentName, setStudentName] = React.useState(defaultStudent)
  const [invoiceId, setInvoiceId] = React.useState(defaultInvoiceId)
  const [feeCategory, setFeeCategory] = React.useState(defaultFeeType)
  const [amountNGN, setAmountNGN] = React.useState(defaultAmount)
  const [receivingBank, setReceivingBank] = React.useState("Guaranty Trust Bank (GTB) - 0123456789")
  const [payerBank, setPayerBank] = React.useState("Guaranty Trust Bank (GTB)")
  const [payerAccountName, setPayerAccountName] = React.useState("Chief Babatunde Adeyemi")
  const [sessionReference, setSessionReference] = React.useState("NIP/GTB/20261019/994821")
  const [transferDate, setTransferDate] = React.useState("2026-10-19")
  const [receiptType, setReceiptType] = React.useState<"mobile_app" | "ussd_slip" | "bank_teller" | "pos_receipt">("mobile_app")
  const [hasUploadedProof, setHasUploadedProof] = React.useState(true)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [copiedAccount, setCopiedAccount] = React.useState(false)

  const [prevProps, setPrevProps] = React.useState({
    student: defaultStudent,
    invoice: defaultInvoiceId,
    category: defaultFeeType,
    amount: defaultAmount,
  })

  if (
    prevProps.student !== defaultStudent ||
    prevProps.invoice !== defaultInvoiceId ||
    prevProps.category !== defaultFeeType ||
    prevProps.amount !== defaultAmount
  ) {
    setPrevProps({
      student: defaultStudent,
      invoice: defaultInvoiceId,
      category: defaultFeeType,
      amount: defaultAmount,
    })
    setStudentName(defaultStudent)
    setInvoiceId(defaultInvoiceId)
    setFeeCategory(defaultFeeType)
    setAmountNGN(defaultAmount)
  }

  const handleCopyAccount = (acc: string) => {
    navigator.clipboard?.writeText(acc)
    setCopiedAccount(true)
    toast.success("School Bank Account Copied!", {
      description: `Account ${acc} copied to clipboard for mobile transfer.`,
    })
    setTimeout(() => setCopiedAccount(false), 2000)
  }

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      const submission: BankTransferSubmission = {
        id: `TRF-${Math.floor(100000 + Math.random() * 900000)}`,
        invoiceId,
        studentName,
        studentClass: "Grade 10A (SSS 1)",
        feeCategory,
        amountNGN,
        amountNumber: parseInt(amountNGN.replace(/[^0-9]/g, "")) || 35000,
        payerBank,
        payerAccountName,
        receivingBank,
        receivingAccount: receivingBank.split(" - ")[1] || "0123456789",
        sessionReference,
        transferDate,
        receiptType,
        status: "pending_verification",
        submittedAt: new Date().toISOString(),
      }

      onSubmitted?.(submission)
      onOpenChange(false)

      toast.success("Bank Transfer Proof Submitted!", {
        description: `Reference ${sessionReference} queued for Bursar verification. No merchant transaction fees incurred.`,
      })
    }, 700)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[92vh] overflow-y-auto p-0">
        <div className="bg-linear-to-r from-emerald-600/15 via-background to-primary/15 p-6 border-b">
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-600 text-white text-[11px] font-semibold gap-1">
                <Building className="size-3" />
                <span>Zero Gateway Surcharge</span>
              </Badge>
              <Badge variant="outline" className="text-[11px] border-emerald-400 text-emerald-700 dark:text-emerald-300">
                Direct Bank Transfer &bull; ₦0 Fee
              </Badge>
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              Upload Bank Transfer Proof / Teller Receipt
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Transfer directly to the school bank account and upload your debit alert or bank teller receipt for Bursar verification.
            </DialogDescription>
          </DialogHeader>

          {/* School Destination Bank Accounts */}
          <div className="mt-4 p-3 rounded-lg border border-emerald-300 dark:border-emerald-900/50 bg-emerald-500/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <CreditCard className="size-3.5 text-emerald-600" />
                <span>School Designated Bank Accounts (Oakridge Academy)</span>
              </span>
              <button
                type="button"
                onClick={() => handleCopyAccount("0123456789")}
                className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1"
              >
                {copiedAccount ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                <span>{copiedAccount ? "Copied" : "Copy Account #"}</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-background rounded-md border text-[11px]">
                <span className="text-muted-foreground block">Guaranty Trust Bank (GTB):</span>
                <span className="font-mono font-bold text-foreground">0123456789</span> &bull; <span className="text-muted-foreground">Oakridge Intl Academy</span>
              </div>
              <div className="p-2 bg-background rounded-md border text-[11px]">
                <span className="text-muted-foreground block">Zenith Bank Plc:</span>
                <span className="font-mono font-bold text-foreground">1012345678</span> &bull; <span className="text-muted-foreground">Oakridge Tuition</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmitProof} className="p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Student Name</label>
              <Input
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
                className="text-xs h-9"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Invoice Reference #</label>
              <Input
                value={invoiceId}
                onChange={(e) => setInvoiceId(e.target.value)}
                required
                className="text-xs h-9 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Fee Category</label>
              <Input
                value={feeCategory}
                onChange={(e) => setFeeCategory(e.target.value)}
                required
                className="text-xs h-9"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Amount Transferred (Naira ₦)</label>
              <Input
                value={amountNGN}
                onChange={(e) => setAmountNGN(e.target.value)}
                required
                className="text-xs h-9 font-bold text-emerald-600"
              />
            </div>
          </div>

          <div className="border-t pt-3 space-y-3">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider text-muted-foreground">
              Transfer Audit Details (As Shown on Bank Slip)
            </h4>

            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Sender / Payer Bank</label>
                <select
                  value={payerBank}
                  onChange={(e) => setPayerBank(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs"
                >
                  <option value="Guaranty Trust Bank (GTB)">Guaranty Trust Bank (GTB)</option>
                  <option value="Zenith Bank Plc">Zenith Bank Plc</option>
                  <option value="Access Bank Plc">Access Bank Plc</option>
                  <option value="First Bank of Nigeria">First Bank of Nigeria</option>
                  <option value="United Bank for Africa (UBA)">United Bank for Africa (UBA)</option>
                  <option value="Kuda Microfinance Bank">Kuda Microfinance Bank</option>
                  <option value="OPay Digital Services">OPay Digital Services</option>
                  <option value="PalmPay">PalmPay</option>
                  <option value="Stanbic IBTC">Stanbic IBTC Bank</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Receiving School Account</label>
                <select
                  value={receivingBank}
                  onChange={(e) => setReceivingBank(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs"
                >
                  <option value="Guaranty Trust Bank (GTB) - 0123456789">GTBank (0123456789) - Main Tuition</option>
                  <option value="Zenith Bank Plc - 1012345678">Zenith Bank (1012345678) - Ancillary &amp; Bus</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Proof Document Type</label>
                <select
                  value={receiptType}
                  onChange={(e) => setReceiptType(e.target.value as "mobile_app" | "ussd_slip" | "bank_teller" | "pos_receipt")}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs"
                >
                  <option value="mobile_app">Mobile Banking App e-Receipt (e.g. GTWorld, Zenith Mobile)</option>
                  <option value="bank_teller">Bank Branch Deposit Teller (Stamped Slip)</option>
                  <option value="ussd_slip">USSD Transfer SMS / Debit Alert Screenshot</option>
                  <option value="pos_receipt">School POS Terminal Slip</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Payer Account / Sender Name</label>
                <Input
                  value={payerAccountName}
                  onChange={(e) => setPayerAccountName(e.target.value)}
                  required
                  placeholder="e.g. Chief Babatunde Adeyemi"
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Transaction Ref / NIP Session ID</label>
                <Input
                  value={sessionReference}
                  onChange={(e) => setSessionReference(e.target.value)}
                  required
                  placeholder="e.g. 0000132610191234567890"
                  className="text-xs h-9 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Transfer Date</label>
                <Input
                  type="date"
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                  required
                  className="text-xs h-9"
                />
              </div>
            </div>
          </div>

          {/* Receipt Proof Preview / Presets */}
          <div className="border-t pt-3 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground">
                Attach Bank Transfer Receipt / Teller Screenshot
              </label>
              <span className="text-[11px] text-muted-foreground">PNG, JPG or PDF</span>
            </div>

            {hasUploadedProof ? (
              <div className="p-3 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-500/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck className="size-4 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        GTBank_Mobile_Debit_Slip_{sessionReference.slice(-6)}.png
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Verified NIP Instant Transfer &bull; 248 KB &bull; Attached
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] bg-background text-emerald-600 border-emerald-300">
                    Ready to Audit
                  </Badge>
                </div>

                <div className="p-2.5 bg-background rounded border text-[11px] font-mono space-y-1 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <strong className="text-foreground">{amountNGN}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Beneficiary:</span>
                    <span className="text-foreground">Oakridge International Academy</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session ID:</span>
                    <span className="text-foreground">{sessionReference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-emerald-600 font-bold">Successful / Debited</span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setHasUploadedProof(true)}
                className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/30 cursor-pointer transition-colors"
              >
                <UploadCloud className="size-8 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs font-medium text-foreground">Click to upload transfer screenshot or bank teller</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Supports mobile app screenshots, USSD SMS debit, or bank deposit teller</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t">
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
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs gap-1.5 h-9"
            >
              <CheckCircle2 className="size-3.5" />
              <span>{isSubmitting ? "Queueing Submission..." : "Submit Proof to Bursar"}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
