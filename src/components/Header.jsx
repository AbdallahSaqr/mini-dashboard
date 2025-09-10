import React, { useState, useRef, useEffect } from "react";

export default function Header({ title, icon, onLogout, onProfile }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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

        {/* Profile */}
        <div className="header-actions">
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
                  <button onClick={onLogout}>
                    <i className="bi bi-box-arrow-in-left me-2" style={{ fontSize: "1rem" }}></i>
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
