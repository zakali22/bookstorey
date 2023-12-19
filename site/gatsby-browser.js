import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { navigate } from 'gatsby';
import AuthContextWrapper from "./src/components/AuthContextProviderComp"

const onRedirectCallback = (appState) => {
  // Use Gatsby's navigate method to replace the url
  navigate("http://localhost:8888/account/callback", { replace: true });
};

export const wrapRootElement = ({ element }) => {
  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      clientId={process.env.GATSBY_AUTH0_CLIENTID}
      redirectUri="http://localhost:8888/account/callback"
      onRedirectCallback={onRedirectCallback}
    >
      <AuthContextWrapper>
        {element}
      </AuthContextWrapper>
    </Auth0Provider>
  );
};