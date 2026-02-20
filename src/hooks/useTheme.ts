import { useState, useEffect, useCallback } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("bqp-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("bqp-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark((d) => !d), []);

  return { isDark, toggleTheme };
}
