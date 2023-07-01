import React from 'react';
import Spinner from './Spinner';
import styled, { css } from 'styled-components';

const Button = ({
  label,
  onClick = () => {},
  disabled = false,
  loading = false,
  loadingLabel = null,
  color = null,
  hoveredColor = null,
  pressedColor = null,
  disabledColor = null,
  className = ''
}) => {
  return (
    <ButtonWrapper
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
      color={color}
      hoveredColor={hoveredColor}
      pressedColor={pressedColor}
      disabledColor={disabledColor}>
      <div className="flex-row-center">
        {loading && (
          <span style={{ margin: '0 5px 0 0' }}>
            <Spinner size="13px" color="#b2b2b2" backgroundColor="transparent" border="1px" />
          </span>
        )}
        {loading && loadingLabel ? loadingLabel : label}
      </div>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button.attrs(props => ({
  className: props.className
}))`
  ${(props) =>
    props.color &&
    css`
      background-color: ${(props) => props.color};
      border-color: ${(props) => props.color};
    `}

  ${(props) =>
    props.hoveredColor &&
    css`
      &:hover:enabled {
        background-color: ${(props) => props.hoveredColor};
        border-color: ${(props) => props.hoveredColor};
      }
    `}

  ${(props) =>
    props.pressedColor &&
    css`
      &:hover:enabled:active {
        background-color: ${(props) => props.pressedColor};
        border-color: ${(props) => props.pressedColor};
      }
    `}

  ${(props) =>
    props.disabledColor &&
    css`
      &:disabled {
        background-color: ${(props) => props.disabledColor};
        border-color: ${(props) => props.disabledColor};
      }
    `}
`;

export default Button;
