/* eslint-disable default-case */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import StyledAnalysisGroup from './StyledAnalysisGroup.';

const AnalysisGroup = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [ groupData, setGroupData ] = useState({ groupTitle: 'Loading...', subgroups: []});
  const [ error, setError ] = useState(false)
  const { type } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analysisResponse = await axios.get(`/api/analysis/${type}`)
        const { groupTitle, subgroups } = analysisResponse.data;
        setGroupData({ groupTitle, subgroups })
      } catch(err) {
        const { response } = err
        // redirects user to the login page if the response status indicates that user is unauthorized (401)
        if (response.status === 401) {
          setAuthState({ ...authState, authenticated: false, username: null, email: null })
        } else {
          setError(true)
        }
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const { groupTitle, subgroups } = groupData

  if (error) {
    return (
      <StyledAnalysisGroup>
        <h3>An error occured, please try again later</h3>
      </StyledAnalysisGroup>
    )
  }

  return (
    <StyledAnalysisGroup>
      <h2>{groupTitle}</h2>
      <div className='subgroups'>
        {subgroups.map((subgroup, i) => {
          return (
            <div key={i} className='subgroup'>
              <p><Link to={`/analysis/${type}/${subgroup}`}>Select</Link> {subgroup}</p>
            </div>
          )
        })}
      </div>
    </StyledAnalysisGroup>
  )
}

export default AnalysisGroup;