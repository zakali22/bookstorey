import * as React from "react"
import { Link, navigate } from "gatsby"
import SignUpForm from "../../../../gatsby-theme/src/components/SignupForm"
import { useAuth } from "../../utils/auth"
import Section from "../../../../gatsby-theme/src/components/Section"

export default function SignIn(props){
    const { signUp, currentUser } = useAuth()
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    if(currentUser){
        navigate("/account")
        return
    }

    async function handleOnSubmit({name, email, password}){
        try {
            setIsLoading(true)
            await signUp(name, email, password)
            navigate("/account/signin")
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
            <SignUpForm onSubmit={handleOnSubmit} isLoading={isLoading} />
            <p>Already have an account? <Link to="/account/signin">Sign in</Link></p>
        </Section>
    )
}