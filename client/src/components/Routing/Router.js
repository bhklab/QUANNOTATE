import React, { useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Dashboard from '../Dashboard/Dashboard';
import Header from '../UtilComponenets/Header/Header';
import Footer from '../UtilComponenets/Footer/Footer';
import CustomRoute from './CustomRoute';

const Router = () => {
  const [authState, setAuthState] = useState({ authenticated: false })
  return (
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
  )
}

export default Router