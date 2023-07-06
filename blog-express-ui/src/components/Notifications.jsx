import React from 'react';
import useNotificationContext from '../hooks/useNotificationContext';
import Toast from './ui/Toast';
import styled from 'styled-components';

const NOTIFICATION_DURATION = 2000;

const Notifications = () => {
  const { notifications, closeNotification } = useNotificationContext();

  function getToasts() {
    return notifications.map((notification) => {
      const { message, type } = notification;
      return (
        <Toast
          key={`notification_${notification.id}`}
          message={message}
          type={type}
          onClose={() => closeNotification(notification.id)}
          duration={notification.autoClose ? NOTIFICATION_DURATION : 0}
        />
      );
    });
  }

  return <NotificationsWrapper>{getToasts()}</NotificationsWrapper>;
};

const NotificationsWrapper = styled.div.attrs({
  className: 'flex-column',
})`
  align-content: center;
  flex-wrap: wrap;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  top: 5px;
  z-index: 100;
`;

export default Notifications;
