import React from "react"
import Container from "./Container"
import Logo from "./Logo"
import { Link } from "gatsby"
import { nav, navContainer, navLeft, navRight, navLogo, navMobileToggle, navMobileWrapper, navMobile, navMobileOpen } from "../styles/nav.module.scss"
import Button from "./Button"
import { useAuth0 } from "../../../site/src/utils/auth"
import AccountProfileImage from "./AccountProfileImage"

const LoginButton = () => {
    const { loginWithRedirect, getTokenSilently } = useAuth0()

    return <Button onClick={() => loginWithRedirect({ appState: `${window.location.pathname}` })}>Log In</Button>;
};

function AccountProfile(){
    const { user, isAuthenticated, loading, getTokenSilently } = useAuth0()
    
    console.log(isAuthenticated, loading)

    return (
        <>
            {!isAuthenticated && !loading && (
                <LoginButton />
            )}
            {isAuthenticated && !loading && (
                <Link to="/account">
                    <AccountProfileImage image={user.picture} name={user.nickname} isNav/>
                </Link>
            )}
        </>
    )
}

export default function Navigation({auth}){
    const mql = typeof window !== 'undefined' && window.matchMedia("(max-width: 767px)")
    const [isMobile, setIsMobile] = React.useState(mql.matches)
    const [mobileMenuOpen, setMobileOpen] = React.useState(false)

    if(isMobile){
        return (
            <nav className={`${nav} ${navMobile} ${mobileMenuOpen ? navMobileOpen : ''}`}>
                <Container className={navContainer}>
                    <div className={navLogo}>
                        <Logo />
                    </div>
                    <button className={navMobileToggle} aria-label="Open the menu" onClick={() => setMobileOpen(!mobileMenuOpen)}>
                        <span aria-hidden={true}></span>
                    </button>
                    { mobileMenuOpen && (
                            <div className={navMobileWrapper}>
                                <Link to="/categories/art">Categories</Link>  
                                <Link to="/popular">Popular</Link>
                                <Link to="/">About us</Link>
                                <AccountProfile />
                            </div>
                        )
                    }
                </Container>
            </nav>
        )

    } else {
        return (
            <nav className={nav}>
                <Container className={navContainer}>
                    <div className={navLeft}>
                        <Link to="/categories/art">Categories</Link>  
                        <Link to="/popular">Popular</Link>
                    </div>
                    <div className={navLogo}>
                        <Logo />
                    </div>
                    <div className={navRight}>
                        <Link to="/">About us</Link>
                        <AccountProfile />
                    </div>
                </Container>
            </nav>
        )
    }
}
