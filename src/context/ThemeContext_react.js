import { Children, createContext, useState } from "react";

// create a context
export const ThemeContext = createContext();

// provider component
export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("light") // default theme

    // toggle theme function
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light"? "dark" : "light"))
    };

    return(
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}    
        </ThemeContext.Provider>
    );
}