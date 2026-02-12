'use client';

import { motion } from 'framer-motion';
import { Target, CheckCircle2, FolderKanban, Calendar } from 'lucide-react';
import { useProgressStore } from '@/stores/useProgressStore';
import { roadmap } from '@/data/roadmap';
import { calculateOverallProgress, getCategoriesCompleted, getDaysSinceStart } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

export function OverallProgress() {
  const completedSkills = useProgressStore((s) => s.completedSkills);
  const completedProjects = useProgressStore((s) => s.completedProjects);
  const createdAt = useProgressStore((s) => s.createdAt);

  const overall = calculateOverallProgress(roadmap, completedSkills);
  const categoriesCompleted = getCategoriesCompleted(roadmap, completedSkills);
  const totalCategories = roadmap.categories.length;
  const days = createdAt ? getDaysSinceStart(createdAt) : 1;

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (overall.percentage / 100) * circumference;

  const stats = [
    {
      label: 'Habilidades',
      value: `${overall.completed} / ${overall.total}`,
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Categorias',
      value: `${categoriesCompleted} / ${totalCategories}`,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: 'Projetos',
      value: `${completedProjects.length} / ${roadmap.projects.length}`,
      icon: FolderKanban,
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/10',
    },
    {
      label: 'Dias',
      value: `${days}`,
      icon: Calendar,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
      {/* Ring chart */}
      <div className="relative shrink-0">
        <svg width="140" height="140" className="-rotate-90">
          <circle
            cx="70"
            cy="70"
            r="54"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="10"
          />
          <motion.circle
            cx="70"
            cy="70"
            r="54"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {overall.percentage}%
          </motion.span>
          <span className="text-[10px] text-gray-500 mt-0.5">completo</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 flex-1 w-full">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] text-gray-500">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
