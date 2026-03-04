"use client";
/**
 * ThemeProvider
 * Manages light/dark mode site-wide.
 * - Reads preference from localStorage on mount
 * - Applies/removes "dark" class on <html>
 * - Exposes { isDark, toggleTheme } via ThemeContext
 */
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  // On mount: read saved preference
  useEffect(() => {
    const saved = localStorage.getItem("skymaxx-theme");
    const prefersDark =
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("skymaxx-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("skymaxx-theme", "light");
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
