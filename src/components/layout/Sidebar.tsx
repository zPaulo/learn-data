'use client';

import { Database, Table, Terminal, Code, BarChart3, PieChart, GitBranch, Users, FolderKanban, Download, Upload } from 'lucide-react';
import { useProgressStore } from '@/stores/useProgressStore';
import { roadmap } from '@/data/roadmap';
import { calculateCategoryProgress } from '@/lib/utils';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { cn } from '@/lib/utils';
import type { ComponentType } from 'react';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Database, Table, Terminal, Code, BarChart3, PieChart, GitBranch, Users, FolderKanban,
};

interface SidebarProps {
  onExportClick: () => void;
}

export function Sidebar({ onExportClick }: SidebarProps) {
  const completedSkills = useProgressStore((s) => s.completedSkills);
  const username = useProgressStore((s) => s.username);

  const scrollToCategory = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside className="hidden lg:flex lg:flex-col lg:fixed lg:w-72 lg:h-screen bg-gray-950/90 backdrop-blur-2xl border-r border-white/[0.06] z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <BarChart3 className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">Trilha Data Analyst</h1>
            <p className="text-[10px] text-gray-500">Do zero ao Junior</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
          Categorias
        </p>
        {roadmap.categories.map((category) => {
          const Icon = iconMap[category.icon] || Database;
          const progress = calculateCategoryProgress(category, completedSkills);
          const isComplete = progress.percentage === 100;

          return (
            <button
              key={category.id}
              onClick={() => scrollToCategory(category.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group cursor-pointer',
                'hover:bg-white/5'
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all',
                isComplete
                  ? `bg-gradient-to-r ${category.color} shadow-lg`
                  : 'bg-white/5 group-hover:bg-white/10'
              )}>
                <Icon className={cn('w-4 h-4', isComplete ? 'text-white' : 'text-gray-400')} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    'text-xs font-medium truncate',
                    isComplete ? 'text-white' : 'text-gray-300'
                  )}>
                    {category.title}
                  </span>
                  <span className={cn(
                    'text-[10px] ml-2 shrink-0 font-medium',
                    isComplete ? 'text-emerald-400' : 'text-gray-500'
                  )}>
                    {progress.completed}/{progress.total}
                  </span>
                </div>
                <ProgressBar
                  percentage={progress.percentage}
                  gradientClasses={category.color}
                  size="sm"
                  className="mt-1.5"
                />
              </div>
            </button>
          );
        })}

        {/* Projects link */}
        <button
          onClick={() => scrollToCategory('projetos')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 hover:bg-white/5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <FolderKanban className="w-4 h-4 text-gray-400" />
          </div>
          <span className="text-xs font-medium text-gray-300">Projetos de Portfólio</span>
        </button>
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/[0.06] space-y-3">
        <button
          onClick={onExportClick}
          className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-gray-400 hover:text-white hover:bg-white/[0.06] rounded-xl transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          Exportar / Importar
        </button>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03]">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-sm">
            <span className="text-[10px] font-bold text-white uppercase">
              {username?.[0] || '?'}
            </span>
          </div>
          <span className="text-xs text-gray-300 truncate font-medium">{username}</span>
        </div>
      </div>
    </aside>
  );
}
