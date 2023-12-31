import React from "react"
import "../styles/footer.scss"
import Container from "./Container"
import Button from "./Button"
import { Link } from "gatsby"
import {useTheme} from "../../../site/src/utils/theme"
import {useAuth} from "../../../site/src/utils/auth"

export default function Footer(){
    const {darkMode} = useTheme()
    const {currentUser} = useAuth()

    return (
        <footer className="footer">
            <Container>
                <div className="footer__left">
                    <div className="footer__subscription">
                        <h4>Subscribe to the Bookstorey newsletter to receive the latest books</h4>
                        <form>
                            <label>
                                <input />
                                <Button type="tertiary" inverted={darkMode}>Sign me up</Button>
                            </label>
                        </form>
                    </div>
                </div>

                <div className="footer__right">
                    <div>
                        <div className="footer__nav-links">
                            <div>
                                <h4>Explore</h4>
                                <ul>
                                    <li><Link to="/popular">Popular</Link></li>
                                    <li><Link to="/categories">Categories</Link></li>
                                    {/* <li>About us</li> */}
                                </ul>
                            </div>
                            <div>
                                <h4>User</h4>
                                <ul>
                                    {!currentUser && (
                                        <>
                                            <li><Link to="/account/signup">Registration</Link></li>
                                            <li><Link to="/account/signin">Sign in</Link></li>
                                        </>
                                    )}
                                    {currentUser && <li><Link to="/account">Account</Link></li>}
                                    
                                </ul>
                            </div>
                        </div>
                        <div className="footer__copyright">
                            <p>&copy; {new Date().getFullYear()} BOOKSTOREY . ALL RIGHTS RESERVED</p>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}