import * as React from "react"
import {Router} from "@reach/router"
import Settings from "./settings"
import Favourites from "./favourites"
import AccountLanding from "../../components/Account/AccountLanding"
import Redirect from "../../components/Account/Redirect"
import { login, isAuthenticated, getUserInfo, logout } from "../../utils/auth"

export default function AccountRouter(){
  if(!isAuthenticated()){
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
