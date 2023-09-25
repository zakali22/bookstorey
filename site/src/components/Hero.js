import * as React from "react"

import Section from "../../../gatsby-theme/src/components/Section"
import ImageWrapper from "../../../gatsby-theme/src/components/ImageWrapper"

export default function Hero(){
    return (
        <Section>
            <div>
                <div>
                    <h1>Explore the amazing world of books</h1>
                    <p>Our most popular and trending Bookstorey. Not sure what to read? </p>
                    <button>Explore now</button>
                </div>
            </div>
            <div>
                <ImageWrapper type="multiple-hero" sources={['../images/1984-hero.jpg', '../images/count-of-mount-cristo.jpg', '../images/quiet-on-the-western-front.jpg', '../images/the-eyes-of-darkness-hero.jpg']} />
            </div>
        </Section>
    )
}