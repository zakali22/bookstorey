import React, { createContext, useContext, useEffect, useState } from "react"
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, verifyBeforeUpdateEmail, deleteUser } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getDatabase, ref as dbRef, set, onValue, update, push, child } from "firebase/database";
import toast from "react-hot-toast";

const AuthContext = createContext()
const firebaseConfig = {
    apiKey: "AIzaSyBOsUKH4MIFDwVkbEKY66DIEA4V1g269sM",
    authDomain: "bookstorey-405717.firebaseapp.com",
    projectId: "bookstorey-405717",
    storageBucket: "bookstorey-405717.appspot.com",
    messagingSenderId: "15914497606",
    appId: "1:15914497606:web:b0515dfd2ea44cc08dfc47",
    measurementId: "G-C40V2JXDX0",
    databaseURL: "https://bookstorey-405717-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();
const database = getDatabase(app);

export const useAuth = () => useContext(AuthContext)

export const uploadProfileImage = async (file, currentUser, setLoading) => {
    const fileRef = ref(storage, currentUser.uid + '.png')

    setLoading(true)

    const snapshot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)
    // const userDbRef = dbRef(database, 'users/' + currentUser.uid)

    updateProfile(auth.currentUser, { photoURL }).then(() => {
        console.log("Profile image updated")
        setLoading(false)

        /** Update in DB */
        const updates = {}
        updates['users/' + currentUser.uid + '/photoURL'] = photoURL
        update(dbRef(database), updates)
    })
}

export const fetchFavouritesList = async () => {
    const favouritesRef = dbRef(database, 'users/' + auth.currentUser.uid)

    return new Promise((resolve, reject) => {
        onValue(favouritesRef, (snapshot) => {
            if (snapshot.val() && snapshot.val().favourites) {
                resolve(snapshot.val().favourites)
            } else {
                reject()
            }
        })    
    })
}

export const addBookToFavourites = async (bookId, title) => {
    const newFavouritesKey = push(child(dbRef(database), 'users/' + auth.currentUser.uid + '/favourites')).key
    const updates = {}
    updates['users/' + auth.currentUser.uid + '/favourites' + '/' + newFavouritesKey] = bookId
    
    return update(dbRef(database), updates)
}

export default function AuthContextWrapper({ children }) {
    const [currentUser, setCurrentUser] = React.useState()
    const [isLoading, setIsLoading] = React.useState(true)

    const signUp = (name, email, password, profileImage) => {
        return createUserWithEmailAndPassword(auth, email, password).then(user => {
            console.log(user)
            if (user) {
                setIsLoading(true)
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    console.log("Profile is updated")
                    setIsLoading(false)
                    console.log(user.user)
                    addUserToDB(user.user)
                })
            }
        })
    }

    const addUserToDB = (user) => {
        return set(dbRef(database, 'users/' + user.uid), {
            displayName: user.displayName,
            email: user.email,
            photoURL: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
            // favourites: {}
        })
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password).then(() => {
            console.log(password)
        })
    }

    const logout = () => {
        return signOut(auth)
    }

    const reauthenticateUserCredentials = (e) => {
        // const credential = EmailAuthProvider.credential(auth.currentUser.email, )
        // return reauthenticateWithCredential(auth.currentUser, credential).then(() => console.log("Reauthenticated user"))
    }

    const updateUserDisplayName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            toast.success("Profile is updated")
        })
    }

    const updateUserEmail = (email) => {
        verifyBeforeUpdateEmail(auth.currentUser, email).then(() => {
            toast.success("Email is updated")
        })
    }

    const deleteProfile = () => {
        return deleteUser(auth.currentUser)
    }

    // const fetchFavouriteBook = async (bookId) => {
    //     return await fetch(`https://bookstorey.netlify.app/.netlify/functions/fetch-book-with-id?bookId=${bookId}`, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(response => response.json()).then(({bookstorey_Book_by_pk}) => bookstorey_Book_by_pk)
    // }


    // const fetchFavouritesData = async () => {
    //     /** Fetch book data using netlify function */
    //     try {
    //         const favouritesResponse = await fetchFavouritesList()
    //         return await Promise.all(favouritesResponse.map(async (bookId) => {
    //             return await fetchFavouriteBook(bookId)
    //         }))
    //     } catch(e){
    //         console.error(e)
    //         return
    //     }
    // }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user)
            setCurrentUser(user)
            setIsLoading(false)
        })

        return unsubscribe
    }, [])

    const value = { auth, currentUser, signUp, login, logout, isLoading, deleteProfile, updateUserDisplayName, updateUserEmail, reauthenticate: reauthenticateUserCredentials, fetchFavouritesList }

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}