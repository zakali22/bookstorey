import * as React from "react"
import Section from "../../../gatsby-theme/src/components/Section"
import SynopsisDescription from "../../../gatsby-theme/src/components/SynposisBioDescription"

export default function AuthorBio({ bio }){
    if(!bio?.length) return
    return (
        <Section>
            <div className="section__synopsis">
                <h2>Bio</h2>
                <SynopsisDescription description={bio} />
            </div>
        </Section>
    )
}