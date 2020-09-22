import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import StyledLogin from './StyledLogin';
import colors from '../../styles/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const styles = { 
  root: {
    marginTop: 0,
    '& label': {
      color: colors.white,
    },
    '&:hover label': {
      color: colors.blue,
    },
    '& label.Mui-focused': {
      color: colors.purple,
    },
    // overrides white styles on autofill
    '& input': {
      color: `${colors.white} !important`,
      "&:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0 1000px ${colors.black} inset`,
        WebkitTextFillColor: colors.white,
        FontSize: 'calc(10px + 2vmin)'
      },
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: colors.white,
      },
      '&:hover fieldset': {
        borderColor: colors.blue,
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.purple,
      },
    },
  },
}

const CustomTextField = withStyles(styles)(TextField);

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
    <StyledLogin className={classes.root} onSubmit={handleSubmit}>
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
