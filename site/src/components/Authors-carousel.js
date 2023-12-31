import * as React from "react"
import {graphql, useStaticQuery, Link} from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

import Section from "../../../gatsby-theme/src/components/Section";
import AuthorCard from "../../../gatsby-theme/src/components/AuthorCard";

import Carousel from "./Carousel";

export default function AuthorsCarousel(){
    const data = useStaticQuery(graphql`
        query AuthorCarouselQuery {
            allAuthor(filter: {bioData: {ne: null}}) {
                nodes {
                    name
                    id
                    slug
                    bioData
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
    // console.log(allAuthors)
    const allAuthorsWithBio = allAuthors.filter(authors => {
        console.log(authors)
        return authors.bioData && authors.bioData.length > 0 && authors.cover
    })

    if(!allAuthorsWithBio.length) return

    return (
        <Section fullwidth className="section--authors">
            <div className="section__title section__title--with-padding">
                <h2 className="title">Get to know authors</h2>
            </div>
            <Carousel mobileSlidesToShow={1} slidesToShow={2} hasBackground backgroundColor="yellow">
                {
                    allAuthorsWithBio.slice(0, 10).map(author => (
                        <AuthorCard author={author} image={<GatsbyImage image={getImage(author.cover)} width={628} height={1092} alt={author.name}  />}/>
                    ))
                }
            </Carousel>
        </Section>
    )
}