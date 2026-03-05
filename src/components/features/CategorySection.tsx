'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Database, Table, Terminal, Code, BarChart3, PieChart, GitBranch, Users, ExternalLink, Play, BookOpen, GraduationCap, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { useProgressStore } from '@/stores/useProgressStore';
import { calculateCategoryProgress, getSkillCountByDifficulty, cn } from '@/lib/utils';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SkillItem } from './SkillItem';
import type { Category } from '@/types';
import type { ComponentType } from 'react';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Database, Table, Terminal, Code, BarChart3, PieChart, GitBranch, Users,
};

const resourceTypeIcon: Record<string, ComponentType<{ className?: string }>> = {
  video: Play,
  course: GraduationCap,
  article: BookOpen,
  docs: FileText,
};

interface CategorySectionProps {
  category: Category;
}

export function CategorySection({ category }: CategorySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const completedSkills = useProgressStore((s) => s.completedSkills);
  const toggleSkill = useProgressStore((s) => s.toggleSkill);

  const progress = calculateCategoryProgress(category, completedSkills);
  const difficultyCount = getSkillCountByDifficulty(category.skills);
  const Icon = iconMap[category.icon] || Database;

  return (
    <motion.section
      id={category.id}
      ref={ref}
      className="mb-10 scroll-mt-20"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Category header */}
      <div className="flex items-start gap-4 mb-4">
        <div className={cn(
          'w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-lg',
          category.color,
          progress.percentage === 100 && 'ring-2 ring-emerald-500/30 ring-offset-2 ring-offset-[#030712]'
        )}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-1">
            <h2 className="text-lg font-bold text-white tracking-tight">{category.title}</h2>
            <span className={cn(
              'text-xs font-medium shrink-0 px-2 py-0.5 rounded-md',
              progress.percentage === 100
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'text-gray-500'
            )}>
              {progress.completed}/{progress.total}
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-2.5 leading-relaxed">{category.description}</p>
          <div className="flex gap-3 mb-3 text-[10px]">
            {difficultyCount.beginner > 0 && (
              <span className="text-emerald-400/80">{difficultyCount.beginner} iniciante{difficultyCount.beginner > 1 ? 's' : ''}</span>
            )}
            {difficultyCount.intermediate > 0 && (
              <span className="text-yellow-400/80">{difficultyCount.intermediate} intermediario{difficultyCount.intermediate > 1 ? 's' : ''}</span>
            )}
            {difficultyCount.advanced > 0 && (
              <span className="text-rose-400/80">{difficultyCount.advanced} avancado{difficultyCount.advanced > 1 ? 's' : ''}</span>
            )}
          </div>
          <ProgressBar
            percentage={progress.percentage}
            gradientClasses={category.color}
            size="sm"
          />
        </div>
      </div>

      {/* Resource links */}
      {category.resources && category.resources.length > 0 && (
        <div className="mt-3 mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3 h-3" />
            Recursos de Estudo
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {category.resources.map((resource, i) => {
              const ResIcon = resourceTypeIcon[resource.type] || ExternalLink;
              return (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px] text-gray-400 hover:text-white hover:bg-white/[0.07] hover:border-white/15 transition-all duration-200 group"
                >
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center shrink-0 opacity-60 group-hover:opacity-100 transition-opacity`}>
                    <ResIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[11px] leading-tight">{resource.label}</span>
                    <span className="text-[9px] text-gray-600">{resource.provider}</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity shrink-0" />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Skills list */}
      <div role="list" aria-label={`Habilidades de ${category.title}`} className="ml-0 mt-4 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden divide-y divide-white/5">
        {category.skills.map((skill, index) => (
          <SkillItem
            key={skill.id}
            skill={skill}
            checked={completedSkills.includes(skill.id)}
            onToggle={() => toggleSkill(skill.id)}
            gradientClasses={category.color}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
}
