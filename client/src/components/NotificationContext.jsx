import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    const newNotification = {
      id: Math.random().toString(36).substr(2, 9), // Generate unique ID
      message,
      timestamp: Date.now(),
    };
    setNotifications([...notifications, newNotification]);
  };

  const removeNotification = (id) => {
    const updatedNotifications = notifications.filter((notif) => notif.id !== id);
    setNotifications(updatedNotifications);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
