/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import axios from 'axios';
import { useParams } from "react-router-dom";
import StyledSlider from './StyledSlider';
import useStyles from './Hooks/useStyles';
import AnalysisContext from '../../../context/analysisContext';
import ReactImageMagnify from 'react-image-magnify';
import colors from '../../../styles/colors';

// helper funstions that accepts array buffer and produce byte64 string to be rendered as an image in the browser
const convertBufferToBase64String = (buffer) => btoa(
  new Uint8Array(buffer)
    .reduce((data, byte) => data + String.fromCharCode(byte), '')
);

const PlayerComponent = () => {
  const { analysisInfo, setError } = useContext(AnalysisContext);
  const { patient } = analysisInfo;
  // retrieves type parameter from react router
  const { type } = useParams()
  const [ images, setImages ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ selectedImage, setSelectedImage ] = useState(0);
  const [ playing, setPlaying ] = useState(false);
  const classes = useStyles();
  let play
  // functions that is triggered when user uses slider to select a particular scan
  const handleSliderChange = (value) => {
    clearTimeout(play)
    const isCurrentlyPlaying = playing
    if (isCurrentlyPlaying) setPlaying(false)
    setTimeout(() => {
      setSelectedImage(value - 1)
      setPlaying(isCurrentlyPlaying)
    }, 80)
  }
  // function that plays ct scans by updating components state
  const playImages = () => {
    if (selectedImage + 1 === images.length) {
      setPlaying(false)
      play = setTimeout(
        () => {
          setSelectedImage(0)
        }, 80)
    } else {
      play = setTimeout(
        () => {
          setSelectedImage(selectedImage + 1)
        }, 80)
    }
  }
  // gets images from the server and transforms them into a readble state
  useEffect(() => {
    // prevents memory leaks
    let isSubsribed = true;
    axios.get(`/api/analysis/${type}/images?patient_id=${patient.id}`)
      .then(res => {
        if (isSubsribed) {
          const responseImages = [];
          const { images, windowing } = res.data
          // processes image buffers to be rendered on the page
          if (!windowing) {
            images.default.forEach(imgBuffer => {
              const base64 = convertBufferToBase64String(imgBuffer.data);
              responseImages.push(base64);
              setImages({ default: responseImages })
            })
          } else {
            Object.entries(images).forEach(collection => {
              console.log(collection);
            })
          }
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setError(err)
      })
    return () => {isSubsribed = false}
  }, [type])

  if (loading) {
    return (<div>Loading images...</div>)
  }
  
  if (playing) playImages()
  
  return (
    <div className='player-container'>
      <div className="scan">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: `CT scam ${selectedImage}`,
              isFluidWidth: true,
              src: `data:image/png;base64,${images.default[selectedImage]}`,
            },
            largeImage: {
              src: `data:image/png;base64,${images.default[selectedImage]}`,
              width: 700,
              height: 700
            },
            enlargedImagePosition: 'over',
            enlargedImageStyle: {
              backgroundColor: colors.dark_grey,
            }
          }}
        />
      </div>
      <div className='patients-id'>
        <p>ID: {patient.label}</p>
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
              onClick={() => setPlaying(true)}
            />
          </div>
          <div>
            <PauseRoundedIcon
              onClick={() => setPlaying(false)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerComponent;