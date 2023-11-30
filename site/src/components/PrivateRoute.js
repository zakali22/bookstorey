import * as React from "react"
import {navigate} from "gatsby"
import useNetlifyAuth from "../utils/useNetlifyAuth"

export default function PrivateRoute({component: Component, location, ...rest}){
    const [_, isLoggedIn] = useNetlifyAuth()

    React.useEffect(() => {
        if (!isLoggedIn() && location.pathname !== `/account/signin`) {
            navigate("/account/signin")
            return null
        }
    }, [])
    
    return <Component {...rest} />
}