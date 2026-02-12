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
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-gray-950/95 backdrop-blur-xl border-t border-white/5">
      <div className="flex overflow-x-auto scrollbar-none px-2 py-2 gap-1">
        {allItems.map((item) => {
          const Icon = iconMap[item.icon] || Database;
          const isComplete = item.progress.percentage === 100;

          return (
            <button
              key={item.id}
              onClick={() => scrollToCategory(item.id)}
              className="flex flex-col items-center gap-1 min-w-[60px] px-2 py-1.5 rounded-xl transition-all hover:bg-white/5 cursor-pointer"
            >
              <div className="relative">
                <Icon className={cn('w-4 h-4', isComplete ? 'text-green-400' : 'text-gray-400')} />
                {item.progress.percentage > 0 && item.progress.percentage < 100 && (
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
                {isComplete && (
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-green-400" />
                )}
              </div>
              <span className="text-[9px] text-gray-500 truncate max-w-[56px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
