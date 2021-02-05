import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledAnalysisGroup = styled.div`
  background-color: ${colors.dark_grey};
  width: 100%;
  margin: 10px;
  padding: 15px;

  h3 {
    margin: 0;
  }
  
  p, a {
    font-size: 1.5rem;
    margin: 0;
    display: inline-block;
  }

  a {
    margin-right: 10px;
    font-size: 1rem;
    padding: 5px 10px;
    border-radius: 4px;
    border: 2px solid ${colors.blue};
    transition: all 0.25s ease-in;
    color: ${colors.white};
    &:hover {
      background-color: ${colors.blue};
      color: ${colors.black}
    }
  }

  .subgroups {
    display: flex;
    flex-direction: column;
    width: max-content;
    margin 0 auto;
  }

  .subgroup {
    padding: 0 0 15px;
    // display: inline-block;
    width: max-content;
    margin: 0 25px;
  }
`;

export default StyledAnalysisGroup;