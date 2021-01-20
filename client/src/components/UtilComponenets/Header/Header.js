import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
      <Link to='/'>
        <div className='logo'>
          <h4>Q-Annotate</h4>
        </div>
      </Link>
      <div className='account-container'>
        <div className='user'>
          <p>Hello, {username}</p>
          <p>{email}</p>
        </div>
        <button
          onClick={onLogout}
        >Sign Out</button>
      </div>
    </StyledHeader>
  ) : (
    <div></div>
  )
}

export default Header;