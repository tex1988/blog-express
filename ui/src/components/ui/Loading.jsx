import styled from 'styled-components';
import Spinner from './Spinner';

const Loading = () => {

  return (
    <SpinnerWrapper>
      <div className='flex-column'>
        <div className='flex-row-center'>
          <Spinner size={'60px'} color={'royalblue'} backgroundColor={'grey'} border={'5px'}/>
        </div>
        <div className='flex-row-center label'>Loading...</div>
      </div>
    </SpinnerWrapper>
  );
}

const SpinnerWrapper = styled.div.attrs({
  className: 'flex-row-center',
})`

  min-height: 200px;
  
  .label {
    color: royalblue;
    margin-top: 15px;
    font-weight: bold;
    font-size: 14px;
  }
`;

export default Loading;