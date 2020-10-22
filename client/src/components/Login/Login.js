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
    <>
      <h1>LabelIt</h1>
      <p>LabelIt description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus ultrices leo. Cras scelerisque lorem nec blandit gravida. Nunc molestie suscipit dui at fermentum. Vestibulum vel risus interdum, laoreet diam at, rutrum nibh. Nullam in metus a ipsum tincidunt egestas. Cras et accumsan nisi. Vestibulum faucibus lorem vitae mi pellentesque tristique.</p>
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
        <div className='button-container'>
          <a>Forgot password?</a>
        </div>
        <div className='button-container submit-container'>
          <a>New user?</a>
          <button
            type="submit"
          >
            Next
          </button>
        </div>
      </StyledLogin>
    </>
  )
}

export default Login
