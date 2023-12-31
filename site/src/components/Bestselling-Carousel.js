import * as React from "react"
import {graphql, useStaticQuery, Link} from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

import Section from "../../../gatsby-theme/src/components/Section";
import Card from "../../../gatsby-theme/src/components/Card";

import Carousel from "./Carousel";

export default function Bestselling(){
    const data = useStaticQuery(graphql`
        query BestsellingQuery {
            allBook(
                filter: {ratingsCount: {gte: 4}}
                sort: {averageRating: ASC}
                limit: 10
            ) {
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
    `);

    const allBooks = data.allBook.nodes
    console.log(allBooks.length)

    return (
        <Section className="section--bestselling">
            <div className="section__title">
                <h2 className="title">Bestselling</h2>
            </div>
            <Carousel layout="grid">
                {
                    allBooks.map(book => (
                        <Card book={book} layout="complex" hasImageDisplacement={false} image={<GatsbyImage image={getImage(book.cover)} width={128} height={192} alt={book.title} layout="fullWidth" />} />
                    ))
                }
            </Carousel>
        </Section>
    )
}