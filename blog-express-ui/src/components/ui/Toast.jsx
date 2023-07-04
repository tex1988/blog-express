import React from 'react';
import styled from 'styled-components';

const colors = {
  error: '#CE352C',
  warning: '#ffe484',
  success: '#238636',
  notification: 'royalblue',
};

const Toast = ({ message = '', type = 'notification', onClose = () => {} }) => {
  function getColor() {
    const color = colors[type];
    if (color) return color;
    return colors.notification;
  }

  return (
    <ToastWrapper color={getColor()}>
      <div className='message'>{message}</div>
      <div className='icon' onClick={onClose}>
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
  border: 1px solid transparent;
  border-radius: 3px;
  background-color: ${(props) => props.color};
  text-align: center;
  vertical-align: center;
  padding: 10px;
  margin: 5px;
  font-size: 12px;
  display: flex;
  
  .icon {
    text-align: center;
    padding-left: 10px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
  
  .message {
    flex-grow: 1;
  }
`;

export default Toast;
