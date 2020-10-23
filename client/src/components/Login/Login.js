import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useStyles from '../UtilComponenets/StyledForm/useStyles';
import { StyledForm, CustomTextField } from '../UtilComponenets/StyledForm/StyledForm';


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
