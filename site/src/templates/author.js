import * as React from "react"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import AuthorHero from "../components/AuthorHero"
import Bio from "../components/AuthorBio"
import AuthorBooks from "../components/AuthorBooks"
import CtaSection from "../components/CtaSection"

export default function AuthorPage({pageContext}){
    // console.log(pageContext)
    return (
        <>
            <AuthorHero author={pageContext}/>
            <Bio bio={pageContext.bio}/>
            <AuthorBooks books={pageContext.books} />
            <CtaSection />
        </>
    )
}