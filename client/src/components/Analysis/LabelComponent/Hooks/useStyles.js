import { makeStyles } from '@material-ui/core/styles';
import colors from '../../../../styles/colors';

const useStyles = makeStyles((theme) => ({
  label: {
    color: colors.white,
    transition: 'all 0.25s ease-in',
    '&:hover': {
      color: colors.blue,
    }
  },
  textarea: {
    marginBottom: 10,
    '& label': {
      color: colors.white,
      fontSize: '1rem'
    },
    '&:hover label': {
      color: colors.blue,
    },
    '& label.Mui-focused': {
      color: colors.blue,
    },
    '& .MuiInputBase-root': {
      // padding: 10
      '&:before': {
        borderBottom: `1px solid ${colors.white}`
      },
      '&:after': {
        borderBottom: `1px solid ${colors.white}`
      },
      '&:hover:before': {
        borderBottom: `1px solid ${colors.blue}`
      },
      '&:hover:after': {
        borderBottom: `1px solid ${colors.blue}`
      },
      '& textarea': {
        color: colors.white,
        fontSize: '1rem',
        letterSpacing: 1
      }
    }
  },
  formControl: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    maxWidth: 450,
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