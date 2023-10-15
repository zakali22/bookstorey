import React from "react";
import "../styles/container.scss"

export default function Container({ children, className, fullwidth = false }){
    return (
        <div className={`container-wrapper ${className} ${fullwidth ? 'fullwidth' : ''}`}>
            {children}
        </div>
    )
}