import * as React from "react"
import Button from "../../../../gatsby-theme/src/components/Button";
import InputSwitch from "../../../../gatsby-theme/src/components/InputSwitch";
import { useAuth } from "../../utils/auth";
import { navigate } from "gatsby"
import ProfileImageComp from "./ProfileImageComp";
import { validateEmail } from "../../utils/validateEmail";
import toast from "react-hot-toast";
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Modal from "../../../../gatsby-theme/src/components/Modal";
import { useTheme } from "../../utils/theme";

function AccountLanding() {
    const { currentUser, logout, isLoading, updateUserDisplayName, updateUserEmail, deleteProfile } = useAuth()
    const [isEditMode, setIsEditMode] = React.useState(false)
    const [name, setName] = React.useState(currentUser.displayName)
    const [email, setEmail] = React.useState(currentUser.email)
    const modal = useModal("modal-cmp")
    const {darkMode, setDarkMode} = useTheme()

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
        
        try {
            if(currentUser.displayName !== name) {
                try {
                    await updateUserDisplayName(name.trim())
                } catch(e){
                    toast.error(e.message)
                }
            }
            if(currentUser.email !== email){
                try {
                    await updateUserEmail(email.trim())
                } catch(e){
                    toast.error(e.message)
                }
                
                logout()
                toast.error("Please verify the new email and login again.")
            }
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

        setIsEditMode(false)
    }

    async function handleDeleteConfirm(){
        try {
            await deleteProfile()
            NiceModal.remove(Modal)
            navigate("/account/signup")
            toast.success("Profile deleted")
        } catch(e){
            console.log(e.code)
            if(e.code === "auth/requires-recent-login"){
                NiceModal.remove(Modal)
                logout()
                toast.error("Re-authentication required")
            }
        }
    }

    function modalContent(){
        return (
            <>
            <h3>Are you sure want to delete your profile?</h3>
            <div className="account-profile__actions">
                <Button buttonType="submit" type="secondary" backgroundColor="red" onClick={handleDeleteConfirm}>Yes, delete profile</Button>
                <Button type="secondary" onClick={() => NiceModal.remove(Modal)}>Cancel</Button>
            </div>
            </>
        )
    }

    function handleDarkMode(e){
        console.log(e)
        setDarkMode()
        // Save to localStorage
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
                                <Button type="secondary" backgroundColor='red' onClick={() => NiceModal.show(Modal, { children: modalContent() })}>Delete account</Button>
                            </div>
                            <div className="account-profile__theme">
                                <h3>Theme</h3>
                                <form className="account-profile__form">
                                    <InputSwitch text="Dark mode" onChange={handleDarkMode} />
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
            
            <Modal id="modal-cmp" />
        </div>
    )
}

export default AccountLanding