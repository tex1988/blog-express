import styled from 'styled-components';
import { useState } from 'react';
import Select from './Select';

const Search = (props) => {
  const ASC = 'asc';
  const DESC = 'desc';
  const { setOrder, setSort, onSearch, defaultSort, defaultOrder, defaultSearch, isMyPosts } = props;
  const [defaultSearchType, defaultSearchValue] = getDefaultSearch();
  const [selectedOrder, setSelectedOrder] = useState(defaultOrder);
  const [searchField, setSearchField] = useState(defaultSearchType);
  const [searchValue, setSearchValue] = useState(defaultSearchValue);

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

  function onSearchClick() {
    if (searchValue.length > 0) {
      onSearch({ [searchField]: searchValue });
    }
  }

  function onInputKeyPress(event) {
    if (event.key === 'Enter') {
      onSearchClick(event);
    }
  }

  function getDefaultSearch() {
    return defaultSearch ? Object.entries(defaultSearch)[0] : ['content', ''];
  }

  function getSortOptions() {
    const options = [
      { value: 'created', label: 'creation date' },
      { value: 'modified', label: 'edit date' },
    ];
    !isMyPosts && options.push({ label: 'author', value: 'author' });
    return options;
  }

  function getSearchOptions() {
    const options = [
      { value: 'content', label: 'content' },
      { value: 'title', label: 'title' },
    ];
    !isMyPosts && options.push({ label: 'author', value: 'author' });
    return options;
  }

  return (
    <SearchWrapper>
      <div className="flex-row-left">
        <div className="flex-row-left">
          <span>Sort by:</span>
          <Select
            defaultValue={defaultSort}
            options={getSortOptions()}
            onChange={onSortChange}
            style={{ width: '105px' }}
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
            defaultValue={defaultSearchType}
            options={getSearchOptions()}
            onChange={onSearchChange}
            style={{ width: '65px' }}
          />
        </div>
        <div>
          <input
            value={searchValue}
            onInput={onSearchInput}
            onKeyDown={onInputKeyPress}
            placeholder="Search"
          />
          <button onClick={onSearchClick}>Search</button>
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
