import styled from 'styled-components';
import img from '../../assets/img/empty.svg';
import { forwardRef } from 'react';

const Empty = forwardRef(({}, ref) => {
  return (
    <EmptyWrapper ref={ref}>
      <img src={img} alt="No data" />
    </EmptyWrapper>
  );
});

const EmptyWrapper = styled.div.attrs({
  className: 'flex-row-center',
})`
  min-height: 300px;
`;

export default Empty;
