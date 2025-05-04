import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
//contextAPI-for global data management
//ThemeContext-for implementing dark/light mode toggle across the app
//Context Provider-stores and manipulates context data
//Context Consumer-uses context data in components

type Theme = "light" | "dark"; // Define the possible themes
interface ThemeContextValues {
  theme: Theme;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextValues>({
  theme: "light",
  toggleTheme: () => {}, // Default function to avoid errors
});

const ThemeProvider = ({ children }: { children: React.ReactElement }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
//custom hook that consumes the ThemeContext and returns the context value
const useTheme = () => {
  const context = useContext(ThemeContext);
   return context;
};
export { useTheme, ThemeProvider };
