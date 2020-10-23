import React from 'react';
import { Normalize } from 'styled-normalize';
import StyledApp from './StyledApp';
import GlobalStyles from '../../styles/GlobalStyles';
import Router from '../Routing/Router';

const App = () => {
  return (
    <>
      <Normalize />
      <GlobalStyles />
      <StyledApp>
        <Router />
      </StyledApp>
    </>
  );
}

export default App;
