'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, CheckCircle2, ListChecks } from 'lucide-react';
import { useProgressStore } from '@/stores/useProgressStore';
import { roadmap } from '@/data/roadmap';
import { getProjectReadiness, cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Badge, DifficultyBadge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { PortfolioProject } from '@/types';

interface ProjectCardProps {
  project: PortfolioProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const completedSkills = useProgressStore((s) => s.completedSkills);
  const completedProjects = useProgressStore((s) => s.completedProjects);
  const toggleProject = useProgressStore((s) => s.toggleProject);

  const readiness = getProjectReadiness(project.skillIds, completedSkills);
  const isProjectDone = completedProjects.includes(project.id);

  // Get skill titles for chips
  const allSkills = roadmap.categories.flatMap((c) => c.skills);
  const projectSkills = project.skillIds.map((id) => {
    const skill = allSkills.find((s) => s.id === id);
    return { id, title: skill?.title || id, completed: completedSkills.includes(id) };
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Card className={cn('overflow-hidden', isProjectDone && 'border-emerald-500/20')}>
        {/* Gradient header */}
        <div className="h-1.5 -mt-6 -mx-6 mb-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-bold text-white">{project.title}</h3>
          <div className="flex items-center gap-2 shrink-0">
            <DifficultyBadge difficulty={project.difficulty} />
            <Badge>
              <Clock className="w-3 h-3 mr-1" />
              {project.estimatedHours}h
            </Badge>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-4 leading-relaxed">{project.description}</p>

        {/* Objective */}
        <div className="mb-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
          <p className="text-xs text-gray-500 mb-1 font-medium">Objetivo</p>
          <p className="text-xs text-gray-300">{project.objective}</p>
        </div>

        {/* Skills readiness */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
              <ListChecks className="w-3.5 h-3.5" />
              Habilidades Necessárias
            </p>
            <span className="text-xs text-gray-500">
              {readiness.completed}/{readiness.total} concluídas
            </span>
          </div>
          <ProgressBar
            percentage={readiness.percentage}
            gradientClasses="from-indigo-500 to-purple-500"
            size="sm"
            className="mb-3"
          />
          <div className="flex flex-wrap gap-1.5">
            {projectSkills.map((skill) => (
              <span
                key={skill.id}
                className={cn(
                  'text-[10px] px-2 py-0.5 rounded-md border transition-all',
                  skill.completed
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-white/5 text-gray-500 border-white/5'
                )}
              >
                {skill.title.length > 30 ? skill.title.slice(0, 30) + '...' : skill.title}
              </span>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-5">
          <p className="text-xs font-medium text-gray-400 mb-2">Entregas</p>
          <ul className="space-y-1.5">
            {project.deliverables.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-gray-600 shrink-0 mt-0.5" />
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* Complete toggle */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <Checkbox
            checked={isProjectDone}
            onChange={() => toggleProject(project.id)}
            gradientClasses="from-emerald-500 to-teal-500"
          />
          <span className={cn(
            'text-sm font-medium transition-all',
            isProjectDone ? 'text-emerald-400' : 'text-gray-300'
          )}>
            {isProjectDone ? 'Projeto concluído!' : 'Marcar projeto como concluído'}
          </span>
        </div>
      </Card>
    </motion.div>
  );
}
