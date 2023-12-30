import React from "react"
import Container from "./Container"
import {useTheme} from "../../../site/src/utils/theme"

export default function Section({children, className, fullwidth = false, noMarginTop, negativeMargin}){
    const {darkMode} = useTheme()

    return (
        <section className={`section ${darkMode ? 'dark-mode': ''} ${className} ${noMarginTop ? 'section--no-margin-top' : ''} ${negativeMargin && !darkMode ? 'section--negative-margin-top' : ''}`}>
            <Container fullwidth={fullwidth}>
                {children}
            </Container>
        </section>
    )
}