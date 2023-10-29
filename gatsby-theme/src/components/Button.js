import React from "react"
import "../styles/button.scss"

export default function Button({type = 'primary', children, onClick}){
    return (
        <button onClick={onClick} className={`btn ${type === 'primary' && 'btn--primary'} ${type === 'secondary' ? 'btn--secondary' : ''} ${type === 'tertiary' ? 'btn--tertiary' : ''}`}>
            {children}
        </button>
    )
}