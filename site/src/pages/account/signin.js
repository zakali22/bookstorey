import * as React from "react"


export default function SignIn(props){
    // const [redirectToReferrer, setRedirectToReferrer] = React.useState(false)

    // React.useEffect(() => {
    //     netlifyIdentity.on('init', (user) => {
    //         console.log("Init")
    //     })

    //     if(netlifyIdentity.currentUser()){
    //         navigate('/account/profile')
    //     }
    // }, [])

    // const handleLogin = () => {
    //     netlifyIdentity.open();
    //     netlifyIdentity.on('login', async (user) => {
    //         const userCreated = await (await createHasuraAccount.handler(user)).body
    //         console.log(userCreated)
    //         // navigate('/')
    //     })
    // }

    return <button>Log in</button> 


}