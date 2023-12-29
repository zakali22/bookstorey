import * as React from "react"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { graphql, Link } from "gatsby"
import BookHero from "../components/BookHero"
import Synopsis from "../components/BookSynopsis"
import CtaSection from "../components/CtaSection"
import RelatedBooks from "../components/RelatedBooks"
import Authors from "../components/Authors"
import AddToFavourites from "../components/AddToFavourites"

export const query = graphql`
    query BookQuery($slug: String!) {
        book(slug: { eq: $slug }) {
            id
            title
            category
            averageRating
            ratingsCount
            description
            slug
            authors {
                id
                name
                slug
            }
            cover {
                childImageSharp {
                    gatsbyImageData
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
        <AddToFavourites bookId={book.id} title={book.title}/>
        <Synopsis description={book.description}/>
        <CtaSection />
        <RelatedBooks bookCategory={book.category}/>
        <Authors authors={book.authors} />
        </>
    )
}