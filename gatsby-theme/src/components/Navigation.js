import React from "react"
import Container from "./Container"
import Logo from "./Logo"
import { Link } from "gatsby"
import "../styles/nav.scss"
import Button from "./Button"
import AccountProfileImage from "./AccountProfileImage"
import {useAuth} from "../../../site/src/utils/auth"
import {useTheme} from "../../../site/src/utils/theme"

function AccountProfile(){
    const { currentUser } = useAuth()

    return (
        <>
            {!currentUser && (
                <Link to="/account/signin">
                    <Button>Sign In</Button>
                </Link>
            )}
            {currentUser && (
                <Link to="/account">
                    Account
                    {/* <AccountProfileImage image={user.picture} name={user.nickname} isNav/> */}
                </Link>
            )}
        </>
    )
}

export default function Navigation(){
    const mql = typeof window !== 'undefined' && window.matchMedia("(max-width: 767px)")
    const [isMobile, setIsMobile] = React.useState(mql.matches)
    const [mobileMenuOpen, setMobileOpen] = React.useState(false)
    const {darkMode} = useTheme()

    React.useEffect(() => {
        if(typeof window !== 'undefined'){
            window.addEventListener("resize", function(e){
                setIsMobile(window.matchMedia("(max-width: 767px)").matches)
            })
        }
    }, [])

    if(isMobile){
        return (
            <nav className={`nav nav--mobile ${darkMode ? 'dark-mode': ''} ${mobileMenuOpen ? 'nav--mobile-open' : ''}`}>
                <Container className="nav-container">
                    <div className="nav-logo">
                        <Logo />
                    </div>
                    <button className="nav-mobile-toggle" aria-label="Open the menu" onClick={() => setMobileOpen(!mobileMenuOpen)}>
                        <span aria-hidden={true}></span>
                    </button>
                    { mobileMenuOpen && (
                            <div className="nav-mobile-wrapper">
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
            <nav className={`nav ${darkMode ? 'dark-mode': ''}`}>
                <Container className="nav-container">
                    <div className="nav-left">
                        <Link to="/categories/art">Categories</Link>  
                        <Link to="/popular">Popular</Link>
                    </div>
                    <div className="nav-logo">
                        <Logo darkMode={darkMode}/>
                    </div>
                    <div className="nav-right">
                        <Link to="/">About us</Link>
                        <AccountProfile />
                    </div>
                </Container>
            </nav>
        )
    }
}
