import * as React from "react"
import {graphql, useStaticQuery, Link} from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

import Section from "../../../gatsby-theme/src/components/Section";
import AuthorCard from "../../../gatsby-theme/src/components/AuthorCard";

import Carousel from "./Carousel";

export default function AuthorsCarousel(){
    const data = useStaticQuery(graphql`
        query AuthorQuery {
            allAuthor(filter: {books: {elemMatch: {averageRating: {gte: 4}}}}) {
                nodes {
                    name
                    id
                    slug
                    bio
                    cover {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
            }
        }
    `);

    const allAuthors = data.allAuthor.nodes
    const allAuthorsWithBio = allAuthors.filter(authors => {
        return authors.bio && authors.bio.length > 0 && authors.cover
    })

    console.log(allAuthorsWithBio)

    return (
        <Section>
            <div className="section__title">
                <h2 className="title">Get to know authors</h2>
            </div>
            <Carousel slidesToShow={2}>
                {
                    allAuthorsWithBio.map(author => (
                        <AuthorCard author={author} image={<GatsbyImage image={getImage(author.cover)} width={628} height={1092} alt={author.name}  />}/>
                    ))
                }
            </Carousel>
        </Section>
    )
}