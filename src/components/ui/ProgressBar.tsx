'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  percentage: number;
  gradientClasses?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export function ProgressBar({
  percentage,
  gradientClasses = 'from-blue-500 to-cyan-500',
  size = 'md',
  showLabel = false,
  className,
}: ProgressBarProps) {
  return (
    <div className={cn('w-full', className)} role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label={`Progresso: ${percentage}%`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-gray-400">Progresso</span>
          <span className="text-xs font-medium text-gray-300">{percentage}%</span>
        </div>
      )}
      <div className={cn('w-full rounded-full bg-white/10 overflow-hidden relative', sizeClasses[size])}>
        <motion.div
          className={cn('h-full rounded-full bg-gradient-to-r relative overflow-hidden', gradientClasses)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {percentage > 0 && (
            <div className="absolute inset-0 progress-shimmer" />
          )}
        </motion.div>
      </div>
    </div>
  );
}
