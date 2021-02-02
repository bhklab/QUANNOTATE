import { makeStyles } from '@material-ui/core/styles';
import colors from '../../../../styles/colors';

const useStyles = makeStyles((theme) => ({
  controls: {
    display: 'flex',
    marginLeft: 10,
    '& div': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    '& div > svg': {
      color: colors.blue,
      "&:hover": {
        color: colors.white,
      }
    },
    '& .playing > svg': {
      color: colors.white
    }
  },
  formControl: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    maxWidth: 300,
    textAlign: 'left',
    '& label': {
      color: colors.white,
    },
    '&:hover label': {
      color: colors.blue,
    },
    '& label.Mui-focused': {
      color: colors.white,
    },
    '& .MuiOutlinedInput-root': {
      color: colors.white,
      '&:hover': {
        color: colors.white
      },
      '&.Mui-focused': {
        color: colors.white
      },
      '& fieldset': {
        borderColor: colors.blue,
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