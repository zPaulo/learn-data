'use client';

import { Database, Table, Terminal, Code, BarChart3, PieChart, GitBranch, Users, FolderKanban } from 'lucide-react';
import { useProgressStore } from '@/stores/useProgressStore';
import { roadmap } from '@/data/roadmap';
import { calculateCategoryProgress, cn } from '@/lib/utils';
import type { ComponentType } from 'react';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Database, Table, Terminal, Code, BarChart3, PieChart, GitBranch, Users, FolderKanban,
};

export function MobileNav() {
  const completedSkills = useProgressStore((s) => s.completedSkills);

  const scrollToCategory = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const allItems = [
    ...roadmap.categories.map((cat) => ({
      id: cat.id,
      icon: cat.icon,
      label: cat.title.split(' ')[0],
      color: cat.color,
      progress: calculateCategoryProgress(cat, completedSkills),
    })),
    {
      id: 'projetos',
      icon: 'FolderKanban',
      label: 'Projetos',
      color: 'from-indigo-500 to-blue-500',
      progress: { completed: 0, total: 3, percentage: 0 },
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-gray-950/95 backdrop-blur-2xl border-t border-white/[0.06] safe-area-bottom">
      <div className="flex overflow-x-auto scrollbar-none px-1 py-1.5 gap-0.5">
        {allItems.map((item) => {
          const Icon = iconMap[item.icon] || Database;
          const isComplete = item.progress.percentage === 100;
          const hasProgress = item.progress.percentage > 0 && item.progress.percentage < 100;

          return (
            <button
              key={item.id}
              onClick={() => scrollToCategory(item.id)}
              className="flex flex-col items-center gap-0.5 min-w-[56px] px-1.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              <div className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                isComplete ? `bg-gradient-to-r ${item.color} shadow-md` : 'bg-white/[0.04]'
              )}>
                <Icon className={cn('w-4 h-4', isComplete ? 'text-white' : 'text-gray-500')} />
              </div>
              <span className={cn(
                'text-[8px] truncate max-w-[52px]',
                isComplete ? 'text-gray-300 font-medium' : 'text-gray-600'
              )}>
                {item.label}
              </span>
              {hasProgress && (
                <div className="w-4 h-0.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${item.progress.percentage}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
