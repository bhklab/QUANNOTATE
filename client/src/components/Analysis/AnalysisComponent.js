/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const AnalysisComponent = () => {
  // retrieves type parameter from react router
  const { type } = useParams()
  const [ images, setImages ] = useState(null)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    axios.get(`/api/analysis/${type}`)
      .then(res => {
        console.log(res);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, [type])

  if (loading) {
    return (<div>Loading data...</div>)
  }

  return (
    <div>Analysis Component</div>
  )
}

export default AnalysisComponent;