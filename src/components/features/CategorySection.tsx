'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Database, Table, Terminal, Code, BarChart3, PieChart, GitBranch, Users, ExternalLink, Play, BookOpen, GraduationCap, FileText } from 'lucide-react';
import { useProgressStore } from '@/stores/useProgressStore';
import { calculateCategoryProgress, cn } from '@/lib/utils';
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
          'w-10 h-10 rounded-xl bg-gradient-to-r flex items-center justify-center shrink-0 shadow-lg',
          category.color
        )}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-1">
            <h2 className="text-lg font-bold text-white">{category.title}</h2>
            <span className="text-xs text-gray-500 shrink-0">
              {progress.completed}/{progress.total}
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-3">{category.description}</p>
          <ProgressBar
            percentage={progress.percentage}
            gradientClasses={category.color}
            size="sm"
          />
        </div>
      </div>

      {/* Resource links */}
      {category.resources && category.resources.length > 0 && (
        <div className="mt-3 mb-4 flex flex-wrap gap-2">
          {category.resources.map((resource, i) => {
            const ResIcon = resourceTypeIcon[resource.type] || ExternalLink;
            return (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/5 text-[11px] text-gray-400 hover:text-white hover:bg-white/[0.08] hover:border-white/10 transition-all group"
              >
                <ResIcon className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-[200px]">{resource.label}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </a>
            );
          })}
        </div>
      )}

      {/* Skills list */}
      <div className="ml-0 mt-4 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden divide-y divide-white/5">
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
