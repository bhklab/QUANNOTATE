import React from 'react';
import { Normalize } from 'styled-normalize';
import StyledApp from './StyledApp';
import GlobalStyles from '../styles/GlobalStyles';
import Login from './Login/Login';
import Header from './UtilComponenets/Header'

const App = () => {
  return (
    <>
      <Normalize />
      <GlobalStyles />
      <StyledApp>
        <Header/>
        <main>
          <div className='wrapper'>
            <h1>LabelIt</h1>
            <p>LabelIt description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus ultrices leo. Cras scelerisque lorem nec blandit gravida. Nunc molestie suscipit dui at fermentum. Vestibulum vel risus interdum, laoreet diam at, rutrum nibh. Nullam in metus a ipsum tincidunt egestas. Cras et accumsan nisi. Vestibulum faucibus lorem vitae mi pellentesque tristique.</p>
            <Login/>
          </div>
        </main>
        <footer>
          <p>© Copyright 2020 by BHK Lab</p>
        </footer>
      </StyledApp>
    </>
  );
}

export default App;
