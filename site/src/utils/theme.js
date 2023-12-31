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
            console.log(darkMode)
            window.localStorage.setItem("darkMode", !darkMode)
        }
    }

    useEffect(() => {
        if(typeof window !== 'undefined'){
            console.log(window.localStorage.getItem("darkMode") === "true" ? true : false)
            setDarkMode(window.localStorage.getItem("darkMode") === "true" ? true : false)
        }
    }, [])

    return (
        <ThemeContext.Provider value={{darkMode, setDarkMode: saveDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )

}
