import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import colors from '../../../styles/colors';

const StyledSlider = withStyles({
  root: {
    color: colors.blue,
    padding: '15px 0'
  },
})(Slider);

export default StyledSlider