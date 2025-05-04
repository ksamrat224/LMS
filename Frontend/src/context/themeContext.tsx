import { createContext, useState } from "react";
//contextAPI-for global data management
//ThemeContext-for implementing dark/light mode toggle across the app
//Context Provider-stores and manipulates context data
//Context Consumer-uses context data in components
const ThemeContext = createContext({
  theme: "light",
});

const ThemeProvider = ({children}) =>{
    const[theme, setTheme] = useState("light");
    return(
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    );

};
export { ThemeContext, ThemeProvider };