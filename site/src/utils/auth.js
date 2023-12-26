import React, {createContext, useContext, useEffect, useState} from "react"
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const AuthContext = createContext()
const firebaseConfig = {
    apiKey: "AIzaSyBOsUKH4MIFDwVkbEKY66DIEA4V1g269sM",
    authDomain: "bookstorey-405717.firebaseapp.com",
    projectId: "bookstorey-405717",
    storageBucket: "bookstorey-405717.appspot.com",
    messagingSenderId: "15914497606",
    appId: "1:15914497606:web:b0515dfd2ea44cc08dfc47",
    measurementId: "G-C40V2JXDX0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();

export const useAuth = () => useContext(AuthContext)

export const uploadProfileImage = async (file, currentUser, setLoading) => {
    const fileRef = ref(storage, currentUser.uid + '.png')

    setLoading(true)

    const snapshot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)

    updateProfile(auth.currentUser, {photoURL}).then(() => {
        console.log("Profile image updated")
        setLoading(false)
    })
}

export default function AuthContextWrapper({children}){
    const [currentUser, setCurrentUser] = React.useState()
    const [isLoading, setIsLoading] = React.useState(true)

    const signUp = (name, email, password, profileImage) => {
        return createUserWithEmailAndPassword(auth, email, password).then(user => {
            console.log(user)
            if(user){
                setIsLoading(true)
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    console.log("Profile is updated")
                    setIsLoading(false)
                })
            }
        })
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user)
            setCurrentUser(user)
            setIsLoading(false)
        })

        return unsubscribe
    }, [])

    const value = { auth, currentUser, signUp, login, logout, isLoading }

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}