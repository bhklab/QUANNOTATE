/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import StyledAnalysis from './StyledAnalysis';
import PlayerComponent from './PlayerComponent/PlayerComponent';
import LabelComponent from './LabelComponent/LabelComponent'

const AnalysisComponent = () => {

  return (
    <StyledAnalysis>
      <h3>Analysis Component (should be replaced by API text)</h3>
      <div className='analysis-container'>
        <PlayerComponent/>
        <LabelComponent/>
      </div>
    </StyledAnalysis>

  )
}

export default AnalysisComponent;