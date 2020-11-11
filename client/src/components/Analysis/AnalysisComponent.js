/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import StyledAnalysis from './StyledAnalysis';
import PlayerComponent from './PlayerComponent/PlayerComponent';
import LabelComponent from './LabelComponent/LabelComponent'


// helper funstions that accepts array buffer and produce byte64 string to be rendered as an image in the browser
const convertBufferToBase64String = (buffer) => btoa(
    new Uint8Array(buffer)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );


const AnalysisComponent = () => {
  // retrieves type parameter from react router
  const { type } = useParams()
  const [ images, setImages ] = useState(null)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    axios.get(`/api/analysis/${type}`)
      .then(res => {
        const responseImages = [];
        // processes image buffers to be rendered on the page
        res.data.forEach(imgBuffer => {
          const base64 = convertBufferToBase64String(imgBuffer.data);
          responseImages.push(base64);
        })
        setImages(responseImages)
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, [type])

  if (loading) {
    return (<div>Loading images...</div>)
  }

  return (
    <StyledAnalysis>
      <h3>Analysis Component (should be replaced by API text)</h3>
      <div className='analysis-container'>
        <PlayerComponent
          images={images}
        />
        <LabelComponent/>
      </div>
    </StyledAnalysis>

  )
}

export default AnalysisComponent;