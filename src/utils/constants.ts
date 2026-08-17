// ─────────────────────────────────────────────────────────────
// LawHub Uganda — Application Constants
// Centralizes magic strings, localStorage keys, API paths,
// role definitions, and configuration values.
// ─────────────────────────────────────────────────────────────

// ── API Base Paths ──────────────────────────────────────────

export const API = {
  HEALTH:                '/api/health',
  // Auth
  AUTH_LOGIN:            '/api/auth/login',
  AUTH_REGISTER:         '/api/auth/register',
  AUTH_ME:               '/api/auth/me',
  // Documents
  DOCUMENTS:             '/api/documents',
  ADMIN_DOCUMENTS:       '/api/admin/documents',
  // Lecturer Submissions
  SUBMISSIONS:           '/api/submissions',
  // Student Assignments
  STUDENT_SUBMISSIONS:   '/api/student-submissions',
  // Constitution
  CONSTITUTION:          '/api/constitution',
  CONSTITUTION_UPLOAD:   '/api/constitution/upload',
  // Users (Admin)
  USERS:                 '/api/users',
  // Metrics
  ADMIN_METRICS:         '/api/admin/metrics',
  LECTURER_METRICS:      '/api/lecturer/metrics',
  // AI Endpoints
  AI_TUTOR:              '/api/ai/tutor',
  AI_DRAFT:              '/api/ai/draft',
  AI_QUIZ:               '/api/ai/quiz',
} as const;

// ── User Roles ──────────────────────────────────────────────

export const ROLES = {
  STUDENT:       'Student',
  LECTURER:      'Lecturer',
  ADMINISTRATOR: 'Administrator',
} as const;

export type RoleKey = keyof typeof ROLES;

// ── Submission & Document Statuses ──────────────────────────

export const SUBMISSION_STATUS = {
  PENDING_REVIEW:     'PENDING_REVIEW',
  APPROVED:           'APPROVED',
  PUBLISHED:          'PUBLISHED',
  REJECTED:           'REJECTED',
  CHANGES_REQUESTED:  'CHANGES_REQUESTED',
  ARCHIVED:           'ARCHIVED',
} as const;

export const DOCUMENT_STATUS = {
  DRAFT:     'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED:  'ARCHIVED',
} as const;

export const STUDENT_SUBMISSION_STATUS = {
  PENDING_REVIEW:     'PENDING_REVIEW',
  UNDER_REVIEW:       'UNDER_REVIEW',
  APPROVED:           'APPROVED',
  CHANGES_REQUESTED:  'CHANGES_REQUESTED',
  REJECTED:           'REJECTED',
  GRADED:             'GRADED',
} as const;

// ── localStorage Keys ───────────────────────────────────────

export const STORAGE_KEYS = {
  USER_PROFILE:        'lawhub_student_profile',
  ACTIVE_TAB:          'lawhub_active_tab',
  WATERMARK_THEME:     'lawhub_watermark_theme',
  WATERMARK_OPACITY:   'lawhub_watermark_opacity',
  WATERMARK_AUTOCYCLE: 'lawhub_watermark_autocycle',
} as const;

// ── Default User Profiles (by Role) ─────────────────────────

export const DEFAULT_PROFILES = {
  Student: {
    id: 'usr_student_1',
    name: 'Student Scholar',
    email: 'student@lawhub.ug',
    institution: 'Faculty of Law',
  },
  Lecturer: {
    id: 'usr_lecturer_1',
    name: 'Dr. Apollo Kaggwa',
    email: 'apollo.kaggwa@lawhub.ug',
    institution: 'Faculty of Law',
  },
  Administrator: {
    id: 'usr_admin_1',
    name: 'Chief Legal Administrator',
    email: 'admin@lawhub.ug',
    institution: 'LawHub Academic Directorate',
  },
} as const;

// ── Faculty Security Code ───────────────────────────────────

export const FACULTY_LECTURER_CODE = 'FACULTY-2025';

// ── AI Model Configuration ──────────────────────────────────

export const AI_CONFIG = {
  PRIMARY_MODEL:   'gemini-3.6-flash',
  FALLBACK_MODELS: ['gemini-flash-latest', 'gemini-3.1-flash-lite'],
  TUTOR_TEMPERATURE:   0.5,
  DRAFT_TEMPERATURE:   0.3,
  QUIZ_TEMPERATURE:    0.5,
  MAX_RETRIES_PER_MODEL: 2,
} as const;

// ── Application Metadata ────────────────────────────────────

export const APP_META = {
  NAME:        'LawHub',
  FULL_NAME:   'LawHub Uganda',
  TAGLINE:     'Ugandan Legal Research & Academic Platform',
  VERSION:     '1.0.0',
  COPYRIGHT:   `© ${new Date().getFullYear()} LawHub Uganda. All rights reserved.`,
  INSTITUTION: 'Faculty of Law',
} as const;

// ── Accepted File Types ─────────────────────────────────────

export const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'text/plain',
] as const;

export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB (matches server limit)
