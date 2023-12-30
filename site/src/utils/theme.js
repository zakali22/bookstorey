import React, {useContext, createContext, useState, useEffect} from "react"

const ThemeContext = createContext()

export function useTheme(){
    return useContext(ThemeContext)
}

export default function ThemeContextWrapper({children}){
    const [darkMode, setDarkMode] = useState(false)

    function saveDarkMode(){
        setDarkMode(!darkMode)
        if(typeof window !== 'undefined'){
            window.localStorage.setItem("darkMode", true)
        }
    }

    useEffect(() => {
        if(typeof window !== 'undefined'){
            setDarkMode(window.localStorage.getItem("darkMode"))
        }
    }, [])

    return (
        <ThemeContext.Provider value={{darkMode, setDarkMode: saveDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )

}
