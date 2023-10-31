import * as React from "react"
import {Link} from "gatsby"
import {GatsbyImage, StaticImage, getImage} from "gatsby-plugin-image"

import ImageWrapper from "../../../gatsby-theme/src/components/ImageWrapper"
import HeroLayout from "../../../gatsby-theme/src/components/Hero"
import Button from "../../../gatsby-theme/src/components/Button"

export default function BookHero({book}){
    // console.log(book)

    const leftHeroContent = () => {
        return (
            <div>
                <h1>{book.title}</h1>
                <p>By
                    {book.authors.map((author) => <Link style={{marginLeft: "7px", textDecoration: "underline", color: "inherit"}} to={`/author/${author.slug}`}>{author.name}</Link>)}
                </p>
                
            </div>
        )
    }

    const rightHeroContent = () => {
        return (
            <ImageWrapper>
                <GatsbyImage image={getImage(book.cover)} alt={book.title} />
            </ImageWrapper>
        )
    }

    return (
        <HeroLayout type="split" layout="book" left={leftHeroContent()} right={rightHeroContent()} />
    )
}