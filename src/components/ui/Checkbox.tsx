'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  gradientClasses?: string;
  className?: string;
  'aria-label'?: string;
}

export function Checkbox({
  checked,
  onChange,
  gradientClasses = 'from-blue-500 to-cyan-500',
  className,
  'aria-label': ariaLabel,
}: CheckboxProps) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onChange}
      className={cn(
        'relative w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer',
        checked
          ? `bg-gradient-to-r ${gradientClasses} border-transparent`
          : 'border-white/20 hover:border-white/40 bg-transparent',
        className
      )}
    >
      <motion.svg
        viewBox="0 0 12 10"
        className="w-3 h-3"
        initial={false}
      >
        <motion.path
          d="M1 5L4.5 8.5L11 1.5"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: checked ? 1 : 0,
            opacity: checked ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </motion.svg>
    </button>
  );
}
