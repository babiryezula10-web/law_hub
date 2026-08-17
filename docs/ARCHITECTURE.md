# LawHub Uganda — System Architecture

> **Classification:** Internal Technical Reference  
> **Version:** 1.0.0  
> **Last Updated:** August 2026  
> **Audience:** Engineering team, technical reviewers, institutional stakeholders

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [System Topology](#system-topology)
3. [Technology Stack](#technology-stack)
4. [Data Flow Diagrams](#data-flow-diagrams)
5. [Security Architecture](#security-architecture)
6. [Database Design](#database-design)
7. [Client Architecture](#client-architecture)
8. [API Layer](#api-layer)
9. [AI Integration Pipeline](#ai-integration-pipeline)
10. [Deployment Architecture](#deployment-architecture)

---

## Architecture Overview

LawHub Uganda employs a **three-tier monolithic architecture** optimised for rapid iteration and single-deployment simplicity:

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT TIER                          │
│           React 19 SPA + Tailwind CSS v4               │
│      (Components, Hooks, Services, Data Modules)       │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/JSON
┌──────────────────────▼──────────────────────────────────┐
│                  APPLICATION TIER                       │
│         Express.js API Server (TypeScript)              │
│   ┌──────────┐  ┌──────────┐  ┌────────────────────┐   │
│   │  Auth &   │  │ Document │  │   AI Middleware     │   │
│   │  RBAC     │  │ CRUD &   │  │  (Gemini API with  │   │
│   │ Middleware │  │ Workflow │  │  fallback cascade) │   │
│   └──────────┘  └──────────┘  └────────────────────┘   │
│              Vite Dev Middleware (HMR)                   │
└──────────────────────┬──────────────────────────────────┘
                       │ File I/O
┌──────────────────────▼──────────────────────────────────┐
│                   DATA TIER                             │
│         JSON Flat-File Persistence                      │
│         (data/lawhub_store.json)                        │
│                                                         │
│  ┌────────────┐ ┌──────────────┐ ┌───────────────────┐  │
│  │ System     │ │ Lecturer     │ │ Student            │  │
│  │ Users      │ │ Submissions  │ │ Assignments        │  │
│  └────────────┘ └──────────────┘ └───────────────────┘  │
│  ┌────────────┐ ┌──────────────┐                        │
│  │ Uploaded   │ │ Constitution │                        │
│  │ Documents  │ │ Data         │                        │
│  └────────────┘ └──────────────┘                        │
└─────────────────────────────────────────────────────────┘
```

### Design Principles

| Principle | Implementation |
|---|---|
| **Monolith-first** | Single `server.ts` serves both API and SPA — no microservice overhead |
| **Typed end-to-end** | TypeScript on both client and server with shared type definitions |
| **Graceful degradation** | AI features fail gracefully when `GEMINI_API_KEY` is unset |
| **Role-based security** | RBAC middleware enforces Student / Lecturer / Administrator boundaries |
| **Offline-resilient client** | Static legal data (288 Constitution articles, 32 courses) bundled in client |

---

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Runtime** | Node.js 18+ | Server-side JavaScript execution |
| **Language** | TypeScript 5.8 | Static typing across full stack |
| **Server** | Express.js 4.x | HTTP API routing and middleware |
| **Build** | Vite 6.x | Development server with HMR, production bundler |
| **Client** | React 19 | Component-based SPA framework |
| **Styling** | Tailwind CSS 4.x | Utility-first CSS framework |
| **Animation** | Motion (Framer Motion) | UI micro-animations |
| **Icons** | Lucide React | Consistent SVG icon library |
| **AI** | Google Gemini API (`@google/genai`) | Legal tutoring, document drafting, quiz generation |
| **Fonts** | Google Fonts (Lexend) | Typography system |
| **Persistence** | JSON flat-file | Serverless-compatible data storage |
| **Dev Runner** | tsx | Direct TypeScript execution without pre-compilation |

---

## Data Flow Diagrams

### User Authentication Flow

```
┌──────────┐    POST /api/auth/login    ┌───────────┐
│  Client  │ ─────────────────────────► │  Express  │
│  (React) │                            │  Server   │
│          │ ◄───────────────────────── │           │
│          │   { user, role, token }    │           │
└────┬─────┘                            └─────┬─────┘
     │                                        │
     │ Store in localStorage                  │ Lookup/Create in
     │ (lawhub_student_profile)               │ systemUsers[]
     │                                        │
     ▼                                        ▼
┌──────────┐                            ┌───────────┐
│ Browser  │                            │ lawhub_   │
│ Storage  │                            │ store.json│
└──────────┘                            └───────────┘
```

### Document Submission & Approval Workflow

```
Lecturer                    Administrator               Student
   │                             │                         │
   │ POST /api/submissions       │                         │
   │ (status: PENDING_REVIEW)    │                         │
   ├────────────────────────────►│                         │
   │                             │                         │
   │                             │ POST /submissions/:id/review
   │                             │ (action: APPROVE/REJECT)│
   │                             ├─────────┐               │
   │                             │         │               │
   │                             │ If PUBLISHED:           │
   │                             │ Copy to uploadedDocuments│
   │                             │         │               │
   │                             │◄────────┘               │
   │                             │                         │
   │                             │ GET /api/documents      │
   │                             │ (status: PUBLISHED)     │
   │                             │◄────────────────────────┤
   │                             │                         │
```

### AI Tutoring Pipeline

```
┌──────────┐                    ┌───────────┐                    ┌──────────┐
│  Client  │  POST /api/ai/    │  Express  │  generateContent   │  Gemini  │
│          │  tutor             │  Server   │  (with fallback)   │  API     │
│          │ ─────────────────► │           │ ──────────────────►│          │
│          │  { prompt,         │           │  System prompt:    │          │
│          │    courseContext,   │           │  "LawHub Academic  │          │
│          │    role }          │           │   Assistant..."    │          │
│          │                    │           │                    │          │
│          │ ◄───────────────── │           │ ◄─────────────────│          │
│          │  { reply }         │           │  Structured legal  │          │
│          │                    │           │  response with     │          │
│          │                    │           │  citations         │          │
└──────────┘                    └───────────┘                    └──────────┘

Model Cascade:
  1. gemini-3.6-flash (primary)
  2. gemini-flash-latest (fallback)
  3. gemini-3.1-flash-lite (last resort)
  
  Each model: up to 2 retries with exponential backoff
```

---

## Security Architecture

### Role-Based Access Control (RBAC)

LawHub implements a three-tier role system enforced by server-side middleware:

| Role | Permissions |
|---|---|
| **Student** | View published documents, submit assignments, use AI tutor, take quizzes |
| **Lecturer** | All Student permissions + submit academic materials, review student work |
| **Administrator** | All permissions + manage users, approve/reject submissions, CRUD all documents, view metrics |

### RBAC Middleware Flow

```
Request → requireRole(['Administrator'])
  ├── Extract user email from headers/query/body
  ├── Lookup user in systemUsers[]
  ├── If not found → 401 Unauthorized
  ├── If user.status === 'SUSPENDED' → 403 Forbidden
  ├── If user.role not in allowedRoles → 403 Forbidden
  └── If valid → attach user to request → next()
```

### Input Validation

- **Server-side:** Express JSON body parsing with 50 MB limit; required field checks on all POST/PUT endpoints
- **Client-side:** `src/utils/validators.ts` provides form-level validation before submission
- **Sanitisation:** HTML entity encoding via `sanitizeInput()` utility

---

## Database Design

LawHub uses a single JSON file (`data/lawhub_store.json`) as its persistence layer, structured as follows:

```json
{
  "systemUsers": [
    {
      "id": "usr_student_1",
      "name": "Student Scholar",
      "email": "student@lawhub.ug",
      "role": "Student | Lecturer | Administrator",
      "institution": "Faculty of Law",
      "joinedDate": "January 2025",
      "status": "ACTIVE | SUSPENDED"
    }
  ],
  "lecturerSubmissions": [
    {
      "id": "sub_const_01",
      "title": "...",
      "courseOrUnit": "Constitutional Law I",
      "status": "PENDING_REVIEW | APPROVED | PUBLISHED | REJECTED | CHANGES_REQUESTED",
      "lecturerEmail": "...",
      "submittedAt": "ISO 8601",
      "reviewedAt": "ISO 8601",
      "reviewedBy": "..."
    }
  ],
  "studentSubmissions": [
    {
      "id": "stud_sub_01",
      "assignmentTitle": "...",
      "studentEmail": "...",
      "status": "PENDING_REVIEW | GRADED | APPROVED | REJECTED",
      "grade": "88% (A)"
    }
  ],
  "uploadedDocuments": [
    {
      "id": "doc_const_1995",
      "title": "...",
      "documentType": "Constitution | Statute | Case Law | ...",
      "status": "DRAFT | PUBLISHED | ARCHIVED",
      "tags": ["..."]
    }
  ],
  "uploadedConstitutionData": [
    {
      "id": "const_official_doc_1995",
      "verificationStatus": "VERIFIED",
      "totalArticles": 288
    }
  ],
  "lastSaved": "ISO 8601"
}
```

### Entity Relationships

```
SystemUser (1) ──── (N) LecturerSubmission  [via lecturerEmail]
SystemUser (1) ──── (N) StudentSubmission    [via studentEmail]
LecturerSubmission (1) ──── (0..1) UploadedDocument  [on PUBLISH, creates doc_${sub.id}]
UploadedConstitutionData (1) ──── (0..1) UploadedDocument  [on upload, creates doc_${const.id}]
```

### Deduplication Strategy

On startup, `loadPersistentData()` performs:
1. Email-based deduplication of `systemUsers`
2. Seed user injection (ensures default Student, Lecturer, Admin accounts exist)
3. ID uniqueness enforcement (collision resolution with random suffixes)

---

## Client Architecture

### Directory Structure

```
src/
├── components/          # 26 React components (UI pages and panels)
│   ├── AdminPanel.tsx
│   ├── StudentDashboard.tsx
│   ├── LecturerDashboard.tsx
│   ├── ConstitutionLibrary.tsx
│   ├── LegalResearchCenter.tsx
│   ├── AiLawTutor.tsx
│   └── ... (20 more)
├── data/                # Static verified legal data (bundled in client)
│   ├── constitutionData.ts    # 288 articles, 19 chapters
│   ├── casesData.ts           # Landmark Ugandan case law
│   ├── statutesData.ts        # Acts of Parliament
│   ├── coursesData.ts         # 32 LLB/Bar Course curricula
│   └── ... (9 more)
├── hooks/               # Custom React hooks
│   ├── useLocalStorage.ts
│   └── useAuth.ts
├── services/            # API communication layer
│   └── api.ts
├── utils/               # Shared utilities
│   ├── constants.ts
│   ├── formatters.ts
│   └── validators.ts
├── types.ts             # 500+ lines of TypeScript interfaces
├── App.tsx              # Root component with routing and state
├── main.tsx             # React DOM mount point
└── index.css            # Tailwind v4 + custom design tokens
```

### State Management

LawHub uses **React's built-in state** (no Redux/Zustand):
- `App.tsx` holds global state (user, activeTab, watermark theme)
- `useLocalStorage` hook provides persistence
- `useAuth` hook manages authentication lifecycle
- Individual components manage their own local state

---

## API Layer

The Express server exposes **25+ RESTful endpoints** across 7 functional domains:

| Domain | Endpoints | Auth Required |
|---|---|---|
| Health | `GET /api/health` | No |
| Authentication | `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/me` | No |
| Documents | `GET /api/documents`, `GET /api/documents/:id` | No |
| Admin Documents | `POST/PUT/DELETE /api/admin/documents` | Administrator |
| Submissions | `GET/POST /api/submissions`, `POST /api/submissions/:id/review` | Varies |
| Student Work | `GET/POST /api/student-submissions`, `POST /:id/review` | Varies |
| Constitution | `GET /api/constitution`, `POST /api/constitution/upload` | Upload: Administrator |
| Users | `GET/POST /api/users`, `PUT /:id/role`, `PUT /:id/status`, `DELETE /:id` | Administrator |
| Metrics | `GET /api/admin/metrics`, `GET /api/lecturer/metrics` | Administrator / Lecturer |
| AI | `POST /api/ai/tutor`, `POST /api/ai/draft`, `POST /api/ai/quiz` | No (API key required server-side) |

Full API documentation is available in [API_REFERENCE.md](./API_REFERENCE.md).

---

## AI Integration Pipeline

### Model Configuration

| Parameter | Value |
|---|---|
| Primary Model | `gemini-3.6-flash` |
| Fallback Models | `gemini-flash-latest`, `gemini-3.1-flash-lite` |
| Max Retries per Model | 2 |
| Backoff Strategy | Exponential (2^attempt × 1000 ms) |

### System Prompt Governance

Each AI endpoint uses a **deterministic system prompt** that:
1. Constrains the AI to Ugandan legal authorities
2. Requires structured response format (Definition → Law → Cases → IRAC Tips)
3. Prohibits fabrication of citations
4. Mandates educational disclaimers

See [AI_GOVERNANCE_AND_ETHICS.md](./AI_GOVERNANCE_AND_ETHICS.md) for the complete governance framework.

---

## Deployment Architecture

### Development Mode

```
npm run dev
  └── tsx server.ts
        ├── Express API server (port 3000)
        ├── Vite dev middleware (HMR, module transforms)
        └── SPA fallback (serves index.html for all non-API routes)
```

### Production Mode

```
npm run build
  ├── vite build → dist/ (optimised client bundle)
  └── esbuild server.ts → dist/server.cjs (bundled server)

NODE_ENV=production node dist/server.cjs
  ├── Express API server (port 3000)
  └── express.static(dist/) → serves pre-built SPA
```

---

*This document is maintained by the LawHub Engineering Team and should be updated whenever significant architectural changes are made.*
