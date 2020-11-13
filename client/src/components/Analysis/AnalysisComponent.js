/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import StyledAnalysis from './StyledAnalysis';
import PlayerComponent from './PlayerComponent/PlayerComponent';
import LabelComponent from './LabelComponent/LabelComponent'

const AnalysisComponent = () => {
  const [ title, setTitle ] = useState('Loading...')
  // retrieves type parameter from react router
  const { type } = useParams()
  // gets images from the server and transforms them into a readble state
  useEffect(() => {
    axios.get(`/api/analysis/${type}`)
      .then(res => {
        console.log(res.data);
        setTitle(res.data[0].title);
      })
      .catch(err => {
        console.log(err);
      })
  }, [type])

  return (
    <StyledAnalysis>
      <h3>{title}</h3>
      <div className='analysis-container'>
        <PlayerComponent />
        <LabelComponent />
      </div>
    </StyledAnalysis>

  )
}

export default AnalysisComponent;