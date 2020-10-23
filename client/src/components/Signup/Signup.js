import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { StyledForm, CustomTextField } from '../UtilComponenets/StyledForm/StyledForm';
import useStyles from '../UtilComponenets/StyledForm/useStyles';

const Signup = () => {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("handleSubmit");
    if (password !== passwordConfirm) {
      setError("Password are not matching")
      return
    }
    if (password.length < 8) {
      setError('Password has to be at least 8 characters long');
      return
    }
    if (!password.match(/\d/) || password.match(/[a-zA-Z]/)) {
      setError('Password must contain at least one letter and one number')
      return
    }
    if (!username || !password || !passwordConfirm || !email) {
      setError("All fields must be filled")
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
        console.log(res.data);
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
          onChange={e => setUsername(e.target.value)}
          autoComplete={false}
        />
        <CustomTextField
          required
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete={false}
        />
        <CustomTextField
          required
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete={false}
        />
        <CustomTextField
          required
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
          autoComplete={false}
        />
        <div className='button-container submit-container'>
          <Link to='/'>Sign in instead</Link>
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