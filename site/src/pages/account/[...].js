import * as React from "react"
import {Router} from "@reach/router"
import AccountSettings from "../../components/Account/AccountSettings"
import Favourites from "../../components/Account/Favourites"
import Redirect from "../../components/Account/Redirect"
import { useAuth0  } from "../../utils/auth"
import { Link } from "gatsby";
import Section from "../../../../gatsby-theme/src/components/Section";
import SubNav from "../../../../gatsby-theme/src/components/SubNav";
import { ProtectedRoute } from "../../components/ProtectedRoute"

function NavLink({partial = true, ...props}){
  return (
    <Link {...props} getProps={({isCurrent, isPartiallyCurrent}) => {
      const isActive = partial ? isPartiallyCurrent : isCurrent;
      return {style: { backgroundColor: isActive ? "#191177" : "#F2F2F2", color: isActive ? "#fff": "#191177"}}
    }} />
  )
}

function AccountWrapper({children}){
  return (
    <ProtectedRoute>
      <Section className="section--account">
        <SubNav>
          <NavLink to="/account" partial={false}>Settings</NavLink>
          <NavLink to="/account/favourites">Favourites</NavLink>
        </SubNav>
        <div className="account-wrapper">
          {children}
        </div>
      </Section>
    </ProtectedRoute>
  )
}

function AccountRouter(){
  const [loading, setLoading] = React.useState(true)
  const { loading: isLoading, isAuthenticated, loginWithRedirect } = useAuth0()

  React.useEffect(() => {
    if(isLoading) return

    setLoading(false)
  }, [isLoading])

  if(loading){
    return <Redirect toText="account" />
  }

  return (
    <Router>
      <AccountWrapper path="/account">
        <AccountSettings path="/" />
        <Favourites path="favourites" />
      </AccountWrapper>
    </Router>
  )
}


export default AccountRouter;