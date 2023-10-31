import * as React from "react"
import Section from "../../../gatsby-theme/src/components/Section"
import SynopsisDescription from "../../../gatsby-theme/src/components/SynposisBioDescription"

export default function BookSynopsis({ description }){
    // // console.log(description)
    if(!description?.length) return
    return (
        <Section>
            <div className="section__synopsis">
                <h2>Synopsis</h2>
                <SynopsisDescription description={description} />
            </div>
        </Section>
    )
}