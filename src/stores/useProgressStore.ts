'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

let syncTimeout: ReturnType<typeof setTimeout> | null = null;

function debouncedSync(completedSkills: string[], completedProjects: string[]) {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(async () => {
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completedSkills, completedProjects }),
      });
    } catch {
      // Silently fail - localStorage is the offline fallback
    }
  }, 800);
}

function todayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

interface ProgressState {
  username: string | null;
  createdAt: string | null;
  completedSkills: string[];
  completedProjects: string[];
  activityLog: string[];
  isDbMode: boolean;
  isLoading: boolean;

  loginLocal: (username: string) => void;
  loginWithDb: (data: {
    username: string;
    createdAt: string;
    completedSkills: string[];
    completedProjects: string[];
  }) => void;
  logout: () => void;
  toggleSkill: (skillId: string) => void;
  toggleProject: (projectId: string) => void;
  importProgress: (skills: string[], projects: string[]) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      username: null,
      createdAt: null,
      completedSkills: [],
      completedProjects: [],
      activityLog: [],
      isDbMode: false,
      isLoading: false,

      loginLocal: (username: string) => {
        set({
          username,
          createdAt: new Date().toISOString(),
          completedSkills: [],
          completedProjects: [],
          isDbMode: false,
        });
      },

      loginWithDb: (data) => {
        set({
          username: data.username,
          createdAt: data.createdAt,
          completedSkills: data.completedSkills,
          completedProjects: data.completedProjects,
          isDbMode: true,
        });
      },

      logout: () => {
        const { isDbMode } = get();
        if (isDbMode) {
          fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
        }
        set({
          username: null,
          createdAt: null,
          completedSkills: [],
          completedProjects: [],
          activityLog: [],
          isDbMode: false,
        });
      },

      toggleSkill: (skillId: string) => {
        const { completedSkills, completedProjects, activityLog, isDbMode } = get();
        const isCompleted = completedSkills.includes(skillId);
        const newSkills = isCompleted
          ? completedSkills.filter((id) => id !== skillId)
          : [...completedSkills, skillId];
        const today = todayDateString();
        const newLog = activityLog.includes(today) ? activityLog : [...activityLog, today];
        set({ completedSkills: newSkills, activityLog: newLog });
        if (isDbMode) {
          debouncedSync(newSkills, completedProjects);
        }
      },

      toggleProject: (projectId: string) => {
        const { completedProjects, completedSkills, activityLog, isDbMode } = get();
        const isCompleted = completedProjects.includes(projectId);
        const newProjects = isCompleted
          ? completedProjects.filter((id) => id !== projectId)
          : [...completedProjects, projectId];
        const today = todayDateString();
        const newLog = activityLog.includes(today) ? activityLog : [...activityLog, today];
        set({ completedProjects: newProjects, activityLog: newLog });
        if (isDbMode) {
          debouncedSync(completedSkills, newProjects);
        }
      },

      importProgress: (skills: string[], projects: string[]) => {
        const { isDbMode } = get();
        set({
          completedSkills: skills,
          completedProjects: projects,
        });
        if (isDbMode) {
          debouncedSync(skills, projects);
        }
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      reset: () => {
        set({
          completedSkills: [],
          completedProjects: [],
        });
      },
    }),
    {
      name: 'learn-data-progress',
    }
  )
);
