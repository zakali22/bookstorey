import * as React from "react"
import {graphql, useStaticQuery, Link} from "gatsby"
import {GatsbyImage, StaticImage, getImage} from "gatsby-plugin-image"
import Card from "../../../gatsby-theme/src/components/Card";
import SingleHero from "../components/SingleHero";
import PopularList from "../components/PopularList";
import Button from "../../../gatsby-theme/src/components/Button"
import CtaSection from "../components/CtaSection"

export default function PopularPage(){
    const data = useStaticQuery(graphql`
        query PopularBooks {
            allBook(sort: {ratingsCount: DESC}, filter: {ratingsCount: {gte: 10}}) {
                nodes {
                    id
                    title
                    categories
                    averageRating
                    ratingsCount
                    slug
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
            <SingleHero>Popular books</SingleHero>
            <PopularList>
                {
                    list.map(book => (
                        <Card roundedCorners={false} book={book} hasImageDisplacement={false} image={<GatsbyImage image={getImage(book.cover)} width={128} height={192} alt={book.title} layout="fullWidth" />} />
                    ))
                }
            </PopularList>

            <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                {
                    hasMore ? (
                        <Button onClick={handleLoadMore}>Load more</Button>
                    ) : (
                        <p>No more results</p>
                    )
                }
            </div>
            <CtaSection />
        </>
    )
}