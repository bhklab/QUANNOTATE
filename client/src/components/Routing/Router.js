import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthContext from '../../context/auth';
import Login from '../Login/Login'
import Header from '../UtilComponenets/Header';
import Footer from '../UtilComponenets/Footer';

const Router = () => {
  const [authState, setAuthState] = useState({ authenticated: false })
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Header />
      <main>
        <div className='wrapper'>
          <Switch>
            <Route exact path='/' component={Login} />
          </Switch>
        </div>
      </main>
      <Footer />
    </AuthContext.Provider>
  )
}

export default Router