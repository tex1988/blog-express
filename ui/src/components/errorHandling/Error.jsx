import styled from 'styled-components';

const Error = ({ error, resetErrorBoundary }) => {

  return (
    <ErrorWrapper>
      <div>Oops...</div>
      <div>Something went wrong:</div>
      <div style={{ color: "red", whiteSpace: 'pre-line', textAlign: 'center' }}>{error.message}</div>
      <div>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </ErrorWrapper>
  );
};

const ErrorWrapper = styled.div.attrs({
  className: 'flex-column',
})`
  justify-content: center;
  align-content: center;
  font-size: 15px;
  padding: 40px;
  margin: 40px;
  
  div {
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 20px;
  }
`;

export default Error;
