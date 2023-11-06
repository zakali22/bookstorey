import * as React from "react"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { graphql, Link } from "gatsby"
import BookHero from "../components/BookHero"
import Synopsis from "../components/BookSynopsis"
import CtaSection from "../components/CtaSection"
import RelatedBooks from "../components/RelatedBooks"
import Authors from "../components/Authors"

export const query = graphql`
    query BookQuery($slug: String!) {
        book(slug: { eq: $slug }) {
            id
            title
            categories
            averageRating
            ratingsCount
            slug
            authors {
                slug
                id
                name
            }
            cover {
                childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, width: 300)
                }
            }
        }
    }
`

export default function BookPage({data}){
    const book = data.book
    return (
        <>
        <BookHero book={book}/>
        <Synopsis description={book.description}/>
        <CtaSection />
        <RelatedBooks bookCategory={book.categories[0]}/>
        <Authors authors={book.authors} />
        </>
    )
}