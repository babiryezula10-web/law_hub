# LawHub Uganda — Security Policy

> **Classification:** Confidential — Internal Distribution Only  
> **Version:** 1.0.0  
> **Last Updated:** August 2026  
> **Governing Law:** The Data Protection and Privacy Act, 2019 (Act No. 1 of 2019); The Computer Misuse Act, 2011

---

## Table of Contents

1. [Security Overview](#security-overview)
2. [Role-Based Access Control](#role-based-access-control)
3. [Authentication Architecture](#authentication-architecture)
4. [Data Protection Compliance](#data-protection-compliance)
5. [Sensitive Legal File Handling](#sensitive-legal-file-handling)
6. [Input Validation & Sanitisation](#input-validation--sanitisation)
7. [API Security](#api-security)
8. [Infrastructure Security](#infrastructure-security)
9. [Incident Response](#incident-response)
10. [Vulnerability Reporting](#vulnerability-reporting)

---

## Security Overview

LawHub Uganda processes **educational legal data** (not privileged client-attorney communications) for university law students and lecturers. The security posture is designed around:

- **Principle of least privilege**: Users access only what their role permits
- **Defence in depth**: Server-side RBAC, input validation, and data isolation
- **Data minimisation**: Only essential user data is collected
- **Transparency**: Users are informed of data processing practices

---

## Role-Based Access Control

### RBAC Matrix

| Resource / Action | Student | Lecturer | Administrator |
|---|---|---|---|
| View published documents | ✅ | ✅ | ✅ |
| View all document statuses | ❌ | ❌ | ✅ |
| Submit assignments | ✅ | ❌ | ❌ |
| Submit academic materials | ❌ | ✅ | ✅ |
| Review/grade student work | ❌ | ✅ | ✅ |
| Approve/reject lecturer submissions | ❌ | ❌ | ✅ |
| Create/edit/delete documents | ❌ | ❌ | ✅ |
| Manage users (create, suspend, delete) | ❌ | ❌ | ✅ |
| Change user roles | ❌ | ❌ | ✅ |
| View platform metrics | ❌ | Own only | ✅ |
| Upload Constitution documents | ❌ | ❌ | ✅ |
| Use AI tutor | ✅ | ✅ | ✅ |
| Use AI drafter | ✅ | ✅ | ✅ |
| Generate AI quizzes | ✅ | ✅ | ✅ |

### RBAC Enforcement

Access control is enforced **server-side** via the `requireRole()` middleware:

```typescript
function requireRole(allowedRoles: string[]) {
  return (req, res, next) => {
    // 1. Extract user identity from headers/query/body
    // 2. Look up user in persistent store
    // 3. Verify role matches allowedRoles
    // 4. Check account is not SUSPENDED
    // 5. Attach authenticated user to request
  };
}
```

### Protected Endpoints

| Endpoint Pattern | Required Role |
|---|---|
| `POST/PUT/DELETE /api/admin/documents/*` | Administrator |
| `POST /api/constitution/upload` | Administrator |
| `GET/POST /api/users/*` | Administrator |
| `PUT /api/users/:id/role` | Administrator |
| `PUT /api/users/:id/status` | Administrator |
| `DELETE /api/users/:id` | Administrator |
| `GET /api/admin/metrics` | Administrator |

### Security Policy: Administrator Account Creation

Administrator accounts **cannot** be created through public registration. This is enforced with a hard server-side check:

```json
{
  "error": "Security Policy Violation: Administrator accounts cannot be registered publicly. They must be provisioned directly by an authorized System Administrator."
}
```

Lecturer registration requires the faculty verification code: `FACULTY-2025`.

---

## Authentication Architecture

### Current Implementation

LawHub uses a **simplified email-based authentication model** suitable for its educational context:

```
1. User provides email → POST /api/auth/login
2. Server looks up email in systemUsers[]
3. If found & ACTIVE → return user profile with role
4. If found & SUSPENDED → return 403
5. If not found → create new Student account → return profile
```

### Session Management

- **Client-side:** User profile stored in `localStorage` (key: `lawhub_student_profile`)
- **Server-side:** Stateless — each request re-validates via email lookup
- **No JWT/session tokens:** Authentication relies on email identity sent per request

### Role Integrity

To prevent client-side role spoofing:
1. On login, the client fetches the server-authorised role via `GET /api/auth/me`
2. The `useAuth` hook synchronises the client-side profile with the backend
3. All protected operations verify role **server-side**, never trusting client-provided role

---

## Data Protection Compliance

### Uganda Data Protection and Privacy Act, 2019

LawHub's data processing activities are designed to comply with the following sections:

| DPPA Section | Requirement | LawHub Implementation |
|---|---|---|
| S.3 | Lawful basis for processing | Legitimate educational interest + user consent at registration |
| S.4 | Purpose limitation | Data used solely for academic platform operations |
| S.5 | Data minimisation | Only name, email, role, and institution collected |
| S.6 | Accuracy | Backend deduplication and role verification |
| S.8 | Storage limitation | Data retained for academic year + 1 year |
| S.9 | Security safeguards | RBAC, input validation, server-local storage |
| S.20 | Data subject access rights | Users can view and update their profiles |
| S.21 | Right to rectification | Profile editing via auth system |
| S.22 | Right to erasure | Account deletion via Administrator |
| S.40 | Cross-border transfers | AI queries to Google Gemini (US-based); no PII in prompts |

### The Computer Misuse Act, 2011

| Provision | Relevance |
|---|---|
| S.12 — Unauthorised access | RBAC prevents access to protected resources |
| S.14 — Unauthorised modification | Only Administrators can modify/delete system data |
| S.17 — Data protection | Aligned with DPPA 2019 requirements |

---

## Sensitive Legal File Handling

### Document Classification

| Category | Sensitivity | Handling |
|---|---|---|
| Published legal texts (Constitution, statutes) | **Public** | Freely accessible, verified by editorial board |
| Lecturer academic materials | **Internal** | Submission-review workflow; published only after Administrator approval |
| Student assignment submissions | **Confidential** | Visible only to the submitting student, assigned lecturer, and administrators |
| User credentials (email, role) | **Personal data** | Server-local storage, not exposed to other users |

### File Upload Security

- **Size limit:** 50 MB maximum enforced server-side
- **Type validation:** Only PDF, DOCX, DOC, and TXT accepted
- **Content handling:** File content stored as text (Base64 or extracted text), not raw binary
- **No execution:** Uploaded files are stored as data — never executed server-side

---

## Input Validation & Sanitisation

### Server-Side

| Validation | Location |
|---|---|
| Required field checks | Every POST/PUT endpoint |
| Email format validation | Registration and login |
| Role whitelisting | `["Student", "Lecturer", "Administrator"]` |
| Status whitelisting | `["ACTIVE", "SUSPENDED"]` |
| Payload size limit | `express.json({ limit: "50mb" })` |

### Client-Side

| Module | Validations |
|---|---|
| `src/utils/validators.ts` | Email format, required fields, file type, file size, faculty code, form completeness |
| `sanitizeInput()` | HTML entity encoding to prevent XSS |

### XSS Prevention

- User-supplied text is rendered via React's built-in JSX escaping
- The `sanitizeInput()` utility provides additional HTML entity encoding
- No `dangerouslySetInnerHTML` usage without explicit sanitisation

---

## API Security

### Rate Limiting

> **Current status:** Not implemented  
> **Recommendation:** Add `express-rate-limit` with the following configuration:
> - General endpoints: 100 requests per 15 minutes per IP
> - AI endpoints: 20 requests per 15 minutes per IP
> - Auth endpoints: 10 requests per 15 minutes per IP

### CORS

The current development configuration does not restrict CORS origins. For production deployment:

```typescript
app.use(cors({
  origin: ['https://lawhub.ug'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
```

### HTTPS

- **Development:** HTTP on `localhost:3000`
- **Production:** HTTPS required — terminate TLS at reverse proxy (nginx/Caddy)

---

## Infrastructure Security

### Environment Variables

| Variable | Security Classification |
|---|---|
| `GEMINI_API_KEY` | **Secret** — Never commit to version control |
| `PORT` | Non-sensitive |
| `NODE_ENV` | Non-sensitive |

### `.gitignore` Coverage

The following are excluded from version control:
- `.env` files (API keys)
- `node_modules/`
- `dist/` (build artifacts)
- `data/lawhub_store.json` (user data)

### Data Backup

- JSON store is written to disk on every mutation via `savePersistentData()`
- **Recommendation:** Implement automated daily backups of `data/lawhub_store.json`

---

## Incident Response

### Response Procedure

1. **Detect:** Monitor server logs for unusual patterns (e.g., repeated 401/403 errors)
2. **Contain:** Suspend affected user accounts via `PUT /api/users/:id/status`
3. **Assess:** Review JSON store and server logs for data integrity
4. **Remediate:** Patch vulnerability, rotate API keys if compromised
5. **Notify:** Inform affected users per DPPA 2019 breach notification requirements
6. **Document:** Record incident details, timeline, and corrective actions

### Account Suspension

Administrators can immediately suspend compromised accounts:

```bash
curl -X PUT http://localhost:3000/api/users/usr_compromised/status \
  -H "Content-Type: application/json" \
  -H "x-user-email: admin@lawhub.ug" \
  -d '{"status": "SUSPENDED"}'
```

---

## Vulnerability Reporting

### Responsible Disclosure

If you discover a security vulnerability in LawHub, please report it responsibly:

1. **Email:** Send details to `security@lawhub.ug` (to be configured)
2. **Include:** Description of the vulnerability, steps to reproduce, and potential impact
3. **Do not:** Publicly disclose the vulnerability before a fix is deployed
4. **Response time:** We aim to acknowledge reports within 48 hours

### Scope

| In Scope | Out of Scope |
|---|---|
| RBAC bypass | Social engineering |
| Data exfiltration | Physical access attacks |
| XSS/injection vulnerabilities | Denial of service (volumetric) |
| Authentication weaknesses | Third-party dependency vulnerabilities (report to upstream) |
| API abuse | Issues in development/test environments |

---

*This security policy is reviewed quarterly by the LawHub Engineering Team and the designated Data Protection Officer.*
