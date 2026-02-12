'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'beginner' | 'intermediate' | 'advanced' | 'default';
  className?: string;
}

const variantClasses = {
  beginner: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  intermediate: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  advanced: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
  default: 'bg-white/10 text-gray-300 border-white/10',
};

const labels: Record<string, string> = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: 'beginner' | 'intermediate' | 'advanced' }) {
  return (
    <Badge variant={difficulty}>
      {labels[difficulty]}
    </Badge>
  );
}
