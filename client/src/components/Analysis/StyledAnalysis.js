import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledAnalysis = styled.div`
  width: 100%;
  margin: 10px;
  padding: 15px;
  background-color: ${colors.dark_grey};
  border: 2px solid ${colors.black};
  border-radius: 4px;

  .analysis-container {
    display: flex;
    justify-content: center;
  }

  .player-container {
    max-width: 450px;
    width: 50%;
  }
  .option-container {
    flex-grow: 1;
    margin-left: 10px;
  }

  .scan {
    width: 100%;
    height: 100%;
    min-width: 300px
  }
`;

export default StyledAnalysis;