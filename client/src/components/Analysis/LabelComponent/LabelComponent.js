import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
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
import AuthContext from '../../../context/authContext';
import AnalysisContext from '../../../context/analysisContext';
import StyledCheckBox from './StyledCheckBox';
import StyledButtonContainer from './StyledButtonContainer';
import StyledOptions from './StyledOptions';
import useStyles from './Hooks/useStyles';

// prepopulates selection state in the component when options appear/change
const createSelectionSet = (options) => {
  const selectionSet = {}
  options.forEach((option, index) => {
    const { dataType, id } = option;
    switch (dataType) {
      case 'checkbox':
        selectionSet[id] = false;
        break
      case 'dropdown':
        selectionSet[id] = option.options[0];
        break;
      case 'text':
        selectionSet[id] = ''
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
  const { analysisInfo, setAnalysisInfo } = useContext(AnalysisContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const { options } = analysisInfo;
  const [ selection, setSelection ] = useState(createSelectionSet(options));
  const [ errorPopup, setErrorPopup ] = useState();
  const classes = useStyles();
  const isSubscribed = useRef(true);

  useEffect(() => {
    return () => {
      // memory leak prevention on label submission
      isSubscribed.current = false;
    }
  }, []);

  useEffect(() => {
    if (errorPopup) setErrorPopup('')
    setSelection(createSelectionSet(options))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  // handles user selection
  const updateLabel = (e, dataType, id) => {
    const { value } = e.target 
    switch (dataType) {
      case 'checkbox':
        setSelection({ ...selection, [id]: !selection[id]});
        break
      case 'dropdown':
        setSelection({ ...selection, [id]: value})
        break;
      case 'text':
        setSelection({ ...selection, [id]: value})
        break;
      default:
        break;
    }
  }

  // creates jsx to render label options
  // uses indexOffset argument because it's needed to split selection options into two categories
  const generateOptions = (options, indexOffset) => {
    const output = options.map((option, i) => {
      const { dataType, id } = option
      switch (dataType) {
        case 'checkbox':
          return (
              <FormControlLabel
                className={classes.label}
                label={option.text}
                key={i + indexOffset}
                control={
                  <StyledCheckBox
                    checked={selection[id]}
                    onChange={(e) => updateLabel(e, option.dataType, id)} 
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
                  value={selection[id]}
                  onChange={(e) => updateLabel(e, option.dataType, id)} 
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
              value={selection[id]}
              onChange={(e) => updateLabel(e, option.dataType, id)}
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
    const { analysis, patient } = analysisInfo;
    axios.post('/api/analysis/patient', {
      analysisId: analysis.id,
      patientId: patient.id,
      values: selection
    })
      .then(function (response) {
        if (isSubscribed) setAnalysisInfo({ ...analysisInfo, loaded: false})
      })
      .catch(function (error) {
        if (isSubscribed) {
          const { response } = error
          // redirects user to the login page if the response status indicates that user is unauthorized (401)
          if (response && response.status === 401) {
            setAuthState({ ...authState, authenticated: false, username: null, email: null }) 
          } else {
            setErrorPopup("Labels haven't been submitted, please try again")
          }
        }
      });
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
        <button type='button' onClick={handleSubmit}>Submit Labels</button>
        <Link to='/'>
          <button>Return to Dashboard</button>
        </Link>
      </StyledButtonContainer>
      {errorPopup ? <p className='error-popup'>{errorPopup}</p> : null}
    </div>
  )
} 

export default LabelComponent;