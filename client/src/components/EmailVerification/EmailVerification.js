/* eslint-disable default-case */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import StyledVerification from './StyledVerification'


const EmailVerification = (props) => {
  // retrieves type parameter from react router
  let location = useLocation();
  const { email } = queryString.parse(location.search);
  const resendEmail = () => {
    // resend verification email logic goes here
    console.log('Email resent');
  }

  if (email) {
    return (
      <StyledVerification>
        <div className='internal-container'>
          <h3>Thank you for registering your account</h3>
          <p className="text">An email was sent to <span className='email'>{email}</span></p>
          <p className="text">Please verify your account. No email? <span onClick={resendEmail} className='resend'>Resend</span></p>
          <div className="button-container">
            <Link className='std-button-1' to='/login'>Login</Link>
          </div>
        </div>
      </StyledVerification>
    )
  }
  return (
    <>
      <h1>Verify Page</h1>
    </>
  )
}

export default EmailVerification;