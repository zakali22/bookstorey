import React from "react";
import "../styles/account-profile.scss"
import Button from "./Button";
import {useTheme} from "../../../site/src/utils/theme"

export default function SignInForm({ onSubmit, isLoading }) {
    const {darkMode} = useTheme()

    function handleOnSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        onSubmit({
            email: formData.get("email"),
            password: formData.get("password"),
        })
    }


    return (
        <form onSubmit={handleOnSubmit} className="account-profile__form" name="signin-form">
            <label htmlFor="email">
                Email address
                <input name="email" id="email"   />
            </label>

            <label htmlFor="password">
                Password
                <input name="password" id="password"  type="password" />
            </label>

            <Button buttonType="submit" inverted={darkMode} disabled={isLoading}>Signin</Button>
        </form>
    )
}