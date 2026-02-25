'use client';

import { useProgressStore } from '@/stores/useProgressStore';
import { useHydration } from '@/hooks/useHydration';

export function useAuth() {
  const username = useProgressStore((s) => s.username);
  const createdAt = useProgressStore((s) => s.createdAt);
  const isDbMode = useProgressStore((s) => s.isDbMode);
  const loginLocal = useProgressStore((s) => s.loginLocal);
  const loginWithDb = useProgressStore((s) => s.loginWithDb);
  const logout = useProgressStore((s) => s.logout);
  const hydrated = useHydration();

  return {
    username,
    createdAt,
    isLoggedIn: !!username,
    isDbMode,
    hydrated,
    loginLocal,
    loginWithDb,
    logout,
  };
}
