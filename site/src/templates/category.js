import * as React from "react"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"
import CATEGORIES from "../data/categories.json"

export const query = graphql`
    query AllCategoryBooks($skip: Int!, $limit: Int!, $category: String) {
        allBook(limit: $limit, skip: $skip, filter: {categories: {eq: $category}}) {
            nodes {
                title
                categories
                averageRating
                ratingsCount
                description
                id
                slug
                cover {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                authors {
                    slug
                    name
                }
            }
        }
    }
`

export default function BookPage({data, pageContext, location}){
    const {numPagesPerCat, currentPage, category} = pageContext
    console.log(data)
    const {allBook} = data

    React.useEffect(() => {
        console.log(numPagesPerCat)
    }, [])

    return (
        <div>
            <h1>Browse categories</h1>
            <div>
                {
                    CATEGORIES.data.map((categoryItem) => (
                        <Link to={`/categories/${categoryItem}`}><button>{categoryItem.charAt(0).toUpperCase() + categoryItem.slice(1)}</button></Link>
                    ))
                }
            </div>
            <div>
                {
                    allBook.nodes.map(book => (
                        <Link to={`/books/${book.slug}`} key={book.id}>
                            <div>
                                {book.cover !== null ? <GatsbyImage image={getImage(book.cover)} alt={book.title} /> : <StaticImage src='../images/no_cover_thumb.png' width={128} height={167} />}
                                <h2>{book.title}</h2>
                                {book.authors.map(author => (<p>{author.name},{' '}</p>))}
                            </div>
                        </Link>
                    ))
                }
            </div>

            <div>
                {
                        Array.from({length: numPagesPerCat}).map((_, i) => (
                            <Link key={i + 1} to={i === 0 ? `${location.origin}/categories/${category.toLowerCase()}` : `${i + 1}`}><button>{i + 1}</button></Link>
                        ))

                }
            </div>
        </div>
    )
}