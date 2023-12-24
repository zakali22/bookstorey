import React from "react"
import { Auth0Provider } from "./src/utils/auth"
import { navigate } from "gatsby"

const onRedirectCallback = (appState) => {
  navigate("http://localhost:8888/account/", { replace: true });
}

const Auth0Domain = process.env.GATSBY_AUTH0_DOMAIN
const Auth0ClientID = process.env.GATSBY_AUTH0_CLIENTID
const Auth0Audience = process.env.GATSBY_AUTH0_AUDIENCE
export const wrapRootElement = ({ element }) => (
  <Auth0Provider
    domain={Auth0Domain}
    clientId={Auth0ClientID}
    redirect_uri="http://localhost:8888/account/"
    audience={Auth0Audience}
  >
    {element}
  </Auth0Provider>
)