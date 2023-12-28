import * as React from "react"
import { Link, navigate } from "gatsby"
import SignInForm from "../../../../gatsby-theme/src/components/SignInForm"
import { useAuth } from "../../utils/auth"
import Section from "../../../../gatsby-theme/src/components/Section"
import toast from "react-hot-toast";


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
            if(e.code === 'auth/invalid-credential'){
                toast.error("Invalid credentials provided. Please try again")
            }
        }
        setIsLoading(false)
    }

    return (
        <Section className="section--account-form-page">
            {isLoading && <p>Loading....</p>}
            <SignInForm onSubmit={handleOnSubmit} isLoading={isLoading} />
            <p>Need an account? <Link to="/account/signup">Sign up</Link></p>
        </Section>
    )
}