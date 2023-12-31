import React from "react"
import classnames from "classnames"
import Section from "./Section"
import "../styles/hero.scss"
import {useTheme} from "../../../site/src/utils/theme"

export default function HeroLayout({type, layout, center, left, right, backgroundColor, negativeMargin}){
    const {darkMode} = useTheme()

    const renderHero = () => {
        if(type === 'split'){
            return (
                <header className={`hero-split hero-split--${layout}`}>
                    <div className="hero-split__left">
                        {left}
                    </div>
                    <div className="hero-split__right">
                        {right}
                    </div>
                </header>
            )
        } else {
            return (
                <header className={`hero--${layout}`}>
                    {center}
                </header>
            )
        }
    }

    return (
        <Section className={`hero hero--bg-${backgroundColor} hero--${layout}`} negativeMargin={negativeMargin}>
            {renderHero()}
        </Section>
    )
}