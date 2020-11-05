/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [ analysisData, setAnalysisData ] = useState(null); 

  useEffect(() => {
    axios.get('/api/analysis/summary')
    .then(res => {
      setAnalysisData(res.data)
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <h2>Dashboard component</h2>
  )
}

export default Dashboard;