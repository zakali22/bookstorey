import React from "react"
import Container from "./Container"

export default function Section({children, className}){
    return (
        <section className={className}>
            <Container>
                {children}
            </Container>
        </section>
    )
}