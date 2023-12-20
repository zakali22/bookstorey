import React from "react"
import "../styles/subnav.scss"

export default function SubNav({children}){
    return (
        <nav className="subnav">
            {children}
        </nav>
    )
}