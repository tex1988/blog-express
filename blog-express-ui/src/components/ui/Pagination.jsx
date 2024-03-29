import ReactPaginate from 'react-paginate';
import styled, { css } from 'styled-components';
import { forwardRef } from 'react';

const Pagination = forwardRef(
  ({ page, pageCount, onPageChange, pageRangeDisplayed, disabled = false }, ref) => {
    return (
      <PaginationWrapper disabled={disabled} ref={ref}>
        <ReactPaginate
          forcePage={page}
          previousLabel={'<'}
          nextLabel={'>'}
          pageCount={pageCount}
          pageRangeDisplayed={pageRangeDisplayed}
          onPageChange={(event) => onPageChange(event.selected + 1)}
        />
      </PaginationWrapper>
    );
  },
);

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  ${(props) =>
    props.disabled &&
    css`
      a {
        background-color: #2f2f2f;
        pointer-events: none;
      }
    `}

  ul {
    padding: 0;
  }

  li {
    display: inline-block;

    a {
      text-align: center;
      width: 28px;
      height: 28px;
      line-height: 28px;
      border: 1px solid #4b4b4b;
      border-radius: 5px;
      margin: 0 5px 0 5px;
      cursor: pointer;
      display: inline-block;
      color: #4b4b4b;
      background-color: #282828;
      font-size: 14px;

      &:hover {
        border-color: royalblue;
        color: royalblue;
      }
    }
  }

  .selected {
    a {
      background-color: royalblue;
      border-color: royalblue;
      color: white;
      pointer-events: none;
    }
  }

  .disabled {
    a {
      background-color: #2f2f2f;
      pointer-events: none;
    }
  }
`;

export default Pagination;