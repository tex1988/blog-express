import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Select from './Select';
import SearchInput from './SearchInput';

const Search = (props) => {
  const ASC = 'asc';
  const DESC = 'desc';
  const {
    sortOptions = [],
    searchOptions = [],
    setOrder = (value) => {},
    setSort = (value) => {},
    onSearch = (value) => {},
    defaultSort = 'created',
    defaultOrder = DESC,
    defaultSearch = null,
  } = props;
  const [defaultSearchType, defaultSearchValue] = getDefaultSearch();
  const [selectedOrder, setSelectedOrder] = useState(defaultOrder);
  const [searchField, setSearchField] = useState(defaultSearchType);
  const [searchInputValue, setSearchInputValue] = useState(defaultSearchValue);

  useEffect(() => {
    setSearchInputValue(defaultSearchValue);
  }, [defaultSearchValue])

  useEffect(() => {
    setSelectedOrder(defaultOrder);
  }, [defaultOrder])

  useEffect(() => {
    setSearchField(defaultSearchType);
  }, [defaultSearchType])

  function onOrderChange(event) {
    setOrder(event.target.value);
    setSelectedOrder(event.target.value);
  }

  function onSortChange(event) {
    setSort(event.target.value);
  }

  function onSearchTypeChange(event) {
    setSearchField(event.target.value);
  }

  function onSearchClick(value) {
    value ? onSearch({ [searchField]: value }) : onSearch(null);
  }

  function onSearchInput(value) {
    setSearchInputValue(value);
  }

  function getDefaultSearch() {
    return defaultSearch ? Object.entries(defaultSearch)[0] : ['content', ''];
  }

  return (
    <SearchWrapper>
      <div className="flex-row-left">
        <div className="flex-row-left">
          <span>Sort by:</span>
          <Select
            defaultValue={defaultSort}
            options={sortOptions}
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
            options={searchOptions}
            onChange={onSearchTypeChange}
            style={{ width: '65px' }}
          />
        </div>
        <SearchInput
          value={searchInputValue}
          onSearch={onSearchClick}
          onInput={onSearchInput}
        />
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
