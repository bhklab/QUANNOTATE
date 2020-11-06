/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const AnalysisComponent = () => {
  // retrieves type parameter from react router
  const { type } = useParams()

  useEffect(() => {
    axios.get(`/api/analysis/${type}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, [type])

  return (
    <div>Analysis Component</div>
  )
}

export default AnalysisComponent;