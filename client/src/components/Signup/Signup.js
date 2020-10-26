/* eslint-disable default-case */
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { StyledForm, CustomTextField } from '../UtilComponenets/StyledForm/StyledForm';
import useStyles from '../UtilComponenets/StyledForm/useStyles';
import AuthContext from '../../context/authContext';

const Signup = () => {
  const { setAuthState, authState } = useContext(AuthContext)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);
  const classes = useStyles();

  // validates filled form
  const validateForm = () => {
    if (password !== passwordConfirm) {
      const message = "Password are not matching"
      return { password: { message }, passwordConfirm: { message } }
    }
    if (password.length < 8) {
      return { 
        password: {
          message: 'Passwords has to be at least 8 characters long'
        }
      }
    }
    if (!password.match(/\d/) || !password.match(/[a-zA-Z]/)) {
      return {
        password: {
          message: 'Passwords must contain at least one letter and one number'
        }
      }
    }
    if (!username || !password || !passwordConfirm || !email) {
      const message = "All fields must be filled"
      return { 
        username: { message }, password: { message }, email: { message }, passwordConfirm: { message }
      }
    }
    return null
  }

  // updates ui when user types fills out the form
  const handleInput = (e, type) => {
    const { value } = e.target
    switch (type) {
      case 'username':
        setUsername(value)
        break;
      case 'email':
        setEmail(value)
        break;
      case 'password':
        setPassword(value)
        break
      case 'passwordConfirm':
        setPasswordConfirm(value)
        break;
    }
    // removes error message on typing
    if (error) setError(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // user must address error message before submitting the request
    if (error) return
    // checks if all data is correct
    const err = validateForm()
    if (err) {
      setError(err)
      return
    }
    const user = {
      username,
      password,
      email
    }
    axios.post(`/api/user/register`, ({ user }))
      .then(res => {
        console.log(res);
        setAuthState({ ...authState, authenticated: true })
      })
      .catch(err => {
        console.log(err);
        if (err.response.data.error && err.response.data.error.errors) {
          setError(err.response.data.error.errors)
        } else {
          setError({ generic: { message: 'Something went wrong' } })
        }
      })
  }

  return (
    <>
      <h1>LabelIt</h1>
      <StyledForm
        className={classes.root}
        onSubmit={handleSubmit}
      >
        <CustomTextField
          required
          label="Username"
          type="text"
          variant="outlined"
          value={username}
          error={error && error.username}
          helperText={(error && error.username && error.username.message) && error.username.message}
          onChange={e => handleInput(e, 'username')}
          autoComplete={false}
        />
        <CustomTextField
          required
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          error={error && error.email}
          helperText={(error && error.email && error.email.message) && error.email.message}
          onChange={e => handleInput(e, 'email')}
          autoComplete={false}
        />
        <CustomTextField
          required
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          error={error && error.password}
          helperText={(error && error.password && error.password.message) && error.password.message}
          onChange={e => handleInput(e, 'password')}
          autoComplete={false}
        />
        <CustomTextField
          required
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={passwordConfirm}
          error={error && error.passwordConfirm}
          helperText={(error && error.passwordConfirm && error.passwordConfirm.message) && error.passwordConfirm.message}
          onChange={e => handleInput(e, 'passwordConfirm')}
          autoComplete={false}
        />
        {(error && error.generic && error.generic.message) ? (<p className='error-message'>{error.generic.message}</p>) : null}
        <div className='button-container submit-container'>
          <Link to='/login'>Sign in instead</Link>
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

export default Signup;