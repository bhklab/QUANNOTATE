import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StyledForm, CustomTextField } from '../UtilComponenets/StyledForm/StyledForm';
import useStyles from '../UtilComponenets/StyledForm/useStyles';

const Signup = () => {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("handleSubmit");
    if (password1 !== password2) {
      setError("Password are not matching")
    } else {
      console.log("Matching passswords");
    }
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
          value={password1}
          onChange={e => setPassword1(e.target.value)}
          autoComplete={false}
        />
        <CustomTextField
          required
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
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