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

  .option-container {
    flex-grow: 1;
    margin-left: 2vw;
    display: flex;
    flex-direction: column;
  }

  .slider {
    display: flex;
    width: 100%;
  }

  .patients-id p {
    background-color: ${colors.blue};
    padding: 5px;
    border-radius: 4px;
    display:inline-block;
    font-size: 1rem;
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
`;

export default StyledAnalysis;