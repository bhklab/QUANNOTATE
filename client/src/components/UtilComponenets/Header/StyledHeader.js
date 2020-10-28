import styled from 'styled-components';
import colors from '../../../styles/colors';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;

  p {
    margin: 0px;
    font-size: 1rem;
    text-align: left;
  }

  button {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid ${colors.white};
    font-size: 1rem;
    margin-left: 10px;
    &:hover {
      color: ${colors.black};
      background: ${colors.blue};
      border: 1px solid ${colors.blue};
    }
  }

  h4 {
    margin: 0;
    color: ${colors.blue}
  }
  .account-container,
  .user,
  .logo {
    display: flex;
  }
  .account-container {
    justify-content: space-between;
  }
  .user,
  .logo {
    flex-direction: column;
    justify-content: center;
  }
`;

export default StyledHeader