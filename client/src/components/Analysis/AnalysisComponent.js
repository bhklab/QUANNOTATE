/* eslint-disable default-case */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import StyledAnalysis from './StyledAnalysis';
import PlayerComponent from './PlayerComponent/PlayerComponent';
import LabelComponent from './LabelComponent/LabelComponent';
import AnalysisContext from '../../context/analysisContext';
import AuthContext from '../../context/authContext';

const AnalysisComponent = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [ analysisInfo, setAnalysisInfo ] = useState({ 
    analysis: {
      title: 'Loading...',
      id: null
    },
    options: [],
    loaded: false,
    patient: {},
    message: '',
    patientCount: null,
    currentPatient: null
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
        const patientResponse = await axios.get(`/api/analysis/patient?datasetId=${dataset._id}&analysisId=${analysisResponse.data._id}`);
        const { display_label, _id, message, patientCount } = patientResponse.data
        if (isSubscribed) {
          // display only the message if there is any
          if (message) {
            setAnalysisInfo({
              ...analysisInfo,
              loaded: true,
              message
            })
          } else {
            // otherwise sets analysis and patient info and renders child components
            setAnalysisInfo({
              analysis: {
                title,
                id: analysisResponse.data._id
              },
              options: [...options, { dataType: "text", text: "Any comments?", id: "comment" }],
              patient: { id: _id, label: display_label },
              loaded: true,
              patientCount,
              currentPatient: parseInt(display_label.split('-')[1], 10)
            })
          }
        } 
      } catch (err) {
        const { response } = error
        // redirects user to the login page if the response status indicates that user is unauthorized (401)
        if (response.status === 401) {
          setAuthState({ ...authState, authenticated: false, username: null, email: null })
        } else {
          setError(err)
        }
      }     
    }
    // execute this hook only if loaded set to false
    if (!analysisInfo.loaded) {
      setAnalysisInfo({
        analysis: {
          title: 'Loading...',
          id: null
        },
        options: [],
        loaded: false,
        patient: {},
        message: '',
        patientCount: null,
        currentPatient: null},
        )
      fetchData()
    }
    return () => {isSubscribed = false}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, analysisInfo.loaded])

  if (error) {
    return (
      <StyledAnalysis>
        <h3>An error occured, please try again later</h3>
      </StyledAnalysis>
    )
  }

  const { analysis, options, message, currentPatient, patientCount } = analysisInfo;

  console.log(currentPatient, patientCount);

  if (!analysisInfo.loaded) {
    return (
      <StyledAnalysis>
        <h3>Loading...</h3>
      </StyledAnalysis>
    )
  }
  
  if (message) {
    return (
      <StyledAnalysis>
        <h3>{message}</h3>
        <Link to='/'>
          <button>Return to Dashboard</button>
        </Link>
      </StyledAnalysis>
    )
  }

  const percentage = (currentPatient / patientCount) * 100

  return (
    <AnalysisContext.Provider value={{ analysisInfo, setAnalysisInfo, error, setError }}>
      <StyledAnalysis>
        <h3>{analysis.title}</h3>
        <div className='study'>
          <p>Case: {currentPatient}/{patientCount}</p>
          <div className="progress-ui">
            <div className="bar" style={{ width: `${percentage}%` }}></div>
          </div>
          {type === 'aituring' ? (
            <p>OAR: Parotid_L (example)</p>
          ) : null}
        </div>
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