'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useHydration } from '@/hooks/useHydration';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { ExportImportModal } from '@/components/features/ExportImportModal';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const hydrated = useHydration();
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    if (hydrated && !isLoggedIn) {
      router.replace('/');
    }
  }, [hydrated, isLoggedIn, router]);

  if (!hydrated || !isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar onExportClick={() => setShowExport(true)} />
      <main className="flex-1 lg:ml-72 min-h-screen pb-20 lg:pb-0">
        <Header />
        <div className="px-4 lg:px-8 py-6 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
      <MobileNav />
      <ScrollToTop />
      <ExportImportModal isOpen={showExport} onClose={() => setShowExport(false)} />
    </div>
  );
}
