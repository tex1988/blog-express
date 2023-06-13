import styled from 'styled-components';
import { useState } from 'react';
import Select from './Select';

const Search = (props) => {
  const ASC = 'asc';
  const DESC = 'desc';
  const { setOrder, setSort, setSearch, defaultSort, defaultOrder, defaultSearch, isMyPosts } = props;
  const [selectedOrder, setSelectedOrder] = useState(defaultOrder);
  const [searchField, setSearchField] = useState(defaultSearch)
  const [searchValue, setSearchValue] = useState('');

  function onOrderChange(event) {
    setOrder(event.target.value);
    setSelectedOrder(event.target.value);
  }

  function onSortChange(event) {
    setSort(event.target.value);
  }

  function onSearchChange(event) {
    setSearchField(event.target.value);
  }

  function onSearchInput(event) {
    setSearchValue(event.target.value);
  }

  function onSearch() {
    setSearch({[searchField]: searchValue});
  }

  function getSortItems() {
    const items = {
      created: 'creation date',
      modified: 'edit date',
    };
    !isMyPosts && (items.author = 'author');
    return items;
  }

  function getSearchItems() {
    const items = {
      content: 'content',
      title: 'title',
    };
    !isMyPosts && (items.author = 'author');
    return items;
  }

  return (
    <SearchWrapper>
      <div className="flex-row-left">
        <div className="flex-row-left">
          <span>Sort by:</span>
          <Select
            {...{ items: getSortItems(), defaultValue: defaultSort, onChange: onSortChange, width: '105px' }}
          />
        </div>
        <div className="flex-row-left">
          <span>Order: </span>
          <div className="flex-row-left" onChange={onOrderChange}>
            <input checked={selectedOrder === ASC} type="radio" value={ASC} readOnly />⇑
            <input checked={selectedOrder === DESC} type="radio" value={DESC} readOnly />⇓
          </div>
        </div>
      </div>
      <div className="flex-row-left">
        <div className="flex-row-left">
          <span>Search by:</span>
          <Select
            {...{ items: getSearchItems(), defaultValue: defaultSearch, onChange: onSearchChange, width: '60px' }}
          />
        </div>
        <div>
          <input value={searchValue} onInput={onSearchInput} placeholder="Search" />
          <button onClick={onSearch}>Search</button>
        </div>
      </div>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div.attrs({
  className: 'flex-row-space-between',
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

export default Search;
