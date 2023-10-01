import React from "react"
import classnames from "classnames"
import Section from "./Section"
import "../styles/hero.scss"

export default function HeroLayout({type, layout, left, right, backgroundColor}){

    const renderHero = () => {
        if(type === 'split'){
            return (
                <header className={`${type === 'split' && "hero-split"} ${layout === 'landing' && 'hero-split--landing'}`}>
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
        <Section className={`hero hero--bg-${backgroundColor} ${layout === 'landing' && 'hero--landing'}`} negativeMargin>
            {renderHero()}
        </Section>
    )
}