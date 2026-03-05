'use client';

import { useRouter } from 'next/navigation';
import { LogOut, BarChart3 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProgressStore } from '@/stores/useProgressStore';
import { roadmap } from '@/data/roadmap';
import { calculateOverallProgress } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function Header() {
  const router = useRouter();
  const { username, logout } = useAuth();
  const completedSkills = useProgressStore((s) => s.completedSkills);
  const overall = calculateOverallProgress(roadmap, completedSkills);

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-gray-950/70 border-b border-white/[0.06]">
      <div className="flex items-center justify-between px-4 lg:px-8 py-3 max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="lg:hidden w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <BarChart3 className="w-3.5 h-3.5 text-white" />
          </div>
          <h2 className="text-sm font-medium text-gray-300">
            Ola, <span className="font-semibold text-white">{username}</span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Progress pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-700"
                style={{ width: `${overall.percentage}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-gray-200">{overall.percentage}%</span>
          </div>

          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500 hover:text-red-400">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
