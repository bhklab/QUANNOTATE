import styled from 'styled-components';

const StyledOptions = styled.div`
  text-align: left;

  .checkbox-options label {
    width: 49%;
  }

  .MuiFormGroup-root {
    flex: 0 0 50%;
    max-height: 67vh;
    flex-flow: column wrap;
  }

  @media only screen and (max-width: 916px) {
    .MuiFormGroup-root {
      max-height: 100%;
      flex-wrap: nowrap;
    }
    .checkbox-options label {
      width: 100%;
    }
  }
`;

export default StyledOptions;