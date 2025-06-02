import React, { useEffect, useState } from "react";
import type { Theme } from "./ThemeContext";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      updateHtmlClass(storedTheme);
    } else {
      updateHtmlClass("light");
    }
  }, []);

  const updateHtmlClass = (theme: Theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "var(--color-bg-body)";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "var(--color-bg-body)";
    }
  };

  const setNewTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    updateHtmlClass(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    updateHtmlClass(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setNewTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
