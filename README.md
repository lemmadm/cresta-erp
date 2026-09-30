# Cresta-ERP — Cresta Institutional Platform

> **CRESTA — Powering Institutions of Excellence**  
> An institutional ERP suite designed for African and international schools, unifying academics, attendance, finances, examinations, and communication.

---

## 🌟 Key Features

- **Multi-Perspective Demo Mode**: Instant 1-click role switcher between **Administrator**, **Teacher**, and **Parent** viewpoints.
- **Interactive Student Profiles**: Click any student in the attendance roll to inspect cumulative GPA, CA breakdown, WAEC grades, attendance streak, and guardian biodata.
- **Visual Analytics (Recharts)**: Daily attendance rates over the past week (BarChart) and 6-month fee collection trends in Naira (₦) and Dollars ($) (LineChart).
- **Academic Calendar View**: Monthly interactive calendar visualizing CA tests, WAEC mock exams, term breaks, public holidays, and school events.
- **Cost-Saving Communication (`wa.me`)**: Zero Meta API fees. Generates free 1-click WhatsApp intent links with pre-filled fee notices, gate arrivals, and result slips.
- **Nigerian Financials & Fee Ledger**: Term tuition invoicing in Naira (₦), direct bank transfer proof upload & reconciliation, and Paystack/Monnify integration.
- **Continuous Assessment (CA) Engine**: Nigerian 4-tier model (CA 1 10%, CA 2 10%, Mid-Term 20%, Exam 60% = 100%) with automated broadsheet generation.
- **Neon PostgreSQL Persistence**: Serverless PostgreSQL database connection with auto-provisioned tables and local fallback storage.

---

## 🏗️ Project Structure

```text
├── frontend/                  # Next.js 15 App Router frontend
│   ├── src/
│   │   ├── app/               # Main pages, auth, and dashboard routes
│   │   │   ├── (auth)/        # Login & institutional signup
│   │   │   ├── (dashboard)/   # Multi-perspective dashboard & dynamic modules
│   │   │   └── api/           # Neon PostgreSQL API routes (/api/institutions)
│   │   ├── components/        # UI components (Student profile, Calendar, Modals)
│   │   ├── lib/               # Database pool (Neon pg) & utility helpers
│   │   └── providers/         # Theme, React Query, and DemoRole providers
├── backend/                   # NestJS API services
├── Plan.md                    # 5-Phase master architecture & implementation plan
└── metadata.json              # Applet configuration & metadata
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 20+** and **npm**

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore the landing page, register an institution, or enter the live interactive demo dashboard.

---

## 📄 License
Proprietary &bull; Cresta Institutional Platform. All rights reserved.
