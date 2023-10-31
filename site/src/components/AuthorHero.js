import * as React from "react"
import {Link} from "gatsby"
import {GatsbyImage, StaticImage, getImage} from "gatsby-plugin-image"

import ImageWrapper from "../../../gatsby-theme/src/components/ImageWrapper"
import HeroLayout from "../../../gatsby-theme/src/components/Hero"
import Button from "../../../gatsby-theme/src/components/Button"

export default function AuthorHero({author}){
    // // console.log(author)

    const rightHeroContent = () => {
        return (
            <h1>{author.name}</h1>
        )
    }

    const leftHeroContent = () => {
        return (
            <ImageWrapper type="circle">
                <GatsbyImage image={getImage(author.cover)} alt={author.title} />
            </ImageWrapper>
        )
    }

    if(!author.cover){
        return <HeroLayout type="center" layout="single" center={rightHeroContent()} />
    }

    return (
        <HeroLayout type="split" layout="author" left={leftHeroContent()} right={rightHeroContent()} />
    )
}