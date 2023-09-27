import React from "react"
import "../styles/hero-images.scss"

function Image({children}){
    return (
        <div className="hero-image-wrapper__item">
            {children}
        </div>
    )
}

export default function ImageWrapper({type, children}){
    if(type === 'multiple'){
        return (
            <div className="hero-image-wrapper">
                {children.map((child) => (
                    <Image type="ceil">{child}</Image>
                ))}
            </div>
        )
    } else {
        return null
    }
}
