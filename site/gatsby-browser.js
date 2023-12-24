import React from "react"
import { Auth0Provider } from "./src/utils/auth"
import { navigate } from "gatsby"

const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

const Auth0Domain = process.env.GATSBY_AUTH0_DOMAIN
const Auth0ClientID = process.env.GATSBY_AUTH0_CLIENTID
const Auth0Audience = process.env.GATSBY_AUTH0_AUDIENCE
export const wrapRootElement = ({ element }) => (
  <Auth0Provider
    domain={Auth0Domain}
    clientId={Auth0ClientID}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    audience={Auth0Audience}
  >
    {element}
  </Auth0Provider>
)