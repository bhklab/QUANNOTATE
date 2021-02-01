/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StyledDashboard from './StyledDashboard';
import { Link } from 'react-router-dom';

const AnalysisGroup = () => {
  const [analysisData, setAnalysisData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const analysisResponse = await axios.get(`/api/analysis/${type}`)
        console.log(analysisResponse);
      } catch(err) {
        console.log(err);
      }
    }
    fetchData();
  }, [])

  return analysisData.length > 0 ? (
    <StyledDashboard>
      {analysisData.map((analysis, i) => {
        return (
          <Link key={i} to={!analysis.group ? `/analysis/${analysis.name}` : `/group/${analysis.name}`}>
            <div className="section">
              <img
                src={require(`../../images/analysis/${analysis.name}.png`)}
                alt={analysis.text}
              />
              <p>{analysis.text}</p>
            </div>
          </Link>
        )
      })}
      {/* <div className="section">
        <p>Coming Soon...</p>
      </div> */}
    </StyledDashboard>
  ) : null
}

export default AnalysisGroup;