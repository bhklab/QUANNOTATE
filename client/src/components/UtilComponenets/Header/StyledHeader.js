import styled from 'styled-components';
import colors from '../../../styles/colors';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;

  h4 {
    margin: 0;
  }
  .account-container {
    display: flex;
    justify-content: space-between;
  }
`;

export default StyledHeader