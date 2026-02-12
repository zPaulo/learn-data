'use client';

import { useProgressStore } from '@/stores/useProgressStore';

export function useAuth() {
  const username = useProgressStore((s) => s.username);
  const createdAt = useProgressStore((s) => s.createdAt);
  const isDbMode = useProgressStore((s) => s.isDbMode);
  const loginLocal = useProgressStore((s) => s.loginLocal);
  const loginWithDb = useProgressStore((s) => s.loginWithDb);
  const logout = useProgressStore((s) => s.logout);

  return {
    username,
    createdAt,
    isLoggedIn: !!username,
    isDbMode,
    loginLocal,
    loginWithDb,
    logout,
  };
}
