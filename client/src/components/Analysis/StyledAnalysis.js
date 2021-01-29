import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledAnalysis = styled.div`
  width: 100%;
  margin: 10px;
  padding: 15px;
  background-color: ${colors.dark_grey};
  border: 2px solid ${colors.black};
  border-radius: 4px;

  p {
    text-align: left;
  }

  button {
    margin-top: 15px;
    align-self: start;
    font-size: 1rem;
    padding: 10px 5px;
    border-radius: 4px;
    border: 2px solid ${colors.blue};
    transition: all 0.25s ease-in;
    color: ${colors.white};
    &:hover {
      background-color: ${colors.blue};
      color: ${colors.black}
    }
  }

  .analysis-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .player-container {
    max-width: 450px;
    width: 100%;
    min-width: 280px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
  }

  .windows {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px 0;

    p {
      margin: 0 0 0 10px;
      padding: 5px 10px;
      border: 2px solid ${colors.blue};
      font-size: 1rem;
      transition: all 0.25s ease-in;

      &:hover {
        background-color: ${colors.blue};
        color: ${colors.black};
        cursor: pointer;
      }
    }

    p:nth-child(1) {
      margin: 0;
    }
  }

  .option-container {
    flex-grow: 1;
    margin-left: 2vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .slider {
    display: flex;
    width: 100%;
  }

  .patients-id {
    margin-top: 10px;
    
    p {
      background-color: ${colors.blue};
      padding: 5px;
      border-radius: 4px;
      display:inline-block;
      font-size: 1rem;
    } 
  } 

  .scan {
    width: 100%;
    max-height: 450px;
    border: 2px solid ${colors.blue};
    border-radius: 4px;
    overflow:hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .error-popup {
    padding-left: 2px;
    color: ${colors.pink}
  }

  .study {
    width: 50%;
    min-width: 280px;
    max-width: 450px;
    margin-bottom: 15px;

    p {
      font-size: 1.2rem;
      font-weight: 700;
    }
  }
  .progress-ui {
    margin: 15px 0;
    width: 100%;
    height: 15px;
    background-color: ${colors.white};
    border: 1px solid ${colors.blue};
    p {
      text-align: center;
      font-size: 1rem;
      color: ${colors.black}
    }

    .bar {
      background-color: ${colors.blue};
      width: 100%;
      height: 100%;
    }
  }
`;

export default StyledAnalysis;