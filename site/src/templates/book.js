import * as React from "react"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

export default function BookPage({pageContext}){
    const {title, id, description, categories, slug, cover, authors} = pageContext
    console.log(pageContext)
    return (
        <div>
            <div>
                {cover !== null ? <GatsbyImage image={getImage(cover)} alt={title} /> : <StaticImage src='../images/no_cover_thumb.png' width={128} height={167} />}
            </div>
            <div>
                <h1>{title}</h1>
                <p>By - {authors.map(author => (<Link to={`/author/${author.slug}`}>{author.name},{' '}</Link>))}</p>

                <Link to='/books'><p>Return to all books</p></Link>
            </div>
            
        </div>
    )
}