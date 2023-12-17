import * as React from "react"
import {Router} from "@reach/router"
import Settings from "./settings"
import Favourites from "./favourites"
import AccountLanding from "../../components/Account/AccountLanding"
import Redirect from "./redirect"
import { login, isAuthenticated, getUserInfo, logout } from "../../utils/auth"

export default function AccountRouter(){
  if(localStorage.getItem("isLoggedIn") === "false"){
    login()
    return <Redirect />
  }

  return (
    <Router>
      <Settings path="/account/settings"/>
      <Favourites path="/account/favourites"/>
      <AccountLanding path="/account" user={getUserInfo()} logout={() => logout()}/>
    </Router>
  )
}
