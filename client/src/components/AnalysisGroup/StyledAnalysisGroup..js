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

  a {
    margin-right: 10px;
  }

  .subgroup {
    display: flex;
  }
`;

export default StyledAnalysisGroup;