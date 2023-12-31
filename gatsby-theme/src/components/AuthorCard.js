import React from "react"
import { Link } from "gatsby"
import "../styles/author-card.scss"
import {useTheme} from "../../../site/src/utils/theme"

export default function AuthorCard({author, image}){
    const {darkMode} = useTheme()

    return (
        <Link className={`author-card ${darkMode ? 'dark-mode': ''}`} to={`/author/${author.slug}`}>
            <div className="author-card__content">
                <h3>
                    <span>Name:</span>
                    {author.name}
                </h3>
                <p>
                    <span>About the author</span>
                    {author.bioData}
                </p>
            </div>
            <div className="author-card__image">
                <div className="author-card__image-wrapper">
                    {image}
                </div>
            </div>
        </Link>
    )
}