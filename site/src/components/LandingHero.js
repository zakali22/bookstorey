import * as React from "react"
import {GatsbyImage, StaticImage, getImage} from "gatsby-plugin-image"

import ImageWrapper from "../../../gatsby-theme/src/components/ImageWrapper"
import HeroLayout from "../../../gatsby-theme/src/components/Hero"
import Button from "../../../gatsby-theme/src/components/Button"

export default function LandingHero(){

    const leftHeroContent = () => {
        return (
            <div>
                <h1>Explore the amazing world of books</h1>
                <p>Our most popular and trending Bookstorey. Not sure what to read? </p>
                <Button>Explore now</Button>
            </div>
        )
    }

    const rightHeroContent = () => {
        return (
            <ImageWrapper multiple>
                <StaticImage src='../images/1984-hero.jpg' layout="constrained" width={317} height={500} alt="Hero image"/>
                <StaticImage src='../images/count-of-mount-cristo.jpg' layout="constrained" width={317} height={500} alt="Hero image"/>
                <StaticImage src='../images/quiet-on-the-western-front.jpg' layout="constrained" width={317} height={500} alt="Hero image"/>
                <StaticImage src='../images/the-eyes-of-darkness-hero.jpg'layout="constrained"  width={317} height={500} alt="Hero image"/>
            </ImageWrapper>
        )
    }

    return (
        <HeroLayout type="split" layout="landing" left={leftHeroContent()} right={rightHeroContent()} backgroundColor="yellow" negativeMargin />
    )
}