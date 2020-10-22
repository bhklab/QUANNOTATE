import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Header from '../UtilComponenets/Header/Header';
import Footer from '../UtilComponenets/Footer/Footer';

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
              <Route exact path='/signup' component={Signup} />
            </Switch>
          </BrowserRouter>
        </div>
      </main>
      <Footer />
    </AuthContext.Provider>
  )
}

export default Router