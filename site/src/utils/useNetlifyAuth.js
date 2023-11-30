import netlifyIdentity from 'netlify-identity-widget';
import * as React from "react"

export default function useNetlifyAuth(){
    const [user, setUser] = React.useState(null)

    const authenticate = (callback) => {
        console.log("Authenticate")
        netlifyIdentity.open();
        netlifyIdentity.on('login', user => {
            setUser(user)
            callback(user);
        });
    }

    const signout = (callback) => {
        netlifyIdentity.logout();
        netlifyIdentity.on('logout', () => {
            setUser(null)
            callback();
        });
    }

    const login = (callback) => {
        authenticate();
    };

    const init = () => {
        window.netlifyIdentity = netlifyIdentity;
        // You must run this once before trying to interact with the widget
        netlifyIdentity.init();
        setUser(netlifyIdentity.currentUser())
    }

    const isLoggedIn = () => {
        return netlifyIdentity.currentUser()
    }

    React.useEffect(() => {
        init()
    })

    return [netlifyIdentity, isLoggedIn, user, authenticate, signout, login, init]
}