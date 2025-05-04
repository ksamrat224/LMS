import { createContext } from "react";
//contextAPI-for global data management
//ThemeContext-for implementing dark/light mode toggle across the app
const ThemeContext = createContext({
  theme: "light",
});