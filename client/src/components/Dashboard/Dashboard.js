/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StyledDashboard from './StyledDashboard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [ analysisData, setAnalysisData ] = useState([]); 

  useEffect(() => {
    axios.get('/api/analysis/summary')
    .then(res => {
      console.log(res.data);
      setAnalysisData(res.data)
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return analysisData.length > 0 ? (
    <StyledDashboard>
      {analysisData.map(analysis => {
        return (
          <Link to={`/analysis?type=${analysis.name}`}>
            <div className="section">
              <p>{analysis.text}</p>
            </div>
          </Link>
        )
      })}
    </StyledDashboard>
  ) : null
}

export default Dashboard;