'use client';

import { useMemo } from 'react';
import { useProgressStore } from '@/stores/useProgressStore';

interface StreakInfo {
  currentStreak: number;
  lastActiveDate: string | null;
  isActiveToday: boolean;
}

function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

function daysBetween(a: string, b: string): number {
  const dateA = new Date(a + 'T00:00:00');
  const dateB = new Date(b + 'T00:00:00');
  return Math.round(Math.abs(dateB.getTime() - dateA.getTime()) / (1000 * 60 * 60 * 24));
}

export function useStreak(): StreakInfo {
  const activityLog = useProgressStore((s) => s.activityLog);

  return useMemo(() => {
    if (!activityLog || activityLog.length === 0) {
      return { currentStreak: 0, lastActiveDate: null, isActiveToday: false };
    }

    const uniqueDays = [...new Set(activityLog)].sort().reverse();
    const today = toDateString(new Date());
    const isActiveToday = uniqueDays[0] === today;

    let streak = 0;
    const startDay = isActiveToday ? today : uniqueDays[0];

    for (let i = 0; i < uniqueDays.length; i++) {
      const expectedDate = new Date(startDay + 'T00:00:00');
      expectedDate.setDate(expectedDate.getDate() - i);
      const expected = toDateString(expectedDate);

      if (uniqueDays[i] === expected) {
        streak++;
      } else {
        break;
      }
    }

    // If the user was not active today but was yesterday, keep the streak
    if (!isActiveToday && uniqueDays[0]) {
      const diffFromToday = daysBetween(today, uniqueDays[0]);
      if (diffFromToday > 1) {
        streak = 0;
      }
    }

    return {
      currentStreak: streak,
      lastActiveDate: uniqueDays[0] || null,
      isActiveToday,
    };
  }, [activityLog]);
}
