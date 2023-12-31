import * as React from "react"
import Section from "../../../gatsby-theme/src/components/Section"
import Cta from "../../../gatsby-theme/src/components/Cta"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { useAuth } from "../utils/auth"

export default function CtaSection(){
    const { currentUser } = useAuth()

    if(currentUser) return

    return (
        <Section fullwidth>
            <Cta 
                image={<StaticImage src='../images/cta-image.png' layout="constrained" width={1017} height={800} alt="Cta image"/>}
                title="Found books that you love?"
                description="Create an account and save them as your favourite."
                button="Create an account"
                link="/account/signup"
            />
        </Section>
    )
}