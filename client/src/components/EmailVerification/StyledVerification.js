import styled from 'styled-components';
import colors from '../../styles/colors';
import transitions from '../../styles/transitions';

const StyledVerification = styled.div`
  height: 80vh;
  .internal-container {
    padding: 0 60px 60px;
    max-width: 450px;
    background-color: ${colors.grey};
    border-radius: 3px;
    box-shadow: 0 1px 5px 2px ${colors.white};
    
  }
  h3 {
    color: ${colors.white};
    margin: 0;
    padding: 15px 0;
    font-size: 28px;
  }
  .text {
    margin-top: 0;
    font-size: 15px;
    text-align: left;
  }
  span {
    font-weight: bold;
    color: ${colors.blue};
  }

  .resend {
    cursor: pointer;
    transition: ${transitions.main};

    &:hover {
      color: ${colors.purple}
    }
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
  }
`;

export default StyledVerification;