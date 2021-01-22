/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import StyledAnalysis from './StyledAnalysis';
import PlayerComponent from './PlayerComponent/PlayerComponent';
import LabelComponent from './LabelComponent/LabelComponent';
import AnalysisContext from '../../context/analysisContext';

const AnalysisComponent = () => {
  const [ analysisInfo, setAnalyisInfo ] = useState({ 
    analysis: {
      title: 'Loading...',
      id: null
    },
    options: [],
    loaded: false,
    patient: {}
  });
  const [ error, setError ] = useState(null)
  // retrieves type parameter from react router
  const { type } = useParams()
  // gets analysis and first patient from the server and transforms them into a readable state
  useEffect(() => {
    // to prevent memory leaks
    let isSubscribed = true
    const fetchData = async () => {
      try {
        const analysisResponse = await axios.get(`/api/analysis/${type}`)
        const { dataset, title, options } = analysisResponse.data;
        options.sort((a, b) => {
          const sortMap = {
            checkbox: 0,
            dropdown: 1
          }
          return sortMap[a.dataType] - sortMap[b.dataType]
        })
        const patientResponse = await axios.get(`/api/analysis/patient?dataset_id=${dataset._id}`);
        const { display_label, _id } = patientResponse.data
        if (isSubscribed) setAnalyisInfo({ 
          analysis: {
            title,
            id: analysisResponse.data._id
          },
          options: [...options, { dataType: "text", text: "Any comments?" }],
          patient: { id: _id, label: display_label },
          loaded: true
        })
      } catch (err) {
        console.log(err);
        setError(err)
      }     
    }
    fetchData()
    return () => {isSubscribed = false}
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

  const { analysis, options } = analysisInfo;

  return (
    <AnalysisContext.Provider value={{ analysisInfo, setAnalyisInfo, error, setError }}>
      <StyledAnalysis>
        <h3>{analysis.title}</h3>
        <div className='analysis-container'>
          <PlayerComponent />
          <LabelComponent
            options={options}
          />
        </div>
      </StyledAnalysis>
    </AnalysisContext.Provider>
  )
}

export default AnalysisComponent;