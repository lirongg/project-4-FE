import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

function useNotification() {
  return useContext(NotificationContext);
}

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(), 
      message,
      isRead: false, 
    };
    setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
  };


  const removeNotification = (id) => {
    setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export { useNotification, NotificationProvider };
