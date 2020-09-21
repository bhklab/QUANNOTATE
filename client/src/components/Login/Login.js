import React from 'react';
import StyledLogin from './StyledLogin'

const Login = () => {

  const handleUserChange = () => {
    console.log("handleUserChange");
  }
  const handlePasswordChange = () => {
    console.log("handlePasswordChange");
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("handleSubmit");
  }

  return (
    <StyledLogin onSubmit={handleSubmit}>
      <input 
        type="text"
        required
        id="email"
        name="email"
        placeholder="Enter your email"
        onChange={handleUserChange}
      />
      <input
        type="text"
        id="password"
        name="password"
        placeholder="Enter your password"
        onChange={handlePasswordChange}
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
