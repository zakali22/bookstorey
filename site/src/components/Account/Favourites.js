import * as React from "react"
import Button from "../../../../gatsby-theme/src/components/Button";
import { AuthContext } from "../../utils/authContext"
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Redirect from "./Redirect"

function Favourites() {
    const { userData, isLoading, isAuthenticated, logout } = React.useContext(AuthContext)

    console.log(userData)

    return (
        <>
            {isAuthenticated  && userData && (
                <>
                <div className="account-profile">
                    <h2>Favourites</h2>
                    <p>No favourites found</p>
                </div>
                </>
            )}
        </>
    )
}

export default withAuthenticationRequired(Favourites, {
    // Show a message while the user waits to be redirected to the login page.
    onRedirecting: () => (<Redirect toText="login" />)
})