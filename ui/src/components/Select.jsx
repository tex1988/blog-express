import styled, { css } from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const Select = (props) => {
  const { items = {}, defaultValue, onChange = null, width = null } = props;
  const [value, setValue] = useState(defaultValue);
  const [showDropDown, setShowDropDown] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, []);

  function handleClickOutside(event) {
    if (ref.current && !ref.current?.contains(event.target)) {
      setShowDropDown(false);
    }
  }

  function toggleDropdownVisibility() {
    setShowDropDown(!showDropDown)
  }

  function onInputChange(event) {
    setShowDropDown(false);
    setValue(event.target.value);
    onChange && onChange(event);
  }

  function getItems() {
    const entries = Object.entries(items);
    return entries.map((entry, index) => {
      const [value, title] = entry;
      const className = getItemClass(index, entries.length);
      return (
        <option key={`input_${index}`} className={className} value={value} onClick={onInputChange}>
          {title}
        </option>
      );
    });
  }

  function getItemClass(index, size) {
    let className;
    if (index === 0) {
      className = 'first-item';
    } else if (index === size - 1) {
      className = 'last-item';
    } else {
      className = '';
    }
    return className;
  }

  return (
    <div ref={ref} className="flex-column">
      <SelectWrapper onClick={toggleDropdownVisibility} width={width}>{items[value]}</SelectWrapper>
      <DropdownWrapper showDropDown={showDropDown}>
        <div>{getItems()}</div>
      </DropdownWrapper>
    </div>
  );
}

const DropdownWrapper = styled.div`
  position: relative;
  line-height: normal;
  cursor: auto;
  opacity: 0;
  z-index: -1;
  transition: all 200ms linear;

  ${props => props.showDropDown && css`
    opacity: 1;
    z-index: 1;
  `}

  div {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: #2f2f2f;
    border: 1px solid #4b4b4b;
    border-radius: 5px;
  }

  option {
    color: white;
    font-size: 13px;
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #4b4b4b;
    cursor: pointer;
    transition: all 200ms linear;
    
    &:hover {
      background-color: #282828;
    }
  }

  .last-item {
    border-bottom: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .first-item {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
`;

const SelectWrapper = styled.div`
  background-color: transparent;
  border: none;
  color: #f6f6f6;
  font-size: 1em;
  text-decoration: underline;
  padding: 5px 0 5px 5px;
  cursor: pointer;
  margin: 0;
  
  ${props => props.width && css`
    width: ${props.width};
  `}
`;

export default Select;