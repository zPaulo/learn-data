import { Category, Roadmap } from '@/types';

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function calculateCategoryProgress(
  category: Category,
  completedSkills: string[]
): { completed: number; total: number; percentage: number } {
  const total = category.skills.length;
  const completed = category.skills.filter((s) => completedSkills.includes(s.id)).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percentage };
}

export function calculateOverallProgress(
  roadmap: Roadmap,
  completedSkills: string[]
): { completed: number; total: number; percentage: number } {
  const total = roadmap.categories.reduce((acc, cat) => acc + cat.skills.length, 0);
  const completed = completedSkills.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percentage };
}

export function getCategoriesCompleted(
  roadmap: Roadmap,
  completedSkills: string[]
): number {
  return roadmap.categories.filter((cat) =>
    cat.skills.every((s) => completedSkills.includes(s.id))
  ).length;
}

export function getDaysSinceStart(createdAt: string): number {
  const start = new Date(createdAt);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export function getSkillCountByDifficulty(
  skills: { difficulty: 'beginner' | 'intermediate' | 'advanced' }[]
): { beginner: number; intermediate: number; advanced: number } {
  return skills.reduce(
    (acc, skill) => {
      acc[skill.difficulty]++;
      return acc;
    },
    { beginner: 0, intermediate: 0, advanced: 0 }
  );
}

export function getProjectReadiness(
  skillIds: string[],
  completedSkills: string[]
): { completed: number; total: number; percentage: number } {
  const total = skillIds.length;
  const completed = skillIds.filter((id) => completedSkills.includes(id)).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percentage };
}
