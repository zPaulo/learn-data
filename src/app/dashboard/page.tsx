'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban } from 'lucide-react';
import { roadmap } from '@/data/roadmap';
import { OverallProgress } from '@/components/features/OverallProgress';
import { CategorySection } from '@/components/features/CategorySection';
import { ProjectCard } from '@/components/features/ProjectCard';
import { CompletionCelebration } from '@/components/features/CompletionCelebration';
import { SearchFilter, type DifficultyFilter } from '@/components/features/SearchFilter';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');

  const hasActiveFilter = searchQuery.trim() !== '' || difficultyFilter !== 'all';

  const filteredCategories = useMemo(() => {
    if (!hasActiveFilter) return roadmap.categories;

    const query = searchQuery.toLowerCase().trim();

    return roadmap.categories
      .map((category) => ({
        ...category,
        skills: category.skills.filter((skill) => {
          const matchesSearch = !query || skill.title.toLowerCase().includes(query);
          const matchesDifficulty = difficultyFilter === 'all' || skill.difficulty === difficultyFilter;
          return matchesSearch && matchesDifficulty;
        }),
      }))
      .filter((category) => category.skills.length > 0);
  }, [searchQuery, difficultyFilter, hasActiveFilter]);

  return (
    <div>
      {/* Completion Celebration */}
      <CompletionCelebration />

      {/* Overall Progress */}
      <OverallProgress />

      {/* Search & Filter */}
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        difficultyFilter={difficultyFilter}
        onDifficultyChange={setDifficultyFilter}
      />

      {/* Categories */}
      {filteredCategories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}

      {hasActiveFilter && filteredCategories.length === 0 && (
        <p className="text-center text-sm text-gray-500 py-12">
          Nenhuma habilidade encontrada para essa busca.
        </p>
      )}

      {/* Portfolio Projects */}
      {!hasActiveFilter && (
        <motion.section
          id="projetos"
          className="mt-12 mb-10 scroll-mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg">
              <FolderKanban className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Projetos de Portfólio</h2>
              <p className="text-xs text-gray-400">
                Projetos práticos que envolvem múltiplas habilidades para montar seu portfólio
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {roadmap.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
