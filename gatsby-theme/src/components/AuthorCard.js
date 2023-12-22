import React from "react"
import { Link } from "gatsby"
import "../styles/author-card.scss"

export default function AuthorCard({author, image}){
    return (
        <Link className={`author-card`} to={`/author/${author.slug}`}>
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