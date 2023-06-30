import styled from 'styled-components';
import img from '../../assets/img/empty.svg'

const Empty = () => {
  return (
    <EmptyWrapper>
      <img src={img} alt="No data" />
    </EmptyWrapper>
  );
};

const EmptyWrapper = styled.div.attrs({
  className: 'flex-row-center',
})`
  
  min-height: 300px;
`;

export default Empty;
