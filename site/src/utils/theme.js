import React, {useContext, createContext, useState} from "react"

const ThemeContext = createContext()

export function useTheme(){
    return useContext(ThemeContext)
}

export default function ThemeContextWrapper({children}){
    const [darkMode, setDarkMode] = useState(false)

    return (
        <ThemeContext.Provider value={{darkMode, setDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )

}
