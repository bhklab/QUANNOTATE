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
      <h1>Q-Annotate</h1>
      <p>Q-Annotate description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus ultrices leo. Cras scelerisque lorem nec blandit gravida. Nunc molestie suscipit dui at fermentum. Vestibulum vel risus interdum, laoreet diam at, rutrum nibh. Nullam in metus a ipsum tincidunt egestas. Cras et accumsan nisi. Vestibulum faucibus lorem vitae mi pellentesque tristique.</p>
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
          error={error && error.email}
          helperText={(error && error.email && error.email.message) && error.email.message}
          onChange={e => handleInputChange(e, 'email')}
        />
        <CustomTextField
          required
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          error={error && error.password}
          helperText={(error && error.password && error.password.message) && error.password.message}
          onChange={e => handleInputChange(e, 'password')}
        />
        {(error && error.generic && error.generic.message) ? (<p className='error-message'>{error.generic.message}</p>) : null}
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
