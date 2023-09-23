import React from "react";
import {containerWrapper} from "../styles/container.module.scss"

export default function Container({ children }){
    return (
        <div className={containerWrapper}>
            {children}
        </div>
    )
}