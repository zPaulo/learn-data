import { Roadmap } from '@/types';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  check: (completedSkills: string[], completedProjects: string[], roadmap: Roadmap) => boolean;
}

export const milestones: Milestone[] = [
  {
    id: 'first-skill',
    title: 'Primeiro Passo',
    description: 'Complete sua primeira habilidade',
    icon: '🎯',
    check: (skills) => skills.length >= 1,
  },
  {
    id: 'ten-skills',
    title: 'Dedicado',
    description: 'Complete 10 habilidades',
    icon: '⭐',
    check: (skills) => skills.length >= 10,
  },
  {
    id: 'twenty-five-skills',
    title: 'Em Progresso',
    description: 'Complete 25 habilidades',
    icon: '🔥',
    check: (skills) => skills.length >= 25,
  },
  {
    id: 'fifty-skills',
    title: 'Imparável',
    description: 'Complete 50 habilidades',
    icon: '💪',
    check: (skills) => skills.length >= 50,
  },
  {
    id: 'all-skills',
    title: 'Mestre dos Dados',
    description: 'Complete todas as 74 habilidades',
    icon: '🏆',
    check: (skills, _projects, roadmap) => {
      const total = roadmap.categories.reduce((acc, cat) => acc + cat.skills.length, 0);
      return skills.length >= total;
    },
  },
  {
    id: 'first-category',
    title: 'Especialista',
    description: 'Complete uma categoria inteira',
    icon: '📚',
    check: (skills, _projects, roadmap) =>
      roadmap.categories.some((cat) => cat.skills.every((s) => skills.includes(s.id))),
  },
  {
    id: 'all-categories',
    title: 'Full Stack de Dados',
    description: 'Complete todas as categorias',
    icon: '🎓',
    check: (skills, _projects, roadmap) =>
      roadmap.categories.every((cat) => cat.skills.every((s) => skills.includes(s.id))),
  },
  {
    id: 'first-project',
    title: 'Builder',
    description: 'Complete seu primeiro projeto de portfólio',
    icon: '🛠️',
    check: (_skills, projects) => projects.length >= 1,
  },
  {
    id: 'all-projects',
    title: 'Portfólio Completo',
    description: 'Complete todos os projetos de portfólio',
    icon: '💼',
    check: (_skills, projects, roadmap) => projects.length >= roadmap.projects.length,
  },
  {
    id: 'sql-master',
    title: 'SQL Master',
    description: 'Complete todas as habilidades de SQL',
    icon: '🗄️',
    check: (skills, _projects, roadmap) => {
      const sqlCat = roadmap.categories.find((c) => c.id === 'sql');
      return sqlCat ? sqlCat.skills.every((s) => skills.includes(s.id)) : false;
    },
  },
  {
    id: 'python-master',
    title: 'Pythonista',
    description: 'Complete todas as habilidades de Python',
    icon: '🐍',
    check: (skills, _projects, roadmap) => {
      const pyCat = roadmap.categories.find((c) => c.id === 'python');
      return pyCat ? pyCat.skills.every((s) => skills.includes(s.id)) : false;
    },
  },
];

export function getUnlockedMilestones(
  completedSkills: string[],
  completedProjects: string[],
  roadmap: Roadmap
): Milestone[] {
  return milestones.filter((m) => m.check(completedSkills, completedProjects, roadmap));
}
