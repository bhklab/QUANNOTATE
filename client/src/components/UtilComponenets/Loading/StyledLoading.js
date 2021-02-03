import styled from 'styled-components';
import colors from '../../../styles/colors';


const StyledLoading = styled.div`
  margin: 100px 0;
  align-self: center;
  
  &.-loading.-active {
    background-color: ${colors.dark_grey};
    opacity: 1;
    z-index: 100;
    
    .-loading-inner {
      display: flex;
      justify-content: center;
      top: calc(50% - 150px);
    }
  }
  
`;

export default StyledLoading;