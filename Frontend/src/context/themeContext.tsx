import React, { createContext, useState } from "react";
//contextAPI-for global data management
//ThemeContext-for implementing dark/light mode toggle across the app
//Context Provider-stores and manipulates context data
//Context Consumer-uses context data in components
interface ThemeContextValues{
  theme: string;
  setTheme:(value:string)=>void;

}
const ThemeContext = createContext<ThemeContextValues>({
  theme: "light",
  setTheme: () => {}, // Default function to avoid errors
});

const ThemeProvider = ({children}:{children:React.ReactElement}) =>{
    const[theme, setTheme] = useState("light");
    return(
        <ThemeContext.Provider value={{ theme,setTheme }}>
            {children}
        </ThemeContext.Provider>
    );

};
export { ThemeContext, ThemeProvider };