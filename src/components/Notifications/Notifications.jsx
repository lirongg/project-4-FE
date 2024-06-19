import React, { useState } from 'react';
import { useNotification } from './NotificationContext';
import './Notifications.css';

function Notifications() {
  const { notifications, removeNotification, markAsRead } = useNotification();
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleViewFull = (notification) => {
    setSelectedNotification(notification);
    markAsRead(notification.id); // Mark as read when viewing full message
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="notifications-section">
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className={notification.isRead ? 'read' : ''}>
            <span>
              {notification.message.length > 10
                ? `${notification.message.slice(0, 20)}...`
                : notification.message}
            </span>
            <button onClick={() => handleViewFull(notification)}>View Full</button>
            <button onClick={() => removeNotification(notification.id)}>Clear</button>
          </li>
        ))}
      </ul>

      {/* Modal for viewing full notification message */}
      {selectedNotification && (
        <div className="modal">
          <div className="modal-content">
            <h4>Notification Details</h4>
            <p>{selectedNotification.message}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
