import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Dashboard from '../Dashboard/Dashboard';
import Header from '../UtilComponenets/Header/Header';
import Footer from '../UtilComponenets/Footer/Footer';
import CustomRoute from './CustomRoute';

const Router = () => {
  const [authState, setAuthState] = useState({ authenticated: false, username: null, isAuthChecked: false })
  // checks if client is already logged in
  useEffect(() => {
    axios.get('/api/user/checkToken', { withCredentials: true })
      .then(res => {
        const { username, authenticated } = res.data
        setAuthState({ username, authenticated, isAuthChecked: true })
      })
      .catch(err => {
        console.log(err);
        setAuthState({ authenticated: false, username: null, isAuthChecked: true })
      })
  }, [])
  // only gives access to react-router after jwt cookie was checked
  // this prevents multiple redirects and keeps the url unchanged
  return authState.isAuthChecked ? (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Header />
      <main>
        <div className='wrapper'>
          <BrowserRouter>
            <Switch>
              <CustomRoute exact path="/" privateRoute={true} component={Dashboard} />
              <CustomRoute exact path='/login' privateRoute={false} component={Login} />
              <CustomRoute exact path='/signup' privateRoute={false} component={Signup} />
            </Switch>
          </BrowserRouter>
        </div>
      </main>
      <Footer />
    </AuthContext.Provider>
  ) : null
}

export default Router