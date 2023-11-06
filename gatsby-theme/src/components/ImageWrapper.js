import React from "react"
import "../styles/hero-images.scss"

function Image({children, type, direction = 'top'}){
    const imageBorders = type === 'ceil' ? (direction === 'left' ? 'image__item--ceil-left' : 'image__item--ceil') : type === 'circle' ? 'image__item-circle' : 'image__item-square' 
    return (
        <div className={`image__item ${imageBorders}`}>
            {children}
        </div>
    )
}

export default function ImageWrapper({multiple, type = 'ceil', children}){
    if(multiple){
        return (
            <div className="hero-images-wrapper">
                {children.map((child) => (
                    <Image type={type}>{child}</Image>
                ))}
            </div>
        )
    } else {
        return (
            <div className="hero-image-wrapper">
                <Image type={type} direction="left">{children}</Image>
            </div> 
        )
    }
}
