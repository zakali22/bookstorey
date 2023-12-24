// src/react-auth0-spa.js
import React, { useState, useEffect, useContext } from "react"
import {createAuth0Client} from "@auth0/auth0-spa-js"

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

const defaultContext = {
  isAuthenticated: false,
  user: null,
  loading: false,
  popupOpen: false,
  loginWithPopup: () => {},
  handleRedirectCallback: () => {},
  getIdTokenClaims: () => {},
  loginWithRedirect: () => {},
  getTokenSilently: () => {},
  getTokenWithPopup: () => {},
  logout: () => {},
}

export const Auth0Context = React.createContext(defaultContext)
export const useAuth0 = () => useContext(Auth0Context)
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  domain, 
  clientId, 
  redirect_uri, 
  audience
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [auth0Client, setAuth0] = useState({})
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

  let auth0FromHook = null;

  useEffect(() => {
    const initAuth0 = async () => {
      auth0FromHook = await createAuth0Client({
        domain,
        clientId,
        authorizationParams: {
          redirect_uri,
          audience,
          scope: "read:current_user update:current_user_metadata update:users update:users_app_metadata"
        }
      })
      setAuth0(auth0FromHook)

      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated()

      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser()
        const accessToken = await auth0FromHook.getTokenSilently({
          authorizationParams: {
            audience: "https://dev-en4d7gc6egik0rbq.us.auth0.com/api/v2/",
            scope: "read:current_user update:current_user_metadata update:users update:users_app_metadata"
          }
        })

        const userDetailsByIdUrl = `https://dev-en4d7gc6egik0rbq.us.auth0.com/api/v2/users/${user.sub}`;
      
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const response = await metadataResponse.json();

        console.log(response)
        setUser(response)
      }
      setLoading(false)
    }
    initAuth0()
    // eslint-disable-next-line
  }, [])

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true)
    try {
      await auth0Client.loginWithPopup(params)
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }

    setIsAuthenticated(true)
  }

  const updateUser = async () => {
    if(Object.keys(auth0Client).length === 0) return 

    try {
      const accessToken = await auth0Client.getTokenSilently({
        authorizationParams: {
          audience: "https://dev-en4d7gc6egik0rbq.us.auth0.com/api/v2/",
          scope: "read:current_user update:current_user_metadata update:users update:users_app_metadata"
        }
      })
  
      // const userDetailsByIdUrl = `https://dev-en4d7gc6egik0rbq.us.auth0.com/api/v2/users/${user.sub}`;
    
      const metadataResponse = await fetch("https://bookstorey.netlify.app/.netlify/functions/fetch-user", {
        headers: {
          "Access-Control-Request-Headers": "Content-Type, Accept, authorization",
          "Access-Control-Request-Method": "PUT, GET, HEAD, POST, DELETE, OPTIONS, PATCH",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const response = await metadataResponse.json();
  
      console.log(response)
    } catch (error){
      console.error(error)
    }
    
  }

  updateUser()

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback: defaultContext.handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}