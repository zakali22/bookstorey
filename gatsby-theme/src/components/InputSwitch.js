import React from "react"
import "../styles/input-switch.scss"

export default function InputSwitch({text, color, defaultCheck = false}){
    const [isChecked, setIsChecked] = React.useState(defaultCheck)

    function handleCheck(){
        setIsChecked(!isChecked)
    }

    return (
        <label htmlFor="switch" className="switch">
            {text}
            <input id="switch" name="switch" type="checkbox" defaultChecked={defaultCheck} checked={isChecked} onChange={handleCheck}/>
            <span className="slider round"></span>
        </label>
    )
}