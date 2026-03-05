'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  difficultyFilter: DifficultyFilter;
  onDifficultyChange: (filter: DifficultyFilter) => void;
}

const difficultyOptions: { value: DifficultyFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'beginner', label: 'Iniciante' },
  { value: 'intermediate', label: 'Intermediário' },
  { value: 'advanced', label: 'Avançado' },
];

const difficultyColors: Record<DifficultyFilter, string> = {
  all: 'bg-white/10 text-gray-300',
  beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

export function SearchFilter({
  searchQuery,
  onSearchChange,
  difficultyFilter,
  onDifficultyChange,
}: SearchFilterProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-8 space-y-3">
      {/* Search input */}
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-300',
          isFocused
            ? 'bg-white/[0.06] border-blue-500/30 shadow-lg shadow-blue-500/5'
            : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'
        )}
      >
        <Search className={cn('w-4 h-4 shrink-0 transition-colors', isFocused ? 'text-blue-400' : 'text-gray-500')} />
        <input
          type="text"
          placeholder="Buscar habilidades..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="w-6 h-6 flex items-center justify-center rounded-md bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Difficulty filter */}
      <div className="flex gap-1.5 p-1 rounded-xl bg-white/[0.02]">
        {difficultyOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onDifficultyChange(option.value)}
            className={cn(
              'flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer',
              difficultyFilter === option.value
                ? cn(difficultyColors[option.value], 'border')
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export type { DifficultyFilter };
