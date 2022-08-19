import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useReducer } from 'react/cjs/react.production.min'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const {  loginWithRedirect,
    logout,  user } = useAuth0();

  const [myUser, setMyUser] = useState(false)
  
  useEffect(() => {
    // console.log(`user: ${user}`)
    // console.log(`isauthenticated: ${isAuthenticated}`)
    // console.log(`isloading: ${isLoading}`)
    setMyUser(user)
    
  },[user])

  return (
    <UserContext.Provider value={{loginWithRedirect, logout, myUser}}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
