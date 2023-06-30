import styled, { css } from 'styled-components';

const SearchInput = (props) => {
  const {
    value = '',
    onInput = (value) => {},
    onSearch = (value) => {},
    placeholder = 'Search',
  } = props;

  function onInputKeyPress(event) {
    if (event.key === 'Enter') {
      onSearchClick();
    } else if (event.key === 'Escape') {
      clearSearch();
    }
  }

  function onSearchClick() {
    if (value && value.length > 0) {
      onSearch(value);
    }
  }

  function onSearchInput(event) {
    onInput(event.target.value);
  }

  function clearSearch() {
    onInput('');
    onSearch(null);
  }

  return (
    <SearchInputWrapper showClearIcon={value.length > 0}>
      <input
        value={value}
        onInput={onSearchInput}
        onKeyDown={onInputKeyPress}
        placeholder={placeholder}
      />
      <svg
        className="clear-icon"
        onClick={clearSearch}
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="close-circle"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
      </svg>
      <button onClick={onSearchClick} disabled={value.length < 1}>
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="search"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true">
          <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
        </svg>
      </button>
    </SearchInputWrapper>
  );
};

const SearchInputWrapper = styled.div`
  position: relative;

  button {
    position: absolute;
    right: 0;
    min-width: 30px;
    width: 41px;
    border-radius: 0 3px 3px 0;
    border: 1px solid royalblue;
    padding: 6px 10px 6px 10px;
    margin: 0;

    &&:hover {
      border-color: #3a5eca;
    }

    &:hover:enabled {
      border-color: #4f79ff;
    }

    &:hover:enabled:active {
      border-color: #3454B4;
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }

  input {
    padding-right: 70px;
    margin: 0
  }
  
  .clear-icon {
    position: absolute;
    right: 50px;
    top: 10px;
    font-size: 12px;
    fill: #4b4b4b;
    cursor: pointer;
    opacity: 0;
    z-index: -1;
    transition: all 200ms linear;

    ${props => props.showClearIcon && css`
    opacity: 1;
    z-index: 1;
  `}

    &:hover {
      fill: #8c8c8c;
    }
  }
`;

export default SearchInput;