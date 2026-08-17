# LawHub Uganda — API Reference

> **Base URL:** `http://localhost:3000`  
> **Content-Type:** `application/json`  
> **Version:** 1.0.0  
> **Last Updated:** August 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Health](#health)
4. [Documents](#documents)
5. [Admin Documents](#admin-documents)
6. [Lecturer Submissions](#lecturer-submissions)
7. [Student Assignments](#student-assignments)
8. [Constitution](#constitution)
9. [User Management](#user-management)
10. [Metrics](#metrics)
11. [AI Endpoints](#ai-endpoints)
12. [Error Codes](#error-codes)

---

## Overview

All endpoints return JSON. Successful responses include the data directly. Error responses follow this schema:

```json
{
  "error": "Human-readable error message"
}
```

### RBAC Headers

Protected endpoints require user identification via one of:
- **Header:** `x-user-email: admin@lawhub.ug`
- **Query:** `?email=admin@lawhub.ug`
- **Body:** `{ "email": "admin@lawhub.ug" }`

---

## Health

### `GET /api/health`

Returns server health status.

**Auth Required:** No

**Response `200`:**
```json
{
  "status": "ok",
  "timestamp": "2026-08-17T18:00:00.000Z"
}
```

---

## Authentication

### `POST /api/auth/login`

Authenticates a user. Creates a new Student account if the email is not registered.

**Auth Required:** No

**Request Body:**
```json
{
  "email": "student@lawhub.ug",       // required
  "name": "Student Scholar",           // optional
  "institution": "Faculty of Law"      // optional
}
```

**Response `200`:**
```json
{
  "success": true,
  "user": {
    "id": "usr_student_1",
    "name": "Student Scholar",
    "email": "student@lawhub.ug",
    "role": "Student",
    "institution": "Faculty of Law",
    "joinedDate": "January 2025",
    "status": "ACTIVE"
  },
  "message": "Logged in successfully."
}
```

**Error `400`:** Email not provided  
**Error `403`:** Account suspended

---

### `POST /api/auth/register`

Registers a new user account. Administrator registration is prohibited.

**Auth Required:** No

**Request Body:**
```json
{
  "name": "Jane Akello",                // required
  "email": "jane.akello@gulu.ac.ug",    // required
  "institution": "Gulu University",      // optional
  "role": "Student",                     // optional: "Student" | "Lecturer"
  "securityCode": "FACULTY-2025"         // required if role = "Lecturer"
}
```

**Response `201`:**
```json
{
  "success": true,
  "user": { ... },
  "message": "Account created successfully."
}
```

**Error `400`:** Missing name or email  
**Error `403`:** Administrator registration attempted, or invalid faculty code  
**Error `409`:** Email already registered

---

### `GET /api/auth/me`

Retrieves the profile for a given email address.

**Auth Required:** No

**Query Parameters:**
| Parameter | Type | Required | Description |
|---|---|---|---|
| `email` | string | Yes | The user's email address |

**Response `200`:**
```json
{
  "user": { ... }
}
```

**Error `400`:** Email not provided  
**Error `404`:** User not found

---

## Documents

### `GET /api/documents`

Lists published legal documents. Administrators see all statuses.

**Auth Required:** No

**Query Parameters:**
| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | string | No | Filter: `PUBLISHED`, `DRAFT`, `ARCHIVED`, or `All` |
| `type` | string | No | Filter: `Constitution`, `Statute`, `Case Law`, etc. |
| `category` | string | No | Filter: `Constitutional Law`, `Property & Land Law`, etc. |
| `search` | string | No | Full-text search across title, description, citation, tags |
| `role` | string | No | Pass `Administrator` to see all statuses |

**Response `200`:**
```json
{
  "documents": [ { ... } ],
  "count": 5
}
```

---

### `GET /api/documents/:id`

Retrieves a single document by ID.

**Response `200`:**
```json
{
  "document": { ... }
}
```

**Error `404`:** Document not found

---

## Admin Documents

### `POST /api/admin/documents`

Creates a new document in the legal library.

**Auth Required:** Administrator

**Request Body:**
```json
{
  "title": "The Contracts Act, 2010",           // required
  "documentType": "Statute",                      // required
  "description": "Codification of contract...",   // required
  "category": "Commercial & Contract Law",        // optional
  "authorOrInstitution": "Parliament of Uganda",  // optional
  "source": "Uganda Gazette",                     // optional
  "citation": "Act 7 of 2010",                    // optional
  "year": 2010,                                   // optional
  "edition": "Official Enactment",                // optional
  "date": "2010-05-14",                           // optional
  "tags": ["Contracts", "Commercial Law"],         // optional
  "status": "DRAFT"                               // optional, default: DRAFT
}
```

**Response `201`:**
```json
{
  "success": true,
  "document": { ... },
  "message": "Document saved successfully."
}
```

**Error `400`:** Missing required fields  
**Error `401`:** Not authenticated  
**Error `403`:** Insufficient role

---

### `PUT /api/admin/documents/:id`

Updates an existing document.

**Auth Required:** Administrator

**Request Body:** Partial document fields to update.

**Response `200`:**
```json
{
  "success": true,
  "document": { ... },
  "message": "Document updated successfully."
}
```

---

### `DELETE /api/admin/documents/:id`

Permanently deletes a document.

**Auth Required:** Administrator

**Response `200`:**
```json
{
  "success": true,
  "document": { ... },
  "message": "Document deleted successfully."
}
```

---

## Lecturer Submissions

### `GET /api/submissions`

Lists lecturer academic material submissions. Lecturers see only their own submissions.

**Query Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `status` | string | Filter by status |
| `email` | string | Lecturer's email |
| `role` | string | `Lecturer` to filter by email, `Administrator` to see all |

**Response `200`:**
```json
{
  "submissions": [ { ... } ],
  "count": 4
}
```

---

### `POST /api/submissions`

Submits new academic material for administrator review.

**Request Body:**
```json
{
  "title": "Constitutional Law I: Separation of Powers",  // required
  "courseOrUnit": "Constitutional Law I",                   // required
  "description": "Lecture notes covering...",               // required
  "lecturerName": "Dr. Apollo Kaggwa",                     // required
  "lecturerEmail": "apollo.kaggwa@lawhub.ug",              // optional
  "institution": "Faculty of Law",                          // optional
  "academicYear": "2024/2025",                              // optional
  "documentType": "Lecture Notes",                          // optional
  "tags": ["Constitutional Law", "Article 1"]               // optional
}
```

**Response `201`:** Submission created with `status: PENDING_REVIEW`

---

### `POST /api/submissions/:id/review`

Administrator reviews a lecturer submission.

**Request Body:**
```json
{
  "action": "APPROVE",                    // APPROVE | PUBLISH | REJECT | REQUEST_CHANGES | UNPUBLISH | DELETE
  "feedback": "Excellent coverage...",    // optional
  "reviewerName": "Chief Legal Admin"     // optional
}
```

When `action` is `APPROVE` or `PUBLISH`, the submission is automatically copied to the public documents repository.

**Response `200`:**
```json
{
  "success": true,
  "submission": { ... },
  "message": "Submission status updated to PUBLISHED."
}
```

---

## Student Assignments

### `GET /api/student-submissions`

Lists student assignment submissions.

**Query Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `studentEmail` | string | Filter by student (when `role=Student`) |
| `lecturerEmail` | string | Filter by lecturer (when `role=Lecturer`) |
| `status` | string | Filter by status |
| `role` | string | Role-based filtering |

---

### `POST /api/student-submissions`

Submits a student assignment.

**Request Body:**
```json
{
  "assignmentTitle": "Constitutional Law Essay",   // required
  "courseOrUnit": "Constitutional Law I",            // required
  "studentName": "Babirye Zula",                    // required
  "studentEmail": "babiryezula10@gmail.com",        // required
  "submissionNotes": "Legal essay evaluating...",   // optional
  "lecturerEmail": "apollo.kaggwa@lawhub.ug",       // optional
  "lecturerName": "Dr. Apollo Kaggwa"                // optional
}
```

---

### `POST /api/student-submissions/:id/review`

Lecturer/Admin reviews a student assignment.

**Request Body:**
```json
{
  "action": "GRADE",                    // APPROVE | GRADE | REQUEST_CHANGES | REJECT | DELETE
  "grade": "88% (A)",                   // optional
  "feedback": "Excellent analysis...",  // optional
  "reviewerName": "Dr. Apollo Kaggwa"   // optional
}
```

---

## Constitution

### `GET /api/constitution`

Returns verified Constitution document metadata and statistics.

**Response `200`:**
```json
{
  "documents": [ { ... } ],
  "totalChapters": 19,
  "totalArticles": 288,
  "schedulesCount": 7,
  "amendmentsCount": 5
}
```

---

### `POST /api/constitution/upload`

Uploads a verified Constitution document.

**Auth Required:** Administrator

---

## User Management

All user management endpoints require **Administrator** role.

### `GET /api/users`

Lists all system users.

**Query Parameters:** `role`, `status` (optional filters)

---

### `POST /api/users`

Creates a new system user.

---

### `PUT /api/users/:id/role`

Updates a user's role.

**Request Body:**
```json
{
  "role": "Lecturer"    // Student | Lecturer | Administrator
}
```

---

### `PUT /api/users/:id/status`

Activates or suspends a user account.

**Request Body:**
```json
{
  "status": "SUSPENDED"    // ACTIVE | SUSPENDED
}
```

---

### `DELETE /api/users/:id`

Permanently deletes a user.

---

## Metrics

### `GET /api/admin/metrics`

Returns comprehensive platform metrics.

**Auth Required:** Administrator

**Response `200`:**
```json
{
  "totalUsers": 2441,
  "totalStudents": 2422,
  "totalLecturers": 20,
  "totalAdministrators": 4,
  "totalLegalResources": 5,
  "totalAcademicResources": 2,
  "totalDocuments": 7,
  "pendingUploads": 2,
  "publishedDocuments": 5,
  "draftDocuments": 0,
  "archivedDocuments": 0,
  "recentlyUploaded": [ ... ],
  "recentlyUpdated": [ ... ],
  "pendingSubmissionsList": [ ... ]
}
```

---

### `GET /api/lecturer/metrics`

Returns submission metrics for a lecturer.

**Query Parameters:** `email` (optional — filters to specific lecturer)

---

## AI Endpoints

### `POST /api/ai/tutor`

Sends a legal research query to the LawHub Academic Assistant.

**Request Body:**
```json
{
  "prompt": "Explain the doctrine of constitutional supremacy under Article 2",  // required
  "courseContext": "Constitutional Law I",    // optional
  "role": "Student",                          // optional
  "history": []                               // optional (reserved for future use)
}
```

**Response `200`:**
```json
{
  "reply": "## Definition\nConstitutional supremacy is the doctrine..."
}
```

**Error `400`:** Prompt not provided  
**Error `500`:** GEMINI_API_KEY not configured or API failure

---

### `POST /api/ai/draft`

Generates a legal document draft.

**Request Body:**
```json
{
  "documentType": "Affidavit in Support of Application",  // required
  "details": "Property dispute in Kampala",                 // optional
  "partyNames": "John Mukasa v. Sarah Nalubwama",           // optional
  "statutoryRef": "Civil Procedure Rules S.I. 71-1"         // optional
}
```

**Response `200`:**
```json
{
  "documentText": "THE REPUBLIC OF UGANDA\nIN THE HIGH COURT OF UGANDA..."
}
```

---

### `POST /api/ai/quiz`

Generates practice examination questions.

**Request Body:**
```json
{
  "courseTitle": "Constitutional Law I",       // required
  "topic": "Fundamental Rights and Freedoms", // optional
  "questionCount": 3                           // optional, default: 3
}
```

**Response `200`:**
```json
{
  "questions": [
    {
      "id": "q1",
      "type": "mcq",
      "question": "Under Article 21 of the 1995 Constitution...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option B",
      "explanation": "Article 21(1) provides that..."
    }
  ]
}
```

---

## Error Codes

| HTTP Status | Meaning | Common Causes |
|---|---|---|
| `200` | Success | Request processed successfully |
| `201` | Created | New resource created successfully |
| `400` | Bad Request | Missing required fields or invalid input |
| `401` | Unauthorized | No valid user identified for protected endpoint |
| `403` | Forbidden | User role insufficient, account suspended, or security policy violation |
| `404` | Not Found | Resource (document, user, submission) does not exist |
| `409` | Conflict | Duplicate resource (e.g., email already registered) |
| `500` | Server Error | Internal error, AI API failure, or missing configuration |

---

*This reference is auto-maintained alongside the server codebase. See [ARCHITECTURE.md](./ARCHITECTURE.md) for system design context.*
