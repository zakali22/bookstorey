import React from "react"
import "../styles/hero-images.scss"

function Image({children, type, direction = 'top'}){
    const imageBorders = type === 'ceil' ? (direction === 'left' ? 'image__item--ceil-left' : 'image__item--ceil-top') : 'image__item-circle' 
    return (
        <div className={`image__item ${imageBorders}`}>
            {children}
        </div>
    )
}

export default function ImageWrapper({type, children}){
    if(type === 'multiple'){
        return (
            <div className="hero-images-wrapper">
                {children.map((child) => (
                    <Image type="ceil">{child}</Image>
                ))}
            </div>
        )
    } else {
        return (
            <div className="hero-image-wrapper">
                <Image type="ceil" direction="left">{children}</Image>
            </div> 
        )
    }
}
