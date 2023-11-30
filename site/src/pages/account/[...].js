import * as React from "react"
import Section from "../../../../gatsby-theme/src/components/Section"
import { navigate } from "gatsby"
import { Router } from "@reach/router"
import SignIn from "./signin"
import Profile from "../../components/Profile"
import Landing from "../index"
import PrivateRoute from "../../components/PrivateRoute"

export default function Account(){
    return (
        <Router basepath="/account">    
            <PrivateRoute path="/profile" component={Profile} default />
            <SignIn path="/signin" />
        </Router>
    )
}