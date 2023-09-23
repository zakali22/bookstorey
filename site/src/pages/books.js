import * as React from "react"
import {useStaticQuery, graphql, Link} from "gatsby"
import {GatsbyImage, StaticImage, getImage} from "gatsby-plugin-image"
import Container from "../../../gatsby-theme/src/components/Container"

export default function AllBooks(){
    const data = useStaticQuery(graphql`
        query AllBooks {
            allBook(limit: 20) {
                nodes {
                    title
                    id
                    description
                    categories
                    slug
                    authors {
                        slug
                        id
                        name
                    }
                    cover {
                        childImageSharp { gatsbyImageData }
                    }
                }
            }
        }
    `)

    const {allBook} = data

    return (
        <section>
            <Container>
            {
                allBook.nodes.map(book => (
                    <Link to={`/books/${book.slug}`} key={book.id}>
                        <div>
                            {book.cover !== null ? <GatsbyImage image={getImage(book.cover)} alt={book.title} /> : <StaticImage src='../images/no_cover_thumb.png' width={128} height={167} />}
                            <h2>{book.title}</h2>
                            <p>{book.description}</p>
                            {book.categories.map(category => (<p>{category}</p>))}
                            {book.authors.map(author => (<p>{author.name},{' '}</p>))}
                        </div>
                    </Link>
                ))
            }
            </Container>
        </section>
    )

}