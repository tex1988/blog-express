import React, { createContext, useCallback, useState } from 'react';

const NotificationContext = createContext([]);

const NotificationContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  function pushNotification(notification) {
    notification.id = Date.now();
    setNotifications((prevState) =>[notification, ...prevState]);
  }
  
  function closeNotification(id) {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  }

  const closeAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const contextValue = { notifications, pushNotification, closeNotification, closeAll };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationContextProvider };