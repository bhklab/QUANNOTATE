import React, { useContext } from 'react';
import AuthContext from '../../../context/authContext';
import StyledHeader from './StyledHeader';

const Header = () => {
  const { authState } = useContext(AuthContext);
  console.log(authState);
  const { authenticated, email, username } = authState;
  return authenticated ? (
    <StyledHeader>
      <h4>LabelIt</h4>
      <div className='account-container'>
        <div>
          <p>Hello, {username}</p>
          <p>{email}</p>
        </div>
        <button>Logout</button>
      </div>
    </StyledHeader>
  ) : (
    <div></div>
  )
}

export default Header;