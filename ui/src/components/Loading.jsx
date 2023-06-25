import styled from 'styled-components';

const Loading = () => {

  return (
    <SpinnerWrapper>
      <svg className="spinner40">
        <circle cx="20" cy="20" r="18" strokeWidth="3" fill="none"></circle>
      </svg>
    </SpinnerWrapper>
  );
}

const SpinnerWrapper = styled.div.attrs({
  className: 'flex-row-center',
})`

  margin: 100px 0 100px 0;

  circle {
    fill: transparent;
    stroke: royalblue;
    stroke-linecap: round;
    stroke-dasharray: calc(3.14px * 40);
    stroke-dashoffset: 40;
    animation: spinner 3s linear infinite;
  }

  svg {
    width: 40px;
    height: 40px;
    display: block;
    transform-origin: calc(0.5px * 40) calc(0.5px * 40) 0;
    animation: rotateSpinner 3s linear infinite;
  }

  @keyframes spinner {
    0% {
      stroke-dashoffset: 26.4;
    }
    50% {
      stroke-dashoffset: 124.6;
    }
    100% {
      stroke-dashoffset: 0.66;
    }
  }

  @keyframes rotateSpinner {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(720deg);
    }
    100% {
      transform: rotate(1080deg);
    }
  }
`;

export default Loading;