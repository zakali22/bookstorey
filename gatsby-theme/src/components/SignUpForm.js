import React from "react";
import "../styles/account-profile.scss"
import Button from "./Button";
import { validateEmail } from "../utils/validateEmail";

export default function SignUpForm({ onSubmit, isLoading }) {
    const [errors, setErrors] = React.useState([])

    async function handleOnSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        const name = formData.get("name")
        const password = formData.get("password")
        const confirmPassword = formData.get("confirm-password")
        const email = formData.get("email")

        if(password != confirmPassword){
            setErrors([...errors, "Passwords do not match"])
            console.log("Passwords dont match")
            return 
        }

        if(!validateEmail(email)){
            setErrors([...errors, "Email is not valid"])
            console.log("Email is not valid")
            return
        }

        try {
            onSubmit({
                name, 
                email, 
                password
            })
        } catch(e){
            console.error(e)
        }
    }


    return (
        <>
            {errors && errors.length > 0 && ( /** Style and use as notification */
                errors.map(error => <p>{error}</p>)
            )}
            <form onSubmit={handleOnSubmit} className="account-profile__form" name="signup-form">
                <label htmlFor="name">
                    Name
                    <input name="name" id="name"  required/>
                </label>

                <label htmlFor="email">
                    Email address
                    <input name="email" id="email" required/>
                </label>

                <label htmlFor="password">
                    Password
                    <input name="password" id="password"  type="password" required />
                </label>

                <label htmlFor="confirm-password">
                    Confirm Password
                    <input name="confirm-password" id="confirm-password"  type="password" required />
                </label>

                <Button buttonType="submit" disabled={isLoading}>Signup</Button>
            </form>
        </>
    )
}