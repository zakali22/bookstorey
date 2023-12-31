import * as React from "react"
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

import Section from "../../../gatsby-theme/src/components/Section";
import Card from "../../../gatsby-theme/src/components/Card";

import Carousel from "./Carousel";


export default function RelatedBooks({bookCategory}){
    const data = useStaticQuery(graphql`
        query RelatedBooksQuery {
            allBook {
                nodes {
                    id
                    title
                    category
                    averageRating
                    ratingsCount
                    slug
                    cover {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
            }
        }
    `)

    const categoryBooks = data.allBook.nodes.filter((book) => book.category === bookCategory)

    return (
        <Section className="section--related-books">
            <div className="section__title">
                <h2 className="title">Similar books</h2>
            </div>
            <Carousel layout="grid">
                {
                    categoryBooks.map(book => (
                        <Card book={book} layout="complex" hasImageDisplacement={false} image={<GatsbyImage image={getImage(book.cover)} width={128} height={192} alt={book.title} layout="fullWidth" />} />
                    ))
                }
            </Carousel>
        </Section>
    )
}