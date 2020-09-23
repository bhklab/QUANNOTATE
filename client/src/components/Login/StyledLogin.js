import styled from 'styled-components';
import colors from '../../styles/colors';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const StyledLogin = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  padding: 10px;
  margin: 10px;
  div {
    margin-bottom: 20px;
  }
  button {
    padding: 18.5px 14px;
    border-radius: 4px;
  }
`;

const styles = {
  root: {
    marginTop: 0,
    '& label': {
      color: colors.white,
    },
    '&:hover label': {
      color: colors.purple,
    },
    '& label.Mui-focused': {
      color: colors.blue,
    },
    // overrides white styles on autofill
    '& input': {
      color: `${colors.white}`,
      WebkitTextFillColor: colors.white,
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
        borderColor: colors.purple,
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.blue,
      },
      "&:hover input": {
        color: `${colors.purple}`,
        WebkitTextFillColor: colors.purple,
      },
      "&.Mui-focused input": {
        color: `${colors.blue}`,
        WebkitTextFillColor: colors.blue,
        "&:-webkit-autofill": {
          WebkitTextFillColor: colors.blue
        }
      },
    },
  },
}

const CustomTextField = withStyles(styles)(TextField);



export { StyledLogin, CustomTextField };