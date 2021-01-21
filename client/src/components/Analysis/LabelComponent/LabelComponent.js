import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// Material UI imports
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
// component imports
import AnalysisContext from '../../../context/analysisContext';
import StyledCheckBox from './StyledCheckBox';
import StyledButtonContainer from './StyledButtonContainer';
import StyledOptions from './StyledOptions';
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

// seperates checkbox options from the rest
// needed for styling
const splitOptions = (options) => {
  // recreates a new array to avoid modifying original options
  const availableOptions = [...options]
  let splitIndex;
  for (let i = 0; i < options.length; i += 1) {
    if (availableOptions[i].dataType !== 'checkbox') break
    splitIndex = i + 1
  }
  return [availableOptions.splice(0, splitIndex), availableOptions]
}

const LabelComponent = () => {
  const { analysisInfo } = useContext(AnalysisContext);
  const { options } = analysisInfo;
  const [ selection, setSelection ] = useState(createSelectionSet(options));
  const classes = useStyles();
  useEffect(() => {
    setSelection(createSelectionSet(options))
  }, [options])

  // handles user selection
  const updateLabel = (e, dataType, index) => {
    const { value } = e.target 
    switch (dataType) {
      case 'checkbox':
        setSelection({ ...selection, [index]: !selection[index]});
        break
      case 'dropdown':
        setSelection({ ...selection, [index]: value})
        break;
      case 'text':
        setSelection({ ...selection, [index]: value})
        break;
      default:
        break;
    }
  }

  // creates jsx to render label options
  // uses indexOffset argument because it's needed to split selection options into two categories
  const generateOptions = (options, indexOffset) => {
    const output = options.map((option, i) => {
      switch (option.dataType) {
        case 'checkbox':
          return (
              <FormControlLabel
                className={classes.label}
                label={option.text}
                key={i + indexOffset}
                control={
                  <StyledCheckBox
                    checked={selection[i + indexOffset]}
                    onChange={(e) => updateLabel(e, option.dataType, i + indexOffset)} 
                    name={option.text}
                  />
                }
              />)
        case 'dropdown':
          return (
              <FormControl 
                variant="outlined" 
                className={classes.formControl}
              key={i + indexOffset}
              >
                <InputLabel>{option.text}</InputLabel>
                <Select
                value={selection[i + indexOffset]}
                onChange={(e) => updateLabel(e, option.dataType, i + indexOffset)} 
                  label={option.text}
                >
                  {option.options.map((suboption, index) => {
                    return (
                      <MenuItem 
                        key={`${i + indexOffset}-${index}`} 
                        value={suboption}
                      >
                        {suboption}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
          )
        case 'text':
          return (
            <TextField
              className={ classes.textarea }
              id="comments-field"
              multiline={true}
              label={ option.text }
              value={selection[i + indexOffset]}
              onChange={(e) => updateLabel(e, option.dataType, i + indexOffset)}
              key={i + indexOffset}
            />
          )
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

  // sends user labels to the server
  const handleSubmit = (e) => {
    e.preventDefault();
    // submit logic goes here
  }
  const [checboxOptions, otherOptions] = splitOptions(options)

  return (
    <div className='option-container'>
      <StyledOptions>
        <div className='checkbox-options'>
          {generateOptions(checboxOptions, 0)}
        </div>
        <div className='other-options'>
          {generateOptions(otherOptions, checboxOptions.length)}
        </div>
      </StyledOptions>
      <StyledButtonContainer>
        <button type='submit' onSubmit={handleSubmit}>Submit Labels</button>
        <Link to='/'>
          <button>Return to Dashboard</button>
        </Link>
      </StyledButtonContainer>
    </div>
  )
} 

export default LabelComponent;