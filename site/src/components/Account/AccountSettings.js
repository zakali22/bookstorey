import * as React from "react"
import Button from "../../../../gatsby-theme/src/components/Button";
import Redirect from "./Redirect"
import { Link } from "@reach/router";
import AccountProfileImage from "../../../../gatsby-theme/src/components/AccountProfileImage";
import InputSwitch from "../../../../gatsby-theme/src/components/InputSwitch";
import { useAuth } from "../../utils/auth";
import ProfileImageComp from "./ProfileImageComp";

function AccountLanding() {
    const { currentUser, logout, isLoading } = useAuth()

    if(isLoading) return <p>Loading....</p>

    return (
        <div className="account-profile account-profile--settings">
            <h2>Account details</h2>
            <div className="account-profile__wrapper">
                <div>
                    <form action="" className="account-profile__form">
                        <label htmlFor="full-name">
                            Full name
                            <input name="full-name" id="full-name" defaultValue={currentUser.displayName} disabled />
                        </label>

                        <label htmlFor="email-address">
                            Email address
                            <input name="email-address" id="email-address" defaultValue={currentUser.email} disabled />
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
                            logout()
                        }}>Logout</Button>
                    </div>
                </div>
                <div>
                    <div className="account-profile__image">
                        <ProfileImageComp />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountLanding