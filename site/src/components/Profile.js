import * as React from "react"
import Section from "../../../gatsby-theme/src/components/Section"
import useNetlifyAuth from "../utils/useNetlifyAuth"

export default function Profile(){
    const [netlifyIdentity, isLoggedIn, user, authenticate, signout, login, init] = useNetlifyAuth()

    console.log(signout())
    return (
        <Section>
            <h2>Profile page</h2>
        </Section>
    )
}