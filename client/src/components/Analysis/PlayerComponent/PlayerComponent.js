/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
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
  const [ state , setState ] = useState({ 
    images: null,
    accessor: null,
    loading: true,
    windowing: false,
    windowOptions: []
  })
  const { images, accessor, loading, windowing, windowOptions } = state;
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
    if (selectedImage + 1 === images[accessor].length) {
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
          const { images, windowing } = res.data
          // processes image buffers to be rendered on the page
          if (!windowing) {
            const responseImages = [];
            images.default.images.forEach(imgBuffer => {
              const base64 = convertBufferToBase64String(imgBuffer.data);
              responseImages.push(base64);
              // images are getting added to the default collection if no windowing
            })
            setState({
              images: { default: responseImages },
              accessor: "default",
              loading: false,
              windowing,
              windowOptions: []
            })
          } else {
            const imageObj = {}
            const windows = []
            let newAccessor
            Object.values(images).forEach((collection, i) => {
              // picks first collection name as an accessor
              const { value, label } = collection
              if (i === 0 ) newAccessor = value
              windows.push({ value, label })
              imageObj[collection.value] = []
              // process images in each collection
              collection.images.forEach(imgBuffer => {
                const base64 = convertBufferToBase64String(imgBuffer.data);
                imageObj[collection.value].push(base64);
              })
            })
            setState({ 
              images: imageObj,
              accessor: newAccessor,
              loading: false,
              windowing,
              windowOptions: windows
            })
          }
        }
      })
      .catch(err => {
        if (isSubsribed) {
          console.log(err);
          setError(err)
        } 
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
              src: `data:image/png;base64,${images[accessor][selectedImage]}`,
            },
            largeImage: {
              src: `data:image/png;base64,${images[accessor][selectedImage]}`,
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
      {windowing ? (
        <div className='windows'>
          <FormControl
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel>CT Window</InputLabel>
            <Select
              value={accessor}
              label="CT Window"
              onChange={(e) => setState({ ...state, accessor: e.target.value })}
            >
              {windowOptions.map((suboption, index) => {
                const { value, label } = suboption
                return (
                  <MenuItem
                    key={index}
                    value={value}
                  >
                    {label}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>
      ) : null}
      <div className='patients-id'>
        <p>ID: {patient.label}</p>
      </div>
      <div className="slider">
        <StyledSlider
          value={selectedImage + 1}
          min={1}
          max={images[accessor].length}
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