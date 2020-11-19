/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import StyledAnalysis from './StyledAnalysis';
import PlayerComponent from './PlayerComponent/PlayerComponent';
import LabelComponent from './LabelComponent/LabelComponent'

const AnalysisComponent = () => {
  const [ analysisInfo, setAnalyisInfo ] = useState({ title: 'Loading...', options: [], loaded: false})
  // retrieves type parameter from react router
  const { type } = useParams()
  // gets images from the server and transforms them into a readable state
  useEffect(() => {
    axios.get(`/api/analysis/${type}`)
      .then(res => {
        const { title, options } = res.data[0];
        setAnalyisInfo({ title, options: [...options, { dataType: "text", text: "Any comments?"}], loaded: true})
      })
      .catch(err => {
        console.log(err);
      })
  }, [type])

  return (
    <StyledAnalysis>
      <h3>{analysisInfo.title}</h3>
      <div className='analysis-container'>
        <PlayerComponent />
        {analysisInfo.loaded ? <LabelComponent 
          options={analysisInfo.options}
        /> : null}
      </div>
    </StyledAnalysis>

  )
}

export default AnalysisComponent;