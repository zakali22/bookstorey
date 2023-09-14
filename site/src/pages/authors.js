import * as React from "react"
import {useStaticQuery, graphql, Link} from "gatsby"
import {GatsbyImage, StaticImage, getImage} from "gatsby-plugin-image"

export default function Allauthors(){
    const data = useStaticQuery(graphql`
        query AllAuthors {
            allAuthor(limit: 20) {
                nodes {
                    slug
                    name
                    id
                }
            }
        }
    `)

    const {allAuthor} = data

    return (
        <>
            {
                allAuthor.nodes.map(author => (
                    <Link to={`/author/${author.slug}`} key={author.id}>
                        <div>
                            <h2>{author.name}</h2>
                        </div>
                    </Link>
                ))
            }
        </>
    )

}