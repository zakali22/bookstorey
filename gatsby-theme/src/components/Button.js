import React from "react"
import "../styles/button.scss"
import {useTheme} from "../../../site/src/utils/theme"

export default function Button({type = 'primary', backgroundColor, children, onClick, buttonType = "button", disabled = false, hasIcon = false}){
    const {darkMode} = useTheme()

    return (
        <button disabled={disabled} type={buttonType} onClick={onClick} className={`btn ${darkMode ? 'dark-mode': ''} ${backgroundColor ? `btn--${backgroundColor}` : ''} ${type === 'primary' && 'btn--primary'} ${type === 'secondary' ? 'btn--secondary' : ''} ${type === 'tertiary' ? 'btn--tertiary' : ''} ${hasIcon ? 'btn--has-icon': ''}`}>
            {children}
        </button>
    )
}