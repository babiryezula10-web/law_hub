# Contributing to LawHub Uganda

> Thank you for your interest in contributing to LawHub Uganda. This guide outlines our development workflow, coding standards, and review process.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Setup](#development-setup)
3. [Branch Strategy](#branch-strategy)
4. [Commit Conventions](#commit-conventions)
5. [Code Standards](#code-standards)
6. [Project Structure](#project-structure)
7. [Testing Guidelines](#testing-guidelines)
8. [Pull Request Process](#pull-request-process)
9. [Documentation Standards](#documentation-standards)
10. [Legal Data Accuracy](#legal-data-accuracy)

---

## Getting Started

### Prerequisites

| Requirement | Minimum Version |
|---|---|
| Node.js | 18.x |
| npm | 9.x |
| Git | 2.30+ |
| TypeScript knowledge | Intermediate |
| React knowledge | Intermediate |

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/your-org/law_hub.git
cd law_hub

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add your GEMINI_API_KEY to .env (optional — AI features degrade gracefully)

# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

---

## Development Setup

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | No | Google Gemini API key for AI features. If unset, AI endpoints return graceful errors. |
| `PORT` | No | Server port (default: `3000`) |
| `NODE_ENV` | No | Set to `production` for production builds |

### Available Scripts

```bash
npm run dev      # Start development server with HMR (tsx + Vite middleware)
npm run build    # Build production client (Vite) and server (esbuild)
npm run lint     # TypeScript type checking (tsc --noEmit)
npm run preview  # Preview production build
npm run clean    # Remove dist/ directory
```

---

## Branch Strategy

We follow a **trunk-based development** model:

```
main (production-ready)
  │
  ├── develop (integration branch)
  │     │
  │     ├── feature/add-moot-court-module
  │     ├── feature/student-grades-export
  │     ├── fix/rbac-lecturer-access
  │     └── docs/update-api-reference
  │
  └── release/v1.1.0 (cut from develop when ready)
```

### Branch Naming

| Prefix | Purpose | Example |
|---|---|---|
| `feature/` | New functionality | `feature/add-legal-dictionary-search` |
| `fix/` | Bug fixes | `fix/submission-status-display` |
| `refactor/` | Code improvements | `refactor/extract-api-service` |
| `docs/` | Documentation changes | `docs/update-architecture-diagram` |
| `data/` | Legal data updates | `data/add-2024-amendments` |

---

## Commit Conventions

Follow the **Conventional Commits** specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Purpose |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, no logic changes |
| `refactor` | Code restructuring without behaviour change |
| `data` | Legal data additions or corrections |
| `chore` | Build, config, or tooling changes |
| `test` | Adding or updating tests |

### Examples

```
feat(constitution): add Article 137 judicial review annotations
fix(auth): prevent duplicate user creation on concurrent logins
docs(api): document /api/submissions/:id/review endpoint
data(cases): add Uganda v Thomas Kwoyelo [2015] UGSC 5
refactor(hooks): extract useLocalStorage from App.tsx
```

---

## Code Standards

### TypeScript

- **Strict mode**: All code must compile with `strict: true`
- **No implicit `any`**: Use explicit types for function parameters and return values
- **Prefer interfaces**: Use `interface` over `type` for object shapes (except unions)
- **Readonly where possible**: Use `readonly` for immutable properties
- **Exhaustive switches**: Handle all cases in discriminated unions

```typescript
// ✅ Good
interface LegalDocument {
  readonly id: string;
  title: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

function getStatusLabel(status: LegalDocument['status']): string {
  switch (status) {
    case 'DRAFT':     return 'Draft';
    case 'PUBLISHED': return 'Published';
    case 'ARCHIVED':  return 'Archived';
  }
}

// ❌ Bad
function getStatusLabel(status: any) {
  return status;
}
```

### React Components

- **Functional components only**: No class components
- **Named exports**: `export function ComponentName()` (not `export default`)
- **Props interfaces**: Define explicit props interface for every component
- **Hooks at top level**: Follow Rules of Hooks
- **Event handlers**: Prefix with `handle` (e.g., `handleSubmit`, `handleRoleChange`)

### CSS / Tailwind

- **Utility-first**: Use Tailwind classes in JSX
- **Custom classes**: Define in `src/index.css` using `@layer` directives
- **Naming**: Use lowercase kebab-case for custom CSS classes (e.g., `law-card`, `law-glass`)
- **Design tokens**: Use CSS custom properties from `:root` for colours and spacing

### File Naming

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `StudentDashboard.tsx` |
| Hooks | camelCase with `use` prefix | `useLocalStorage.ts` |
| Utilities | camelCase | `formatters.ts` |
| Services | camelCase | `api.ts` |
| Data files | camelCase | `constitutionData.ts` |
| Types | camelCase | `types.ts` |
| Docs | SCREAMING_SNAKE_CASE | `API_REFERENCE.md` |

---

## Project Structure

```
law_hub/
├── docs/                    # Technical and governance documentation
│   ├── presentation/        # Executive and judicial briefing documents
│   ├── ARCHITECTURE.md
│   ├── AI_GOVERNANCE_AND_ETHICS.md
│   ├── API_REFERENCE.md
│   ├── CONTRIBUTING.md
│   └── SECURITY.md
├── data/                    # Persistent JSON data store
├── src/                     # Client application source
│   ├── components/          # React UI components
│   ├── data/                # Static legal databases
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API service layer
│   ├── utils/               # Shared utilities
│   ├── assets/              # Images and static assets
│   ├── types.ts             # TypeScript type definitions
│   ├── App.tsx              # Root application component
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles and design tokens
├── server.ts                # Express API server
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project overview
```

---

## Testing Guidelines

### Current Testing Strategy

LawHub currently relies on:
1. **TypeScript compilation** (`npm run lint`) — catches type errors at build time
2. **Manual verification** — browser-based testing of UI and API endpoints
3. **API endpoint testing** — direct HTTP requests to verify JSON responses

### Recommended Testing Additions

| Layer | Framework | Coverage Target |
|---|---|---|
| Unit tests | Vitest | Utility functions (`formatters.ts`, `validators.ts`) |
| Component tests | React Testing Library + Vitest | Critical UI components |
| API integration | Supertest | All Express endpoints |
| E2E | Playwright | Core user flows (login, submit, review) |

### Running Type Checks

```bash
npm run lint    # tsc --noEmit
```

---

## Pull Request Process

### Before Submitting

- [ ] Code compiles with zero TypeScript errors (`npm run lint`)
- [ ] Dev server starts cleanly (`npm run dev`)
- [ ] New features include appropriate TypeScript types
- [ ] Legal data changes cite authoritative sources
- [ ] Documentation is updated if API or architecture changed

### PR Template

```markdown
## Summary
Brief description of changes.

## Type
- [ ] Feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Documentation
- [ ] Legal data update

## Changes
- List of specific changes

## Testing
- How the changes were verified

## Legal Accuracy (if applicable)
- Sources cited for legal data changes
- ULII reference links
```

### Review Checklist

Reviewers should verify:
1. **Type safety**: No `any` types introduced without justification
2. **Legal accuracy**: Statutory references and case citations are verifiable on ULII
3. **Security**: RBAC correctly applied to new endpoints
4. **Performance**: No unnecessary re-renders or large data loading
5. **Accessibility**: Interactive elements are keyboard-navigable

---

## Documentation Standards

### Code Comments

- Use JSDoc for exported functions and interfaces
- Explain *why*, not *what* — the code should be self-documenting for the *what*
- Include `@example` for utility functions

### Markdown Documentation

- Use proper heading hierarchy (single `#` per document)
- Include table of contents for documents longer than 3 sections
- Use tables for structured data
- Include code blocks with language identifiers

### Legal Data Files

- Every legal data file in `src/data/` must include source attribution comments
- Case citations must follow the format: `[Year] UGSC/UGCA/UGHC [Number]`
- Statutory references must include Cap number or Act number

---

## Legal Data Accuracy

### Quality Standards

All legal data in the platform must meet these criteria:

1. **Verifiable source**: Traceable to ULII, Uganda Gazette, or official court reports
2. **Current status**: Mark repealed, amended, or superseded provisions
3. **Citation format**: Follow standard Ugandan legal citation conventions
4. **Neutrality**: Present legal principles without political commentary
5. **Academic integrity**: Clearly distinguish between statutory text and editorial commentary

### Data Update Process

1. Identify the authoritative source (ULII, Gazette, court records)
2. Create a `data/` branch with the changes
3. Include source metadata in the data file
4. Submit PR with ULII reference links
5. Obtain approval from a legal reviewer before merge

---

*This guide is maintained by the LawHub Engineering Team. Questions? Open an issue or contact the project maintainers.*
