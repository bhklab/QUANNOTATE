import { makeStyles } from '@material-ui/core/styles';
import colors from '../../../../styles/colors';

const useStyles = makeStyles((theme) => ({
  label: {
    // width: '100%',
  },
  formControl: {
    width: '100%',
    '& label': {
      color: colors.white,
    },
    '&:hover label': {
      color: colors.blue,
    },
    '& label.Mui-focused': {
      color: colors.blue,
    },
    '& .MuiOutlinedInput-root': {
      color: colors.white,
      '&:hover': {
        color: colors.blue
      },
      '&.Mui-focused': {
        color: colors.blue
      },
      '& fieldset': {
        borderColor: colors.white,
      },
      '&:hover fieldset': {
        borderColor: colors.blue,
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.blue,
      },
      '& svg': {
        color: colors.white
      },
      '&:hover svg': {
        color: colors.blue,
      },
      '&.Mui-focused svg': {
        color: colors.blue,
      },
    }  
  }
}));

export default useStyles;