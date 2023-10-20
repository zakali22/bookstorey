import * as React from "react"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import BookHero from "../components/BookHero"
import Synopsis from "../components/BookSynopsis"

export default function BookPage({pageContext}){
    console.log(pageContext)
    return (
        <>
        <BookHero book={pageContext}/>
        <Synopsis description={pageContext.description}/>
        </>
    )
}