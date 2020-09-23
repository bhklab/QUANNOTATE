import styled from 'styled-components';
import colors from '../styles/colors';

const StyledApp = styled.div`
  
  text-align: center;
  min-height: 100vh;
  font-size: calc(10px + 2vmin);
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .wrapper {
    margin: 0 10%;
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .App-logo {
    height: 40vmin;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }

  .App-link {
    color: #61dafb;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default StyledApp;