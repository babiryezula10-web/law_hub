// ─────────────────────────────────────────────────────────────
// LawHub Uganda — Formatting Utilities
// Date formatting, file sizes, citation display, and
// text truncation helpers used across the application.
// ─────────────────────────────────────────────────────────────

/**
 * Formats an ISO 8601 date string into a human-readable form.
 * @example formatDate('2025-01-15T10:30:00.000Z') → "15 January 2025"
 */
export function formatDate(isoString: string, style: 'long' | 'short' | 'relative' = 'long'): string {
  if (!isoString) return '—';

  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '—';

    if (style === 'relative') {
      return formatRelativeTime(date);
    }

    const options: Intl.DateTimeFormatOptions =
      style === 'short'
        ? { day: 'numeric', month: 'short', year: 'numeric' }
        : { day: 'numeric', month: 'long', year: 'numeric' };

    return date.toLocaleDateString('en-UG', options);
  } catch {
    return '—';
  }
}

/**
 * Returns a relative time string (e.g. "2 hours ago", "3 days ago").
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} ago`;

  return formatDate(date.toISOString(), 'short');
}

/**
 * Formats a file size in bytes to a human-readable string.
 * @example formatFileSize(1536) → "1.5 KB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, exponent);

  return `${value % 1 === 0 ? value : value.toFixed(1)} ${units[exponent]}`;
}

/**
 * Truncates text to a maximum length, appending an ellipsis.
 * @example truncateText('Hello World', 5) → "Hello…"
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text || '';
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Formats a legal citation for consistent display.
 * @example formatCitation('[2004] UGSC 1') → "[2004] UGSC 1"
 */
export function formatCitation(citation: string): string {
  if (!citation) return '—';
  return citation.trim();
}

/**
 * Formats a user role with proper casing.
 */
export function formatRole(role: string): string {
  if (!role) return 'Unknown';
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}

/**
 * Generates a status badge color class based on the status string.
 */
export function getStatusColor(status: string): { bg: string; text: string; border: string } {
  const statusMap: Record<string, { bg: string; text: string; border: string }> = {
    PUBLISHED:          { bg: 'rgba(34,197,94,0.15)',  text: '#22c55e', border: 'rgba(34,197,94,0.3)' },
    APPROVED:           { bg: 'rgba(34,197,94,0.15)',  text: '#22c55e', border: 'rgba(34,197,94,0.3)' },
    GRADED:             { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
    PENDING_REVIEW:     { bg: 'rgba(234,179,8,0.15)',  text: '#eab308', border: 'rgba(234,179,8,0.3)' },
    UNDER_REVIEW:       { bg: 'rgba(234,179,8,0.15)',  text: '#eab308', border: 'rgba(234,179,8,0.3)' },
    DRAFT:              { bg: 'rgba(148,163,184,0.15)', text: '#94a3b8', border: 'rgba(148,163,184,0.3)' },
    CHANGES_REQUESTED:  { bg: 'rgba(249,115,22,0.15)', text: '#f97316', border: 'rgba(249,115,22,0.3)' },
    REJECTED:           { bg: 'rgba(239,68,68,0.15)',  text: '#ef4444', border: 'rgba(239,68,68,0.3)' },
    ARCHIVED:           { bg: 'rgba(107,114,128,0.15)', text: '#6b7280', border: 'rgba(107,114,128,0.3)' },
    ACTIVE:             { bg: 'rgba(34,197,94,0.15)',  text: '#22c55e', border: 'rgba(34,197,94,0.3)' },
    SUSPENDED:          { bg: 'rgba(239,68,68,0.15)',  text: '#ef4444', border: 'rgba(239,68,68,0.3)' },
  };

  return statusMap[status] || { bg: 'rgba(148,163,184,0.1)', text: '#94a3b8', border: 'rgba(148,163,184,0.2)' };
}

/**
 * Capitalizes the first letter of each word.
 * @example titleCase('constitutional law') → "Constitutional Law"
 */
export function titleCase(str: string): string {
  if (!str) return '';
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Generates a short unique ID for client-side use.
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}
