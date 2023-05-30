import styled from 'styled-components';

const Error = () => {
  return <ErrorWrapper>Oops...Error. Please try again later</ErrorWrapper>;
};

const ErrorWrapper = styled.div`
  font-size: 15px;
  padding: 40px;
`;

export default Error;