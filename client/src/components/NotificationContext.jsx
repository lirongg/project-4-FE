// NotificationContext.jsx
import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(), // Unique ID for each notification
      message,
      isRead: false, // Flag to track if the notification has been viewed
    };
    setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) => prevNotifications.filter(n => n.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}
