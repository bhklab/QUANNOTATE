import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useStyles from '../UtilComponenets/StyledForm/useStyles';
import { StyledForm, CustomTextField } from '../UtilComponenets/StyledForm/StyledForm';
import AuthContext from '../../context/authContext';


const Login = () => {
  const { setAuthState, authState } = useContext(AuthContext)
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState(null);
  const classes = useStyles();

  const handleInputChange = (e, type) => {
    const { value } = e.target
    setError(null)
    if (type === 'email') setEmail(value)
    if (type === 'password') setPassword(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      setError({email: { message: "Please provide email address"} })
      return
    }
    if (!password) {
      setError({ password: { message: "Please provide password" } })
      return
    }
    const user = {
      email,
      password
    }
    axios.post(`/api/user/authenticate`, { user })
      .then(res => {
        const { username, authenticated, email } = res.data
        setAuthState({ ...authState, email, username, authenticated })
      })
      .catch(err => {
        const { error } = err.response.data;
        console.log(error);
        if (error && error.message === 'unverified') {
          setError({ email: { message: "Your account hasn't been verified" }, resendBox: true, emailSent: false })
        } else if (error && error.errors) {
          setError(error.errors)
        } else {
          setError({ generic: { message: 'Something went wrong' } })
        }
      })
  }

  const resendEmail = () => {
    console.log('Sending request for a new email');
    const newErrorState = { ...error, emailSent: true }
    setError(newErrorState)
  }

  // creates a UI element if email address user provided haven't yet been verified
  const generateResendBox = () => {
    if (error && error.resendBox) {
      return !error.emailSent ? (
          <p className='email-resend'>Haven't received our email? <span onClick={resendEmail} className='resend-btn'>Resend</span></p>
        ) : (<p className='email-resend'>Email is on its way</p>)
    }
    return null
  }

  return (
    <>
      <h1>QUANNOTATE</h1>
      <StyledForm
        className={classes.root}
        onSubmit={handleSubmit}
      >
        <CustomTextField
          required
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          error={error && error.hasOwnProperty('email')}
          helperText={(error && error.email && error.email.message) && error.email.message}
          onChange={e => handleInputChange(e, 'email')}
        />
        {/* Creates a special box that would allow user to request activation link to be sent to them */}
        {generateResendBox()}
        <CustomTextField
          required
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          error={error && error.hasOwnProperty('password')}
          helperText={(error && error.password && error.password.message) && error.password.message}
          onChange={e => handleInputChange(e, 'password')}
        />
        {(error && error.generic && error.generic.message) ? (
          <p className='error-message'>{error.generic.message}</p>
        ) : null}
        <div className='button-container'>
          <Link to='/signup'>Forgot password?</Link>
        </div>
        <div className='button-container submit-container'>
          <Link to='/signup'>New user?</Link>
          <button
            type="submit"
          >
            Next
          </button>
        </div>
      </StyledForm>
    </>
  )
}

export default Login
