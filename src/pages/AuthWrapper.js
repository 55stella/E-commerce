import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'
import { Children } from 'react/cjs/react.production.min'

const AuthWrapper = ({children}) => {
  const { IsLoading, error } = useAuth0()
  if (IsLoading) {
    return <Wrapper>
     <h1>loading...</h1>
    </Wrapper>
  }
  if (error) {
    return <Wrapper>
      <h1>{ error.message}</h1>
    </Wrapper>
  }
  return <>
    {children}
  </>
}
// the auth rapper gives our application enough time to check for the user in that way we 
// are not directly requesting for the user in the private route
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export default AuthWrapper
