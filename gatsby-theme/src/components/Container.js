import React from "react";
import {containerWrapper} from "../styles/container.module.scss"

export default function Container({ children, className }){
    return (
        <div className={`${containerWrapper} ${className}`}>
            {children}
        </div>
    )
}