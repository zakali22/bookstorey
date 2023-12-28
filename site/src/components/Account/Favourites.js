import * as React from "react"
import Button from "../../../../gatsby-theme/src/components/Button";
import Redirect from "./Redirect"
import { useAuth } from "../../utils/auth";

function Favourites() {
    const { fetchFavourites, isLoading } = useAuth()
    const [favourites, setFavourites] = React.useState([])

    React.useEffect(() => {
        const init = async () => {
            try {
                const response = await fetchFavourites()
                setFavourites(response)
            } catch(e){
                console.error(e)
            }
        }

        init()
    }, [])

    return (
        <div className="account-profile">
            <h2>Favourites</h2>
            {favourites.length > 0 ? (
                favourites.map(favourite => (
                    <p>{favourite}</p>
                ))
            ) : (
                <p>No favourites found</p>
            )}
        </div>
    )
}

export default Favourites