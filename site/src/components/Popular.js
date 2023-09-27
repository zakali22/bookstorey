import * as React from "react"
import {graphql, useStaticQuery, Link} from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

import Section from "../../../gatsby-theme/src/components/Section";
import Card from "../../../gatsby-theme/src/components/Card";

import Carousel from "./Carousel";

export default function Popular(){
    const data = useStaticQuery(graphql`
        query MyQuery {
            allBook(
                limit: 5,
                filter: {averageRating: {gte: 1}, ratingsCount: {gte: 30}}
                sort: {averageRating: DESC}
            ) {
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
    `);

    const allBooks = data.allBook.nodes
    console.log(allBooks)

    return (
        <Section>
            <h2>Popular</h2>
            <Carousel>
                {
                    allBooks.map(book => (
                        <Card book={book} image={<GatsbyImage image={getImage(book.cover)} alt={book.title} layout="fullWidth" />} />
                    ))
                }
            </Carousel>
        </Section>
    )
}