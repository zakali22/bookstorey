import * as React from "react"
import Masonry from 'react-masonry-css'
import Section from "../../../gatsby-theme/src/components/Section"
import "../../../gatsby-theme/src/styles/popular-list.scss"


export default function CategoryList({children}){
    const breakpointColumnsObj = {
        default: 3,
        1200: 2,
        700: 1,
    };

    return (
        <Section>
            <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid" columnClassName="masonry-grid__column">
                {children}
            </Masonry>
        </Section>
    )
}