/* eslint-disable default-case */
import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
// import queryString from 'query-string';
import StyledNotification from './StyledNotification'



const Notification = () => {
  const [ sending, setSending ] = useState(false)
  const { type, subtype } = useParams()
  const resendEmail = () => {
    setSending(true)
    // resend verification email logic goes here
    // subtype parameter is email for registered type
    axios.post(`/api/user/account/activate`, { email: subtype })
      .then(() => {
        setSending(false)
      })
      .catch((err) => {
        console.log(err);
        setSending(false)
      })
    console.log(`Email resent for user ${subtype}`);
  }

  const generateNotification = () => {
    let notification
    switch (type) {
      case 'registered': {
        notification = (
          <div className='notification'>
            <h3>Thank you for registering your account</h3>
            <p className="text">We sent a verification link to your email</p>
            <p className="text">Please verify your account. No email?
              {!sending ? (<span onClick={resendEmail} className='resend'> Resend</span>) : " Sending..."}
            </p>
          </div>
        )
        break;
      }
      case 'verified': {
        notification = (
          <div className='notification'>
            <h3>Thank you for verifying your account</h3>
            <h4>You can log in now</h4>
          </div>
        )
        break;
      }
      case 'error': {
        if (subtype === 'expired') {
          notification = (
            <div className='notification'>
              <h3>The link you are trying to use is already expired</h3>
            </div>
          )
        }
        if (subtype === 'no-user') {
          notification = (
            <div className='notification'>
              <h3>This account doesn't exist</h3>
            </div>
          )
        }
        break;
      }
      default: {
        break;
      }
    }
    return notification
  }

  return (
    <StyledNotification>
      <div className='internal-container'>
        {generateNotification()}
        <div className="button-container">
          <Link className='std-button-1' to='/login'>Login</Link>
        </div>
      </div>
    </StyledNotification>
  )
}

export default Notification;