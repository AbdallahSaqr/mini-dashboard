import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationsWidget from './NotificationsWidget';
import { useAuth } from '../context/AuthContext';

export default function Header({ title, icon, onProfile }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const profileRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header-custom">
      <div className="header-inner">
        {/* Page Title */}
        <div className="d-flex align-items-center">
          {icon && (
            <i
              className={`${icon} me-2`}
              style={{ fontSize: "1.5rem", color: "#2563eb" }}
            ></i>
          )}
          <h1 className="header-title mb-0">{title}</h1>
        </div>

        {/* Actions */}
        <div className="header-actions">
          {/* Notifications */}
          <div className="header-action">
            <button
              className="icon-button"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <i className="bi bi-bell"></i>
              {notifications.some(n => !n.isRead) && (
                <span className="notification-badge">
                  {notifications.filter(n => !n.isRead).length}
                </span>
              )}
            </button>
          </div>

          {/* Profile */}
          <div className="header-action" ref={profileRef}>
            <button
              className="profile-btn"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img
                src="https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
                alt="Profile"
                className="profile-img"
              />
            </button>
            {showProfileMenu && (
              <div className="dropdown-menu">
                <div className="dropdown-inner">
                  <button onClick={onProfile}>
                    <i className="bi bi-person me-2" style={{ fontSize: "1rem" }}></i>
                    Profile
                  </button>
                  <button 
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                      navigate('/');
                    }}
                  >
                    <i className="bi bi-box-arrow-in-left me-2" style={{ fontSize: "1rem" }}></i>
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Widget */}
          <NotificationsWidget 
            isOpen={showNotifications} 
            onClose={() => setShowNotifications(false)}
            onNotificationsChange={setNotifications}
          />
        </div>
      </div>
    </header>
  );
}
