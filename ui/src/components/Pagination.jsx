import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const Pagination = (props) => {
  const {pageCount, onPageChange, pageRangeDisplayed } = props;

  return (
    <PaginationWrapper>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={pageCount}
        pageRangeDisplayed={pageRangeDisplayed}
        onPageChange={(event) => onPageChange(event.selected + 1)}
      />
    </PaginationWrapper>
  )
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  li {
    display: inline-block;

    a {
      text-align: center;
      width: 32px;
      height: 32px;
      line-height: 32px;
      border: 1px solid #4b4b4b;
      border-radius: 5px;
      margin-right: 10px;
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
    }
  }

  .disabled {
    a {
      background-color: #2f2f2f;
      pointer-events: none;
    }
  }
`

export default Pagination;