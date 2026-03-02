export type ResourceType = 'video' | 'article' | 'course' | 'docs';

export interface Resource {
  label: string;
  url: string;
  type: ResourceType;
}

export interface Skill {
  id: string;
  title: string;
  description?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  resources?: Resource[];
}

export interface CategoryResource {
  label: string;
  url: string;
  type: 'video' | 'article' | 'course' | 'docs';
  provider: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  skills: Skill[];
  resources?: CategoryResource[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  objective: string;
  skillIds: string[];
  categoryIds: string[];
  deliverables: string[];
  difficulty: 'intermediate' | 'advanced';
  estimatedHours: number;
}

export interface Roadmap {
  categories: Category[];
  projects: PortfolioProject[];
}

export interface UserProfile {
  username: string;
  createdAt: string;
  lastActiveAt: string;
}

export interface UserProgress {
  username: string;
  completedSkills: string[];
  completedProjects: string[];
  lastUpdated: string;
}

export interface ExportData {
  version: 1;
  exportedAt: string;
  profile: UserProfile;
  progress: UserProgress;
}
