import React, { useState, useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import StyledCheckBox from './StyledCheckBox';

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
  console.log(options);
  const [selection, setSelection] = useState(createSelectionSet(options))

  useEffect(() => {
    setSelection(createSelectionSet(options))
  }, [options])

  const updateLabel = (e, index) => {
    console.log(e.value, index);
  }

  const generateOptions = () => {
    const output = options.map((option, i) => {
      switch (option.dataType) {
        case 'checkbox':
          return (
            <FormControlLabel
              control={
                <StyledCheckBox
                  checked={selection[i]}
                  onChange={(e) => updateLabel(e, i)} 
                  name="checkedA"
                />}
              label={option.text}
              key={i}
            />)
        case 'dropdown':
          break;
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