import React from "react"
import Container from "./Container"
import Logo from "./Logo"
import { Link } from "gatsby"
import { nav, navContainer, navLeft, navRight, navLogo, navMobileToggle, navMobileWrapper, navMobile, navMobileOpen } from "../styles/nav.module.scss"

export default function Navigation(){
    const mql = typeof window !== 'undefined' && window.matchMedia("(max-width: 767px)")
    const [isMobile, setIsMobile] = React.useState(mql.matches)
    const [mobileMenuOpen, setMobileOpen] = React.useState(false)

    React.useEffect(() => {
        mql.addEventListener("change", () => {
            setIsMobile(mql.matches)
            if(!mql.matches) {
                setMobileOpen(false)
            }
        })
    }, [])
    

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
                                <Link to="/categories">Categories</Link>  
                                <Link to="/popular">Popular</Link>
                                <Link to="/">About us</Link>
                                <Link to="/">Sign in</Link>
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
                        <Link to="/">Sign in</Link>
                    </div>
                </Container>
            </nav>
        )
    }
}
