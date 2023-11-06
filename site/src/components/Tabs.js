import * as React from "react"
import { Link } from "gatsby"
import queryString from "query-string"
import Section from "../../../gatsby-theme/src/components/Section"
import "../../../gatsby-theme/src/styles/tabs.scss"
import Carousel from "./Carousel"
import Button from "../../../gatsby-theme/src/components/Button";


export default function Tabs({pathname, list}){
    const pathnameCategory = pathname.split("/")
    const pathnameCategoryIndex = pathnameCategory.length > 4 ? pathnameCategory[pathnameCategory.length - 3] : pathnameCategory[pathnameCategory.length - 2]
    
    const categoryIndex = list.findIndex(listItem => listItem === pathnameCategoryIndex)
    return (
        <Section className="tabs-section">
            <Carousel dotsClass="slick-dots" dots={true} slidesToShow={6} tabletSlidesToShow={5} mobileSlidesToShow={2} maxWidth="1200px" categoryIndex={categoryIndex}>
            {
                list.map((categoryItem) => {
                    const categoryItemContent = categoryItem.charAt(0).toUpperCase() + categoryItem.slice(1).replace(/[^\w\s]/gi, ' ')
                    return <Link to={`/categories/${categoryItem}`}><Button type="secondary">{categoryItemContent}</Button></Link>
                })
            }
            </Carousel>
        </Section>
    )
}