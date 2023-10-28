import * as React from "react"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

import Section from "../../../gatsby-theme/src/components/Section";
import Card from "../../../gatsby-theme/src/components/Card";

import Carousel from "./Carousel";

export default function RelatedBooks({books}){
    console.log(books)
    return (
        <Section>
            <div className="section__title">
                <h2 className="title">Similar books</h2>
            </div>
            <Carousel layout="grid">
                {
                    books.map(book => (
                        <Card book={book} layout="complex" hasImageDisplacement={false} image={<GatsbyImage image={getImage(book.cover)} width={128} height={192} alt={book.title} layout="fullWidth" />} />
                    ))
                }
            </Carousel>
        </Section>
    )
}