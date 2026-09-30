# Cresta-ERP: Master Implementation Plan & Architecture Roadmap

> **Target Audience**: Nigerian and African Primary, Secondary, and Tertiary Institutions  
> **Infrastructure**: Next.js 15 (React 19, App Router, TypeScript), Tailwind CSS, Neon PostgreSQL (Serverless & Scale-to-Zero)  
> **Core Value Proposition**: Enterprise-grade school management without recurring per-message communication costs, vendor lock-in, or complex infrastructure overhead.

---

## 1. Cost-Saving Strategic Principles

Most ERP implementations fail in Nigerian schools due to recurring communication fees (WhatsApp Cloud API charging per conversation in USD, and SMS aggregators charging per unit in Naira with expiring credits). Cresta-ERP eliminates these recurring costs by deploying high-utility, zero-marginal-cost alternatives:

| Traditional Costly Approach | Cresta-ERP Cost-Saving Alternative | Benefit to Nigerian Schools |
| :--- | :--- | :--- |
| **Meta WhatsApp Business API** ($0.03–$0.05 / conversation in USD) | **Click-to-WhatsApp Protocol (`wa.me`)** | **100% Free Forever**: Generates pre-formatted personalized links (`wa.me/234XXXXXXXXXX?text=...`). Bursars and teachers click once to open WhatsApp Web or mobile app with receipt or report card pre-filled. |
| **Bulk SMS Aggregators** (₦3–₦5 / unit with expiration dates) | **In-App Parent Portal + Browser Push Notifications (PWA)** | **Zero Telecom Fees**: Parents access homework, daily attendance streaks, and term invoices directly from their mobile browser without SMS deductions. |
| **Expensive Merchant Gateways** (1.5% + ₦100 fee per transaction) | **Direct Bank Transfer Upload & Verification** | Parents transfer directly to school bank accounts (GTB, Zenith, Access, etc.) and upload transaction screenshots; Bursar verifies with 1 click. |
| **Paid Document Verification Services** | **Self-Hosted QR Code Cryptographic Verification** | Every printable report card and fee receipt has a generated QR code linking to an immutable verification URL on the school's Cresta portal. |
| **High Data Bandwidth Overhead** | **Low-Data / Offline-First Caching** | Roll call and grade entry function seamlessly on poor network connections and sync automatically when internet is restored. |
| **Complex Teacher Retraining** | **Two-Way Excel / CSV Broad Sheet Sync** | Teachers enter scores in familiar Excel templates and bulk-upload them in seconds. |

---

## 2. Multi-Phase Development Roadmap

The development is divided into 5 self-contained, progressive phases to guarantee system stability and non-breaking incremental deployments.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Phase 1: Institutional Core & Multi-Perspective Architecture (Weeks 1 - 2)   │
├──────────────────────────────────────────────────────────────────────────────┤
│ Phase 2: Nigerian Financials, Fee Collection & Bank Proofs  (Weeks 3 - 4)    │
├──────────────────────────────────────────────────────────────────────────────┤
│ Phase 3: Zero-Cost Communications & Free WhatsApp Protocol   (Weeks 5 - 6)    │
├──────────────────────────────────────────────────────────────────────────────┤
│ Phase 4: Academics, Nigerian CA Engine & WAEC/NECO Reports  (Weeks 7 - 8)    │
├──────────────────────────────────────────────────────────────────────────────┤
│ Phase 5: Campus Logistics, Boarding, Security & Multi-Branch(Weeks 9 - 10)   │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

### Phase 1: Institutional Core & Multi-Perspective Architecture (Foundation)
*Goal: Provide solid multi-tenant institutional database schemas, persistent Neon storage, and unified role-based views.*

1. **Database Schema & Neon PostgreSQL Persistence**
   - Tables: `institutions`, `academic_sessions`, `terms`, `classes`, `class_arms`, `users`, `roles`, `students`, `guardians`.
   - Automatic migrations and connection pooling using Neon serverless Postgres.
2. **Multi-Perspective Demo Mode**
   - **Administrator View**: Complete oversight, school KPIs, fee realization charts, and staff audits.
   - **Teacher View**: Class roster, timetable schedule, quick roll call attendance, and assignment queue.
   - **Parent View**: Ward switcher (multi-child support), fee payment status, academic performance, and teacher messaging.
3. **Student Information System (SIS)**
   - Nigerian student demographics (State of Origin, LGA, Blood Group, Genotype, Emergency Contacts).
   - Class Arms (e.g., JSS 1 Gold, SSS 2 Science, SSS 3 Commercial).
   - Printable Student ID Cards with barcodes and institutional branding.
4. **Staff & Faculty Directory**
   - Teacher subject assignments, department heads, and qualification records.

---

### Phase 2: Nigerian Financials, Fee Invoicing & Bank Reconciliation
*Goal: Automate school fee collection in Naira (₦) with zero gateway penalty options and rapid auditing.*

1. **Flexible Term Fee Structures**
   - Tuition Fee (per term / annual).
   - Mandatory Ancillary Fees (Uniforms, Books, STEM Lab, Sports Levy).
   - Optional Services (School Bus Shuttle Routes, Hostel Accommodation, Lunch Club).
2. **Direct Bank Transfer Proof Reconciliation (Cost-Saving)**
   - Parents upload bank transfer receipts / transaction reference codes directly into the portal.
   - Bursar dashboard with side-by-side transaction verification and 1-click approval.
3. **Optional Gateway Integration (Paystack / Monnify / Flutterwave)**
   - Optional online card and USSD payment collection for schools wanting automated clearing.
   - Dynamic currency display: Nigerian Naira (₦ NGN) primary, with US Dollar ($ USD) equivalent.
4. **Printable / Downloadable Fee Receipts**
   - Official branded PDF receipts with unique receipt numbers (`REC-OAK-2026-XXXX`).
   - Integrated QR code for tamper-proof verification.
5. **Debtor Tracking & Financial Oversight**
   - Aged debtor list (14 days, 30 days, term-end).
   - Recharts visual breakdown of collection rates against budgeted revenue.

---

### Phase 3: Zero-Cost Communication & Free WhatsApp Protocol
*Goal: Eliminate expensive SMS and WhatsApp API bills while maintaining immediate parent reach.*

1. **Free Click-to-WhatsApp (`wa.me`) Dispatcher**
   - Generates browser-native `https://wa.me/234XXXXXXXXXX?text=ENCODED_MESSAGE` links.
   - Pre-formatted templates for:
     - **Fee Due Notice**: Includes student name, class, amount due, and school bank account details.
     - **Gate Arrival Alert**: Notifies guardian when student checks in at the gate.
     - **Academic Results Released**: Direct link to the student's online report card.
   - Single-click and bulk-queued dispatch buttons that open WhatsApp Web or the WhatsApp desktop/mobile app.
2. **In-App Parent & Student Web Portal (PWA)**
   - Progressive Web App installable on Android and iOS devices.
   - Live announcements board, term calendars, and event reminders at zero telecom cost.
3. **Free Email Notifications (SMTP / Resend Free Tier)**
   - Termly newsletters, fee circulars, and comprehensive transcripts emailed in PDF format.
4. **Digital Parent-Teacher Direct Chat**
   - In-app two-way messaging between parents and assigned class teachers.

---

### Phase 4: Academics, Nigerian CA Grading & WAEC/NECO Broad Sheets
*Goal: Automate the entire Nigerian Continuous Assessment (CA) workflow and produce official report cards in seconds.*

1. **Nigerian 3-Term Continuous Assessment (CA) Standard**
   - 1st CA Test (10 marks)
   - 2nd CA Test (10 marks)
   - Mid-Term Project / Assignment (20 marks)
   - Terminal Examination (60 marks)
   - **Total**: 100 marks per subject.
2. **Official WAEC / NECO / BECE Grade Mapping**
   - **A1** (75% - 100%): Distinction
   - **B2** (70% - 74%): Very Good
   - **B3** (65% - 69%): Good
   - **C4 - C6** (50% - 64%): Credit
   - **D7 - E8** (40% - 49%): Pass
   - **F9** (0% - 39%): Fail
3. **Automated Master Broad Sheet**
   - Class-wide score matrices for all subjects.
   - Automatic calculation of class totals, subject averages, and student positions (1st, 2nd, 3rd, etc.).
   - 1-Click Excel export for staff meetings and offline collation.
4. **Printable Comprehensive Report Cards (PDF)**
   - Student photo, attendance summary (Days Present / Days School Opened).
   - Affective domain ratings (Punctuality, Neatness, Politeness, Honesty).
   - Psychomotor domain ratings (Handwriting, Sports, Craft, Lab Skills).
   - Class Teacher's remark, Principal's comment, and scanned signature.
   - Security verification QR code.

---

### Phase 5: Campus Logistics, Boarding, Security & Multi-Branch
*Goal: Provide enterprise campus operations management for day and boarding institutions.*

1. **Attendance & Biometric / Gate Check-in**
   - Morning roll call sheets with 1-click status toggling (Present / Absent / Late).
   - Low-data offline roll call recording with background synchronization.
   - Gate security module for visitor logs and student sign-out / exeat passes.
2. **School Bus & Transport Logistics**
   - Route assignments, driver details, bus capacity tracking, and student passenger rosters.
3. **Boarding School & Hostel Administration**
   - Dormitory and room allocation, bed space management, and dining hall meal rosters.
   - Digital Exeat management (Parent request -> Housemaster approval -> Gate check-out).
4. **Multi-Campus Network Management**
   - Centralized management for school chains (e.g., Victoria Island, Ikeja, Abuja branches).
   - Branch-level reporting and consolidated financial analytics.

---

## 3. High-Value, Cost-Saving Features Tailored for Nigerian Schools

To maximize school adoption and rapid commercial sales across Nigeria, the following specialized features are built into Cresta-ERP:

1. **"Pay with Transfer" Virtual Bank Slip Uploader**
   - Allows parents without debit cards to pay at bank branches or via mobile USSD (*737#, *894#, etc.) and upload their teller receipt for instant audit.
2. **WAEC / JAMB / BECE Candidate Registration Manager**
   - Pre-formats student biodata and passport photographs to the exact specification required for WAEC and NECO portal uploads, saving schools hundreds of manual hours.
3. **Offline Attendance Sync (Data-Light Architecture)**
   - Allows teachers in areas with intermittent connectivity to take attendance on a smartphone or tablet without active data; records automatically queue and upload to Neon DB once connected.
4. **Teacher Lesson Plan & Curriculum Tracker**
   - Aligned with the Nigerian Educational Research and Development Council (NERDC) national curriculum standards.
5. **PTA Levy & Project Accountability Module**
   - Transparent tracking of PTA dues and school development projects with public or parent-only dashboards to build trust with guardian associations.

---

## 4. Verification & Testing Standards

Every phase must pass the following release criteria before advancing to the next:
- **Zero Console & Lint Errors**: Strict adherence to TypeScript standard enums and React best practices.
- **Responsive Viewport Support**: Pixel-perfect rendering across mobile phones (375px+), tablets, and high-DPI desktop displays.
- **Database Resilience**: Graceful degradation when offline with non-blocking local storage fallback and automatic cloud sync to Neon PostgreSQL.
- **Export Integrity**: CSV spreadsheets and PDF reports must generate clean, vector-rendered tables with proper pagination and Nigerian currency symbols (₦).
