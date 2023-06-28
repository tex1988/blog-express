import React from 'react';
import { QueryBoundaries } from '../components/errorHandling/QueryBoundaries';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Content = () => {
  return (
    <ContentWrapper>
      <QueryBoundaries>
        <Outlet />
      </QueryBoundaries>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div.attrs({
  className: 'container',
})`
  margin-top: 55px;
`;

export default Content;
