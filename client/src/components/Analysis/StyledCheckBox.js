import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import colors from '../../styles/colors';

const StyledCheckBox = withStyles({
  root: {
    color: colors.blue,
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default StyledCheckBox;