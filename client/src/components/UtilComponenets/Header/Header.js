import React, { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../context/authContext';
import StyledHeader from './StyledHeader';

const Header = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const { authenticated, email, username } = authState;

  const onLogout = () => {
    axios.get('/api/user/logout')
    .then(() => {
      setAuthState({...authState, username: null, email: null, authenticated: false})
    })
    .catch(err => {
      console.log('Couldn\'t logout');
      console.log(err);
    })
  }

  return authenticated ? (
    <StyledHeader>
      <h4>LabelIt</h4>
      <div className='account-container'>
        <div>
          <p>Hello, {username}</p>
          <p>{email}</p>
        </div>
        <button
          onClick={onLogout}
        >Logout</button>
      </div>
    </StyledHeader>
  ) : (
    <div></div>
  )
}

export default Header;