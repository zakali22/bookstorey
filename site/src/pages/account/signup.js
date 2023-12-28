import * as React from "react"
import { Link, navigate } from "gatsby"
import SignUpForm from "../../../../gatsby-theme/src/components/SignUpForm"
import { useAuth } from "../../utils/auth"
import Section from "../../../../gatsby-theme/src/components/Section"
import toast from "react-hot-toast";

export default function SignIn(props){
    const { signUp, currentUser } = useAuth()
    const [isLoading, setIsLoading] = React.useState(false)

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
            toast.error(e.code)
        }
        setIsLoading(false)
    }

    return (
        <Section>
            {isLoading && <p>Loading....</p>}
            <SignUpForm onSubmit={handleOnSubmit} isLoading={isLoading} />
            <p>Already have an account? <Link to="/account/signin">Sign in</Link></p>
        </Section>
    )
}