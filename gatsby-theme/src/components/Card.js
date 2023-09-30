import React from "react"
import { Link } from "gatsby"
import RatingStar from "./RatingStar"
import "../styles/card.scss"

export default function Card({book, image}){
    return (
        <Link className="card" to={`/book/${book.slug}`}>
            <div className="card__image">
                {image}
            </div>
            <div className="card__content">
                <h3>{book.title}</h3>
                <p>By {book.authors[0].name}</p>
                <div className="card__content-category"><span>{book.categories[0]}</span></div>
                <div className="card__content-ratings">
                    <RatingStar rating={book.averageRating} />
                    <p>{book.ratingsCount} reviews</p>
                </div>
            </div>
        </Link>
    )
}