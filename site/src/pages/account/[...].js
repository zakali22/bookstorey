import * as React from "react"
import {Router} from "@reach/router"
import Settings from "./settings"
import Favourites from "./favourites"
import AccountLanding from "../../components/Account/AccountLanding"
import Redirect from "../../components/Account/Redirect"
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "../../utils/authContext"

function AccountRouter(){
  const [loading, setLoading] = React.useState(true)
  const {user, isLoading} = React.useContext(AuthContext)

  React.useEffect(() => {
    if(isLoading) return

    setLoading(false)
  }, [isLoading])

  if(loading){
    return <Redirect toText="account" />
  }

  return (
    <Router>
      <Settings path="/account/settings"/>
      <Favourites path="/account/favourites"/>
      <AccountLanding path="/account"/>
    </Router>
  )
}

export default AccountRouter;