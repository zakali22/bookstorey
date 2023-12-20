import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { navigate } from 'gatsby';
import AuthContextWrapper from "./src/components/AuthContextProviderComp"

const onRedirectCallback = (appState) => {
  // Use Gatsby's navigate method to replace the url
  navigate("http://localhost:8888/account/", { replace: true });
};

export const wrapRootElement = ({ element }) => {
  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      clientId={process.env.GATSBY_AUTH0_CLIENTID}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: "http://localhost:8888/account/",
        audience: "https://dev-en4d7gc6egik0rbq.us.auth0.com/api/v2/", 
        scope: "read:current_user update:current_user_metadata"
      }}
    >
      <AuthContextWrapper>
        {element}
      </AuthContextWrapper>
    </Auth0Provider>
  );
};