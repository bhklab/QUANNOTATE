import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledDashboard = styled.div`
  padding: 20px; 
  max-width: 1280px; 
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 3vw;

  .section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: 300px;
    height: 30vw;
    max-width: 300px;
    width: 30vw;
    border-radius: 4px;
    border: 2px solid ${colors.white};
    background-color: ${colors.black_trans};
    padding: 5px;
    transition: all ease-out 0.5s;
    p {
      font-size: calc(2vw + 10px);
      color: ${colors.white};
      margin: 15px 0;
    }
  }

  a:hover .section {
    border: 2px solid ${colors.black};
    background-color: ${colors.blue};
    p {
      color: ${colors.black}
    }
    img {
      border: none;
    }
  }
  img {
    max-height: 200px;
    height: 20vw;
    max-width: 200px;
    width: 20vw;
    border: 2px solid ${colors.white};
  }
`;

export default StyledDashboard