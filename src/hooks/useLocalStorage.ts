// ─────────────────────────────────────────────────────────────
// LawHub Uganda — useLocalStorage Hook
// Typed React hook that synchronizes state with localStorage,
// providing automatic JSON serialization/deserialization.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';

/**
 * A generic hook that persists state to localStorage.
 *
 * @param key    The localStorage key.
 * @param initialValue  The default value when no stored value exists.
 * @returns  A tuple of [value, setValue, removeValue].
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('app_theme', 'dark');
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item) as T;
      }
    } catch {
      // Corrupted or non-JSON value — fall through to default
    }
    return initialValue;
  });

  // Persist to localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // localStorage full or unavailable — silent fail
    }
  }, [key, storedValue]);

  // Setter that matches React's useState signature (value or updater function)
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;
        return nextValue;
      });
    },
    [],
  );

  // Remove the key from localStorage entirely
  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Silent fail
    }
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
