import * as React from "react"
import {graphql, useStaticQuery, Link} from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

import Section from "../../../gatsby-theme/src/components/Section";
import Card from "../../../gatsby-theme/src/components/Card";

import Carousel from "./Carousel";

export default function Popular(){
    const data = useStaticQuery(graphql`
        query PopularQuery {
            allBook(
                filter: {averageRating: {gte: 1}, ratingsCount: {gte: 30}}
                sort: {ratingsCount: DESC}
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

    return (
        <Section negativeMargin>
            <div className="section__title">
                <h2 className="title">Popular</h2>
                <Link to="/popular" className="link"><span>See all</span></Link>
            </div>
            <Carousel>
                {
                    allBooks.map(book => (
                        <Card book={book} image={<GatsbyImage image={getImage(book.cover)} width={128} height={192} alt={book.title} layout="fullWidth" />} />
                    ))
                }
            </Carousel>
        </Section>
    )
}