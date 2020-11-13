import React, { useState, useEffect } from 'react';
// Material UI imports
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import StyledCheckBox from './StyledCheckBox';
import useStyles from './Hooks/useStyles';

// prepopulates selection state in the component when options appear/change
const createSelectionSet = (options) => {
  const selectionSet = {}
  options.forEach((option, index) => {
    switch (option.dataType) {
      case 'checkbox':
        selectionSet[index] = false;
        break
      case 'dropdown':
        selectionSet[index] = option.options[0];
        break;
      case 'text':
        selectionSet[index] = ''
        break;
      default:
        return null;
    }
  })
  return selectionSet
}

const LabelComponent = (props) => {
  const { options } = props;
  const [ selection, setSelection ] = useState(createSelectionSet(options));
  const classes = useStyles();

  console.log(options);

  useEffect(() => {
    setSelection(createSelectionSet(options))
  }, [options])
  // handles user selection
  const updateLabel = (e, dataType, index) => {
    const { value } = e.target 
    console.log(value, dataType, index);
    switch (dataType) {
      case 'checkbox':
        setSelection({ ...selection, [index]: !selection[index]});
        break
      case 'dropdown':
        setSelection({ ...selection, [index]: value})
        break;
      case 'text':
        break;
      default:
        break;
    }
  }
  // creates jsx to render label options
  const generateOptions = () => {
    const output = options.map((option, i) => {
      switch (option.dataType) {
        case 'checkbox':
          return (
            <FormControlLabel
              label={option.text}
              key={i}
              control={
                <StyledCheckBox
                  checked={selection[i]}
                  onChange={(e) => updateLabel(e, option.dataType, i)} 
                  name={option.text}
                />}
            />)
        case 'dropdown':
          return (
            <FormControl 
              variant="outlined" 
              className={classes.formControl}
              key={i}
            >
              <InputLabel id="demo-simple-select-outlined-label">{option.text}</InputLabel>
              <Select
                value={selection[i]}
                onChange={(e) => updateLabel(e, option.dataType, i)} 
                label={option.text}
              >
                {option.options.map(suboption => {
                  return (
                    <MenuItem value={suboption}>{suboption}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          )
        case 'text':
          break;
        default:
          return null;
      }
    })
    return (
      <FormGroup>
        {output}
      </FormGroup>
    )
  }

  return (
    <div className='option-container'>
      {generateOptions(options)}
      <button type='submit'>Submit Labels</button>
    </div>
  )
} 

export default LabelComponent;