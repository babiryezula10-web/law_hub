// ─────────────────────────────────────────────────────────────
// LawHub Uganda — Input Validation Utilities
// Email, form field, file type, and security code validation
// helpers used across forms and API submissions.
// ─────────────────────────────────────────────────────────────

import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE_BYTES, FACULTY_LECTURER_CODE } from './constants';

/**
 * Result of a validation check.
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates an email address format.
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || !email.trim()) {
    return { valid: false, error: 'Email address is required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }

  return { valid: true };
}

/**
 * Validates that a required text field is non-empty.
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value || !value.trim()) {
    return { valid: false, error: `${fieldName} is required.` };
  }
  return { valid: true };
}

/**
 * Validates minimum length of a text field.
 */
export function validateMinLength(value: string, minLength: number, fieldName: string): ValidationResult {
  if (!value || value.trim().length < minLength) {
    return { valid: false, error: `${fieldName} must be at least ${minLength} characters.` };
  }
  return { valid: true };
}

/**
 * Validates a file's MIME type against accepted types.
 */
export function validateFileType(fileType: string): ValidationResult {
  if (!fileType) {
    return { valid: false, error: 'File type is not specified.' };
  }

  if (!ACCEPTED_FILE_TYPES.includes(fileType as typeof ACCEPTED_FILE_TYPES[number])) {
    return {
      valid: false,
      error: `Unsupported file type: "${fileType}". Accepted formats: PDF, Word (.docx, .doc), and Plain Text.`,
    };
  }

  return { valid: true };
}

/**
 * Validates a file's size is within the allowed limit.
 */
export function validateFileSize(sizeBytes: number): ValidationResult {
  if (sizeBytes <= 0) {
    return { valid: false, error: 'File appears to be empty.' };
  }

  if (sizeBytes > MAX_FILE_SIZE_BYTES) {
    const maxMB = MAX_FILE_SIZE_BYTES / (1024 * 1024);
    return { valid: false, error: `File exceeds the maximum allowed size of ${maxMB} MB.` };
  }

  return { valid: true };
}

/**
 * Validates the faculty lecturer security code.
 */
export function validateFacultyCode(code: string): ValidationResult {
  if (!code || !code.trim()) {
    return { valid: false, error: 'Faculty Lecturer Code is required for Lecturer registration.' };
  }

  if (code.trim().toUpperCase() !== FACULTY_LECTURER_CODE) {
    return { valid: false, error: 'Invalid Faculty Lecturer Code. Please provide the authorized faculty verification key.' };
  }

  return { valid: true };
}

/**
 * Validates a complete login form.
 */
export function validateLoginForm(fields: { email: string }): ValidationResult {
  const emailCheck = validateEmail(fields.email);
  if (!emailCheck.valid) return emailCheck;

  return { valid: true };
}

/**
 * Validates a complete registration form.
 */
export function validateRegistrationForm(fields: {
  name: string;
  email: string;
  role: string;
  securityCode?: string;
}): ValidationResult {
  const nameCheck = validateRequired(fields.name, 'Full name');
  if (!nameCheck.valid) return nameCheck;

  const emailCheck = validateEmail(fields.email);
  if (!emailCheck.valid) return emailCheck;

  if (fields.role === 'Administrator') {
    return {
      valid: false,
      error: 'Security Policy: Administrator accounts cannot be registered publicly.',
    };
  }

  if (fields.role === 'Lecturer' && fields.securityCode) {
    const codeCheck = validateFacultyCode(fields.securityCode);
    if (!codeCheck.valid) return codeCheck;
  }

  return { valid: true };
}

/**
 * Validates a document submission form.
 */
export function validateSubmissionForm(fields: {
  title: string;
  courseOrUnit: string;
  description: string;
  lecturerName: string;
}): ValidationResult {
  const checks = [
    validateRequired(fields.title, 'Title'),
    validateRequired(fields.courseOrUnit, 'Course/Unit'),
    validateRequired(fields.description, 'Description'),
    validateRequired(fields.lecturerName, 'Lecturer Name'),
  ];

  for (const check of checks) {
    if (!check.valid) return check;
  }

  return { valid: true };
}

/**
 * Sanitizes a string by trimming whitespace and removing
 * potentially dangerous HTML entities.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
