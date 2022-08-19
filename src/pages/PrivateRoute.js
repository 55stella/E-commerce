import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later


const PrivateRoute = ({ children }) => {
  const { user } = useAuth0()
  
  
  if (!user) {
    <Navigate to= '/'/>
  }
  return children 
  // return <Route render={() => {
          
  //     return user? children :  <Redirect to='/'>
  //   </Redirect>
  // }}>
  //   {/* {console.log(myUser ===false)} */}
  // </Route>
}
// the private route component ensures that the checkout page is not accessed.
// it takes two argument, the children and the rest. the children is the component its ging
// to hide i.e the check out page the rest is the rest of the parametwr in the 
// exact path= '/checkout' it spreads out the rest and then checks to know if the user
// exists, if the user exists, it renders the children else it redirects the user to the 
// dashbord.
export default PrivateRoute;
