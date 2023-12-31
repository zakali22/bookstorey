import React, { useState } from "react"
import "../styles/footer.scss"
import Container from "./Container"
import Button from "./Button"
import { Link } from "gatsby"
import {useTheme} from "../../../site/src/utils/theme"
import {useAuth} from "../../../site/src/utils/auth"
import toast from "react-hot-toast"

export default function Footer(){
    const {darkMode} = useTheme()
    const {currentUser} = useAuth()
    const [formSubmitted, setFormSubmitted] = useState(false)

    function handleFormSubmit(e){
        e.preventDefault()

        const formData = new FormData(e.target)

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
        .then(() => {
            setFormSubmitted(true)
            toast.success("Form successfully submitted")
        })
        .catch((error) => alert(error));
    }

    return (
        <footer className="footer">
            <Container>
                <div className="footer__left">
                    <div className="footer__subscription">
                        {formSubmitted && <h4>Thank you for subscribing to the Bookstorey newsletter</h4>}
                        {!formSubmitted && (
                            <>
                                <h4>Subscribe to the Bookstorey newsletter to receive the latest books</h4>
                                <form name="newsletter" method="POST" data-netlify="true" onSubmit={handleFormSubmit}>
                                    <label>
                                        <input type="email" name="email" required/>
                                        <Button type="tertiary" buttonType="submit" inverted={darkMode}>Sign me up</Button>
                                    </label>
                                </form>
                            </>
                        )}
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