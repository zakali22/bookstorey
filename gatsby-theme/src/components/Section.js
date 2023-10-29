import React from "react"
import Container from "./Container"

export default function Section({children, className, fullwidth = false, noMarginTop, negativeMargin}){
    return (
        <section className={`section ${className} ${noMarginTop ? 'section--no-margin-top' : ''} ${negativeMargin ? 'section--negative-margin-top' : ''}`}>
            <Container fullwidth={fullwidth}>
                {children}
            </Container>
        </section>
    )
}