import * as React from "react"
import { navigate } from "gatsby"
import Button from "../../../gatsby-theme/src/components/Button"
import Section from "../../../gatsby-theme/src/components/Section"
import { fetchFavouritesList, addBookToFavourites, useAuth, removeBookFromFavourites } from "../utils/auth"
import toast from "react-hot-toast"

export default function AddToFavourites({ bookId, title }) {
    const {currentUser} = useAuth()
    const [isFavourited, setIsFavourited] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const handleAddToFavourites = async() => {
        if(!currentUser){
            toast.error("Please sign in to add to favourites")
            navigate("/account/signin")
            return
        }

        setIsLoading(true)

        try {
            await addBookToFavourites(bookId, title)
            toast.success(`Book: ${title} was added to favourites`)
            setIsFavourited(true)
        } catch(e){
            console.log(e)
            setIsLoading(false)
            toast.error("There was an error adding book to favourites")
        }
        setIsLoading(true)
    }

    const handleRemoveFromFavourites = async () => {
        console.log("Removing")

        if(!currentUser){
            toast.error("Please sign in to add to favourites")
            navigate("/account/signin")
            return
        }

        setIsLoading(true)

        try {
            const response = await removeBookFromFavourites(bookId)
            toast.success(`Book: ${title} was removed from favourites`)
            setIsFavourited(false)
            console.log(response)
        } catch(e){ 
            console.error(e)
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        const init = async () => {
            try {
                const favouritesListResponse = await fetchFavouritesList()
                setIsFavourited(Object.values(favouritesListResponse).indexOf(bookId) !== -1)
            } catch(e){
                console.error(e)
            }
        }

        init()
    }, [])

    return (
        <Section>
            {isFavourited ? (
                <Button hasIcon type="secondary" onClick={handleRemoveFromFavourites}>
                    <span className="btn__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.5 10c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-5v-1h5v1zm-6.527 4.593c-1.108 1.086-2.275 2.219-3.473 3.407-6.43-6.381-12-11.147-12-15.808 0-4.005 3.098-6.192 6.281-6.192 2.197 0 4.434 1.042 5.719 3.248 1.279-2.195 3.521-3.238 5.726-3.238 3.177 0 6.274 2.171 6.274 6.182 0 .746-.156 1.496-.423 2.253-.527-.427-1.124-.768-1.769-1.014.122-.425.192-.839.192-1.239 0-2.873-2.216-4.182-4.274-4.182-3.257 0-4.976 3.475-5.726 5.021-.747-1.54-2.484-5.03-5.72-5.031-2.315-.001-4.28 1.516-4.28 4.192 0 3.442 4.742 7.85 10 13l2.109-2.064c.376.557.839 1.048 1.364 1.465z"/></svg>
                    </span>
                    Remove from favourites
                </Button>
            ) : (
                <Button hasIcon type="secondary" onClick={handleAddToFavourites}>
                    <span className="btn__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.5 10c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-6.527 4.593c-1.108 1.086-2.275 2.219-3.473 3.407-6.43-6.381-12-11.147-12-15.808 0-4.005 3.098-6.192 6.281-6.192 2.197 0 4.434 1.042 5.719 3.248 1.279-2.195 3.521-3.238 5.726-3.238 3.177 0 6.274 2.171 6.274 6.182 0 .746-.156 1.496-.423 2.253-.527-.427-1.124-.768-1.769-1.014.122-.425.192-.839.192-1.239 0-2.873-2.216-4.182-4.274-4.182-3.257 0-4.976 3.475-5.726 5.021-.747-1.54-2.484-5.03-5.72-5.031-2.315-.001-4.28 1.516-4.28 4.192 0 3.442 4.742 7.85 10 13l2.109-2.064c.376.557.839 1.048 1.364 1.465z" /></svg>
                    </span>
                    Add to favourites
                </Button>
            )}
        </Section>
    )
}