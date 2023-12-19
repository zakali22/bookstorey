import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext, AuthContextDispatch } from "../utils/authContext"

export default function AuthContextWrapper({ children }) {
    const { user, isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    console.log(user)

    return (
        <AuthContext.Provider value={{ user, isLoading, isAuthenticated, loginWithRedirect, logout }}>
            {children}
        </AuthContext.Provider>
    )
}