import * as React from "react"
import Button from "../../../../gatsby-theme/src/components/Button";
import Redirect from "./Redirect"
import { useAuth, fetchFavouritesList } from "../../utils/auth";
import { graphql, useStaticQuery } from "gatsby";
import Card from "../../../../gatsby-theme/src/components/Card";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Masonry from 'react-masonry-css'

function Favourites() {
    // const { fetchFavouritesList } = useAuth()
    const [favourites, setFavourites] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const data = useStaticQuery(graphql`
        query FavouritesBookQuery {
            allBook {
                nodes {
                    id
                    title
                    slug
                    category
                    averageRating
                    ratingsCount
                    cover {
                        childImageSharp {
                            gatsbyImageData(height: 192, width: 128)
                        }
                    }
                    authors {
                        name
                        slug
                    }
                }
            }
        }
    `)

    React.useEffect(() => {
        const init = async () => {
            setIsLoading(true)
            try {
                const favouritesListResponse = await fetchFavouritesList()
                const filteredBooks = data.allBook.nodes.filter(book => Object.values(favouritesListResponse).indexOf(book.id) != -1)
                setFavourites(filteredBooks)
            } catch(e){
                console.error(e)
                setIsLoading(false)
            }
            setIsLoading(false)
        }

        init()
    }, [])

    const renderFavourites = () => {
        if(isLoading){
            return <p>Loading...</p>
        } else {
            if(favourites.length > 0){
                const breakpointColumnsObj = {
                    default: 3,
                    1600: 2,
                    1200: 1,
                };

                return (
                    <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid" columnClassName="masonry-grid__column">
                        {favourites.map(favouriteBook => (
                            <Card roundedCorners={false} book={favouriteBook} hasImageDisplacement={false} image={<GatsbyImage image={getImage(favouriteBook.cover)} width={128} height={192} alt={favouriteBook.title} layout="fullWidth" />} />
                        ))}
                    </Masonry>
                )
            } else {
                return <p>No favourites found</p>
            }
        }
    }

    return (
        <div className="account-profile">
            <h2>Favourites</h2>
            {renderFavourites()}
        </div>
    )
}

export default Favourites