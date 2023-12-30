import React from "react";
import "../styles/container.scss"
import {useTheme} from "../../../site/src/utils/theme"

export default function Container({ children, className, fullwidth = false }){
    const {darkMode} = useTheme()

    return (
        <div className={`container-wrapper ${className} ${fullwidth ? 'fullwidth' : ''} ${darkMode ? 'dark-mode': ''}`}>
            {children}
        </div>
    )
}