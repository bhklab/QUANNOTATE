import React from 'react';
import { Normalize } from 'styled-normalize';
import logo from '../images/logo.svg';
import StyledApp from './StyledApp';
import GlobalStyles from '../styles/GlobalStyles';

const App = () => {
  return (
    <>
      <Normalize />
      <GlobalStyles />
      <StyledApp>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </StyledApp>
    </>
  );
}

export default App;
