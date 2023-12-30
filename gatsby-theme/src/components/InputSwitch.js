import React from "react"
import "../styles/input-switch.scss"
import { useTheme } from "../../../site/src/utils/theme"

export default function InputSwitch({text, color, defaultCheck = false, onChange}){
    const {darkMode} = useTheme()
    const [isChecked, setIsChecked] = React.useState(darkMode)

    function handleCheck(){
        setIsChecked(!isChecked)
        onChange()
    }

    return (
        <label htmlFor="switch" className={`switch ${darkMode ? 'dark-mode': ''}`}>
            {text}
            <input id="switch" name="switch" type="checkbox" defaultChecked={isChecked} checked={isChecked} onChange={handleCheck}/>
            <span className="slider round"></span>
        </label>
    )
}