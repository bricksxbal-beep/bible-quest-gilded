import { useState, useCallback, useEffect } from "react";

export interface GameState {
  playerName: string;
  totalXP: number;
  totalScore: number;
  gamesPlayed: number;
  correctAnswers: number;
  totalAnswers: number;
  streak: number;
  lastPlayedDate: string | null;
  bestScore: number;
  categoryStats: Record<string, { correct: number; total: number }>;
  achievements: string[];
  settings: {
    sound: boolean;
    vibration: boolean;
    timer: boolean;
  };
  onboardingComplete: boolean;
}

const DEFAULT_STATE: GameState = {
  playerName: "",
  totalXP: 0,
  totalScore: 0,
  gamesPlayed: 0,
  correctAnswers: 0,
  totalAnswers: 0,
  streak: 0,
  lastPlayedDate: null,
  bestScore: 0,
  categoryStats: {},
  achievements: [],
  settings: { sound: true, vibration: true, timer: false },
  onboardingComplete: false,
};

const STORAGE_KEY = "bqp-game-state";

function loadState(): GameState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...DEFAULT_STATE, ...JSON.parse(saved) };
  } catch {}
  return DEFAULT_STATE;
}

export function useGameState() {
  const [state, setState] = useState<GameState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = useCallback((partial: Partial<GameState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  const addXP = useCallback((xp: number) => {
    setState((prev) => ({ ...prev, totalXP: prev.totalXP + xp }));
  }, []);

  const addScore = useCallback((score: number) => {
    setState((prev) => ({
      ...prev,
      totalScore: prev.totalScore + score,
      bestScore: Math.max(prev.bestScore, score),
    }));
  }, []);

  const recordAnswer = useCallback((category: string, correct: boolean) => {
    setState((prev) => {
      const catStats = { ...prev.categoryStats };
      if (!catStats[category]) catStats[category] = { correct: 0, total: 0 };
      catStats[category] = {
        correct: catStats[category].correct + (correct ? 1 : 0),
        total: catStats[category].total + 1,
      };
      return {
        ...prev,
        correctAnswers: prev.correctAnswers + (correct ? 1 : 0),
        totalAnswers: prev.totalAnswers + 1,
        categoryStats: catStats,
      };
    });
  }, []);

  const updateStreak = useCallback(() => {
    setState((prev) => {
      const today = new Date().toDateString();
      if (prev.lastPlayedDate === today) return prev;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = prev.lastPlayedDate === yesterday ? prev.streak + 1 : 1;
      return { ...prev, streak: newStreak, lastPlayedDate: today };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setState({ ...DEFAULT_STATE, onboardingComplete: true });
  }, []);

  const getLevel = useCallback(() => {
    const xp = state.totalXP;
    if (xp >= 10000) return { level: 8, name: "sage" as const };
    if (xp >= 5000) return { level: 7, name: "patriarch" as const };
    if (xp >= 3000) return { level: 6, name: "prophet" as const };
    if (xp >= 1500) return { level: 5, name: "apostle" as const };
    if (xp >= 800) return { level: 4, name: "elder" as const };
    if (xp >= 400) return { level: 3, name: "deacon" as const };
    if (xp >= 150) return { level: 2, name: "disciple" as const };
    return { level: 1, name: "beginner" as const };
  }, [state.totalXP]);

  return {
    state,
    updateState,
    addXP,
    addScore,
    recordAnswer,
    updateStreak,
    resetProgress,
    getLevel,
  };
}
