import React from "react"
import Container from "./Container"
import Logo from "./Logo"
import { Link } from "gatsby"
import { nav, navContainer, navLeft, navRight, navLogo, navMobileToggle, navMobileWrapper, navMobile, navMobileOpen } from "../styles/nav.module.scss"
import { AuthContext } from "../../../site/src/utils/authContext"
import AccountProfileImage from "./AccountProfileImage"

const LoginButton = () => {
    const {loginWithRedirect} = React.useContext(AuthContext)

    return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

function AccountProfile(){
    const {user, isAuthenticated} = React.useContext(AuthContext)

    console.log(user)
    return (
        <>
            {isAuthenticated ? (
                <AccountProfileImage image={user.picture} name={user.nickname}/>
            ) : (
                <LoginButton />
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
