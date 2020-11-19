import { makeStyles } from '@material-ui/core/styles';
import colors from '../../../../styles/colors';

const useStyles = makeStyles((theme) => ({
  controls: {
    display: 'flex',
    marginLeft: 10,
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
}));

export default useStyles;