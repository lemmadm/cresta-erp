"use client"

import * as React from "react"
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  Download,
  Smartphone,
  Search,
  ShieldCheck,
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
import { BankTransferSubmission } from "./bank-transfer-uploader-dialog"

export const INITIAL_BURSAR_SUBMISSIONS: BankTransferSubmission[] = [
  {
    id: "TRF-882104",
    invoiceId: "INV-2026-085",
    studentName: "Samuel Adeyemi",
    studentClass: "Grade 10A (SSS 1)",
    feeCategory: "School Bus Route #4",
    amountNGN: "₦35,000",
    amountNumber: 35000,
    payerBank: "Guaranty Trust Bank (GTB)",
    payerAccountName: "Chief Babatunde Adeyemi",
    receivingBank: "Guaranty Trust Bank (GTB)",
    receivingAccount: "0123456789",
    sessionReference: "NIP/GTB/20261019/994821",
    transferDate: "2026-10-19",
    receiptType: "mobile_app",
    status: "pending_verification",
    submittedAt: "2026-10-19T10:14:00Z",
  },
  {
    id: "TRF-774912",
    invoiceId: "INV-2026-083",
    studentName: "Chinedu Okeke",
    studentClass: "Grade 10A (SSS 1)",
    feeCategory: "2nd Term Senior Tuition (Part Payment)",
    amountNGN: "₦120,000",
    amountNumber: 120000,
    payerBank: "Zenith Bank Plc",
    payerAccountName: "Engr. Emeka Okeke",
    receivingBank: "Zenith Bank Plc",
    receivingAccount: "1012345678",
    sessionReference: "NIP/ZEN/20261018/112940",
    transferDate: "2026-10-18",
    receiptType: "mobile_app",
    status: "pending_verification",
    submittedAt: "2026-10-18T16:45:00Z",
  },
  {
    id: "TRF-663821",
    invoiceId: "INV-2026-082",
    studentName: "Aisha Bello",
    studentClass: "Grade 10A (SSS 1)",
    feeCategory: "2nd Term Senior Tuition",
    amountNGN: "₦120,000",
    amountNumber: 120000,
    payerBank: "Access Bank Plc",
    payerAccountName: "Alhaji Bello",
    receivingBank: "Guaranty Trust Bank (GTB)",
    receivingAccount: "0123456789",
    sessionReference: "NIP/ACC/20261017/883012",
    transferDate: "2026-10-17",
    receiptType: "bank_teller",
    status: "verified_paid",
    submittedAt: "2026-10-17T09:20:00Z",
  },
  {
    id: "TRF-552910",
    invoiceId: "INV-2026-079",
    studentName: "David Adeleke",
    studentClass: "Grade 10A (SSS 1)",
    feeCategory: "Ancillary & Uniform Levy",
    amountNGN: "₦45,000",
    amountNumber: 45000,
    payerBank: "Kuda Microfinance Bank",
    payerAccountName: "Adeleke Ventures",
    receivingBank: "Guaranty Trust Bank (GTB)",
    receivingAccount: "0123456789",
    sessionReference: "NIP/KUD/20261015/443210",
    transferDate: "2026-10-15",
    receiptType: "mobile_app",
    status: "verified_paid",
    submittedAt: "2026-10-15T14:10:00Z",
  },
]

interface BursarApprovalQueueDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  submissions: BankTransferSubmission[]
  onApprove: (id: string) => void
  onReject: (id: string, reason: string) => void
}

export function BursarApprovalQueueDialog({
  open,
  onOpenChange,
  submissions,
  onApprove,
  onReject,
}: BursarApprovalQueueDialogProps) {
  const [filter, setFilter] = React.useState<"all" | "pending" | "verified">("pending")
  const [search, setSearch] = React.useState("")
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const selectedSubmission =
    submissions.find((s) => s.id === selectedId) ||
    submissions.find((s) => s.status === "pending_verification") ||
    submissions[0] ||
    null

  const filtered = submissions.filter((s) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "pending"
        ? s.status === "pending_verification"
        : s.status === "verified_paid"
    const matchesSearch =
      s.studentName.toLowerCase().includes(search.toLowerCase()) ||
      s.sessionReference.toLowerCase().includes(search.toLowerCase()) ||
      s.invoiceId.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const pendingCount = submissions.filter((s) => s.status === "pending_verification").length

  const handleApprove = (submission: BankTransferSubmission) => {
    onApprove(submission.id)
    toast.success("Bank Transfer Approved & Verified!", {
      description: `Invoice ${submission.invoiceId} marked as Paid. Official receipt REC-OAK-${submission.id.slice(4)} issued with QR verification.`,
    })
  }

  const handleReject = (submission: BankTransferSubmission) => {
    const reason = "Transaction reference could not be matched on school bank statement."
    onReject(submission.id, reason)
    toast.error("Transfer Slip Flagged & Rejected", {
      description: `Guardian notified to provide updated bank session statement.`,
    })
  }

  const handleSendReceiptWhatsApp = (submission: BankTransferSubmission) => {
    const text = encodeURIComponent(
      `Dear Parent of ${submission.studentName}, your direct bank transfer of ${submission.amountNGN} for ${submission.feeCategory} (Ref: ${submission.sessionReference}) has been verified and approved by Oakridge Bursary. Official Receipt REC-OAK-${submission.id.slice(4)} is now issued. Thank you.`
    )
    window.open(`https://wa.me/2348031112233?text=${text}`, "_blank")
    toast.success("Receipt Notice Dispatched via Free wa.me", {
      description: "Pre-filled WhatsApp confirmation opened with zero SMS/API cost.",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-0">
        <div className="bg-linear-to-r from-emerald-600/15 via-background to-secondary/15 p-6 border-b">
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-600 text-white text-[11px] font-semibold gap-1">
                <FileCheck className="size-3" />
                <span>Bursary Reconciliation Hub</span>
              </Badge>
              {pendingCount > 0 && (
                <Badge variant="outline" className="border-amber-400 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[11px]">
                  {pendingCount} Pending Proofs to Audit
                </Badge>
              )}
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              Bursar Direct Bank Transfer Approval Queue
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Verify bank mobile debit alerts, NIP session IDs, and bank teller receipts uploaded by parents before issuing official fee receipts.
            </DialogDescription>
          </DialogHeader>

          {/* Quick Filter Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center rounded-lg border bg-background p-1 text-xs">
              <button
                type="button"
                onClick={() => setFilter("pending")}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  filter === "pending"
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-300"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Pending Review ({pendingCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter("verified")}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  filter === "verified"
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-300"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Verified &amp; Paid
              </button>
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  filter === "all"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All Slips ({submissions.length})
              </button>
            </div>

            <div className="relative w-48 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student or Session ID..."
                className="pl-8 text-xs h-8"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-12">
          {/* Left: Queue List */}
          <div className="lg:col-span-5 space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {filtered.length === 0 ? (
              <div className="text-center py-10 border rounded-lg p-4 bg-muted/20">
                <FileCheck className="size-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-xs font-semibold text-foreground">No submissions found</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">All uploaded transfer proofs have been reconciled.</p>
              </div>
            ) : (
              filtered.map((item) => {
                const isSelected = selectedSubmission?.id === item.id
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/40"
                        : "hover:bg-muted/30 border-border bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground text-sm">{item.studentName}</span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] py-0 ${
                          item.status === "verified_paid"
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-300"
                            : item.status === "rejected"
                            ? "bg-red-500/10 text-destructive border-red-300"
                            : "bg-amber-500/10 text-amber-600 border-amber-300"
                        }`}
                      >
                        {item.status === "verified_paid"
                          ? "✓ Verified"
                          : item.status === "rejected"
                          ? "✕ Rejected"
                          : "⏱ Pending"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{item.feeCategory}</span>
                      <strong className="text-foreground font-bold">{item.amountNGN}</strong>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono pt-1 border-t border-border/60">
                      <span>{item.payerBank.split(" ")[0]} &bull; {item.payerAccountName.split(" ")[0]}</span>
                      <span>Ref: {item.sessionReference.slice(-8)}</span>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Right: Side-by-Side Audit Card */}
          <div className="lg:col-span-7 space-y-4">
            {selectedSubmission ? (
              <div className="border rounded-lg p-5 bg-card shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Bank Transfer Slip Inspection
                    </span>
                    <h3 className="text-base font-bold text-foreground mt-0.5">
                      {selectedSubmission.studentName} &bull; {selectedSubmission.feeCategory}
                    </h3>
                  </div>
                  <Badge
                    className={
                      selectedSubmission.status === "verified_paid"
                        ? "bg-emerald-600 text-white text-xs"
                        : selectedSubmission.status === "rejected"
                        ? "bg-destructive text-white text-xs"
                        : "bg-amber-500 text-amber-950 font-bold text-xs"
                    }
                  >
                    {selectedSubmission.status === "verified_paid"
                      ? "Paid & Cleared"
                      : selectedSubmission.status === "rejected"
                      ? "Rejected"
                      : "Awaiting Bursar Audit"}
                  </Badge>
                </div>

                {/* Audit Grid Details */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-md border bg-muted/20 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                      Target School Bank Account
                    </span>
                    <span className="font-semibold text-foreground block">{selectedSubmission.receivingBank}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">Account: {selectedSubmission.receivingAccount}</span>
                  </div>

                  <div className="p-2.5 rounded-md border bg-muted/20 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                      Verified Amount
                    </span>
                    <span className="text-lg font-extrabold text-emerald-600 block">{selectedSubmission.amountNGN}</span>
                    <span className="text-[10px] text-muted-foreground">Matches Invoice {selectedSubmission.invoiceId}</span>
                  </div>

                  <div className="p-2.5 rounded-md border bg-muted/20 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                      Payer Bank &amp; Account
                    </span>
                    <span className="font-semibold text-foreground block">{selectedSubmission.payerBank}</span>
                    <span className="text-[11px] text-muted-foreground">{selectedSubmission.payerAccountName}</span>
                  </div>

                  <div className="p-2.5 rounded-md border bg-muted/20 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                      NIP Session ID / Transaction Reference
                    </span>
                    <span className="font-mono font-bold text-foreground block text-[11px]">
                      {selectedSubmission.sessionReference}
                    </span>
                    <span className="text-[10px] text-muted-foreground">Date: {selectedSubmission.transferDate}</span>
                  </div>
                </div>

                {/* Simulated Bank Debit Slip Preview Box */}
                <div className="p-3 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-500/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-foreground border-b border-emerald-200 dark:border-emerald-900 pb-2">
                    <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                      <ShieldCheck className="size-4" />
                      <span>Electronic Bank Debit Advisory Receipt (Attached)</span>
                    </span>
                    <Badge variant="outline" className="text-[10px] bg-background">
                      {selectedSubmission.receiptType.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="p-3 bg-background rounded border text-[11px] font-mono space-y-1 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Sender Account:</span>
                      <strong className="text-foreground">{selectedSubmission.payerAccountName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Beneficiary:</span>
                      <span className="text-foreground">Oakridge International Academy</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Destination Bank:</span>
                      <span className="text-foreground">{selectedSubmission.receivingBank.split(" - ")[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount Debited:</span>
                      <span className="text-emerald-600 font-bold">{selectedSubmission.amountNGN}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Session ID:</span>
                      <span className="text-foreground">{selectedSubmission.sessionReference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Channel:</span>
                      <span className="text-foreground">NIP Instant Payment (Online Transfer)</span>
                    </div>
                  </div>
                </div>

                {/* Audit Action Buttons */}
                <div className="pt-2 border-t flex flex-wrap items-center justify-between gap-2">
                  {selectedSubmission.status === "pending_verification" ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(selectedSubmission)}
                        className="text-xs text-destructive border-destructive/40 hover:bg-destructive/10 gap-1.5 h-8"
                      >
                        <XCircle className="size-3.5" />
                        <span>Reject / Flag Slip</span>
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(selectedSubmission)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs gap-1.5 h-8"
                        >
                          <CheckCircle2 className="size-3.5" />
                          <span>Approve &amp; Issue Receipt</span>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="w-full flex items-center justify-between">
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="size-4" />
                        <span>Receipt REC-OAK-{selectedSubmission.id.slice(4)} Issued</span>
                      </span>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendReceiptWhatsApp(selectedSubmission)}
                          className="text-xs text-emerald-600 hover:text-emerald-700 border-emerald-300 gap-1.5 h-8"
                        >
                          <Smartphone className="size-3.5" />
                          <span>Send WhatsApp Receipt (`wa.me`)</span>
                        </Button>

                        <Button
                          size="sm"
                          onClick={() => {
                            toast.success(`Official Receipt downloaded: REC-OAK-${selectedSubmission.id.slice(4)}.pdf`)
                          }}
                          className="text-xs gap-1.5 h-8"
                        >
                          <Download className="size-3.5" />
                          <span>Print Receipt</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
