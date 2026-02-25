'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useHydration } from '@/hooks/useHydration';
import { LoginForm } from '@/components/features/LoginForm';

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const hydrated = useHydration();

  useEffect(() => {
    if (hydrated && isLoggedIn) {
      router.replace('/dashboard');
    }
  }, [hydrated, isLoggedIn, router]);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <LoginForm onLogin={() => router.replace('/dashboard')} />;
}
