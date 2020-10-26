// Cutom route components that can be used to differentiate between public and private routes based on authentication status
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/authContext';

const CustomRoute = ({ component: Component, privateRoute, ...rest }) => {
  const auth = useContext(AuthContext)
  const { authenticated } = auth;
  return (
    <Route {...rest} render={(props) => (
      privateRoute
        ? (authenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { path: props.location } }} />)
        : (authenticated ? <Redirect to={{ pathname: '/', state: { path: props.location } }} /> : <Component {...props} />)
    )} />
  ) 
}

export default CustomRoute;