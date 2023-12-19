import * as React from "react"
import Section from "../../../../gatsby-theme/src/components/Section";
import { AuthContext } from "../../utils/authContext"
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Redirect from "./Redirect"

function AccountLanding(){
    const {user, isLoading, isAuthenticated, logout} = React.useContext(AuthContext)

    return (
        <Section>
            {isAuthenticated && (
                <>
                    <h2>Welcome <span style={{borderBottom: "2px solid #191177", padding: 0, lineHeight: 1}}>{user.nickname}</span> to your account</h2>
                    <a href="#logout" onClick={(e) => {
                        logout()
                        e.preventDefault()
                    }}>Logout</a>
                    <div>
                        <img src={user.picture} alt={user.name} />
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                </>
            )}
        </Section>
    )
}

export default withAuthenticationRequired(AccountLanding, {
    // Show a message while the user waits to be redirected to the login page.
    onRedirecting: () => (<Redirect toText="login" />)
})