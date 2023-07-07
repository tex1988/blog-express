import React from 'react';
import useNotificationContext from '../hooks/useNotificationContext';
import Toast from './ui/Toast';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const NOTIFICATION_DURATION = 3000;

const Notifications = () => {
  const { notifications, closeNotification } = useNotificationContext();

  function getToasts() {
    return (
      <ul>
        <AnimatePresence>
          {notifications.map((notification) => {
            const { message, type } = notification;
            return (
              <motion.li
                key={`notification_${notification.id}`}
                layout
                className="flex-row-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 150, transition: { duration: 0.3 } }}>
                <Toast
                  message={message}
                  type={type}
                  onClose={() => closeNotification(notification.id)}
                  duration={notification.autoClose ? NOTIFICATION_DURATION : 0}
                />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    );
  }

  return <NotificationsWrapper>{getToasts()}</NotificationsWrapper>;
};

const NotificationsWrapper = styled.div.attrs({
  className: 'flex-column',
})`
  align-content: center;
  flex-wrap: wrap;
  width: fit-content;
  left: 0;
  right: 0;
  top: 5px;
  margin-left: auto;
  margin-right: auto;
  position: fixed;
  z-index: 100;
  
  ul {
    padding: 0;
    margin: 0;
  }
`;

export default Notifications;
