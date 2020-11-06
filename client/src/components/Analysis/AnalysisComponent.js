/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnalysisComponent = () => {
  // useEffect(() => {
  //   axios.get('/api/analysis/summary')
  //     .then(res => {
  //       console.log(res.data);
  //       setAnalysisData(res.data)
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }, [])

  return (
    <div>Analysis Component</div>
  )
}

export default AnalysisComponent;