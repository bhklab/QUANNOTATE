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
            <div className='label-element'>
              <FormControlLabel
                className={classes.label}
                label={option.text}
                key={i}
                control={
                  <StyledCheckBox
                    checked={selection[i]}
                    onChange={(e) => updateLabel(e, option.dataType, i)} 
                    name={option.text}
                  />}
              />
            </div>)
        case 'dropdown':
          return (
            <div className='label-element'>
              <FormControl 
                variant="outlined" 
                className={classes.formControl}
                key={i}
              >
                <InputLabel>{option.text}</InputLabel>
                <Select
                  value={selection[i]}
                  onChange={(e) => updateLabel(e, option.dataType, i)} 
                  label={option.text}
                >
                  {option.options.map((suboption, index) => {
                    return (
                      <MenuItem 
                        key={`${i}-${index}`} 
                        value={suboption}
                      >
                        {suboption}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
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