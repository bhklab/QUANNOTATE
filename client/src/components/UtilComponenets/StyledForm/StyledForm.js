import styled from 'styled-components';
import colors from '../../../styles/colors';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  padding: 10px;
  margin: 10px;
  width: 25ch;
  a {
    color: ${colors.blue};
  }
  button {
    padding: 18.5px 20px;
    border-radius: 4px;
    border: 1px solid ${colors.white};
    font-size: 1.25rem;
    &:hover {
      color: ${colors.black};
      background: ${colors.blue};
      border: 1px solid ${colors.blue};
    }
  }
  .button-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    a {
      font-size: 0.875rem;
    }
  }
  .submit-container {
    padding: 20px 0 10px;
    a {
      padding: 18.5px 14px 18.5px 0;
      font-size: 1.25rem;
    }
  }
`;

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
      color: colors.blue,
    },
    // overrides white styles on autofill
    '& input': {
      color: `${colors.white}`,
      WebkitTextFillColor: colors.white,
      CaretColor: `${colors.blue}`,
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
        borderColor: colors.blue,
      },
      "&:hover input": {
        color: `${colors.blue}`,
        WebkitTextFillColor: colors.blue,
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



export { StyledForm, CustomTextField };