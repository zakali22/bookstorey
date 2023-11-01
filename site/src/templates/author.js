import * as React from "react"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"
import AuthorHero from "../components/AuthorHero"
import Bio from "../components/AuthorBio"
import AuthorBooks from "../components/AuthorBooks"
import CtaSection from "../components/CtaSection"

export const query = graphql`
    query AuthorQuery($slug: String!) {
        author(slug: { eq: $slug }) {
            slug
            name
            id
            bio
            cover {
                childImageSharp {
                    gatsbyImageData
                }
            }
            books {
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


export default function AuthorPage({data}){
    const author = data.author
    return (
        <>
            <AuthorHero author={author}/>
            <Bio bio={author.bio}/>
            <AuthorBooks books={author.books} />
            <CtaSection />
        </>
    )
}