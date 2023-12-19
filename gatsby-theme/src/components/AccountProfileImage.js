import React from "react"

export default function AccountProfileImage({image, name}){
    return (
        <div className="account-profile-image">
            <div className="account-profile-image__wrapper">
                <img src={image} alt={`${name}'s profile image`} />
            </div>
        </div>
    )
}