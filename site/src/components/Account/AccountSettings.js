import * as React from "react"
import Button from "../../../../gatsby-theme/src/components/Button";
import Redirect from "./Redirect"
import { Link } from "@reach/router";
import AccountProfileImage from "../../../../gatsby-theme/src/components/AccountProfileImage";
import InputSwitch from "../../../../gatsby-theme/src/components/InputSwitch";
import { useAuth0 } from "../../utils/auth";

function AccountLanding() {
    const { user: userData, loading, isAuthenticated, logout } = useAuth0()

    console.log(userData)

    return (
        <div className="account-profile account-profile--settings">
            <h2>Account details</h2>
            <div className="account-profile__wrapper">
                <div>
                    <form action="" className="account-profile__form">
                        <label htmlFor="full-name">
                            Full name
                            <input name="full-name" id="full-name" defaultValue={userData.name} disabled />
                        </label>

                        <label htmlFor="email-address">
                            Email address
                            <input name="email-address" id="email-address" defaultValue={userData.email} disabled />
                        </label>
                    </form>
                    <div className="account-profile__actions">
                        <Button type="secondary">Reset password</Button>
                        <Button type="secondary" backgroundColor='red'>Delete account</Button>
                    </div>
                    
                    <div className="account-profile__theme">
                        <h3>Theme</h3>
                        <form action="" className="account-profile__form">
                            <InputSwitch text="Dark mode" />
                        </form>
                    </div>

                    <div className="account-profile__actions">
                        <Button type="secondary" backgroundColor="blue">Save changes</Button>
                        <Button type="secondary">Cancel</Button>
                    </div>

                    <div className="account-profile__actions">
                        <Button type="secondary" backgroundColor='red' onClick={(e) => {
                            e.preventDefault()
                            logout({returnTo: "http://localhost:8888"})
                        }}>Logout</Button>
                    </div>
                </div>
                <div>
                    <div className="account-profile__image">
                        <AccountProfileImage image={userData.picture} name={userData.name} />
                        <Button type="secondary">Upload picture</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountLanding