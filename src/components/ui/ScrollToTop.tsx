'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={cn(
        'fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-30 w-10 h-10 rounded-xl',
        'bg-white/[0.06] border border-white/[0.08] backdrop-blur-lg',
        'flex items-center justify-center',
        'text-gray-400 hover:text-white hover:bg-white/10',
        'transition-all duration-300 cursor-pointer shadow-lg',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
