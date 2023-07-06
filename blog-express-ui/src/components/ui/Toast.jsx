import React from 'react';
import styled from 'styled-components';

const colors = {
  error: '#CE352C',
  warning: '#faad14',
  success: '#238636',
  info: 'royalblue',
};

const Toast = ({ message = '', type = 'info', onClose = () => {}, duration = 0 }) => {
  if (duration > 0) {
    setTimeout(onClose, [duration]);
  }

  function getColor() {
    const color = colors[type];
    if (color) return color;
    return colors.notification;
  }

  const errorIcon = (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="close-circle"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true">
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
    </svg>
  );

  const warningIcon = (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="exclamation-circle"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true">
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
    </svg>
  );

  const successIcon = (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="check-circle"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true">
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
    </svg>
  );

  const infoIcon = (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="info-circle"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true">
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
    </svg>
  );

  function getIcon() {
    switch (type) {
      case 'error':
        return errorIcon;
      case 'warning':
        return warningIcon;
      case 'success':
        return successIcon;
      default:
        return infoIcon;
    }
  }

  return (
    <ToastWrapper color={getColor()}>
      <div className='icon'>{getIcon()}</div>
      <div className="message">{message}</div>
      <div className="close-icon" onClick={onClose}>
        <svg
          className="clear-icon"
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="close-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
        </svg>
      </div>
    </ToastWrapper>
  );
};

const ToastWrapper = styled.div`
  max-width: 200px;
  border-radius: 5px;
  background-color: #1f1f1f;
  text-align: center;
  vertical-align: center;
  padding: 10px;
  margin: 5px;
  font-size: 12px;
  display: flex;
  box-shadow: 0 0 5px 2px ${(props) => props.color};

  .close-icon {
    text-align: center;
    padding-left: 10px;
    flex-shrink: 0;
    display: flex;
    align-items: center;

    svg {
      font-size: 12px;
      fill: #4b4b4b;
      transition: all 200ms linear;

      &:hover {
        fill: #8c8c8c;
      }
    }
  }

  .icon {
    text-align: center;
    flex-shrink: 0;
    padding-right: 10px;
    display: flex;
    align-items: center;

    svg {
      font-size: 20px;
      fill: ${(props) => props.color};
    }
  }
  
  .message {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
  }
`;

export default Toast;
