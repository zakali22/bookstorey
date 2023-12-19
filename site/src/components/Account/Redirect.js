import * as React from "react"
import Section from "../../../../gatsby-theme/src/components/Section";

export default function Redirect({toText}){
    return (
        <Section>
            <h2>Redirecting to the {toText} page.....</h2>
        </Section>
    )
}