'use client';

import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/Checkbox';
import { DifficultyBadge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { Skill } from '@/types';

interface SkillItemProps {
  skill: Skill;
  checked: boolean;
  onToggle: () => void;
  gradientClasses: string;
  index: number;
}

export function SkillItem({ skill, checked, onToggle, gradientClasses, index }: SkillItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
        'hover:bg-white/[0.03] group',
        checked && 'bg-white/[0.02]'
      )}
    >
      <Checkbox
        checked={checked}
        onChange={onToggle}
        gradientClasses={gradientClasses}
      />
      <span
        className={cn(
          'flex-1 text-sm transition-all duration-300',
          checked ? 'text-gray-500 line-through' : 'text-gray-200'
        )}
      >
        {skill.title}
      </span>
      <DifficultyBadge difficulty={skill.difficulty} />
    </motion.div>
  );
}
