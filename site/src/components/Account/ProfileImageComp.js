import * as React from "react"
import { useAuth, uploadProfileImage } from "../../utils/auth";
import Button from "../../../../gatsby-theme/src/components/Button";
import AccountProfileImage from "../../../../gatsby-theme/src/components/AccountProfileImage";

export default function ProfileImageComp(){
    const { currentUser, logout, isLoading } = useAuth()
    const [loadingPhoto, setLoadingPhoto] = React.useState(false)
    const [photo, setPhoto] = React.useState(null);
    const [photoURL, setPhotoURL] = React.useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
    const [error, setError] = React.useState(null)

    function handleChange(e) {
        if (e.target.files[0]) {
          setPhoto(e.target.files[0])
        }
    }

    function handleSubmit(){
        console.log(photo)
        if(!photo) {
            setError("Image is required. Please upload an image to submit.")
            return
        }

        uploadProfileImage(photo, currentUser, setLoadingPhoto);
        setError(null)
    }

    React.useEffect(() => {
        if(currentUser?.photoURL){
            setPhotoURL(currentUser.photoURL)
        }
    }, [currentUser, loadingPhoto])

    if(loadingPhoto) return <p>Loading....</p>


    return (
        <>
            {error && <p>{error}</p>}
            <AccountProfileImage image={photoURL} name={currentUser.name} />
            <input type="file" onChange={handleChange} style={{maxWidth: "50%", marginBottom: "20px"}}/>
            <Button type="secondary" onClick={handleSubmit}>Upload picture</Button>
        </>
    )
}