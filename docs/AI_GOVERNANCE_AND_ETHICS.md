# LawHub Uganda — AI Governance & Ethics Framework

> **Classification:** Institutional Policy Document  
> **Version:** 1.0.0  
> **Last Updated:** August 2026  
> **Audience:** Judiciary, legal scholars, technical reviewers, academic leadership  
> **Governing Law:** The Constitution of the Republic of Uganda, 1995; The Data Protection and Privacy Act, 2019

---

## Table of Contents

1. [Preamble](#preamble)
2. [Scope of AI Deployment](#scope-of-ai-deployment)
3. [Fundamental Principles](#fundamental-principles)
4. [Assistive vs. Determinative AI](#assistive-vs-determinative-ai)
5. [Judicial AI Bias Assessment](#judicial-ai-bias-assessment)
6. [Citation Verification & Hallucination Mitigation](#citation-verification--hallucination-mitigation)
7. [Deterministic Guardrails](#deterministic-guardrails)
8. [Data Privacy & Consent](#data-privacy--consent)
9. [Model Selection & Fallback Strategy](#model-selection--fallback-strategy)
10. [Transparency & Explainability](#transparency--explainability)
11. [Audit Trail & Accountability](#audit-trail--accountability)
12. [Ongoing Review & Governance](#ongoing-review--governance)

---

## Preamble

LawHub Uganda integrates artificial intelligence (AI) capabilities to enhance legal education and research for law students, lecturers, and legal practitioners across Uganda. This document establishes the governance framework, ethical boundaries, and operational guardrails governing all AI features within the platform.

The framework is designed with full cognisance of:
- **Article 126 of the Constitution of Uganda, 1995** — the independence and impartiality of the judiciary
- **Article 28** — the right to a fair hearing
- **Article 44** — non-derogable rights
- **The Data Protection and Privacy Act, 2019** — data subject rights and processing obligations

---

## Scope of AI Deployment

LawHub deploys AI exclusively within **three educational assistance endpoints**:

| Endpoint | Function | AI Role |
|---|---|---|
| `/api/ai/tutor` | Academic Legal Assistant | Explains legal concepts, identifies relevant statutes and case law, suggests IRAC analysis structures |
| `/api/ai/draft` | Legal Drafting Assistant | Generates template legal documents (affidavits, pleadings, agreements) for educational drafting practice |
| `/api/ai/quiz` | Quiz Generator | Produces practice examination questions with statutory explanations |

### Explicit Exclusions

AI is **never** used for:
- Judicial decision-making or sentencing recommendations
- Legal advice to parties in active litigation
- Automatic classification of legal documents for binding effect
- Replacing human review in the submission approval workflow
- User profiling, behavioural scoring, or predictive analytics

---

## Fundamental Principles

### 1. Non-Interference with Judicial Discretion

LawHub AI features are **assistive educational tools** — they do not and cannot:
- Issue binding legal opinions
- Override or influence judicial decisions
- Substitute for the professional judgement of an Advocate of the High Court of Uganda
- Create attorney-client relationships

Every AI response includes a mandatory educational disclaimer:

> *"This response is prepared by LawHub Academic Assistant for educational and research purposes only. It does not constitute legal advice and must not be relied upon as a substitute for professional legal counsel from an Advocate of the High Court of Uganda."*

### 2. Supremacy of Authentic Legal Authority

All AI responses are governed by a hierarchical authority model:

```
1. The Constitution of the Republic of Uganda, 1995 (as amended)
2. Acts of Parliament (e.g., Contracts Act 2010, Penal Code Act Cap 120)
3. Statutory Instruments and Subsidiary Legislation
4. Judgements of the Supreme Court of Uganda
5. Judgements of the Court of Appeal
6. Judgements of the High Court
7. Authoritative academic commentary
```

AI is instructed to prioritise Ugandan legal authorities and never substitute foreign law without explicit comparative context.

### 3. Truthfulness and Citation Integrity

AI is prohibited from fabricating legal citations. The system prompt mandates:

> *"NEVER fabricate or invent legal citations or non-existent statutory sections. If a specific case citation is unavailable, state the legal principle clearly and inform the student to verify on ULII (Uganda Legal Information Institute)."*

---

## Assistive vs. Determinative AI

LawHub draws a clear boundary between **assistive** and **determinative** AI:

| Category | Assistive AI ✅ | Determinative AI ❌ |
|---|---|---|
| **Definition** | Helps users find, understand, and organise legal information | Makes binding decisions or replaces human judgement |
| **LawHub usage** | Explains legal concepts, suggests structures, generates practice questions | Not implemented — no auto-grading, no case outcome prediction |
| **Human oversight** | Every AI output is presented as a suggestion requiring human review | N/A — no automated binding actions |
| **Disclaimer** | Mandatory on every response | N/A |

### Practical Safeguards

1. **No auto-submission:** AI-generated content is never automatically submitted or published
2. **No auto-grading:** Student assignments require lecturer review — AI does not assign grades
3. **No auto-approval:** Document submissions require explicit Administrator action
4. **Copy-paste awareness:** AI-drafted legal documents include prominent disclaimers requiring advocate endorsement before court filing

---

## Judicial AI Bias Assessment

### Identified Bias Risks

| Risk Category | Description | Mitigation |
|---|---|---|
| **Jurisdictional bias** | AI models trained primarily on common law jurisdictions (UK, US) may under-represent Ugandan authorities | System prompts explicitly prioritise Ugandan statutes and case law |
| **Temporal bias** | AI knowledge cutoff may miss recent amendments or judicial decisions | Users are directed to ULII for current authorities; static data includes amendments through 2018 |
| **Gender and cultural bias** | AI language models may reflect societal biases | System prompts require neutral, professional legal language |
| **Confirmation bias** | AI may agree with user premises rather than presenting balanced analysis | Tutor prompt requires presentation of opposing arguments and minority judgments where applicable |
| **Access bias** | AI features require internet connectivity and GEMINI_API_KEY | Core legal database (Constitution, statutes, cases) is available offline via bundled client data |

### Monitoring Protocol

- AI responses are logged server-side for quality assurance review
- The system prompt is version-controlled and subject to academic review
- Temperature parameters are set conservatively (0.3–0.5) to reduce creative hallucination

---

## Citation Verification & Hallucination Mitigation

### Citation Verification Pipeline

```
User Query
    │
    ▼
System Prompt instructs AI to:
    ├── Cite specific Articles (e.g., Art. 2, Art. 21, Art. 28)
    ├── Reference exact statutory sections (e.g., S.14 Contracts Act 2010)
    ├── Name actual Ugandan cases with citations (e.g., [2004] UGSC 1)
    └── If citation unavailable → state principle + direct to ULII
    │
    ▼
AI Response (structured with sections):
    1. Definition
    2. Simple Explanation
    3. Relevant Ugandan Law
    4. Relevant Ugandan Cases & Precedents
    5. Examination Tips (IRAC method)
    6. Revision Quiz Questions
    │
    ▼
Client displays response with disclaimer banner
```

### Hallucination Mitigation Strategies

| Strategy | Implementation |
|---|---|
| **Low temperature** | AI creativity constrained (tutor: 0.5, drafter: 0.3) |
| **Structured output** | System prompts enforce consistent response format |
| **Citation mandate** | AI required to cite specific provisions and cases |
| **Fabrication prohibition** | Explicit instruction not to invent citations |
| **Fallback disclosure** | When unsure, AI must state: "Please verify this on ULII" |
| **Model cascade** | If primary model fails, fallback models provide redundancy, not different answers |
| **Client-side data** | 288 Constitution articles, 32 courses, landmark cases available without AI |

---

## Deterministic Guardrails

### System Prompt Architecture

Each AI endpoint has a **fixed, version-controlled system prompt** that:

1. **Defines the AI's role** — "LawHub Academic Assistant" (not "lawyer" or "judge")
2. **Sets jurisdictional scope** — Ugandan law, with comparative references only as supplement
3. **Mandates response structure** — 6-section format for consistency
4. **Prohibits fabrication** — zero tolerance for invented citations
5. **Requires disclaimers** — educational use only

### Temperature Controls

| Endpoint | Temperature | Rationale |
|---|---|---|
| AI Tutor | 0.5 | Balanced creativity for explanations with factual grounding |
| Legal Drafter | 0.3 | Conservative — formal documents require precision |
| Quiz Generator | 0.5 | Moderate variety for question generation |

### Content Filtering

- All AI responses pass through Gemini API's built-in safety filters
- The system prompt instructs the AI to decline requests outside its legal education scope
- Hate speech, discriminatory content, and politically partisan positions are rejected

---

## Data Privacy & Consent

### Compliance Framework

LawHub processes user data in accordance with:

- **The Data Protection and Privacy Act, 2019 (Act No. 1 of 2019)**
- **The Computer Misuse Act, 2011 (Act No. 2 of 2011)**
- **Article 27 of the Constitution** — right to privacy

### Data Categories

| Category | Data Collected | Storage | Retention |
|---|---|---|---|
| **User identity** | Name, email, role, institution | Server JSON store | Until account deletion |
| **Academic submissions** | Assignment titles, course units, file content | Server JSON store | Academic year + 1 year |
| **AI interactions** | User prompts, AI responses | Not persistently stored | Session only |
| **Browser state** | Active tab, theme preferences | Client localStorage | Until cleared by user |

### Data Subject Rights

Users may exercise the following rights under the DPPA 2019:
- **Access:** Request a copy of their stored data via the Administrator
- **Rectification:** Update profile information via the auth system
- **Erasure:** Request account deletion via the Administrator
- **Restriction:** Request suspension (implemented as `SUSPENDED` status)

### Data Processing Principles

1. **Lawful basis:** Legitimate educational interest and user consent at registration
2. **Purpose limitation:** Data used solely for academic platform operations
3. **Data minimisation:** Only essential fields collected (name, email, role, institution)
4. **Accuracy:** Backend deduplication and role verification on every login
5. **Storage limitation:** No indefinite retention — archival policies to be implemented
6. **Security:** JSON store is server-local; no third-party data sharing except Gemini API queries

### AI Data Pipeline Privacy

- User prompts sent to Google Gemini API are subject to [Google's AI data policies](https://ai.google.dev/gemini-api/terms)
- No personally identifiable information (PII) is included in AI prompts — only the legal query, course context, and role
- AI responses are not stored server-side beyond the HTTP response lifecycle

---

## Model Selection & Fallback Strategy

### Model Cascade Architecture

```
Request → gemini-3.6-flash
            │
            ├── Success → Return response
            │
            ├── Failure (attempt 1) → Wait 1s → Retry
            ├── Failure (attempt 2) → Wait 2s → Retry
            │
            └── All retries exhausted → gemini-flash-latest
                                          │
                                          ├── Success → Return response
                                          │
                                          └── All retries exhausted → gemini-3.1-flash-lite
                                                                        │
                                                                        └── All retries exhausted → 500 Error
```

### Model Selection Criteria

| Criterion | Requirement |
|---|---|
| Legal accuracy | Must handle Ugandan constitutional and statutory references |
| Response structure | Must follow multi-section format when instructed |
| Language quality | Professional legal English suitable for academic use |
| Safety filters | Built-in content safety aligned with educational context |
| Latency | Sub-10 second response for typical queries |
| Availability | 99%+ uptime with cascade fallback |

---

## Transparency & Explainability

### User-Facing Transparency

1. **AI badge:** All AI-generated content is clearly labeled with an AI indicator icon
2. **Disclaimer banner:** Every AI response includes the educational-only disclaimer
3. **Source attribution:** AI responses reference specific statutory provisions and case citations
4. **Model identification:** The platform does not obscure that it uses Google Gemini AI

### Developer Transparency

1. **System prompts** are committed to version control in `server.ts`
2. **Temperature settings** are documented in constants
3. **Fallback behaviour** is logged to console with model and attempt identifiers
4. **API errors** are surfaced to the user with actionable messages

---

## Audit Trail & Accountability

### Current Audit Capabilities

| Event | Logged | Location |
|---|---|---|
| User login/registration | ✅ | Persistent JSON store |
| Document submissions | ✅ | Persistent JSON store with timestamps |
| Admin review actions | ✅ | Persistent JSON store (`reviewedAt`, `reviewedBy`) |
| AI API calls | ⚠️ | Console logs only (not persisted) |
| Role changes | ✅ | Persistent JSON store |
| Account suspensions | ✅ | Persistent JSON store |

### Planned Enhancements

- Structured audit log table with event types, actor IDs, and timestamps
- AI response quality sampling for periodic academic review
- Automated citation cross-reference against ULII database

---

## Ongoing Review & Governance

### Governance Structure

| Role | Responsibility |
|---|---|
| **Chief Legal Administrator** | Approves system prompts, reviews AI output quality |
| **Academic Council** | Sets educational content standards and citation requirements |
| **Engineering Team** | Implements guardrails, monitors model performance |
| **Data Protection Officer** | Ensures DPPA 2019 compliance (to be appointed) |

### Review Schedule

| Activity | Frequency |
|---|---|
| System prompt review | Quarterly |
| AI output quality audit | Monthly |
| Data protection impact assessment | Annually |
| Bias assessment review | Semi-annually |
| User feedback analysis | Monthly |

---

*This governance framework is a living document subject to periodic review and amendment by the LawHub Academic Council and Engineering Team.*
