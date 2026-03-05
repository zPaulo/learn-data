'use client';

import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-6 shadow-lg shadow-black/20',
        hover && 'transition-all duration-300 hover:bg-white/[0.06] hover:border-white/15 hover:shadow-xl hover:shadow-black/30',
        className
      )}
    >
      {children}
    </div>
  );
}
