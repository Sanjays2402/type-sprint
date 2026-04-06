import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'ts-test-history';
const MAX_HISTORY = 100;

export function useTestHistory() {
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addResult = useCallback((result) => {
    setHistory(prev => {
      const entry = {
        id: Date.now(),
        wpm: result.wpm,
        accuracy: result.accuracy,
        totalChars: result.totalChars,
        correctChars: result.correctChars,
        wrongChars: result.wrongChars,
        duration: result.duration,
        difficulty: result.difficulty || 'medium',
        textMode: result.textMode || 'words',
        timestamp: result.timestamp || new Date().toISOString(),
        wpmHistory: result.wpmHistory || [],
      };
      const updated = [entry, ...prev].slice(0, MAX_HISTORY);
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getStats = useCallback(() => {
    if (history.length === 0) return null;
    const wpms = history.map(h => h.wpm);
    const accs = history.map(h => h.accuracy);
    return {
      totalTests: history.length,
      avgWpm: Math.round(wpms.reduce((a, b) => a + b, 0) / wpms.length),
      maxWpm: Math.max(...wpms),
      avgAccuracy: Math.round(accs.reduce((a, b) => a + b, 0) / accs.length),
      recentTrend: history.slice(0, 10).map(h => h.wpm),
    };
  }, [history]);

  return { history, addResult, clearHistory, getStats };
}
