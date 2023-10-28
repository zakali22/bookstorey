import React from "react"
import classnames from "classnames"
import Section from "./Section"
import "../styles/hero.scss"

export default function HeroLayout({type, layout, left, right, backgroundColor}){

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
            return null
        }
    }

    return (
        <Section className={`hero hero--bg-${backgroundColor} hero--${layout}`} negativeMargin={layout === 'landing'}>
            {renderHero()}
        </Section>
    )
}