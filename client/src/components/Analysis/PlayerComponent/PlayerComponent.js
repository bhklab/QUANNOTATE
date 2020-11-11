import React, { useState } from 'react';
import StyledSlider from './StyledSlider';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import colors from '../../../styles/colors';

const PlayerComponent = (props) => {
  const { images } = props
  const [selectedImage, setSelectedImage] = useState(0);
  
  return (<div className='player-container'>
    <div className="scan">
      <img alt='CT scan' src={`data:image/png;base64,${images[selectedImage]}`} />
    </div>
    <div className='patients-id'>
      <p>ID: Patient's ID that comes from API</p>
    </div>
    <div className="slider">
      <StyledSlider
        value={selectedImage + 1}
        min={1}
        max={images.length}
        valueLabelDisplay="auto"
        onChange={(e, value) => setSelectedImage(value - 1)}
      />
      <div className='controls'>
        <PlayArrowRoundedIcon
          style={{ color: colors.blue }}
          onClick={() => console.log('Start playing')}
        />
        <PauseRoundedIcon
          style={{ color: colors.blue }}
          onClick={() => console.log('Pause')}
        />
      </div>
    </div>
  </div>)
}

export default PlayerComponent;