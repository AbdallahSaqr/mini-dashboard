import React, { useState } from 'react';
import Card from './common/Card';

const initialNotifications = [
  {
    id: 1,
    title: "New User Registration",
    message: "John Doe has registered as a new user",
    time: "5 minutes ago",
    isRead: false,
    type: "info",
  },
  {
    id: 2,
    title: "System Update",
    message: "System will undergo maintenance in 2 hours",
    time: "1 hour ago",
    isRead: false,
    type: "warning",
  },
  {
    id: 3,
    title: "Task Completed",
    message: "Daily backup has been completed successfully",
    time: "2 hours ago",
    isRead: true,
    type: "success",
  },
  {
    id: 4,
    title: "New Analytics Data",
    message: "Monthly analytics report is ready to view",
    time: "3 hours ago",
    isRead: true,
    type: "info",
  }
];

export default function NotificationsWidget({ isOpen, onClose, onNotificationsChange }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Emit initial notifications state when component mounts
  React.useEffect(() => {
    if (onNotificationsChange) {
      onNotificationsChange(notifications);
    }
  }, [notifications, onNotificationsChange]);

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updatedNotifications);
    onNotificationsChange?.(updatedNotifications);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      default:
        return 'ℹ️';
    }
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="modal-custom-backdrop" onClick={onClose} style={{ zIndex: 1040 }}></div>
          <div className="notifications-panel">
            <Card>
              <div className="card-inner">
                <div className="notifications-panel-header">
                  <div className="d-flex align-items-center gap-2">
                    <h3>Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="notification-count">{unreadCount}</span>
                    )}
                  </div>
                  <button className="icon-button" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>

                {unreadCount > 0 && (
                  <button 
                    className="btn-custom" 
                    onClick={markAllAsRead} 
                    style={{ margin: '0.5rem 1rem', width: 'calc(100% - 2rem)' }}
                  >
                    <span className="btn-inner d-flex align-items-center justify-content-center gap-1">
                      <i className="bi bi-check-lg"></i> Mark all notifications as read
                    </span>
                  </button>
                )}

                <div className="notifications-list custom-scrollbar">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                    >
                      <div className={`notification-icon ${notification.type}`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="notification-content">
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                        <span className="notification-time">
                          <i className="bi bi-clock me-1"></i>
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
