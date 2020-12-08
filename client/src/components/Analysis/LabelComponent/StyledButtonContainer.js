import colors from '../../../styles/colors';
import styled from 'styled-components';

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  
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

export default StyledButtonContainer;