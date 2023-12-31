import React from "react"
import { Link } from "gatsby"
import RatingStar from "./RatingStar"
import "../styles/card.scss"
import {useTheme} from "../../../site/src/utils/theme"

export default function Card({book, image, hasImageDisplacement = true, layout = 'simple', roundedCorners = true}){
    const {darkMode} = useTheme()

    return (
        <Link className={`card ${darkMode ? 'dark-mode': ''} ${!hasImageDisplacement ? 'card--no-displacement' : ''} ${layout === 'complex' ? 'card--complex' : ''} ${roundedCorners ? 'card--with-rounded-corners' : ''}`} to={`/books/${book.slug}`}>
            <div className="card__image">
                {image}
            </div>
            <div className="card__content">
                <h3>{book.title}</h3>
                {book.authors && book.authors.length > 0 && <p>By {book.authors[0].name}</p>}
                <div className="card__content-category"><span>{book.category}</span></div>
                <div className="card__content-ratings">
                    <RatingStar rating={book.averageRating} />
                    <p>{book.ratingsCount} reviews</p>
                </div>
            </div>
        </Link>
    )
}