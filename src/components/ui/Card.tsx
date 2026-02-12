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
        'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6',
        hover && 'transition-all duration-300 hover:bg-white/[0.08] hover:border-white/15',
        className
      )}
    >
      {children}
    </div>
  );
}
