import React, { useState } from 'react';
import StyledSlider from './StyledSlider';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../../../styles/colors';


const useStyles = makeStyles((theme) => ({
  controls: {
    display: 'flex',
    marginLeft: 10,
    '& div > svg': {
      color: colors.blue,
      "&:hover": {
        color: colors.purple,
      }
    },
    '& .playing > svg': {
      color: colors.purple
    }
  },
}));

const PlayerComponent = (props) => {
  const { images } = props
  const [ selectedImage, setSelectedImage ] = useState(0);
  const [ playing, setPlaying ] = useState(false);
  const classes = useStyles();

  let play
  if (playing) {
    if (selectedImage + 1 === images.length) {
      setPlaying(false)
      play = setTimeout(
        () => {
          setSelectedImage(0)
        },
        80
      )
    } else {
      play = setTimeout(
        () => {
          console.log('Inside loop', playing, selectedImage);
          setSelectedImage(selectedImage + 1)
        },
        80
      )
    }
  }
  console.log(playing, selectedImage);

  const playImages = () => {
    setPlaying(true)
  }

  const pauseImages = () => {
    setPlaying(false)
  }

  const handleSliderChange = (value) => {
    console.log('Event');
    clearTimeout(play)
    setSelectedImage(value - 1)
    setPlaying(false)
  }

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
        onChange={(e, value) => handleSliderChange(value)}
      />
      <div className={classes.controls}>
        <div className={playing ? 'playing' : null}>
          <PlayArrowRoundedIcon
            onClick={playImages}
          />
        </div>
        <div>
          <PauseRoundedIcon
            onClick={pauseImages}
          />
        </div>
      </div>
    </div>
  </div>)
}

export default PlayerComponent;