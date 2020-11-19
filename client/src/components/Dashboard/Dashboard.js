/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StyledDashboard from './StyledDashboard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [ analysisData, setAnalysisData ] = useState([]); 

  useEffect(() => {
    axios.get('/api/analysis')
    .then(res => {
      setAnalysisData(res.data)
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return analysisData.length > 0 ? (
    <StyledDashboard>
      {analysisData.map((analysis, i) => {
        return (
          <Link key={i} to={`/analysis/${analysis.name}`}>
            <div className="section">
              <p>{analysis.text}</p>
            </div>
          </Link>
        )
      })}
      <div className="section">
        <p>Coming Soon...</p>
      </div>
    </StyledDashboard>
  ) : null
}

export default Dashboard;