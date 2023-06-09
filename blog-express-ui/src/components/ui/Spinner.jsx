import React from 'react';
import styled from 'styled-components';

const Spinner = ({
  size = '20px',
  color = 'white',
  backgroundColor = 'grey',
  border = '3px',
  speed = '1s',
}) => {

  return (
    <SpinnerWrapper
      size={size}
      color={color}
      backgroundColor={backgroundColor}
      border={border}
      speed={speed}
    />
  );
};

const SpinnerWrapper = styled.div`
  border: ${(props) => props.border} solid ${(props) => props.backgroundColor};
  border-radius: 50%;
  border-top: ${(props) => props.border} solid ${(props) => props.color};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  animation: spin ${(props) => props.speed} linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
