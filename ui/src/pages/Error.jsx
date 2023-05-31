import styled from 'styled-components';

const Error = () => {
  return (
    <ErrorWrapper>
      <div>Oops...</div>
      <div>An error occurred.</div>
      <div>Please try again later.</div>
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
