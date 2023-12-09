import * as React from "react"
import {graphql, useStaticQuery, Link} from "gatsby"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

import Section from "../../../gatsby-theme/src/components/Section";
import Card from "../../../gatsby-theme/src/components/Card";

import Carousel from "./Carousel";

export default function AuthorBooks({books: allBooks}){

    return (
        <Section>
            <div className="section__title">
                <h2 className="title">Written by author</h2>
            </div>
            <Carousel alignStart={allBooks.length === 1} desktopSlidesToShow={2} tabletSlidesToShow={2}>
                {
                    allBooks.map(book => (
                        <Card book={book} image={<GatsbyImage image={getImage(book.cover)} width={128} height={192} alt={book.title} layout="fullWidth" />} />
                    ))
                }
            </Carousel>
        </Section>
    )
}