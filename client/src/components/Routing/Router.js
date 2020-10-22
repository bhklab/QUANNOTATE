import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContext from '../../context/authContext';
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
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Login} />
            </Switch>
          </BrowserRouter>
        </div>
      </main>
      <Footer />
    </AuthContext.Provider>
  )
}

export default Router