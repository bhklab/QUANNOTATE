import colors from '../../../styles/colors';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin-top: 15px;
  align-self: start;
  font-size: 1rem;
  padding: 10px 5px;
  border-radius: 4px;
  border: 2px solid ${colors.blue};
  transition: all 0.25s ease-in;
  &:hover {
    background-color: ${colors.blue};
    color: ${colors.black}
  }
`;

export default StyledButton;