import { useEffect } from "react"
import { useAuth } from "../utils/auth"
import { navigate } from "gatsby"

export const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading } = useAuth()
  console.log(currentUser)
  if(!currentUser && !isLoading) {
    navigate("/account/signin")
    return
  }


  return children
}