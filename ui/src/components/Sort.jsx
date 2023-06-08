import styled from 'styled-components';
import { useState } from 'react';

const Sort = (props) => {
  const ASC = 'asc';
  const DESC = 'desc';
  const { setOrder, setSort, defaultOrder, isMyPosts } = props;
  const [selectedOrder, setSelectedOrder] = useState(defaultOrder);

  function onOrderChange(event) {
    setOrder(event.target.value);
    setSelectedOrder(event.target.value);
  }

  function onSortChange(event) {
    setSort(event.target.value);
  }

  return (
    <FilterWrapper>
      <div className="flex-row-left">
        <div className="flex-row-left">
          <span>Sort by:</span>
          <select id="sort" onChange={onSortChange}>
            <option value="created">creation date</option>
            <option value="modified">edit date</option>
            {isMyPosts && <option value="author">author</option>}
          </select>
        </div>
        <div className="flex-row-left">
          <span>Order: </span>
          <div className="flex-row-left" onChange={onOrderChange}>
            <input checked={selectedOrder === ASC} type="radio" value={ASC} readOnly/>⇑
            <input checked={selectedOrder === DESC} type="radio" value={DESC} readOnly />⇓
          </div>
        </div>
      </div>
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div.attrs({
  className: 'flex-row-center',
})`
  align-content: center;
  padding: 5px 5px 10px 5px;
  border-bottom: 1px solid #4b4b4b;

  fieldset {
    border: none;
    padding: 0;

    div {
      margin-right: 10px;
    }
  }

  div {
    flex-basis: auto;
    margin-right: 10px;
  }

  select {
    background-color: transparent;
    border: none;
    color: #f6f6f6;
    font-size: 1em;
    text-decoration: underline;
    appearance: none;
    padding: 5px 0 5px 5px;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  option {
    background-color: #2f2f2f;
  }
`;

export default Sort;
