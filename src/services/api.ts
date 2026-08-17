// ─────────────────────────────────────────────────────────────
// LawHub Uganda — Centralized API Service
// Typed fetch wrappers for every server endpoint. All network
// calls go through this module for consistency, error handling,
// and future interceptor support.
// ─────────────────────────────────────────────────────────────

import { API } from '../utils/constants';
import type {
  UserProfile,
  UserRole,
  UploadedDocument,
  LecturerSubmission,
  StudentSubmission,
  SystemUser,
  AdminMetrics,
} from '../types';

// ── Generic Response Wrapper ────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

async function request<T>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        data: null,
        error: body?.error || `Request failed with status ${response.status}`,
        status: response.status,
      };
    }

    return { data: body as T, error: null, status: response.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error — please check your connection.';
    return { data: null, error: message, status: 0 };
  }
}

// ── Health ───────────────────────────────────────────────────

export interface HealthResponse {
  status: string;
  timestamp: string;
}

export async function checkHealth(): Promise<ApiResponse<HealthResponse>> {
  return request<HealthResponse>(API.HEALTH);
}

// ── Authentication ──────────────────────────────────────────

export interface LoginRequest {
  email: string;
  name?: string;
  institution?: string;
}

export interface LoginResponse {
  success: boolean;
  user: SystemUser;
  message: string;
}

export async function loginUser(payload: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  return request<LoginResponse>(API.AUTH_LOGIN, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export interface RegisterRequest {
  name: string;
  email: string;
  institution?: string;
  role?: UserRole;
  securityCode?: string;
}

export interface RegisterResponse {
  success: boolean;
  user: SystemUser;
  message: string;
}

export async function registerUser(payload: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
  return request<RegisterResponse>(API.AUTH_REGISTER, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export interface MeResponse {
  user: SystemUser;
}

export async function fetchCurrentUser(email: string): Promise<ApiResponse<MeResponse>> {
  return request<MeResponse>(`${API.AUTH_ME}?email=${encodeURIComponent(email)}`);
}

// ── Documents ───────────────────────────────────────────────

export interface DocumentsResponse {
  documents: UploadedDocument[];
  count: number;
}

export interface FetchDocumentsParams {
  status?: string;
  type?: string;
  category?: string;
  search?: string;
  role?: string;
}

export async function fetchDocuments(params?: FetchDocumentsParams): Promise<ApiResponse<DocumentsResponse>> {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });
  }
  const qs = query.toString();
  return request<DocumentsResponse>(`${API.DOCUMENTS}${qs ? `?${qs}` : ''}`);
}

export async function fetchDocumentById(id: string): Promise<ApiResponse<{ document: UploadedDocument }>> {
  return request<{ document: UploadedDocument }>(`${API.DOCUMENTS}/${id}`);
}

export interface CreateDocumentPayload {
  title: string;
  documentType: string;
  category?: string;
  description: string;
  authorOrInstitution?: string;
  source?: string;
  citation?: string;
  year?: number;
  edition?: string;
  date?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  fileType?: string;
  fileContent?: string;
  tags?: string[];
  status?: string;
}

export async function createDocument(
  payload: CreateDocumentPayload,
  adminEmail: string,
): Promise<ApiResponse<{ success: boolean; document: UploadedDocument; message: string }>> {
  return request(`${API.ADMIN_DOCUMENTS}`, {
    method: 'POST',
    headers: { 'x-user-email': adminEmail },
    body: JSON.stringify(payload),
  });
}

export async function updateDocument(
  id: string,
  payload: Partial<CreateDocumentPayload>,
  adminEmail: string,
): Promise<ApiResponse<{ success: boolean; document: UploadedDocument; message: string }>> {
  return request(`${API.ADMIN_DOCUMENTS}/${id}`, {
    method: 'PUT',
    headers: { 'x-user-email': adminEmail },
    body: JSON.stringify(payload),
  });
}

export async function deleteDocument(
  id: string,
  adminEmail: string,
): Promise<ApiResponse<{ success: boolean; document: UploadedDocument; message: string }>> {
  return request(`${API.ADMIN_DOCUMENTS}/${id}`, {
    method: 'DELETE',
    headers: { 'x-user-email': adminEmail },
  });
}

// ── Lecturer Submissions ────────────────────────────────────

export interface SubmissionsResponse {
  submissions: LecturerSubmission[];
  count: number;
}

export interface FetchSubmissionsParams {
  status?: string;
  email?: string;
  role?: string;
}

export async function fetchSubmissions(params?: FetchSubmissionsParams): Promise<ApiResponse<SubmissionsResponse>> {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });
  }
  const qs = query.toString();
  return request<SubmissionsResponse>(`${API.SUBMISSIONS}${qs ? `?${qs}` : ''}`);
}

export async function createSubmission(
  payload: Partial<LecturerSubmission>,
): Promise<ApiResponse<{ success: boolean; submission: LecturerSubmission; message: string }>> {
  return request(`${API.SUBMISSIONS}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export interface ReviewActionPayload {
  action: 'APPROVE' | 'PUBLISH' | 'REJECT' | 'REQUEST_CHANGES' | 'UNPUBLISH' | 'DELETE';
  feedback?: string;
  reviewerName?: string;
}

export async function reviewSubmission(
  id: string,
  payload: ReviewActionPayload,
): Promise<ApiResponse<{ success: boolean; submission: LecturerSubmission; message: string }>> {
  return request(`${API.SUBMISSIONS}/${id}/review`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// ── Student Assignments ─────────────────────────────────────

export interface StudentSubmissionsResponse {
  studentSubmissions: StudentSubmission[];
  count: number;
}

export interface FetchStudentSubmissionsParams {
  studentEmail?: string;
  lecturerEmail?: string;
  status?: string;
  role?: string;
}

export async function fetchStudentSubmissions(
  params?: FetchStudentSubmissionsParams,
): Promise<ApiResponse<StudentSubmissionsResponse>> {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });
  }
  const qs = query.toString();
  return request<StudentSubmissionsResponse>(`${API.STUDENT_SUBMISSIONS}${qs ? `?${qs}` : ''}`);
}

export async function createStudentSubmission(
  payload: Partial<StudentSubmission>,
): Promise<ApiResponse<{ success: boolean; submission: StudentSubmission; message: string }>> {
  return request(`${API.STUDENT_SUBMISSIONS}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export interface StudentReviewPayload {
  action: 'APPROVE' | 'GRADE' | 'REQUEST_CHANGES' | 'REJECT' | 'DELETE';
  grade?: string;
  feedback?: string;
  reviewerName?: string;
}

export async function reviewStudentSubmission(
  id: string,
  payload: StudentReviewPayload,
): Promise<ApiResponse<{ success: boolean; submission: StudentSubmission; message: string }>> {
  return request(`${API.STUDENT_SUBMISSIONS}/${id}/review`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// ── Constitution ────────────────────────────────────────────

export interface ConstitutionResponse {
  documents: unknown[];
  totalChapters: number;
  totalArticles: number;
  schedulesCount: number;
  amendmentsCount: number;
}

export async function fetchConstitution(): Promise<ApiResponse<ConstitutionResponse>> {
  return request<ConstitutionResponse>(API.CONSTITUTION);
}

// ── Users (Admin) ───────────────────────────────────────────

export interface UsersResponse {
  users: SystemUser[];
  count: number;
}

export async function fetchUsers(
  adminEmail: string,
  params?: { role?: string; status?: string },
): Promise<ApiResponse<UsersResponse>> {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });
  }
  const qs = query.toString();
  return request<UsersResponse>(`${API.USERS}${qs ? `?${qs}` : ''}`, {
    headers: { 'x-user-email': adminEmail },
  });
}

// ── Metrics ─────────────────────────────────────────────────

export async function fetchAdminMetrics(adminEmail: string): Promise<ApiResponse<AdminMetrics>> {
  return request<AdminMetrics>(API.ADMIN_METRICS, {
    headers: { 'x-user-email': adminEmail },
  });
}

export interface LecturerMetrics {
  totalSubmissions: number;
  pendingCount: number;
  approvedCount: number;
  publishedCount: number;
  changesRequestedCount: number;
  rejectedCount: number;
  submissions: LecturerSubmission[];
}

export async function fetchLecturerMetrics(email?: string): Promise<ApiResponse<LecturerMetrics>> {
  const qs = email ? `?email=${encodeURIComponent(email)}` : '';
  return request<LecturerMetrics>(`${API.LECTURER_METRICS}${qs}`);
}

// ── AI Endpoints ────────────────────────────────────────────

export interface AiTutorRequest {
  prompt: string;
  courseContext?: string;
  role?: string;
  history?: unknown[];
}

export interface AiTutorResponse {
  reply: string;
}

export async function askAiTutor(payload: AiTutorRequest): Promise<ApiResponse<AiTutorResponse>> {
  return request<AiTutorResponse>(API.AI_TUTOR, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export interface AiDraftRequest {
  documentType: string;
  details?: string;
  partyNames?: string;
  statutoryRef?: string;
}

export interface AiDraftResponse {
  documentText: string;
}

export async function generateAiDraft(payload: AiDraftRequest): Promise<ApiResponse<AiDraftResponse>> {
  return request<AiDraftResponse>(API.AI_DRAFT, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export interface AiQuizRequest {
  courseTitle: string;
  topic?: string;
  questionCount?: number;
}

export interface AiQuizResponse {
  questions: {
    id: string;
    type: string;
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

export async function generateAiQuiz(payload: AiQuizRequest): Promise<ApiResponse<AiQuizResponse>> {
  return request<AiQuizResponse>(API.AI_QUIZ, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// ── Compatibility Aliases & Convenience Helpers ───────────────

export const getAdminMetrics = (adminEmail?: string) =>
  fetchAdminMetrics(adminEmail || 'admin@lawhub.ug');

export const getSubmissions = (role?: string, email?: string, status?: string) =>
  fetchSubmissions({ role, email, status });

export const getStudentSubmissions = (
  studentEmail?: string,
  role?: string,
  lecturerEmail?: string,
  status?: string,
) => fetchStudentSubmissions({ studentEmail, role, lecturerEmail, status });

export const getDocuments = (category?: string, role?: string) =>
  fetchDocuments({ category, role });

export const getUsers = (role?: string, status?: string) =>
  fetchUsers('admin@lawhub.ug', { role, status });

export async function updateUserRole(
  userId: string,
  newRole: UserRole,
  adminEmail: string = 'admin@lawhub.ug',
): Promise<ApiResponse<{ success: boolean; user: SystemUser }>> {
  return request(`${API.USERS}/${userId}/role`, {
    method: 'PUT',
    headers: { 'x-user-email': adminEmail },
    body: JSON.stringify({ role: newRole }),
  });
}

export async function updateUserStatus(
  userId: string,
  newStatus: 'ACTIVE' | 'SUSPENDED',
  adminEmail: string = 'admin@lawhub.ug',
): Promise<ApiResponse<{ success: boolean; user: SystemUser }>> {
  return request(`${API.USERS}/${userId}/status`, {
    method: 'PUT',
    headers: { 'x-user-email': adminEmail },
    body: JSON.stringify({ status: newStatus }),
  });
}

export async function createUser(
  userData: Partial<SystemUser>,
  adminEmail: string = 'admin@lawhub.ug',
): Promise<ApiResponse<{ success: boolean; user: SystemUser }>> {
  return request(API.USERS, {
    method: 'POST',
    headers: { 'x-user-email': adminEmail },
    body: JSON.stringify(userData),
  });
}

export async function deleteUser(
  userId: string,
  adminEmail: string = 'admin@lawhub.ug',
): Promise<ApiResponse<{ success: boolean; message: string }>> {
  return request(`${API.USERS}/${userId}`, {
    method: 'DELETE',
    headers: { 'x-user-email': adminEmail },
  });
}

export async function uploadAdminDocument(
  payload: CreateDocumentPayload,
  adminEmail: string = 'admin@lawhub.ug',
) {
  return createDocument(payload, adminEmail);
}

export async function updateAdminDocumentStatus(
  docId: string,
  status: 'PUBLISHED' | 'DRAFT',
  adminEmail: string = 'admin@lawhub.ug',
) {
  return updateDocument(docId, { status }, adminEmail);
}

export async function deleteAdminDocument(
  docId: string,
  adminEmail: string = 'admin@lawhub.ug',
) {
  return deleteDocument(docId, adminEmail);
}

export const reviewLecturerSubmission = reviewSubmission;

export async function submitLecturerMaterial(payload: Partial<LecturerSubmission>) {
  return createSubmission(payload);
}

export async function deleteLecturerSubmission(
  id: string,
  adminEmail: string = 'admin@lawhub.ug',
) {
  return reviewSubmission(id, { action: 'DELETE', reviewerName: adminEmail });
}

export async function submitStudentAssignment(payload: Partial<StudentSubmission>) {
  return createStudentSubmission(payload);
}

export async function deleteStudentSubmission(
  id: string,
  reviewerName: string = 'Lecturer Faculty',
) {
  return reviewStudentSubmission(id, { action: 'DELETE', reviewerName });
}

export const getConstitutionDocuments = fetchConstitution;

export const draftLegalDocument = generateAiDraft;

