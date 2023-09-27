import React from "react"
import "../styles/button.scss"

export default function Button({type = 'primary', children}){
    return (
        <button className={`btn ${type === 'primary' && 'btn--primary'} ${type === 'secondary' ? 'btn--secondary' : ''}`}>
            {children}
        </button>
    )
}