// ─────────────────────────────────────────────────────────────
// LawHub Uganda — useAuth Hook
// Manages user authentication state, role synchronization
// with the backend, and profile persistence.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS, DEFAULT_PROFILES } from '../utils/constants';
import { fetchCurrentUser, loginUser, registerUser } from '../services/api';
import type { UserProfile, UserRole } from '../types';
import type { LoginRequest, RegisterRequest } from '../services/api';

const initialNotesList = { length: 3 }; // Default count for new users

function getDefaultProfile(): UserProfile {
  const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.role) return parsed;
    } catch { /* fall through */ }
  }

  return {
    id: DEFAULT_PROFILES.Student.id,
    name: DEFAULT_PROFILES.Student.name,
    email: DEFAULT_PROFILES.Student.email,
    role: 'Student',
    institution: DEFAULT_PROFILES.Student.institution,
    studyStreakDays: 14,
    completedQuizzes: 24,
    savedNotesCount: initialNotesList.length,
    bookmarkedCasesCount: 42,
    joinedDate: 'January 2025',
  };
}

/**
 * Hook that encapsulates LawHub user authentication.
 *
 * Provides:
 * - `user`      — current authenticated profile
 * - `setUser`   — update profile (also persists to localStorage)
 * - `login()`   — authenticate via server
 * - `register()`— register new account via server
 * - `syncRole()`— re-fetch role from backend to prevent client-side spoofing
 * - `switchRole()` — switch to a default profile for a given role (dev convenience)
 * - `logout()`  — clear session
 */
export function useAuth() {
  const [user, setUserState] = useState<UserProfile>(getDefaultProfile);

  // Persist profile on every change
  const setUser = useCallback((updater: UserProfile | ((prev: UserProfile) => UserProfile)) => {
    setUserState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(next));
      return next;
    });
  }, []);

  // Sync user role with backend on mount / email change
  useEffect(() => {
    if (!user.email) return;

    fetchCurrentUser(user.email).then((res) => {
      if (res.data?.user) {
        setUser((prev) => ({
          ...prev,
          name: res.data!.user.name || prev.name,
          role: (res.data!.user.role as UserRole) || prev.role,
          institution: res.data!.user.institution || prev.institution,
        }));
      }
    });
  }, [user.email]);

  const login = useCallback(
    async (payload: LoginRequest) => {
      const res = await loginUser(payload);
      if (res.data?.success && res.data.user) {
        setUser((prev) => ({
          ...prev,
          id: res.data!.user.id,
          name: res.data!.user.name,
          email: res.data!.user.email,
          role: res.data!.user.role as UserRole,
          institution: res.data!.user.institution,
        }));
      }
      return res;
    },
    [setUser],
  );

  const register = useCallback(
    async (payload: RegisterRequest) => {
      const res = await registerUser(payload);
      if (res.data?.success && res.data.user) {
        setUser((prev) => ({
          ...prev,
          id: res.data!.user.id,
          name: res.data!.user.name,
          email: res.data!.user.email,
          role: res.data!.user.role as UserRole,
          institution: res.data!.user.institution,
        }));
      }
      return res;
    },
    [setUser],
  );

  const switchRole = useCallback(
    (role: UserRole) => {
      const profile = DEFAULT_PROFILES[role];
      setUser((prev) => ({
        ...prev,
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role,
        institution: profile.institution,
      }));
    },
    [setUser],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_TAB);
    setUserState(getDefaultProfile());
  }, []);

  return {
    user,
    setUser,
    login,
    register,
    switchRole,
    logout,
  };
}
