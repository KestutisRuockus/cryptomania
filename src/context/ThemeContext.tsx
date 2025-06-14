import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setNewTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
