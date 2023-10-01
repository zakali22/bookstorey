import React from "react"
import "../styles/cta.scss"

import Button from "./Button"

export default function Cta({image, title, description, button}){
    return (
        <div className="cta">
            <div className="cta__image">
                {image}
            </div>
            <div className="cta__content">
                <h2>{title}</h2>
                <p>{description}</p>
                <Button type="secondary">{button}</Button>
            </div>
        </div>
    )
}