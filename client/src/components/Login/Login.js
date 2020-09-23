import React, { useState } from 'react';
import useStyles from './useStyles';
import { StyledLogin, CustomTextField } from './StyledLogin';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const classes = useStyles();

  const handleInputChange = (e, type) => {
    const { value } = e.target
    if (type === 'email') setEmail(value)
    if (type === 'password') setPassword(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("handleSubmit");
  }

  return (
    <StyledLogin 
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <CustomTextField
        required
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={e => handleInputChange(e, 'email')}
      />
      <CustomTextField
        required
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={e => handleInputChange(e, 'password')}
      />
      <button
        type="submit"
      >
        Sign In
      </button>
    </StyledLogin>
  )
}

export default Login
