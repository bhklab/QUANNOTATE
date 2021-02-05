/* eslint-disable default-case */
// import libraries
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
// import custom components
import StyledAnalysis from './StyledAnalysis';
import PlayerComponent from './PlayerComponent/PlayerComponent';
import LabelComponent from './LabelComponent/LabelComponent';
import LoadingComponent from '../UtilComponenets/Loading/LoadingComponent';
// import custom hooks
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
    currentPatient: null,
    badImage: false
  });
  const [ error, setError ] = useState(null)
  // retrieves type parameter from react router
  const { type, group } = useParams()
  // gets analysis and first patient from the server and transforms them into a readable state
  useEffect(() => {
    // to prevent memory leaks
    let isSubscribed = true
    const fetchData = async () => {
      try {
        // analysis fetch request
        const analysisResponse = await axios.get(`/api/analysis/${type}`)
        const { dataset, title, options } = analysisResponse.data;
        // custom sort to put checkbox options at the top
        options.sort((a, b) => {
          const sortMap = {
            checkbox: 0,
            dropdown: 1
          }
          return sortMap[a.dataType] - sortMap[b.dataType]
        })
        // patient fetch request
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
              ...analysisInfo,
              analysis: {
                title,
                id: analysisResponse.data._id
              },
              options: [...options, { dataType: "text", text: "Any comments?", id: "comment" }],
              patient: { id: _id, label: display_label },
              loaded: true,
              patientCount,
              currentPatient: parseInt(display_label.split('-')[1], 10),
              badImage: false
            })
          }
        } 
      } catch (err) {
        if (isSubscribed) {
          const { response } = error
          // redirects user to the login page if the response status indicates that user is unauthorized (401)
          if (response.status === 401) {
            setAuthState({ ...authState, authenticated: false, username: null, email: null })
          } else {
            setError(err)
          }
        }
      }     
    }
    // execute this hook only if loaded set to false, connects to previous label submission
    if (!analysisInfo.loaded) {
      setAnalysisInfo({
        ...analysisInfo,
        analysis: {
          title: 'Loading...',
          id: null
        },
        options: [],
        loaded: false,
        patient: {},
        message: '',
        patientCount: null,
        currentPatient: null,
        badImage: false
      })
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

  if (!analysisInfo.loaded) {
    return (
      <StyledAnalysis>
        <LoadingComponent
          loading={true}
        />
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
            <p>OAR: {group} (example)</p>
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