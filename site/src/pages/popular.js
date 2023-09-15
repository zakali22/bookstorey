import * as React from "react"
import {graphql, useStaticQuery, Link} from "gatsby"
import {GatsbyImage, StaticImage, getImage} from "gatsby-plugin-image"

export default function PopularPage(){
    const data = useStaticQuery(graphql`
        query PopularBooks {
            allBook {
                nodes {
                    id
                    title
                    categories
                    averageRating
                    ratingsCount
                    authors {
                        slug
                        id
                        name
                    }
                    cover {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
            }
        }
    `);

    const allBooks = data.allBook.nodes
    const [list, setList] = React.useState([...allBooks.slice(0, 10)])

    const [loadMore, setLoadMore] = React.useState(false)

    const [hasMore, setHasMore] = React.useState(false)

    function handleLoadMore(){
        setLoadMore(true)
    }

    React.useEffect(() => {
        if(loadMore && hasMore){
            const currentLength = list.length
            const isMore = currentLength < allBooks.length
            const nextResults = isMore ? [...allBooks.slice(currentLength, currentLength + 10)] : []
            setList([...list, ...nextResults])
            setLoadMore(false)
        }
    }, [loadMore, hasMore])


    React.useEffect(() => {
        const isMore = list.length < allBooks.length
        setHasMore(isMore)
    }, [list])

    return (
        <>
            <div>
                {
                    list.map(book => (
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
            </div>

            <div>
                {
                    hasMore ? (
                        <button onClick={handleLoadMore}>Load more</button>
                    ) : (
                        <p>No more results</p>
                    )
                }
            </div>
        </>
    )
}