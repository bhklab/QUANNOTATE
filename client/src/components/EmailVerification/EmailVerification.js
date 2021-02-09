/* eslint-disable default-case */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import StyledVerification from './StyledVerification'


const EmailVerification = (props) => {

  // retrieves type parameter from react router
  let location = useLocation();
  const parsed = queryString.parse(location.search);
  console.log(parsed);

  if (parsed.email) {
    return (
      <StyledVerification>
        <h2>Thank you for registering your account</h2>
        <h3>An email was sent to {parsed.email}. Please verify your account</h3>
        <Link className='std-button' to='/login'>Login</Link>
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