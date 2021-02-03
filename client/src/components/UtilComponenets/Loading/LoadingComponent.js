import React from 'react';
import ReactLoading from 'react-loading';
import StyledLoading from './StyledLoading';
import colors from '../../../styles/colors';

const LoadingComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const { loading } = props;
  return loading ? (
    <StyledLoading className="-loading -active">
      <div className="-loading-inner">
        <ReactLoading type="cylon" width={150} height={150} color={colors.blue} />
      </div>
    </StyledLoading>
  ) : (
      <div />
    );
};

export default LoadingComponent;