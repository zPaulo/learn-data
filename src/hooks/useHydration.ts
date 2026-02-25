'use client';

import { useEffect, useState } from 'react';
import { useProgressStore } from '@/stores/useProgressStore';

export function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubFinishHydration = useProgressStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useProgressStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return () => {
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
}
