/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import StyledAnalysis from './StyledAnalysis';
import PlayerComponent from './PlayerComponent/PlayerComponent';
import LabelComponent from './LabelComponent/LabelComponent';
import AnalysisContext from '../../context/analysisContext';

const AnalysisComponent = () => {
  const [ analysisInfo, setAnalyisInfo ] = useState({ title: 'Loading...', options: [], loaded: false });
  const [ error, setError ] = useState(null)
  // retrieves type parameter from react router
  const { type } = useParams()
  // gets images from the server and transforms them into a readable state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const analysisResponse = await axios.get(`/api/analysis/${type}`)
        const { analysis } = analysisResponse.data
        console.log(analysis);
        const patientResponse = await axios.get(`/api/analysis/patient?dataset_id=${analysis.dataset._id}`)
        console.log(patientResponse);
        // setAnalyisInfo({ title, options: [...options, { dataType: "text", text: "Any comments?" }], loaded: true })
      } catch (err) {
        console.log(err);
        setError(err)
      }     
    }
    fetchData()
  }, [type])

  if (error) {
    return (
      <StyledAnalysis>
        <h3>An error occured, please try again later</h3>
      </StyledAnalysis>
    )
  }

  if (!analysisInfo.loaded) {
    return (
      <StyledAnalysis>
        <h3>Loading...</h3>
      </StyledAnalysis>
    )
  }

  return (
    <AnalysisContext.Provider value={{ error, setError }}>
      <StyledAnalysis>
        <h3>{analysisInfo.title}</h3>
        <div className='analysis-container'>
          <PlayerComponent />
          {analysisInfo.loaded ? <LabelComponent
            options={analysisInfo.options}
          /> : null}
        </div>
      </StyledAnalysis>
    </AnalysisContext.Provider>
  )
}

export default AnalysisComponent;