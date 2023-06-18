import styled from 'styled-components';
import { useErrorBoundary } from 'react-error-boundary';

const Error = ({ error }) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <ErrorWrapper>
      <div>Oops...</div>
      <div>Something went wrong:</div>
      <div style={{ color: "red" }}>{error.message}</div>
      <div>
        <button onClick={resetBoundary}>Try again</button>
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
