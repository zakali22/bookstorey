import * as React from "react"
import { Link, navigate } from "gatsby"
import SignInForm from "../../../../gatsby-theme/src/components/SignInForm"
import { useAuth } from "../../utils/auth"
import Section from "../../../../gatsby-theme/src/components/Section"

export default function SignIn(props){
    const { currentUser, login } = useAuth()
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    if(currentUser){
        navigate("/account")
        return
    }

    async function handleOnSubmit({email, password}){
        try {
            setIsLoading(true)
            await login(email, password)
            navigate("/account")
        } catch(e){
            setIsLoading(false)
            setError(e)
        }
        setIsLoading(false)
    }

    return (
        <Section>
            {isLoading && <p>Loading....</p>}
            {error && <p>Error occured</p>}
            <SignInForm onSubmit={handleOnSubmit} isLoading={isLoading} />
            <p>Need an account? <Link to="/account/signup">Sign up</Link></p>
        </Section>
    )
}