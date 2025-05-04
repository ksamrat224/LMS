import React, { createContext, useMemo, useState } from "react";
//contextAPI-for global data management
//ThemeContext-for implementing dark/light mode toggle across the app
//Context Provider-stores and manipulates context data
//Context Consumer-uses context data in components

type Theme = "light" | "dark"; // Define the possible themes
interface ThemeContextValues {
  theme: Theme;
  setTheme: (value: Theme) => void;
}
const ThemeContext = createContext<ThemeContextValues>({
  theme: "light",
  setTheme: () => {}, // Default function to avoid errors
});

const ThemeProvider = ({ children }: { children: React.ReactElement }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };
