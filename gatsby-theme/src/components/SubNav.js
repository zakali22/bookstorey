import React from "react"
import "../styles/subnav.scss"
import {useTheme} from "../../../site/src/utils/theme"

export default function SubNav({children}){
    const {darkMode} = useTheme()

    return (
        <nav className={`subnav ${darkMode ? 'dark-mode': ''}`}>
            {children}
        </nav>
    )
}