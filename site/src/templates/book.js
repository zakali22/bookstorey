import * as React from "react"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { graphql, Link } from "gatsby"
import BookHero from "../components/BookHero"
import Synopsis from "../components/BookSynopsis"
import CtaSection from "../components/CtaSection"
import RelatedBooks from "../components/RelatedBooks"
import Authors from "../components/Authors"

export const query = graphql`
    query BookQuery($category: String) {
        allBook(filter: {categories: {eq: $category}}) {
            nodes {
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
                        gatsbyImageData
                    }
                }
            }
        }
    }
`

export default function BookPage({data, pageContext}){
    // console.log(pageContext)
    return (
        <>
        <BookHero book={pageContext}/>
        <Synopsis description={pageContext.description}/>
        <CtaSection />
        <RelatedBooks books={data.allBook.nodes}/>
        <Authors authors={pageContext.authors} />
        </>
    )
}