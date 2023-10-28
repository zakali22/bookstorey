import * as React from "react"
import HeroLayout from "../../../gatsby-theme/src/components/Hero"

export default function SingleHero({children}){

    const heroContent = () => {
        return (
            <h1>{children}</h1>
        )
    }
    return (
        <HeroLayout type="center" layout="single" center={heroContent()} backgroundColor="yellow" negativeMargin />
    )
}