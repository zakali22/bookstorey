import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext, AuthContextDispatch } from "../utils/authContext"

export default function AuthContextWrapper({ children }) {
    const { user, isLoading, isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
    const [userData, setUserData] = React.useState(null);

    React.useEffect(() => {
        const getUserMetadata = async () => {
          const domain = "dev-en4d7gc6egik0rbq.us.auth0.com";
      
          try {
            const accessToken = await getAccessTokenSilently({
              authorizationParams: {
                audience: `https://${domain}/api/v2/`,
                scope: "read:current_user",
              },
            });
      
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
      
            const metadataResponse = await fetch(userDetailsByIdUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
      
            const response = await metadataResponse.json();
      
            setUserData(response);
            console.log(response)
            console.log(user.sub)
          } catch (e) {
            console.log(e.message);
          }
        };
      
        getUserMetadata();
      }, [getAccessTokenSilently, user?.sub]);

    return (
        <AuthContext.Provider value={{userData, isLoading, isAuthenticated, loginWithRedirect, logout }}>
            {children}
        </AuthContext.Provider>
    )
}