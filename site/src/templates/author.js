import * as React from "react"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

export default function AuthorPage({pageContext}){
    const {name, id, books} = pageContext
    console.log(pageContext)
    return (
        <div>
            <h1>{name}</h1>
            <h2>Books written</h2>
            {
                books.map(book => (
                    <div>
                        <div>
                            {book.cover !== null ? <GatsbyImage image={getImage(book.cover)} alt={book.title} /> : <StaticImage src='../images/no_cover_thumb.png' width={128} height={167} />}
                        </div>
                        <div>
                            <h1>{book.title}</h1>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}