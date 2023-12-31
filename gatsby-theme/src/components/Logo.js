import { Link } from "gatsby"
import React from "react"
import {useTheme} from "../../../site/src/utils/theme"

export default function Logo(){
    const {darkMode} = useTheme()
    
    return (
        <Link to="/" className={`${darkMode ? 'dark-mode': ''}`}>
            Book
            <span>storey</span>
        </Link>
    )
}