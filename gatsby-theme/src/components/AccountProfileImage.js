import React from "react"
import "../styles/account-profile.scss"

export default function AccountProfileImage({image, name, isNav = false}){
    return (
        <div className={`account-profile-image ${isNav ? 'account-profile-image--nav' : ''}`}>
            <div className="account-profile-image__wrapper">
                <img src={image} alt={`${name}'s profile image`} />
            </div>
        </div>
    )
}