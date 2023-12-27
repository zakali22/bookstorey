import * as React from "react"
import Button from "../../../../gatsby-theme/src/components/Button";
import Redirect from "./Redirect"
import { Link } from "@reach/router";
import AccountProfileImage from "../../../../gatsby-theme/src/components/AccountProfileImage";
import InputSwitch from "../../../../gatsby-theme/src/components/InputSwitch";
import { useAuth } from "../../utils/auth";
import ProfileImageComp from "./ProfileImageComp";
import { validateEmail } from "../../utils/validateEmail";
import toast from "react-hot-toast";

function AccountLanding() {
    const { currentUser, logout, isLoading, updateUserProfile, reauthenticate } = useAuth()
    const [isEditMode, setIsEditMode] = React.useState(false)
    const [name, setName] = React.useState(currentUser.displayName)
    const [email, setEmail] = React.useState(currentUser.email)
    const [errors, setErrors] = React.useState([])

    if (isLoading) return <p>Loading....</p>

    function handleInputChange(e){
        if(e.target.name === 'full-name'){
            setName(e.target.value)
        }

        if(e.target.name === 'email-address'){
            setEmail(e.target.value)
        }
    }

   async function handleSubmit(e){
        e.preventDefault()

        if(!validateEmail(email)){
            toast.error("Email is not valid. Please try again")
            return
        }

        console.log({name, email})

        
        try {
            await updateUserProfile(name, email)
            logout()
            toast.error("Please verify the new email and login again.")
        } catch(e){
            console.log(e.code)
            if(e.code === "auth/requires-recent-login"){
                logout()
                toast.error("Re-authentication required")
            }
            return
        }
        setIsEditMode(false)
    }

    function handleCancel(){
        setName(currentUser.displayName)
        setEmail(currentUser.email)
        setErrors([])

        setIsEditMode(false)
    }
    

    return (
        <div className="account-profile account-profile--settings">
            <h2>Account details</h2>
            <div className="account-profile__wrapper">
                <div>
                    <form className="account-profile__form" onSubmit={handleSubmit}>
                        <label htmlFor="full-name">
                            Full name
                            <input name="full-name" id="full-name" onChange={handleInputChange} value={name} disabled={!isEditMode} required />
                        </label>

                        <label htmlFor="email-address">
                            Email address
                            <input name="email-address" id="email-address" onChange={handleInputChange} value={email} disabled={!isEditMode} required />
                        </label>


                        {isEditMode && (
                            <div className="account-profile__actions">
                                <Button buttonType="submit" type="secondary" backgroundColor="blue">Save changes</Button>
                                <Button type="secondary" onClick={handleCancel}>Cancel</Button>
                            </div>
                        )}
                    </form>

                    {!isEditMode && (
                        <>
                            <div className="account-profile__actions">
                                <Button type="secondary" onClick={() => setIsEditMode(true)}>Edit details</Button>
                                {/* <Button type="secondary">Reset password</Button> */}
                                <Button type="secondary" backgroundColor='red'>Delete account</Button>
                            </div>
                            <div className="account-profile__theme">
                                <h3>Theme</h3>
                                <form action="" className="account-profile__form">
                                    <InputSwitch text="Dark mode" />
                                </form>
                            </div>
                        </>
                    )}

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