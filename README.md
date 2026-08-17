<div align="center">

# ⚖️ LawHub Uganda

**Ugandan Legal Research & Academic Platform**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Powered-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-c89d42)]()
[![Node](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

*A comprehensive digital legal research, AI-assisted tutoring, and academic management platform purpose-built for the Ugandan legal education system.*

</div>

---

## 🏛️ Overview

LawHub Uganda is an enterprise-grade platform that unifies the complete 1995 Constitution of Uganda (288 Articles, 19 Chapters, 7 Schedules), Acts of Parliament, landmark judicial precedents, LLB/Bar Course curricula, and AI-powered legal tutoring into a single, searchable interface.

### Key Capabilities

| Module | Description |
|---|---|
| 🏛️ **Constitution Library** | Complete 1995 Constitution with clause-level navigation, amendment history, and case law annotations |
| 📚 **Legal Research Centre** | Acts of Parliament, Statutory Instruments, Supreme Court and High Court decisions, regulations |
| 🤖 **AI Academic Assistant** | Gemini-powered legal tutor with IRAC coaching, trained on Ugandan constitutional and statutory authorities |
| 📝 **Legal Drafting Suite** | AI-assisted template generation for affidavits, pleadings, and agreements |
| 🎓 **Course Management** | 32 LLB and Bar Course units with study notes, flashcards, and revision questions |
| 📋 **Assignment Workflow** | Student submission → lecturer review → grading → feedback — fully digitised |
| 🏢 **Admin Dashboard** | User management, document publishing, submission approvals, platform analytics |
| 🔐 **RBAC Security** | Three-tier role system (Student / Lecturer / Administrator) with server-side enforcement |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│         React 19 SPA Client         │  ← Vite HMR, Tailwind v4, Lexend font
├─────────────────────────────────────┤
│      Express.js API Server          │  ← 25+ RESTful endpoints, RBAC middleware
├─────────────────────────────────────┤
│    JSON Flat-File Persistence       │  ← Zero-dependency data layer
├─────────────────────────────────────┤
│     Google Gemini AI Pipeline       │  ← 3-model cascade with fallback
└─────────────────────────────────────┘
```

> Full architecture documentation: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)

---

## 🚀 Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm 9+
- (Optional) [Google Gemini API Key](https://ai.google.dev/) for AI features

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/law_hub.git
cd law_hub

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY (optional — AI features degrade gracefully)

# Start development server
npm run dev
```

The application will be available at **http://localhost:3000**.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build production client + server bundle |
| `npm run lint` | TypeScript type checking |
| `npm run preview` | Preview production build |
| `npm run clean` | Remove build artifacts |

### Default Accounts

| Role | Email | Name |
|---|---|---|
| Student | `student@lawhub.ug` | Student Scholar |
| Lecturer | `apollo.kaggwa@lawhub.ug` | Dr. Apollo Kaggwa |
| Administrator | `admin@lawhub.ug` | Chief Legal Administrator |

---

## 📁 Project Structure

```
law_hub/
├── docs/                          # Technical & governance documentation
│   ├── presentation/              # Executive & judicial briefing pack
│   │   ├── EXECUTIVE_SUMMARY.md
│   │   ├── JUDICIAL_BRIEFING.md
│   │   └── BRAND_GUIDELINES.md
│   ├── ARCHITECTURE.md
│   ├── AI_GOVERNANCE_AND_ETHICS.md
│   ├── API_REFERENCE.md
│   ├── CONTRIBUTING.md
│   └── SECURITY.md
├── data/                          # Persistent JSON data store
├── src/
│   ├── components/                # 26 React UI components
│   ├── data/                      # 13 static legal data modules
│   ├── hooks/                     # Custom React hooks
│   │   ├── useLocalStorage.ts
│   │   └── useAuth.ts
│   ├── services/                  # API service layer
│   │   └── api.ts
│   ├── utils/                     # Shared utilities
│   │   ├── constants.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── assets/                    # Images and static assets
│   ├── types.ts                   # 500+ lines of TypeScript interfaces
│   ├── App.tsx                    # Root application component
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Tailwind v4 + design tokens
├── server.ts                      # Express API server (1,594 lines)
├── index.html                     # HTML entry point
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies and scripts
```

---

## 🔌 API Overview

LawHub exposes **25+ RESTful endpoints** across 7 functional domains:

| Domain | Key Endpoints | Auth |
|---|---|---|
| **Health** | `GET /api/health` | — |
| **Auth** | `POST /api/auth/login`, `POST /api/auth/register` | — |
| **Documents** | `GET /api/documents`, `POST /api/admin/documents` | Admin |
| **Submissions** | `GET/POST /api/submissions`, `POST /:id/review` | Varies |
| **Students** | `GET/POST /api/student-submissions` | Varies |
| **Constitution** | `GET /api/constitution` | — |
| **AI** | `POST /api/ai/tutor`, `/api/ai/draft`, `/api/ai/quiz` | — |

> Full API documentation: [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md)

---

## 📖 Documentation Index

| Document | Purpose |
|---|---|
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | System architecture, data flows, and design decisions |
| [`docs/AI_GOVERNANCE_AND_ETHICS.md`](docs/AI_GOVERNANCE_AND_ETHICS.md) | AI bias assessment, citation verification, data privacy, judicial safeguards |
| [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) | Complete API contracts with request/response schemas |
| [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) | Developer workflow, coding standards, and PR process |
| [`docs/SECURITY.md`](docs/SECURITY.md) | RBAC matrix, DPPA 2019 compliance, vulnerability reporting |
| [`docs/presentation/EXECUTIVE_SUMMARY.md`](docs/presentation/EXECUTIVE_SUMMARY.md) | High-level institutional briefing |
| [`docs/presentation/JUDICIAL_BRIEFING.md`](docs/presentation/JUDICIAL_BRIEFING.md) | Briefing paper for judicial stakeholders |
| [`docs/presentation/BRAND_GUIDELINES.md`](docs/presentation/BRAND_GUIDELINES.md) | Typography, colour palette, and tone of voice |

---

## 🛡️ Security & Governance

- **RBAC:** Three-tier role system enforced server-side via middleware
- **Data Protection:** Aligned with Uganda's Data Protection and Privacy Act, 2019
- **AI Ethics:** Comprehensive governance framework with citation verification and hallucination mitigation
- **Judicial Independence:** AI operates as assistive educational tool only — see [Judicial Briefing](docs/presentation/JUDICIAL_BRIEFING.md)

---

## 🤝 Contributing

We welcome contributions from developers and legal professionals. Please read our [Contributing Guide](docs/CONTRIBUTING.md) before submitting pull requests.

---

## 📊 Platform Metrics

| Metric | Value |
|---|---|
| Constitutional articles | 288 (complete) |
| Chapters | 19 |
| Schedules | 7 |
| LLB/Bar Course units | 32 |
| Landmark cases | 50+ |
| Verified statutes | 5+ |
| API endpoints | 25+ |
| TypeScript types | 500+ lines |
| React components | 26 |

---

## ⚖️ License

This project is proprietary software developed for educational use in Ugandan law faculties. All rights reserved.

---

<div align="center">

**LawHub Uganda** — *Advancing Legal Education Through Technology*

Built with ❤️ for the Ugandan legal community

</div>
