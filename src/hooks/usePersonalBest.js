import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ts-personal-bests';

export function usePersonalBest() {
  const [bests, setBests] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bests));
  }, [bests]);

  const checkAndSave = useCallback((duration, wpm, accuracy) => {
    const key = `${duration}s`;
    const current = bests[key];
    const isNewBest = !current || wpm > current.wpm;

    if (isNewBest) {
      setBests(prev => ({
        ...prev,
        [key]: { wpm, accuracy, date: new Date().toISOString() },
      }));
    }

    return isNewBest;
  }, [bests]);

  const getBest = useCallback((duration) => {
    return bests[`${duration}s`] || null;
  }, [bests]);

  return { bests, checkAndSave, getBest };
}
