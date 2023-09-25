import React from "react"
import {GatsbyImage, StaticImage, getImage} from "gatsby-plugin-image"


export default function ImageWrapper({type, sources}){
    if(type === 'multiple-hero'){
        return (
            <>
                <div>
                    <StaticImage src={sources[0]} width={128} height={167} />
                    <StaticImage src={sources[1]} width={128} height={167} />
                </div>
                <div>
                    <StaticImage src={sources[2]} width={128} height={167} />
                    <StaticImage src={sources[3]} width={128} height={167} />
                </div>
            </>
        )
    }
}