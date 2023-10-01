import * as React from "react"
import Section from "../../../gatsby-theme/src/components/Section"
import Cta from "../../../gatsby-theme/src/components/Cta"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"


export default function CtaSection(){
    return (
        <Section fullwidth>
            <Cta 
                image={<StaticImage src='../images/cta-image.png' layout="constrained" width={1017} height={800} alt="Cta image"/>}
                title="Found books that you love?"
                description="Create an account and save them as your favourite. Read again and again"
                button="Create an account"
            />
        </Section>
    )
}